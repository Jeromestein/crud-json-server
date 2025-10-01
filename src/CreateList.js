import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function CreateList(props) {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleClose = () => {
    setShow(false);
    setIsSubmitting(false);
    if (props.isEditing && props.onCancel) {
      props.onCancel();
    }
  };
  
  const handleShow = () => setShow(true);

  // Auto-open modal when in editing mode
  React.useEffect(() => {
    if (props.isEditing && !show) {
      setShow(true);
    }
  }, [props.isEditing, show]);

  const handleCreate = async () => {
    if (!props.singledata.title.trim() || !props.singledata.author.trim()) {
      alert("Please fill in both title and author fields.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await props.handleCreate();
      handleClose();
    } catch (error) {
      console.error("Error creating book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      {!props.isEditing && (
        <Button 
          variant="success" 
          onClick={handleShow}
          className="d-flex align-items-center"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Book
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className={props.isEditing ? "bg-warning text-dark" : "bg-success text-white"}>
          <Modal.Title>
            <i className={props.isEditing ? "bi bi-pencil-square me-2" : "bi bi-book-plus me-2"}></i>
            {props.isEditing ? "Edit Book" : "Add New Book"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title"
                name="title"
                value={props.singledata.title}
                onChange={props.handleChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                name="author"
                value={props.singledata.author}
                onChange={props.handleChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            variant={props.isEditing ? "warning" : "success"}
            onClick={handleCreate}
            disabled={isSubmitting || !props.singledata.title.trim() || !props.singledata.author.trim()}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {props.isEditing ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>
                <i className={props.isEditing ? "bi bi-check-circle me-2" : "bi bi-check-circle me-2"}></i>
                {props.isEditing ? "Update Book" : "Add Book"}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default CreateList;
