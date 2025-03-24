import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Habitacion, Props } from "../types/types";
import { API_BASE_URL } from "../config";

const tiposHabitacion = ["Estandar", "Junior", "Suite"];
const acomodacionesPorTipo: { [key: string]: string[] } = {
  "Estandar": ["Sencilla", "Doble"],
  "Junior": ["Triple", "Cuadruple"],
  "Suite": ["Sencilla", "Doble", "Triple"],
};

const HabitacionModal: React.FC<Props> = ({ show, handleClose, hotel, setHoteles, hoteles }) => {
  const [habitacionData, setHabitacionData] = useState<Partial<Habitacion>>({ tipo: "", acomodacion: "", cantidad: 1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHabitacionData((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? parseInt(value, 10) || 1 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotel) return;

    fetch(`${API_BASE_URL}/api/hoteles/${hotel.id}/habitaciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitacionData),
    })
      .then((response) => response.json())
      .then(() => {
        setHoteles([...hoteles]);
        handleClose();
      })
      .catch((error) => console.error("Error agregando habitación:", error));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Habitación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select name="tipo" value={habitacionData.tipo} onChange={handleChange} required>
              <option value="">Seleccione un tipo</option>
              {tiposHabitacion.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Acomodación</Form.Label>
            <Form.Select name="acomodacion" value={habitacionData.acomodacion} onChange={handleChange} required disabled={!habitacionData.tipo}>
              <option value="">Seleccione una acomodación</option>
              {habitacionData.tipo && acomodacionesPorTipo[habitacionData.tipo].map((acomodacion) => (
                <option key={acomodacion} value={acomodacion}>{acomodacion}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control 
              type="number" 
              name="cantidad" 
              value={habitacionData.cantidad} 
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit">Guardar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default HabitacionModal;
