import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Hotel, Props } from "../types/types";
import { API_BASE_URL } from "../config";

const HotelModal: React.FC<Props> = ({ show, handleClose, hotel, setHoteles, hoteles }) => {
  const [hotelData, setHotelData] = useState<Partial<Hotel>>({});

  useEffect(() => {
    if (hotel) {
      setHotelData(hotel);
    } else {
      setHotelData({});
    }
  }, [hotel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = hotel ? `${API_BASE_URL}/api/hoteles/${hotel.id}` : `${API_BASE_URL}/api/hoteles`;
    const method = hotel ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hotelData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (hotel) {
          setHoteles(hoteles.map((h) => (h.id === data.hotel.id ? data.hotel : h)));
        } else {
          setHoteles([...hoteles, data.hotel]);
        }
        handleClose();
      })
      .catch((error) => console.error("Error guardando hotel:", error));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{hotel ? "Editar Hotel" : "Agregar Hotel"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" value={hotelData.nombre || ""} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" name="direccion" value={hotelData.direccion || ""} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control type="text" name="ciudad" value={hotelData.ciudad || ""} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>NIT</Form.Label>
            <Form.Control type="text" name="nit" value={hotelData.nit || ""} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Número de Habitaciones</Form.Label>
            <Form.Control type="number" name="numero_habitaciones" value={hotelData.numero_habitaciones || ""} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">{hotel ? "Actualizar" : "Guardar"}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default HotelModal;
