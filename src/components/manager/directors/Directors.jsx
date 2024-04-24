import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardSubtitle,
  Input,
  Label,
} from "reactstrap";
import "./DirectorStyle.css";

function Directors() {
  const [coordinators, setCoordinators] = useState([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedCoordinator, setEditedCoordinator] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        const coordinatorData = data.filter(
          (user) => user.role === "coordinator"
        );
        setCoordinators(coordinatorData);
      } catch (error) {
        console.error("Error fetching coordinator data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleConfirmModal = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  const showCoordinatorDetails = (coordinator) => {
    setSelectedCoordinator(coordinator);
    setEditedCoordinator({ ...coordinator });
    toggleModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCoordinator((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewImage(reader.result);
    };
  };

  const handleSave = () => {
    toggleConfirmModal();
  };

  const confirmSave = async () => {
    try {
      if (newImage) {
        setEditedCoordinator((prevState) => ({
          ...prevState,
          picture: newImage,
        }));
      }

      const response = await fetch(
        `http://localhost:3001/users/${editedCoordinator.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedCoordinator),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update coordinator");
      }

      const updatedCoordinator = await response.json();
      console.log("Updated coordinator:", updatedCoordinator);

      toggleModal();
    } catch (error) {
      console.error("Error updating coordinator:", error);
    } finally {
      toggleConfirmModal();
    }
  };

  return (
    <div>
      <h2 className="header">Coordinator List</h2>
      <div className="dashboard-content">
        {coordinators.map((coordinator) => (
          <Card key={coordinator.id}>
            <CardBody className="articles-container">
              <CardTitle tag="h2">{coordinator.username}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h3">
                {coordinator.code}
              </CardSubtitle>
              <Button onClick={() => showCoordinatorDetails(coordinator)}>
                Detail
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
      <Modal centered isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Coordinator Details</ModalHeader>
        <ModalBody>
          {selectedCoordinator && (
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                  }}
                  src={editedCoordinator.picture}
                  alt={editedCoordinator.username}
                />
              </div>
              <h4
                style={{
                  marginBottom: "unset",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {selectedCoordinator.code}{" "}
              </h4>
              <Label for="username">
                <strong>Username</strong>
              </Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={editedCoordinator.username || ""}
                onChange={handleInputChange}
              />
              <Label for="email">
                <strong>Email</strong>
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={editedCoordinator.email || ""}
                onChange={handleInputChange}
              />
              <Label for="image">
                <strong>Image</strong>
              </Label>
              <Input
                type="file"
                name="image"
                id="image"
                onChange={handleImageChange}
                required
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={confirmModalOpen} toggle={toggleConfirmModal}>
        <ModalHeader toggle={toggleConfirmModal}>Confirm Save</ModalHeader>
        <ModalBody>Are you sure you want to save changes?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmSave}>
            Save
          </Button>
          <Button color="secondary" onClick={toggleConfirmModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Directors;
