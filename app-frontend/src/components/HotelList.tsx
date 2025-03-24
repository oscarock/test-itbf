import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Modal, Form } from "react-bootstrap";

interface Hotel {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  nit: string;
  numero_habitaciones: number;
  habitaciones?: Habitacion[];
}

interface Habitacion {
  id: number;
  tipo: string;
  acomodacion: string;
  cantidad: number;
}

const tiposHabitacion = ["Estandar", "Junior", "Suite"];
const acomodacionesPorTipo: { [key: string]: string[] } = {
  "Estándar": ["Sencilla", "Doble"],
  "Junior": ["Triple", "Cuadruple"],
  "Suite": ["Sencilla", "Doble", "Triple"],
};

const HotelList = () => {
  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hotelData, setHotelData] = useState<Partial<Hotel>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showHabitacionModal, setShowHabitacionModal] = useState(false);
  const [habitacionData, setHabitacionData] = useState<Partial<Habitacion>>({});


  useEffect(() => {
    fetch("http://localhost:85/api/hoteles")
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

  const handleShowModal = (hotel?: Hotel) => {
    if (hotel) {
      setHotelData(hotel);
      setIsEditing(true);
    } else {
      setHotelData({});
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setHotelData({});
    setIsEditing(false);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedHotel(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleShowHabitacionModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowHabitacionModal(true);
  };

  const handleCloseHabitacionModal = () => {
    setShowHabitacionModal(false);
    setHabitacionData({});
  };

  const handleShowDetailModal = (hotel: Hotel) => {
    fetch(`http://localhost:85/api/hoteles/${hotel.id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedHotel(data.hotel);
        setShowDetailModal(true);
      })
      .catch((error) => console.error("Error fetching hotel details:", error));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:85/api/hoteles/${hotelData.id}`
      : "http://localhost:85/api/hoteles";
    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hotelData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (isEditing) {
          setHoteles(hoteles.map((hotel) => (hotel.id === data.hotel.id ? data.hotel : hotel)));
        } else {
          setHoteles([...hoteles, data.hotel]);
        }
        handleCloseModal();
      })
      .catch((error) => console.error("Error guardando hotel:", error));
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar este hotel?")) {
      fetch(`http://localhost:85/api/hoteles/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          setHoteles(hoteles.filter((hotel) => hotel.id !== id));
        })
        .catch((error) => console.error("Error eliminando hotel:", error));
    }
  };


  const handleChangeHabitacion = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target as HTMLInputElement;
    setHabitacionData((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmitHabitacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotel) return;

    fetch(`http://localhost:85/api/hoteles/${selectedHotel.id}/habitaciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitacionData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedHotel({
          ...selectedHotel,
          habitaciones: [...(selectedHotel.habitaciones || []), data.habitacion],
        });
        setHabitacionData({ tipo: "", acomodacion: "" });
        setShowHabitacionModal(false);
      })
      .catch((error) => console.error("Error agregando habitación:", error));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Lista de Hoteles</h2>
      <Button className="mb-3" onClick={() => handleShowModal()}>Agregar Hotel</Button>
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
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleShowDetailModal(hotel)}>
                    Ver Detalles
                  </Button>
                  <Button variant="success" size="sm" className="me-2" onClick={() => handleShowHabitacionModal(hotel)}>
                    Agregar Habitación
                  </Button>
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleShowModal(hotel)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(hotel.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      
      {/* Modal para agregar/editar hotel */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Editar Hotel" : "Agregar Hotel"}</Modal.Title>
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
            <Button variant="primary" type="submit">{isEditing ? "Actualizar" : "Guardar"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    
     {/* Modal de Detalles del Hotel */}
     <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedHotel && (
            <>
              <p><strong>Nombre:</strong> {selectedHotel.nombre}</p>
              <p><strong>Dirección:</strong> {selectedHotel.direccion}</p>
              <p><strong>Ciudad:</strong> {selectedHotel.ciudad}</p>
              <p><strong>NIT:</strong> {selectedHotel.nit}</p>
              <p><strong>Número de Habitaciones:</strong> {selectedHotel.numero_habitaciones}</p>
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
                  {selectedHotel.habitaciones && selectedHotel.habitaciones.length > 0 ? (
                    selectedHotel.habitaciones.map((habitacion) => (
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

      {/* Modal de Agregar Habitación */}
      <Modal show={showHabitacionModal} onHide={() => setShowHabitacionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Habitación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitHabitacion}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Select name="tipo" value={habitacionData.tipo} onChange={handleChangeHabitacion} required>
                <option value="">Seleccione un tipo</option>
                {tiposHabitacion.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Acomodación</Form.Label>
              <Form.Select name="acomodacion" value={habitacionData.acomodacion} onChange={handleChangeHabitacion} required disabled={!habitacionData.tipo}>
                <option value="">Seleccione una acomodación</option>
                {habitacionData.tipo && acomodacionesPorTipo[habitacionData.tipo].map((acomodacion) => (
                  <option key={acomodacion} value={acomodacion}>{acomodacion}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="number" name="cantidad" value={habitacionData.cantidad} onChange={handleChangeHabitacion} required />
            </Form.Group>
            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
    
  );
};

export default HotelList;
