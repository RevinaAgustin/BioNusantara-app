<?php

namespace App\Services\Admin;

use App\Models\Species;

class SpeciesService
{
    /**
     * Mengambil semua data spesies untuk ditampilkan di index.
     */
<<<<<<< HEAD
    public function getAllSpecies()
    {
        return Species::latest()->get();
    }
=======
public function getAllSpecies($search = null, $category = null)
{
    return \App\Models\Species::query()
        // Gunakan fungsi closure (grouping) untuk pencarian
        ->when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('scientific_name', 'like', "%{$search}%")
                  ->orWhere('common_name', 'like', "%{$search}%");
            });
        })
        ->when($category, function ($query, $category) {
            $query->where('category', $category);
        })
        ->latest()
        ->get();
}
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36

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
<<<<<<< HEAD
        return $species->delete();
    }
}
=======

        return $species->delete();
    }
}
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
