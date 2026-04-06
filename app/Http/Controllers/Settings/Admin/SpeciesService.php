<?php

namespace App\Services\Admin;

use App\Models\Species;

class SpeciesService
{
    public function getAllSpecies()
    {
        return Species::orderBy('category')->get();
    }

    public function createSpecies(array $data)
    {
        return Species::create($data);
    }

    public function updateSpecies($id, array $data)
    {
        $species = Species::findOrFail($id);
        $species->update($data);

        return $species;
    }

    public function deleteSpecies($id)
    {
        return Species::destroy($id);
    }
}
