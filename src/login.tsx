
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';

import { useState } from 'react';
import API from './services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await API.post('/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error('Data login tidak lengkap');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('user', JSON.stringify(user));

      // Langsung buka halaman Home
      window.location.replace('/home');

    } catch (error: any) {
      console.error('Login Error:', error);

      setErrorMessage(
        error.response?.data?.message ||
        error.message ||
        'Login gagal. Periksa koneksi server.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonToolbar>
          <IonTitle>Login Beringin Smart</IonTitle>
        </IonToolbar>

        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonInput={(e) =>
              setEmail(e.detail.value ?? '')
            }
            placeholder="Masukkan email"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonInput={(e) =>
              setPassword(e.detail.value ?? '')
            }
            placeholder="Masukkan password"
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? 'Memproses...' : 'Masuk'}
        </IonButton>

        <IonToast
          isOpen={!!errorMessage}
          message={errorMessage}
          duration={3000}
          color="danger"
          onDidDismiss={() => setErrorMessage('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
