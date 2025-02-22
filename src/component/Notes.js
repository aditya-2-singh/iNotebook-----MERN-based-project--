import React, { useContext, useEffect, useState, useCallback } from "react";
import noteContext from "./noteContext";
import Noteitem from "./Noteitem";
import { Modal, Button, Form } from "react-bootstrap";
import AddNote from "./AddNote";
import "bootstrap/dist/css/bootstrap.min.css";

const Notes = () => {
    const { notes, getNotes, editNote } = useContext(noteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const [showModal, setShowModal] = useState(false);
    const [originalNote, setOriginalNote] = useState(null); // Store original note for comparison

    // Fetch notes when component mounts
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        }
    }, [getNotes]);

    // Function to open the edit modal
    const updateNote = (currentNote) => {
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
        setOriginalNote(currentNote); // Store original note for comparison
        setShowModal(true);
    };

    // Function to handle saving the edited note
    const handleSave = () => {
        if (
            note.etitle.trim().length < 5 || 
            note.edescription.trim().length < 5 ||
            (originalNote.title === note.etitle &&
             originalNote.description === note.edescription &&
             originalNote.tag === note.etag) // Prevent unnecessary API calls
        ) {
            return;
        }

        editNote(note.id, note.etitle, note.edescription, note.etag);
        setShowModal(false);
    };

    // Reset modal when closed
    const handleCloseModal = () => {
        setShowModal(false);
        setNote({ id: "", etitle: "", edescription: "", etag: "" });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote />

            {/* Bootstrap Modal for Editing Notes */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="etitle" 
                                value={note.etitle} 
                                onChange={onChange} 
                                minLength={5} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                name="edescription" 
                                rows={3} 
                                value={note.edescription} 
                                onChange={onChange} 
                                minLength={5} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tag</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="etag" 
                                value={note.etag} 
                                onChange={onChange} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSave} 
                        disabled={!note.etitle.trim() || note.etitle.length < 5 || !note.edescription.trim() || note.edescription.length < 5}
                    >
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => (
                    <Noteitem key={note._id} updateNote={updateNote} note={note} />
                ))}
            </div>
        </>
    );
};

export default Notes;
