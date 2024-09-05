import React, { useState, useEffect } from 'react';
import { getUsers } from "../Services/get";

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);




  // Definir useEffect para cargar los usuarios desde el db.jason
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []); 

  const handleLogin = async () => {
    setMessage(''); // Limpiar mensaje de alerta previo

    // Tirar alerta si hay campos vacios
    if (!email || !password) {
      setMessage("Por favor llena todos los campos!");
      return;
    }

    try {
      // Buscar en la lista de usuarios normales
      
      const user = users.find(u => u.correo === email);

      if (user) {
        if (user.password === password) {
          setMessage('¡Éxito! Usuario entrando.');
          
        } else {
          setMessage('Contraseña incorrecta.');
        }
      } else {
        setMessage('Este usuario no existe.');
      }
    } catch (error) {
      console.error('Error en el proceso de login:', error);
      setMessage('Error en ingreso de datos');
    }

    // Limpiar los campos de entrada
    setEmail('');
    setPassword('');
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <h2>Login</h2>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="mail"></ion-icon>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <div className="remember-forgot">
          <a href="#">Forgot Password?</a>
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="login-register">
          <p>No Tienes Cuenta?<a href="#" className="register-link">Regístrate</a></p>
        </div>
        {message && <div id="mensajeAlert" style={{ color: 'red' }}>{message}</div>}
      </div>
    </div>
  );
};

export default FormLogin;
