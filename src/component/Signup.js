import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful signup
import Navbar from './Navbar';

const Signup = () => {
  // State variables to handle user input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); // Programmatic navigation

  // Redirect if user is already logged in
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/home'); // Redirect to home if token exists
  //   }
  // }, [navigate]);

  // Function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      // API request to register the user
      const response = await axios.post('http://localhost:5000/api/auth/createUser', {
        name,
        email,
        password
      });

      // Extract token from response and store it
      const token = response.data.authtoken;
      if (token) {
        localStorage.setItem('token', token);
        console.log('Signup successful. Token:', token);
        alert('Signup successful');
        navigate('/home'); // Redirect to home
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <form onSubmit={handleSignup} style={styles.form}>
          <h2 style={styles.heading}>Sign Up</h2>
          
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
      </div>
    </>
  );
};

// CSS styles for the component
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    width: '300px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1.5rem'
  },
  input: {
    marginBottom: '1rem',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};

export default Signup;
