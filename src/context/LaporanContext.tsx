
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import api from '../services/api';
import { Laporan } from '../types/laporan';

interface LaporanContextType {
  laporanList: Laporan[];
  tambahLaporan: (data: Partial<Laporan>) => Promise<boolean>;
  getLaporanById: (id: string) => Laporan | undefined;
  ubahStatusLaporan: (
    id: string,
    status: string
  ) => Promise<boolean>;
  refreshLaporan: () => void;
}

export const LaporanContext =
  createContext<LaporanContextType>(
    {} as LaporanContextType
  );

export const LaporanProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [laporanList, setLaporanList] = useState<Laporan[]>([]);

  // Mengambil data laporan dari Laravel
  const fetchLaporan = useCallback(async () => {
    try {
      const response = await api.get('/laporan');

      const data = response.data.data;

      if (Array.isArray(data)) {
        setLaporanList(data);
      } else {
        setLaporanList([]);
      }
    } catch (error) {
      console.error(
        'Gagal mengambil data laporan:',
        error
      );
    }
  }, []);

  // Mengambil laporan saat aplikasi dibuka
  useEffect(() => {
    fetchLaporan();
  }, [fetchLaporan]);

  // Menambahkan laporan baru
  const tambahLaporan = async (
    data: Partial<Laporan>
  ): Promise<boolean> => {
    try {
      await api.post('/laporan', data);

      // Memperbarui daftar laporan
      await fetchLaporan();

      return true;
    } catch (error) {
      console.error(
        'Gagal menambahkan laporan:',
        error
      );

      return false;
    }
  };

  // Mencari laporan berdasarkan ID
  const getLaporanById = (
    id: string
  ): Laporan | undefined => {
    return laporanList.find(
      (item) => String(item.id) === String(id)
    );
  };

  // Mengubah status laporan
  const ubahStatusLaporan = async (
    id: string,
    status: string
  ): Promise<boolean> => {
    try {
      await api.patch(
        `/laporan/${id}/status`,
        { status }
      );

      // Memperbarui data setelah status berubah
      await fetchLaporan();

      return true;
    } catch (error) {
      console.error(
        'Gagal mengubah status laporan:',
        error
      );

      return false;
    }
  };

  // Refresh laporan
  const refreshLaporan = () => {
    void fetchLaporan();
  };

  return (
    <LaporanContext.Provider
      value={{
        laporanList,
        tambahLaporan,
        getLaporanById,
        ubahStatusLaporan,
        refreshLaporan,
      }}
    >
      {children}
    </LaporanContext.Provider>
  );
};

// Hook untuk menggunakan data laporan
export const useLaporan = () => {
  return useContext(LaporanContext);
};
