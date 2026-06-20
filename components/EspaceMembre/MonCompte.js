import styles from "../../styles/MonCompte.module.css";
import { useState } from "react";
import Sidebar from "./Sidebar.js";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../reducers/user";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function MonCompte() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [modifyLastName, setModifyLastName] = useState("");
  const [modifyFirstName, setModifyFirstName] = useState("");
  const [modifyEmail, setModifyEmail] = useState("");
  const [modifyUsername, setModifyUsername] = useState("");
  const [modifyPassword, setModifyPassword] = useState("");

  const user = useSelector((state) => state.user.value);

  const handleSubmit = () => {
    const body = { token: user.token };

    if (modifyFirstName) body.firstName = modifyFirstName;
    if (modifyLastName) body.lastName = modifyLastName;
    if (modifyEmail) body.email = modifyEmail;
    if (modifyUsername) body.username = modifyUsername;
    if (modifyPassword) body.password = modifyPassword;

    if (modifyPassword && modifyPassword.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères");
      return;
    }

    fetch("http://localhost:3000/users/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            updateUser({
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              username: data.user.username,
            }),
          );
          alert("Compte mis à jour avec succès !");
          router.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Une erreur est survenue lors de la mise à jour du compte.");
      });
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
    );

    if (!confirm) return;

    fetch("http://localhost:3000/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(deleteUser());
          router.push("/");
        }
      });
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.layout}>
        <h2>Modifier mon compte</h2>
        <div className={styles.box}>
          <div className={styles.field}>
            <label>Nom</label>
            <input
              type="text"
              placeholder="Modifier votre nom"
              onChange={(e) => setModifyLastName(e.target.value)}
              value={modifyLastName}
              className={styles.inputSignUp}
            />
          </div>
          <div className={styles.field}>
            <label>Prénom</label>
            <input
              type="text"
              placeholder="Modifier votre prénom"
              onChange={(e) => setModifyFirstName(e.target.value)}
              value={modifyFirstName}
              className={styles.inputSignUp}
            />
          </div>
          <div>
            <label className={styles.field}>Email</label>
            <input
              type="email"
              placeholder="Modifier votre email"
              onChange={(e) => setModifyEmail(e.target.value)}
              value={modifyEmail}
              className={styles.inputSignUp}
            />
          </div>
          <div>
            <label className={styles.field}>Nom d'utilisateur</label>
            <input
              type="text"
              placeholder="Modifier votre nom d'utilisateur"
              onChange={(e) => setModifyUsername(e.target.value)}
              value={modifyUsername}
              className={styles.inputSignUp}
            />
          </div>
          <div>
            <label className={styles.field}>Mot de passe</label>
            <input
              type="password"
              placeholder="Modifier votre mot de passe"
              onChange={(e) => setModifyPassword(e.target.value)}
              value={modifyPassword}
              className={styles.inputSignUp}
            />
          </div>
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
