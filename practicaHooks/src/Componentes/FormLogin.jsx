import React, { useState, useEffect } from 'react';
import { getUsers } from "../Services/get";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css" 



const FormLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();




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
    setMessage('');


    if (!email || !password) {
      setMessage("Por favor llena todos los campos!");
      return;
    }

    try {
      const user = users.find(u => u.correo === email);

      if (user) {
        if (user.password === password) {
          setMessage('¡Éxito! Usuario entrando.');
          navigate("/home");
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

    setEmail('');
    setPassword('');
  };

  const irRegistro=()=>{
    navigate("/Registro")
  }



  return (
    <div className="wrapper">
      <div className="form-box">
        <h2 className='LoginTitulo'>Login</h2>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="mail"></ion-icon>
          </span>
          <input
            id='inputCss'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label id='emailTitulo'>Email</label>
        </div>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          <input
            id='inputCss'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label id='passwordtitulo'>Password</label>
        </div>
        <div className="remember-forgot">
          <a href="#">Forgot Password?</a>
        </div>
        <button id='btnLogin' className="btn btn-primary" onClick={handleLogin}>Login</button>
        <div className="login-register">
          <p>No Tienes Cuenta?<a href="" onClick={irRegistro} className="register-link">Regístrate</a></p>
        </div>
        {message && <div id="mensajeAlert">{message}</div>}
      </div>
    </div>
  );
};



export default FormLogin;
