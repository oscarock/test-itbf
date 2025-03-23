<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hotel;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(['hoteles' => Hotel::with('habitaciones')->get()], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|unique:hoteles',
            'direccion' => 'required',
            'ciudad' => 'required',
            'nit' => 'required|unique:hoteles',
            'numero_habitaciones' => 'required|integer|min:1'
        ]);
        
        $hotel = Hotel::create($validated);
        return response()->json(['message' => 'Hotel creado exitosamente', 'hotel' => $hotel], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $hotel = Hotel::with('habitaciones')->findOrFail($id);
        return response()->json(['hotel' => $hotel], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $hotel = Hotel::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'sometimes|required|unique:hoteles,nombre,' . $id,
            'direccion' => 'sometimes|required',
            'ciudad' => 'sometimes|required',
            'nit' => 'sometimes|required|unique:hoteles,nit,' . $id,
            'numero_habitaciones' => 'sometimes|required|integer|min:1'
        ]);
        $hotel->update($validated);
        return response()->json(['message' => 'Hotel actualizado exitosamente', 'hotel' => $hotel], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->delete();
        return response()->json(['message' => 'Hotel eliminado exitosamente'], 200);
    }
}
