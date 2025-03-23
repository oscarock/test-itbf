<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hotel extends Model
{
    use HasFactory;

    protected $table = "hoteles";
    protected $fillable = ['nombre', 'direccion', 'ciudad', 'nit', 'numero_habitaciones'];

    public function habitaciones() {
        return $this->hasMany(Habitacion::class);
    }
}
