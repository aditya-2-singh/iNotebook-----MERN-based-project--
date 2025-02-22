import React, { useContext } from "react";
import noteContext from "./noteContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Noteitem = ({ note, updateNote }) => {
    const { deleteNote } = useContext(noteContext);

    return (
        <div className="col-md-3">
            <div className="card my-3 shadow-sm p-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <button className="btn btn-sm btn-outline-primary mx-1" 
                                    onClick={() => updateNote(note)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger mx-1" 
                                    onClick={() => deleteNote(note._id)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                    {note.image && <img src={note.image} alt="Note" style={{ width: "100px" }} />}
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
