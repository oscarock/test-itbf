<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'direccion', 'ciudad', 'nit', 'numero_habitaciones'];
    
    public function habitaciones() {
        return $this->hasMany(Habitacion::class);
    }
}
