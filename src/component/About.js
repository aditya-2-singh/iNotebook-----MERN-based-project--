import React from 'react';
import './AboutPage.css';
import Navbar from './Navbar';

const AboutPage = () => {
    return (
        <>
        <Navbar />
        <div className="about-container">
            <div className="container mt-5">
                <h1 className="about-title">About QuickNotes</h1>
                <p className="about-description">
                    QuickNotes is a simple and intuitive note-taking application designed to help you capture, organize, and manage your thoughts with ease. Whether you're jotting down quick ideas, organizing to-do lists, or keeping track of important information, QuickNotes is here to help you stay on top of your tasks.
                </p>
                <div className="about-section">
                    <h3 className="section-title">Our Mission</h3>
                    <p className="section-text">
                        Our mission is to provide a user-friendly platform where individuals can seamlessly organize their notes and stay productive. We aim to make note-taking as simple and efficient as possible, so you can focus on what truly matters.
                    </p>
                </div>
                <div className="about-section">
                    <h3 className="section-title">Features</h3>
                    <ul className="features-list">
                        <li className="feature-item">Create, edit, and delete notes with ease</li>
                        <li className="feature-item">Tag your notes for better organization</li>
                        <li className="feature-item">View your notes by categories such as Work, Personal, Ideas, etc.</li>
                        <li className="feature-item">Simple and fast user interface</li>
                        <li className="feature-item">Secure access to your notes through authentication</li>
                    </ul>
                </div>
                <div className="about-section">
                    <h3 className="section-title">How it Works</h3>
                    <p className="section-text">
                        QuickNotes allows you to create, edit, and organize your notes quickly. Each note can be tagged for better categorization, and you can access your notes from anywhere. The app ensures that your notes are securely stored, so you can access them whenever you need.
                    </p>
                </div>
                <div className="about-section">
                    <h3 className="section-title">Technology</h3>
                    <p className="section-text">
                        QuickNotes is built using modern web technologies, including React for the frontend and a secure API backend to handle note storage and management. We use a variety of tools and frameworks to ensure a smooth and fast user experience.
                    </p>
                </div>
                <div className="about-section">
                    <h3 className="section-title">Contact Us</h3>
                    <p className="section-text">If you have any questions or feedback, feel free to reach out to us at <strong>support@quicknotes.com</strong>.</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default AboutPage;
