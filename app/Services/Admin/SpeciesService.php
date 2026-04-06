<?php

namespace App\Services\Admin;

use App\Models\Species;

class SpeciesService
{
    /**
     * Mengambil semua data spesies untuk ditampilkan di index.
     */
    public function getAllSpecies()
    {
        return Species::latest()->get();
    }

    /**
     * Logika untuk menyimpan spesies baru.
     */
    public function createSpecies(array $data)
    {
        return Species::create($data);
    }

    /**
     * Logika untuk menghapus spesies.
     */
    public function deleteSpecies(int $id)
    {
        $species = Species::findOrFail($id);

        return $species->delete();
    }
}
