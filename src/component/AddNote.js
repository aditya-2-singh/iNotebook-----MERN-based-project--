import React, { useContext, useState } from "react";
import noteContext from "./noteContext";

const AddNote = () => {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "", image: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag, note.image);
        setNote({ title: "", description: "", tag: "", image: "" });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onloadend = () => {
            setNote({ ...note, image: reader.result }); // Convert image to Base64
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        name="title" 
                        value={note.title} 
                        onChange={onChange} 
                        minLength={5} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="description" 
                        name="description" 
                        value={note.description} 
                        onChange={onChange} 
                        minLength={5} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="tag" 
                        name="tag" 
                        value={note.tag} 
                        onChange={onChange} 
                    />
                </div>
                <button 
                    disabled={note.title.length < 5 || note.description.length < 5} 
                    type="submit" 
                    className="btn btn-primary" 
                    onClick={handleClick}>
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNote;
