/*

const Login: React.FC = () => {



  return (   

<div className="flex flex-col justify-center items-center min-h-screen bg-gray-100"> 
<div className="bg-white p-8 rounded shadow-md w-full max-w-md"> 
<img src="/public/logo-main.png" alt="Company Logo" className=" h-16 m-4  px-16" />
  <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesion</h2>
  <form>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Cuenta de usuario
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Username"
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Contraseña
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Password"
      />
    </div>
    <div className="flex items-center justify-center">
      <button
        className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Ingresar
      </button>
    </div>
  </form>
</div>
</div>
);
};

export default Login;
*/

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  // Estado para almacenar el nombre de usuario, la contraseña y los mensajes de error
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Hook de navegación de react-router-dom para redireccionar al usuario después del login
  const navigate = useNavigate();

  // Función para manejar el evento de login
  const handleLogin = async () => {
    try {
      // Realizar una solicitud al backend para autenticar al usuario
      const response = await fetch(`https://localhost:7283/api/userAuth/Login/${username}/${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud de autenticación');
      }

      const result = await response.json();

      if (result) {
        // Si la autenticación es exitosa, redireccionar a la página principal
        navigate('/home');
      } else {
        // Si la autenticación falla, mostrar un mensaje de error
        setError('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setError('Error al intentar iniciar sesión. Por favor, intente de nuevo.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <img src="/public/logo-main.png" alt="Company Logo" className="h-16 m-4 px-16" />
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Cuenta de usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-center">
            <button
              className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
