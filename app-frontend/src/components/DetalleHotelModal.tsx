import React from "react";
import { Modal, Table, Button } from "react-bootstrap";

interface Hotel {
  nombre: string;
  direccion: string;
  ciudad: string;
  nit: string;
  numero_habitaciones: number;
  habitaciones?: any[];
}

interface Props {
  show: boolean;
  handleClose: () => void;
  hotel?: Hotel | null;
}

const DetalleHotelModal: React.FC<Props> = ({ show, handleClose, hotel }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Detalles del Hotel</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {hotel && (
        <>
          <p><strong>Nombre:</strong> {hotel.nombre}</p>
          <p><strong>Dirección:</strong> {hotel.direccion}</p>
          <p><strong>Ciudad:</strong> {hotel.ciudad}</p>
          <p><strong>NIT:</strong> {hotel.nit}</p>
          <p><strong>Número de Habitaciones:</strong> {hotel.numero_habitaciones}</p>
          <h5>Habitaciones:</h5>
          <Table striped bordered>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Acomodación</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {hotel.habitaciones && hotel.habitaciones.length > 0 ? (
                    hotel.habitaciones.map((habitacion) => (
                      <tr key={habitacion.id}>
                        <td>{habitacion.tipo}</td>
                        <td>{habitacion.acomodacion}</td>
                        <td>{habitacion.cantidad}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">No hay habitaciones registradas</td>
                    </tr>
                  )}
                </tbody>
              </Table>
        </>
      )}
    </Modal.Body>
  </Modal>
);

export default DetalleHotelModal;