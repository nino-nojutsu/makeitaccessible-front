import "antd/dist/antd.css";
import "../styles/antd.css";
import '../styles/globals.css'
import { useRouter } from 'next/router';
import Head from 'next/head'
import Header from '../components/nav/Header';
import Footer from '../components/nav/Footer';

// manage global redux state
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Reducers — ajout de nouveaux reducers
import user from '../reducers/user';
import audit from '../reducers/audit';

// Persistance du store dans le localStorage pour que les données suivent aux rechargements
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

// Combinaison des reducers
const reducers = combineReducers({ user, audit });
// identifier les données dans le localStorage
const persistConfig = { key: 'makeitaccessible', storage };

// Création du store
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const dashboardRoutes = ['/dashboard', '/mes-audits', '/mon-compte', '/parametres'];

function App({ Component, pageProps }) {
   const router = useRouter(); // ← ajouté
  const isDashboard = dashboardRoutes.includes(router.pathname); // ← ajouté

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className={isDashboard ? '' : 'container'}>
          <Head>
            <title>MakeItAccessible</title>
            <link rel="icon" href="/favicon-makeitaccessible.svg" type="image/svg" sizes="32x32" />
          </Head>
          {!isDashboard && <Header />} {/* Affiche le Header uniquement si on n'est pas sur une page du dashboard */}
          <Component {...pageProps} />
           {!isDashboard && <Footer />} {/* Affiche le Footer uniquement si on n'est pas sur une page du dashboard */}
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App;
