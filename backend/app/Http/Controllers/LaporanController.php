<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function index()
    {
        $laporan = Laporan::orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Berhasil mengambil data laporan',
            'data' => $laporan
        ], 200);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Menunggu,Sedang Diproses,Selesai'
        ]);

        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'message' => 'Data laporan tidak ditemukan'
            ], 404);
        }

        $laporan->status = $request->input('status');
        $laporan->save();

        return response()->json([
            'message' => 'Status laporan berhasil diperbarui',
            'data' => $laporan
        ], 200);
    }

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
            'user_id' => $request->user() ? $request->user()->id : null,
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
}
