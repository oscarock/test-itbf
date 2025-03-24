import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import HotelModal from "./HotelModal";
import HabitacionModal from "./HabitacionModal";
import DetalleHotelModal from "./DetalleHotelModal";
import { Hotel } from "../types/types";
import { API_BASE_URL } from "../config";

const HotelList = () => {
  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showHabitacionModal, setShowHabitacionModal] = useState(false);
  const [showDetalleModal, setShowDetalleModal] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/hoteles`)
      .then((response) => response.json())
      .then((data) => {
        setHoteles(data.hoteles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hoteles:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar este hotel?")) {
      fetch(`${API_BASE_URL}/api/hoteles/${id}`, { method: "DELETE" })
        .then(() => setHoteles(hoteles.filter((hotel) => hotel.id !== id)))
        .catch((error) => console.error("Error eliminando hotel:", error));
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Lista de Hoteles</h2>
      <Button className="mb-3" onClick={() => setShowHotelModal(true)}>Agregar Hotel</Button>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>NIT</th>
              <th>Habitaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {hoteles.map((hotel, index) => (
              <tr key={hotel.id}>
                <td>{index + 1}</td>
                <td>{hotel.nombre}</td>
                <td>{hotel.direccion}</td>
                <td>{hotel.ciudad}</td>
                <td>{hotel.nit}</td>
                <td>{hotel.numero_habitaciones}</td>
                <td>
                  <Button variant="primary" className="m-1" size="sm" onClick={() => { setSelectedHotel(hotel); setShowDetalleModal(true); }}>Ver Detalles</Button>
                  <Button variant="success" className="m-1" size="sm" onClick={() => { setSelectedHotel(hotel); setShowHabitacionModal(true); }}>Agregar Habitación</Button>
                  <Button variant="info" className="m-1" size="sm" onClick={() => { setSelectedHotel(hotel); setShowHotelModal(true); }}>Editar</Button>
                  <Button variant="danger" className="m-1" size="sm" onClick={() => handleDelete(hotel.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      
      <HotelModal show={showHotelModal} handleClose={() => setShowHotelModal(false)} hotel={selectedHotel} setHoteles={setHoteles} hoteles={hoteles} />
      <HabitacionModal show={showHabitacionModal} handleClose={() => setShowHabitacionModal(false)} hotel={selectedHotel} setHoteles={setHoteles} hoteles={hoteles} />
      <DetalleHotelModal show={showDetalleModal} handleClose={() => setShowDetalleModal(false)} hotel={selectedHotel} />
    </Container>
  );
};

export default HotelList;
