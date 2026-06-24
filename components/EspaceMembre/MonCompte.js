import styles from "../../styles/MonCompte.module.css";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar.js";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../reducers/user";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";

function MonCompte() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Messages affichés à l'utilisateur après une action (succès ou erreur)
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  // Un state par champ modifiable du formulaire
  // Vide par défaut => seuls les champs remplis seront envoyés au backend
  const [modifyLastName, setModifyLastName] = useState("");
  const [modifyFirstName, setModifyFirstName] = useState("");
  const [modifyEmail, setModifyEmail] = useState("");
  const [modifyUsername, setModifyUsername] = useState("");
  const [modifyPassword, setModifyPassword] = useState("");

  // Récupère les données actuelles de l'utilisateur connecté depuis le store Redux
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/users/${user.token}`)
       .then((response) => response.json())
       .then((data) => {
         if (data.result) {
           setModifyLastName(data.user.lastName);
           setModifyFirstName(data.user.firstName);
           setModifyEmail(data.user.email);
           setModifyUsername(data.user.username);
           setModifyPassword('*****************');
         }
       })
       .catch((error) => console.error(error));
  }, []);

  // modifier un champ
  const handleSubmit = () => {
    // body = ce qui sera envoyé au backend, le token est toujours requis
    const body = { token: user.token };

    // Pour chaque champ :
    // 1. On vérifie qu'il a été rempli (sinon on l'ignore, pas de modif demandée)
    // 2. On vérifie que la nouvelle valeur est différente de l'ancienne si non, on evoie un message d'erreur
    // 3. Si tout est ok, on l'ajoute au body

    if (modifyFirstName) {
      if (modifyFirstName === user.firstName) {
        setError("Veuillez saisir un prénom différent de l'actuel");
        return;
      }
      body.firstName = modifyFirstName;
    }

    if (modifyLastName) {
      if (modifyLastName === user.lastName) {
        setError("Veuillez saisir un nom différent de l'actuel");
        return;
      }
      body.lastName = modifyLastName;
    }

    if (modifyEmail) {
      if (modifyEmail === user.email) {
        setError("Veuillez saisir un email différent de l'actuel");
        return;
      }
      body.email = modifyEmail;
    }

    if (modifyUsername) {
      if (modifyUsername === user.username) {
        setError("Veuillez saisir un nom d'utilisateur différent de l'actuel");
        return;
      }
      body.username = modifyUsername;
    }

    // Validation spécifique au mot de passe : longueur minimale
    // Pas de comparaison possible avec l'ancien (il est hashé en BDD
    if (modifyPassword && modifyPassword.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères");
      return;
    }

    // Envoie uniquement les champs modifiés au backend
    fetch("http://localhost:3000/users/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Met à jour le store Redux avec les nouvelles infos retournées par le backend
          dispatch(
            updateUser({
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              username: data.user.username,
              password: data.user.password,
            }),
          );
          // Affiche le message de succès et vide tous les champs du formulaire
          setAlert("Compte mis à jour avec succès !");
          setModifyLastName("");
          setModifyFirstName("");
          setModifyEmail("");
          setModifyUsername("");
          setModifyPassword("");
          setError("");
        }
      })
      .catch((error) => {
        setError("Une erreur est survenue lors de la mise à jour du compte.");
      });
  };

  // Suppression du compte avec confirmation via Modal.confirm (antd)
  const handleDelete = () => {
    Modal.confirm({
      className: styles.confirmModal,
      title: "Supprimer mon compte",
      content:
        "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      okText: "Confirmer",
      cancelText: "Annuler",
      okButtonProps: { danger: true, style: { backgroundColor: "#DC2626" } },
      cancelButtonProps: {
        style: { borderColor: "#111111", color: "#111111" },
      },
      onOk: () => {
        // Exécuté uniquement si l'utilisateur clique sur "Confirmer"
        fetch("http://localhost:3000/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: user.token }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              // Vide le store Redux et redirige vers la home
              dispatch(deleteUser());
              router.push("/");
            }
          });
      },
    });
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.layout}>
        <h2>Modifier mon compte</h2>

        {/* Message de succès affiché uniquement si alert n'est pas vide */}
        {alert && (
          <div className="alert alert-success" role="alert">
            {alert}
          </div>
        )}
        <div className={styles.box}>
          <div className={styles.field}>
            <label>Nom</label>
            <input
              type="text"
              placeholder={`Modifier votre nom : ${modifyLastName}`}
              onChange={(e) => setModifyLastName(e.target.value)}
              value={modifyLastName}
              className={styles.inputSignUp}
            />
          </div>
          <div className={styles.field}>
            <label>Prénom</label>
            <input
              type="text"
              placeholder={`Modifier votre prénom : ${modifyFirstName}`}
              onChange={(e) => setModifyFirstName(e.target.value)}
              value={modifyFirstName}
              className={styles.inputSignUp}
            />
          </div>
          <div>
            <label className={styles.field}>Email</label>
            <input
              type="email"
              placeholder={`Modifier votre email : ${modifyEmail}`}
              onChange={(e) => setModifyEmail(e.target.value)}
              value={modifyEmail}
              className={styles.inputSignUp}
            />
          </div>
          <div>
            <label className={styles.field}>Nom d'utilisateur</label>
            <input
              type="text"
              placeholder={`Modifier votre nom d'utilisateur : ${modifyUsername}`}
              onChange={(e) => setModifyUsername(e.target.value)}
              value={modifyUsername}
              className={styles.inputSignUp}
            />
          </div>
          <div>
            <label className={styles.field}>Mot de passe</label>
            <input
              type="password"
              placeholder={`Modifier votre mot de passe : ${modifyPassword}`}
              onChange={(e) => setModifyPassword(e.target.value)}
              value={modifyPassword}
              className={styles.inputSignUp}
            />
          </div>

          {/* Message d'erreur affiché uniquement si error n'est pas vide */}
          {error && (
            <div className="alert alert-error" role="alert">
              <FontAwesomeIcon
                aria-hidden="true"
                icon={faExclamationTriangle}
                size="sm"
              />
              {error}
            </div>
          )}
          <button className={styles.button} onClick={handleSubmit}>
            Modifier mon compte
          </button>
          <button
            className={styles.buttonDelete}
            onClick={() => handleDelete()}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
}

export default MonCompte;
