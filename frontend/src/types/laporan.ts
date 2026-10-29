export interface Laporan {
  id: string;
  nama: string;
  lokasi: string;
  kategori: string;
  deskripsi: string;
  tanggal: string;
  status: 'Sedang Diproses' | 'Selesai';
}