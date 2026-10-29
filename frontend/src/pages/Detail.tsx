
import React, { useContext, useState } from 'react';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonBadge,
  IonButton,
  IonIcon,
  IonToast,
} from '@ionic/react';

import {
  checkmarkCircleOutline,
  personOutline,
  calendarOutline,
  documentTextOutline,
  locationOutline,
  businessOutline,
  informationCircleOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';

import { useParams } from 'react-router-dom';
import { LaporanContext } from '../context/LaporanContext';

const BLUE = '#6B9FE8';
const DARK = '#284D85';
const LIGHT = '#F2F7FF';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    getLaporanById,
    ubahStatusLaporan,
  } = useContext(LaporanContext);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<
    'success' | 'danger'
  >('success');
  const [loading, setLoading] = useState(false);

  // Role pengguna
  const role = localStorage.getItem('role')?.toLowerCase();

  // Mengambil laporan berdasarkan ID
  const laporan = getLaporanById(id || '');

  // Fungsi mengubah status tetap dipertahankan
  const handleTandaiSelesai = async () => {
    if (!laporan || role !== 'petugas') return;

    setLoading(true);

    try {
      const berhasil = await ubahStatusLaporan(
        String(laporan.id),
        'Selesai'
      );

      if (berhasil) {
        setToastMessage(
          'Status laporan berhasil diubah menjadi Selesai!'
        );
        setToastColor('success');
      } else {
        setToastMessage('Gagal mengubah status laporan.');
        setToastColor('danger');
      }

      setShowToast(true);
    } catch (error) {
      console.error('Gagal mengubah status:', error);
      setToastMessage('Gagal mengubah status laporan.');
      setToastColor('danger');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const infoRow = (
    icon: string,
    label: string,
    value: React.ReactNode
  ) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 0',
        borderBottom: '1px solid #EDF2FA',
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '13px',
          background: '#EAF2FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <IonIcon
          icon={icon}
          style={{
            fontSize: '22px',
            color: BLUE,
          }}
        />
      </div>

      <div style={{ minWidth: 0 }}>
        <p
          style={{
            margin: '0 0 5px',
            color: '#8297B1',
            fontSize: '12px',
          }}
        >
          {label}
        </p>

        <div
          style={{
            color: DARK,
            fontSize: '15px',
            fontWeight: 650,
            overflowWrap: 'anywhere',
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader className="ion-no-border">
        <IonToolbar
          style={{
            '--background': '#FFFFFF',
            '--color': DARK,
            '--padding-top': '8px',
            '--padding-bottom': '8px',
          } as React.CSSProperties}
        >
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/home"
              text="Kembali"
              style={{
                '--color': DARK,
              } as React.CSSProperties}
            />
          </IonButtons>

          <IonTitle style={{ fontWeight: 700 }}>
            Detail Laporan
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* BACKGROUND */}
      <IonContent
        style={{
          '--background': LIGHT,
        } as React.CSSProperties}
      >
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '20px 16px 40px',
          }}
        >
          {laporan ? (
            <>
              {/* BANNER DETAIL */}
              <div
                style={{
                  background:
                    'linear-gradient(125deg, #6B9FE8, #A9C9F0)',
                  borderRadius: '24px',
                  padding: '26px',
                  marginBottom: '20px',
                  boxShadow:
                    '0 12px 28px rgba(107,159,232,0.18)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '14px',
                  }}
                >
                  <IonIcon
                    icon={shieldCheckmarkOutline}
                    style={{
                      fontSize: '24px',
                      color: '#FFFFFF',
                    }}
                  />

                  <span
                    style={{
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                    }}
                  >
                    BERINGIN SMART
                  </span>
                </div>

                <h1
                  style={{
                    margin: '0 0 8px',
                    color: '#FFFFFF',
                    fontSize: '26px',
                    fontWeight: 800,
                  }}
                >
                  Rincian Tiket Laporan
                </h1>

                <p
                  style={{
                    margin: 0,
                    color: '#FFFFFF',
                    opacity: 0.95,
                    fontSize: '13px',
                    lineHeight: 1.6,
                  }}
                >
                  Informasi lengkap mengenai pengaduan
                  fasilitas sarana dan prasarana.
                </p>
              </div>

              {/* KARTU INFORMASI */}
              <IonCard
                style={{
                  margin: 0,
                  borderRadius: '22px',
                  background: '#FFFFFF',
                  boxShadow:
                    '0 8px 28px rgba(40,77,133,0.07)',
                  border: '1px solid #E4EEFC',
                }}
              >
                <IonCardContent style={{ padding: '24px' }}>
                  {/* JUDUL DAN STATUS */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '12px',
                      flexWrap: 'wrap',
                      marginBottom: '14px',
                    }}
                  >
                    <div>
                      <p
                        style={{
                          color: BLUE,
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '1px',
                          margin: '0 0 8px',
                        }}
                      >
                        INFORMASI LAPORAN
                      </p>

                      <h2
                        style={{
                          color: DARK,
                          fontSize: '23px',
                          fontWeight: 800,
                          margin: 0,
                        }}
                      >
                        {laporan.lokasi}
                      </h2>
                    </div>

                    <IonBadge
                      color={
                        laporan.status === 'Selesai'
                          ? 'success'
                          : laporan.status === 'Sedang Diproses'
                          ? 'primary'
                          : 'warning'
                      }
                      style={{
                        padding: '9px 13px',
                        borderRadius: '10px',
                        fontSize: '12px',
                      }}
                    >
                      {laporan.status}
                    </IonBadge>
                  </div>

                  {/* DATA LAPORAN */}
                  {infoRow(
                    businessOutline,
                    'Kategori Laporan',
                    laporan.kategori
                  )}

                  {infoRow(
                    locationOutline,
                    'Lokasi / Ruangan',
                    laporan.lokasi
                  )}

                  {infoRow(
                    personOutline,
                    'Nama Pelapor',
                    laporan.nama
                  )}

                  {infoRow(
                    calendarOutline,
                    'Tanggal Masuk',
                    laporan.tanggal ||
                      (laporan as any).created_at?.split('T')[0] ||
                      '-'
                  )}

                  {/* DESKRIPSI */}
                  <div style={{ marginTop: '24px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '9px',
                        marginBottom: '12px',
                      }}
                    >
                      <IonIcon
                        icon={documentTextOutline}
                        style={{
                          fontSize: '21px',
                          color: BLUE,
                        }}
                      />

                      <h3
                        style={{
                          margin: 0,
                          color: DARK,
                          fontSize: '17px',
                          fontWeight: 750,
                        }}
                      >
                        Deskripsi Masalah
                      </h3>
                    </div>

                    <div
                      style={{
                        background: '#F5F9FF',
                        border: '1px solid #E4EEFC',
                        borderRadius: '14px',
                        padding: '18px',
                        color: '#48688E',
                        fontSize: '14px',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {laporan.deskripsi}
                    </div>
                  </div>

                  {/* TOMBOL KHUSUS PETUGAS */}
                  {role === 'petugas' && (
                    <div style={{ marginTop: '26px' }}>
                      {laporan.status === 'Selesai' ? (
                        <div
                          style={{
                            background: '#EAF8F1',
                            border: '1px solid #CBEFDD',
                            borderRadius: '14px',
                            padding: '16px',
                            textAlign: 'center',
                            color: '#288263',
                            fontWeight: 700,
                          }}
                        >
                          <IonIcon
                            icon={checkmarkCircleOutline}
                            style={{
                              fontSize: '20px',
                              verticalAlign: 'middle',
                              marginRight: '8px',
                            }}
                          />
                          Laporan Ini Sudah Ditangani
                        </div>
                      ) : (
                        <IonButton
                          expand="block"
                          onClick={handleTandaiSelesai}
                          disabled={loading}
                          style={{
                            '--background': BLUE,
                            '--background-hover': '#5B8DD5',
                            '--color': '#FFFFFF',
                            '--border-radius': '12px',
                            height: '52px',
                            fontWeight: 700,
                            margin: 0,
                          } as React.CSSProperties}
                        >
                          <IonIcon
                            slot="start"
                            icon={checkmarkCircleOutline}
                          />
                          {loading
                            ? 'Menyimpan...'
                            : 'Tandai Laporan Selesai'}
                        </IonButton>
                      )}
                    </div>
                  )}
                </IonCardContent>
              </IonCard>

              {/* CATATAN */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '18px 8px',
                  color: '#8297B1',
                  fontSize: '12px',
                }}
              >
                <IonIcon
                  icon={informationCircleOutline}
                  style={{
                    fontSize: '20px',
                    color: BLUE,
                    flexShrink: 0,
                  }}
                />
                Status laporan ditampilkan berdasarkan
                data yang tersedia di sistem.
              </div>
            </>
          ) : (
            <IonCard
              style={{
                borderRadius: '20px',
                background: '#FFFFFF',
                margin: 0,
              }}
            >
              <IonCardContent
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                }}
              >
                <IonIcon
                  icon={documentTextOutline}
                  style={{
                    fontSize: '48px',
                    color: BLUE,
                  }}
                />

                <h2 style={{ color: DARK }}>
                  Laporan Tidak Ditemukan
                </h2>

                <p style={{ color: '#8297B1' }}>
                  Data laporan tidak ditemukan.
                </p>

                <IonButton
                  routerLink="/home"
                  style={{
                    '--background': BLUE,
                    '--border-radius': '10px',
                  } as React.CSSProperties}
                >
                  Kembali ke Home
                </IonButton>
              </IonCardContent>
            </IonCard>
          )}
        </div>

        {/* NOTIFIKASI */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default Detail;
