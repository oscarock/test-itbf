<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Habitacion extends Model
{
    use HasFactory;

    protected $table = "habitaciones";
    protected $fillable = ['hotel_id', 'tipo', 'acomodacion', 'cantidad'];

    public function hotel() {
        return $this->belongsTo(Hotel::class);
    }
}
