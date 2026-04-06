<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Tambahkan baris ini untuk mematikan foreign key check di SQLite
        if (config('database.default') === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = OFF');
        }
    }
}
