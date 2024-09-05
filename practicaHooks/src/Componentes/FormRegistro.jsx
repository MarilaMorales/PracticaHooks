import React, { useState, useEffect } from "react";
import { getUsers } from "../Services/get";
import { postUser } from "../Services/Post";
import '../Styles/Registro.css';
import { useNavigate } from "react-router-dom";





const FormRegister = () => {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const navigate= useNavigate();

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(''); // Limpiar mensaje previo




    if (!username || !email || !password || !confirmPassword) {
      setMessage("No dejes campos en blanco");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    // Verificar si el usuario ya existe
    const validarUser = users.find(user => user.correo === email);

    if (validarUser) {
      setMessage("Email ya se encuentra registrado");
      return;
    }

    try {
      // Registrar nuevo usuario
      await postUser({ username, email, password });
      setMessage("¡Registro exitoso!");
      navigate ("/login"); // Usar el navigate para redirigir

      

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {

      console.error("Error en el Registro", error);
      setMessage("Error");
    }
  };




  return (
    <div className="containerRegister">
      <div className="tituloRegister">
        <h2>Register</h2>
      </div>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small className="text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
        {message && <div className="alert" style={{ color: 'red' }}>{message}</div>}
      </form>
    </div>
  );
}

export default FormRegister;
