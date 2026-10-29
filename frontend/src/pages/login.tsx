
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonToast,
  IonSpinner,
} from '@ionic/react';

import {
  shieldCheckmarkOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  arrowForwardOutline,
} from 'ionicons/icons';

import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // FUNGSI LOGIN TETAP SAMA
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await API.post('/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      navigate('/home', { replace: true });
    } catch (error: any) {
      console.error('Login Error:', error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          'Gagal terhubung ke server Laravel!'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        style={{
          '--background': '#EEF5FF',
        } as React.CSSProperties}
      >
        {/* BACKGROUND */}
        <div
          style={{
            minHeight: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            boxSizing: 'border-box',
            background:
              'radial-gradient(circle at top left, #C9DFFF 0%, transparent 45%), linear-gradient(135deg, #EEF5FF, #FFFFFF)',
          }}
        >
          {/* KARTU LOGIN */}
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px 26px',
              boxSizing: 'border-box',
              boxShadow:
                '0 20px 55px rgba(40,77,133,0.13)',
              border: '1px solid #E2ECFA',
            }}
          >
            {/* LOGO */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  margin: '0 auto 18px',
                  borderRadius: '20px',
                  background:
                    'linear-gradient(135deg, #A9C9F0, #6B9FE8)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow:
                    '0 8px 20px rgba(107,159,232,0.25)',
                }}
              >
                <IonIcon
                  icon={shieldCheckmarkOutline}
                  style={{
                    fontSize: '36px',
                    color: '#FFFFFF',
                  }}
                />
              </div>

              <h1
                style={{
                  fontSize: '25px',
                  fontWeight: 800,
                  color: '#284D85',
                  margin: '0 0 8px',
                }}
              >
                Beringin Smart
              </h1>

              <p
                style={{
                  fontSize: '13px',
                  color: '#8297B1',
                  margin: '0 0 28px',
                  lineHeight: 1.6,
                }}
              >
                Sistem Pengaduan Sarana dan Prasarana
              </p>
            </div>

            {/* FORM LOGIN */}
            <form onSubmit={handleLogin}>
              {/* EMAIL */}
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#284D85',
                  marginBottom: '8px',
                }}
              >
                Email
              </label>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#F5F9FF',
                  border: '1px solid #D8E7FA',
                  borderRadius: '12px',
                  padding: '0 14px',
                  marginBottom: '20px',
                }}
              >
                <IonIcon
                  icon={mailOutline}
                  style={{
                    color: '#6B9FE8',
                    fontSize: '20px',
                    marginRight: '12px',
                  }}
                />

                <IonInput
                  type="email"
                  value={email}
                  onIonInput={(e) =>
                    setEmail(e.detail.value || '')
                  }
                  placeholder="Masukkan email"
                  required
                  style={{
                    '--color': '#284D85',
                    '--placeholder-color': '#9AADC4',
                    minHeight: '52px',
                  } as React.CSSProperties}
                />
              </div>

              {/* PASSWORD */}
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#284D85',
                  marginBottom: '8px',
                }}
              >
                Password
              </label>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#F5F9FF',
                  border: '1px solid #D8E7FA',
                  borderRadius: '12px',
                  padding: '0 14px',
                  marginBottom: '26px',
                }}
              >
                <IonIcon
                  icon={lockClosedOutline}
                  style={{
                    color: '#6B9FE8',
                    fontSize: '20px',
                    marginRight: '12px',
                  }}
                />

                <IonInput
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onIonInput={(e) =>
                    setPassword(e.detail.value || '')
                  }
                  placeholder="Masukkan password"
                  required
                  style={{
                    '--color': '#284D85',
                    '--placeholder-color': '#9AADC4',
                    minHeight: '52px',
                  } as React.CSSProperties}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? 'Sembunyikan password'
                      : 'Tampilkan password'
                  }
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    padding: '8px',
                    color: '#8297B1',
                  }}
                >
                  <IonIcon
                    icon={
                      showPassword
                        ? eyeOffOutline
                        : eyeOutline
                    }
                    style={{ fontSize: '20px' }}
                  />
                </button>
              </div>

              {/* TOMBOL MASUK */}
              <IonButton
                expand="block"
                type="submit"
                disabled={loading}
                style={{
                  '--background': '#6B9FE8',
                  '--background-hover': '#5B8DD5',
                  '--color': '#FFFFFF',
                  '--border-radius': '12px',
                  height: '52px',
                  fontWeight: 700,
                  fontSize: '15px',
                  margin: 0,
                  boxShadow:
                    '0 8px 20px rgba(107,159,232,0.25)',
                } as React.CSSProperties}
              >
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <>
                    Masuk
                    <IonIcon
                      slot="end"
                      icon={arrowForwardOutline}
                    />
                  </>
                )}
              </IonButton>
            </form>

            {/* FOOTER */}
            <p
              style={{
                textAlign: 'center',
                fontSize: '12px',
                color: '#9AADC4',
                margin: '26px 0 0',
              }}
            >
              © Beringin Smart • Portal Sarpras
            </p>
          </div>
        </div>

        {/* PESAN ERROR */}
        <IonToast
          isOpen={!!errorMessage}
          onDidDismiss={() => setErrorMessage('')}
          message={errorMessage}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
