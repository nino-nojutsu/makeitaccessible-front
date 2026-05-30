import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header';

// manage global redux state
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Reducers — ajout de nouveaux reducers
import user from '../reducers/user';

// Persistance du store dans le localStorage pour que les données suivent aux rechargements
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

// Combinaison des reducers
const reducers = combineReducers({ user });
// identifier les données dans le localStorage
const persistConfig = { key: 'makeitaccessible', storage };

// Création du store
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Make It Accessible</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default App;
