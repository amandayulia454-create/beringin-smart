<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    // 1. READ - Menampilkan semua laporan
    public function index()
    {
        $laporan = Laporan::orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Berhasil mengambil data laporan',
            'data' => $laporan
        ], 200);
    }

    // 2. CREATE - Menambahkan laporan baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pelapor' => 'nullable|string',
            'nama' => 'nullable|string',
            'lokasi' => 'required|string',
            'kategori' => 'required|string',
            'deskripsi' => 'required|string',
        ]);

        $namaPelapor = $request->input('nama_pelapor')
            ?? $request->input('nama')
            ?? 'Anonim';

        $laporan = Laporan::create([
            'user_id' => $request->user()->id,
            'nama' => $namaPelapor,
            'lokasi' => $validated['lokasi'],
            'kategori' => $validated['kategori'],
            'deskripsi' => $validated['deskripsi'],
            'status' => 'Menunggu',
        ]);

        return response()->json([
            'message' => 'Laporan berhasil dibuat',
            'data' => $laporan
        ], 201);
    }

    // 3. UPDATE - Mengedit laporan (khusus petugas)
    public function update(Request $request, $id)
    {
        if (!$this->isPetugas($request)) {
            return response()->json([
                'message' => 'Hanya petugas yang dapat mengedit laporan'
            ], 403);
        }

        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'message' => 'Laporan tidak ditemukan'
            ], 404);
        }

        $validated = $request->validate([
            'lokasi' => 'required|string',
            'kategori' => 'required|string',
            'deskripsi' => 'required|string',
        ]);

        $laporan->update($validated);

        return response()->json([
            'message' => 'Laporan berhasil diperbarui',
            'data' => $laporan
        ], 200);
    }

    // 4. DELETE - Menghapus laporan (khusus petugas)
    public function destroy(Request $request, $id)
    {
        if (!$this->isPetugas($request)) {
            return response()->json([
                'message' => 'Hanya petugas yang dapat menghapus laporan'
            ], 403);
        }

        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'message' => 'Laporan tidak ditemukan'
            ], 404);
        }

        $laporan->delete();

        return response()->json([
            'message' => 'Laporan berhasil dihapus'
        ], 200);
    }

    // 5. UPDATE STATUS - Khusus petugas
    public function updateStatus(Request $request, $id)
    {
        if (!$this->isPetugas($request)) {
            return response()->json([
                'message' => 'Hanya petugas yang dapat mengubah status laporan'
            ], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:Menunggu,Sedang Diproses,Selesai'
        ]);

        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'message' => 'Data laporan tidak ditemukan'
            ], 404);
        }

        $laporan->status = $validated['status'];
        $laporan->save();

        return response()->json([
            'message' => 'Status laporan berhasil diperbarui',
            'data' => $laporan
        ], 200);
    }

    // 6. Memeriksa apakah pengguna adalah petugas
    private function isPetugas(Request $request): bool
    {
        $user = $request->user();

        return $user !== null
            && strtolower(trim((string) $user->role)) === 'petugas';
    }
}
