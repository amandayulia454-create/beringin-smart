
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';

// IMPORT HALAMAN
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/login';

// CONTEXT LAPORAN
import { LaporanProvider } from './context/LaporanContext';

/* Core CSS Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme */
import './theme/variables.css';

// KONFIGURASI IONIC
setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <LaporanProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Routes>
              {/* HALAMAN LOGIN */}
              <Route
                path="/login"
                element={<Login />}
              />

              {/* HALAMAN HOME */}
              <Route
                path="/home"
                element={<Home />}
              />

              {/* HALAMAN DETAIL */}
              <Route
                path="/detail/:id"
                element={<Detail />}
              />

              {/* HALAMAN AWAL */}
              <Route
                path="/"
                element={
                  <Navigate
                    to="/login"
                    replace
                  />
                }
              />
            </Routes>
          </IonRouterOutlet>
        </IonReactRouter>
      </LaporanProvider>
    </IonApp>
  );
};

export default App;
