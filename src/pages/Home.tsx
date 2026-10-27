
import React, { useState, useContext } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardContent, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonButton, IonToast,
  IonBadge, IonGrid, IonRow, IonCol, IonIcon,
  IonList, IonChip, useIonRouter,
} from '@ionic/react';

import {
  documentTextOutline, sendOutline, businessOutline,
  personOutline, locationOutline, listOutline,
  statsChartOutline, checkmarkCircleOutline,
  timeOutline, chevronForwardOutline,
  sparklesOutline, addCircleOutline,
} from 'ionicons/icons';

import { LaporanContext } from '../context/LaporanContext';

const BLUE = '#6B9FE8';
const DARK = '#284D85';
const LIGHT = '#F2F7FF';

const Home: React.FC = () => {
  const router = useIonRouter();
  const { laporanList, tambahLaporan } = useContext(LaporanContext);

  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [kategori, setKategori] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<
    'success' | 'danger'
  >('success');
  const [loading, setLoading] = useState(false);

  const totalLaporan = laporanList.length;
  const laporanSelesai = laporanList.filter(
    (item) => item.status === 'Selesai'
  ).length;
  const laporanPending = totalLaporan - laporanSelesai;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim() || !lokasi.trim() ||
        !kategori || !deskripsi.trim()) {
      setToastMessage('Mohon isi seluruh form pengaduan!');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    setLoading(true);

    try {
      // Tetap menggunakan fungsi dari LaporanContext
      const hasil = await tambahLaporan({
        nama, lokasi, kategori, deskripsi,
      });

      if (hasil === false) {
        setToastMessage('Gagal mengirim laporan.');
        setToastColor('danger');
      } else {
        setNama('');
        setLokasi('');
        setKategori('');
        setDeskripsi('');
        setToastMessage('Laporan berhasil dikirim ke tim Sarpras!');
        setToastColor('success');
      }

      setShowToast(true);
    } catch (error) {
      console.error('Gagal mengirim laporan:', error);
      setToastMessage('Gagal mengirim laporan.');
      setToastColor('danger');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const cardStyle: React.CSSProperties = {
    margin: 0,
    borderRadius: '20px',
    background: '#FFFFFF',
    boxShadow: '0 8px 28px rgba(40,77,133,0.07)',
    border: '1px solid #E4EEFC',
  };

  const fieldStyle = {
    '--background': '#F7FAFF',
    '--border-color': '#DCE9FA',
    '--highlight-color-focused': BLUE,
    '--border-radius': '12px',
    marginBottom: '14px',
    color: DARK,
  } as React.CSSProperties;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar
          style={{
            '--background': '#FFFFFF',
            '--color': DARK,
            '--padding-top': '8px',
            '--padding-bottom': '8px',
          } as React.CSSProperties}
        >
          <IonTitle style={{ fontWeight: 800, letterSpacing: '0.5px' }}>
            <IonIcon
              icon={sparklesOutline}
              style={{
                color: BLUE,
                marginRight: '8px',
                verticalAlign: 'middle',
              }}
            />
            BERINGIN SMART
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        style={{
          '--background': LIGHT,
        } as React.CSSProperties}
      >
        <IonGrid fixed style={{ padding: '20px 14px 40px' }}>
          {/* BANNER SELAMAT DATANG */}
          <IonRow>
            <IonCol size="12">
              <div
                style={{
                  background:
                    'linear-gradient(120deg, #6B9FE8, #A9C9F0)',
                  borderRadius: '24px',
                  padding: '28px',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                  boxShadow:
                    '0 12px 28px rgba(107,159,232,0.20)',
                }}
              >
                <IonChip
                  style={{
                    '--background': 'rgba(255,255,255,0.20)',
                    '--color': '#FFFFFF',
                    margin: '0 0 12px',
                  } as React.CSSProperties}
                >
                  <IonIcon icon={sparklesOutline} />
                  Portal Pengaduan Sarpras
                </IonChip>

                <h1
                  style={{
                    fontSize: 'clamp(23px, 4vw, 32px)',
                    fontWeight: 800,
                    margin: '0 0 10px',
                  }}
                >
                  Selamat Datang!
                </h1>

                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.7,
                    maxWidth: '530px',
                    fontSize: '14px',
                    color: '#FFFFFF',
                  }}
                >
                  Laporkan kendala fasilitas sekolah dengan
                  mudah dan pantau perkembangannya melalui
                  Beringin Smart.
                </p>
              </div>
            </IonCol>
          </IonRow>

          {/* STATISTIK */}
          <IonRow>
            {[
              {
                title: 'Total Pengaduan',
                value: totalLaporan,
                icon: statsChartOutline,
                color: BLUE,
                bg: '#EAF2FF',
              },
              {
                title: 'Dalam Proses',
                value: laporanPending,
                icon: timeOutline,
                color: '#D6A34C',
                bg: '#FFF6E5',
              },
              {
                title: 'Selesai Ditangani',
                value: laporanSelesai,
                icon: checkmarkCircleOutline,
                color: '#48A987',
                bg: '#E8F8F1',
              },
            ].map((stat) => (
              <IonCol size="12" sizeMd="4" key={stat.title}>
                <IonCard style={cardStyle}>
                  <IonCardContent
                    style={{
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                  >
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '16px',
                        background: stat.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IonIcon
                        icon={stat.icon}
                        style={{
                          color: stat.color,
                          fontSize: '27px',
                        }}
                      />
                    </div>

                    <div>
                      <p
                        style={{
                          margin: '0 0 5px',
                          fontSize: '12px',
                          color: '#7890AE',
                        }}
                      >
                        {stat.title}
                      </p>
                      <h2
                        style={{
                          margin: 0,
                          color: DARK,
                          fontSize: '27px',
                          fontWeight: 800,
                        }}
                      >
                        {stat.value}
                      </h2>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>

          {/* FORM DAN DAFTAR */}
          <IonRow style={{ marginTop: '20px' }}>
            <IonCol size="12" sizeLg="5">
              <IonCard style={cardStyle}>
                <IonCardContent style={{ padding: '24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '22px',
                    }}
                  >
                    <div
                      style={{
                        background: '#EAF2FF',
                        borderRadius: '14px',
                        padding: '12px',
                      }}
                    >
                      <IonIcon
                        icon={addCircleOutline}
                        style={{
                          fontSize: '25px',
                          color: BLUE,
                        }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          color: BLUE,
                          fontSize: '11px',
                          fontWeight: 700,
                          margin: '0 0 4px',
                          letterSpacing: '1px',
                        }}
                      >
                        FORM PENGADUAN SARPRAS
                      </p>
                      <h2
                        style={{
                          color: DARK,
                          fontWeight: 800,
                          fontSize: '20px',
                          margin: 0,
                        }}
                      >
                        Buat Tiket Laporan
                      </h2>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <IonInput
                      fill="outline"
                      label="Nama Pelapor"
                      labelPlacement="floating"
                      placeholder="Masukkan nama lengkap"
                      value={nama}
                      onIonInput={(e) =>
                        setNama(e.detail.value || '')
                      }
                      style={fieldStyle}
                    >
                      <IonIcon slot="start" icon={personOutline} />
                    </IonInput>

                    <IonInput
                      fill="outline"
                      label="Lokasi / Ruangan"
                      labelPlacement="floating"
                      placeholder="Contoh: Lab PPLG 1"
                      value={lokasi}
                      onIonInput={(e) =>
                        setLokasi(e.detail.value || '')
                      }
                      style={fieldStyle}
                    >
                      <IonIcon slot="start" icon={locationOutline} />
                    </IonInput>

                    <IonSelect
                      fill="outline"
                      label="Kategori Laporan"
                      labelPlacement="floating"
                      value={kategori}
                      placeholder="Pilih Kategori"
                      onIonChange={(e) =>
                        setKategori(e.detail.value)
                      }
                      style={fieldStyle}
                    >
                      <IonIcon slot="start" icon={listOutline} />
                      <IonSelectOption value="Fasilitas Kelas">
                        Fasilitas Kelas
                      </IonSelectOption>
                      <IonSelectOption value="Laboratorium">
                        Laboratorium
                      </IonSelectOption>
                      <IonSelectOption value="Lingkungan/Taman">
                        Lingkungan/Taman
                      </IonSelectOption>
                    </IonSelect>

                    <IonTextarea
                      fill="outline"
                      label="Deskripsi Masalah"
                      labelPlacement="floating"
                      rows={4}
                      placeholder="Jelaskan kendala secara rinci..."
                      value={deskripsi}
                      onIonInput={(e) =>
                        setDeskripsi(e.detail.value || '')
                      }
                      style={fieldStyle}
                    >
                      <IonIcon
                        slot="start"
                        icon={documentTextOutline}
                      />
                    </IonTextarea>

                    <IonButton
                      expand="block"
                      type="submit"
                      disabled={loading}
                      style={{
                        '--background': BLUE,
                        '--background-hover': '#5B8DD5',
                        '--border-radius': '12px',
                        '--color': '#FFFFFF',
                        height: '52px',
                        fontWeight: 700,
                        marginTop: '12px',
                      } as React.CSSProperties}
                    >
                      <IonIcon slot="start" icon={sendOutline} />
                      {loading ? 'Mengirim...' : 'Kirim Laporan'}
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* DAFTAR LAPORAN */}
            <IonCol size="12" sizeLg="7">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 4px 16px',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '21px',
                      fontWeight: 800,
                      color: DARK,
                      margin: '0 0 5px',
                    }}
                  >
                    Daftar Laporan Terkini
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: '#7890AE',
                      fontSize: '12px',
                    }}
                  >
                    Pantau perkembangan laporan fasilitas
                  </p>
                </div>
                <IonChip
                  style={{
                    '--background': '#E5F0FF',
                    '--color': DARK,
                    fontWeight: 600,
                  } as React.CSSProperties}
                >
                  Realtime Sync
                </IonChip>
              </div>

              <IonList style={{ background: 'transparent' }}>
                {laporanList.map((item) => (
                  <IonCard
                    key={item.id}
                    button
                    onClick={() =>
                      router.push(`/detail/${item.id}`)
                    }
                    style={{
                      ...cardStyle,
                      marginBottom: '14px',
                    }}
                  >
                    <IonCardContent style={{ padding: '20px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '10px',
                        }}
                      >
                        <div>
                          <IonBadge
                            style={{
                              '--background': '#EAF2FF',
                              '--color': DARK,
                              padding: '7px 10px',
                              borderRadius: '8px',
                              marginBottom: '10px',
                            } as React.CSSProperties}
                          >
                            <IonIcon
                              icon={businessOutline}
                              style={{
                                marginRight: '5px',
                                verticalAlign: 'middle',
                              }}
                            />
                            {item.kategori}
                          </IonBadge>

                          <h3
                            style={{
                              fontSize: '18px',
                              fontWeight: 750,
                              color: DARK,
                              margin: '0',
                            }}
                          >
                            {item.lokasi}
                          </h3>
                        </div>

                        <IonBadge
                          color={
                            item.status === 'Selesai'
                              ? 'success'
                              : item.status === 'Sedang Diproses'
                              ? 'primary'
                              : 'warning'
                          }
                          style={{
                            padding: '7px 10px',
                            borderRadius: '8px',
                            flexShrink: 0,
                          }}
                        >
                          {item.status}
                        </IonBadge>
                      </div>

                      <div
                        style={{
                          height: '1px',
                          background: '#E7EFFB',
                          margin: '16px 0',
                        }}
                      />

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          color: '#7890AE',
                          fontSize: '12px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span>
                          Pelapor: <strong>{item.nama}</strong>
                        </span>
                        <span>
                          {item.tanggal ||
                            (item as any).created_at?.split('T')[0] ||
                            '-'}
                        </span>
                        <IonIcon
                          icon={chevronForwardOutline}
                          style={{ color: BLUE, fontSize: '18px' }}
                        />
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}

                {laporanList.length === 0 && (
                  <div
                    style={{
                      ...cardStyle,
                      padding: '35px 20px',
                      textAlign: 'center',
                    }}
                  >
                    <IonIcon
                      icon={documentTextOutline}
                      style={{
                        fontSize: '40px',
                        color: BLUE,
                      }}
                    />
                    <p style={{ color: '#7890AE' }}>
                      Belum ada laporan yang ditampilkan.
                    </p>
                  </div>
                )}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2500}
          color={toastColor}
          icon={checkmarkCircleOutline}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
