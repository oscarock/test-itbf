<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Habitacion;
use App\Models\Hotel;

class HabitacionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $hotel_id)
    {
        $hotel = Hotel::findOrFail($hotel_id);
        $validated = $request->validate([
            'tipo' => 'required|in:Estandar,Junior,Suite',
            'acomodacion' => 'required',
            'cantidad' => 'required|integer|min:1'
        ]);
        
        $valid_acomodaciones = [
            'Estandar' => ['Sencilla', 'Doble'],
            'Junior' => ['Triple', 'Cuadruple'],
            'Suite' => ['Sencilla', 'Doble', 'Triple']
        ];
        
        if (!in_array($validated['acomodacion'], $valid_acomodaciones[$validated['tipo']])) {
            return response()->json(['error' => 'Acomodación inválida para el tipo de habitación'], 422);
        }
        
        $total_habitaciones = $hotel->habitaciones()->sum('cantidad') + $validated['cantidad'];
        if ($total_habitaciones > $hotel->numero_habitaciones) {
            return response()->json(['error' => 'La cantidad de habitaciones supera el límite del hotel'], 422);
        }
        
        $exists = $hotel->habitaciones()->where('tipo', $validated['tipo'])->where('acomodacion', $validated['acomodacion'])->exists();
        if ($exists) {
            return response()->json(['error' => 'Ya existe una habitación con este tipo y acomodación en el hotel'], 422);
        }
        
        $habitacion = $hotel->habitaciones()->create($validated);
        return response()->json(['message' => 'Habitación añadida exitosamente', 'habitacion' => $habitacion], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $habitacion = Habitacion::findOrFail($id);
        $habitacion->delete();
        return response()->json(['message' => 'Habitación eliminada exitosamente'], 200);
    }
}
