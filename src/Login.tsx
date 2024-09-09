
import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement>(null);

  // Efecto para enfocar el input de username cuando se carga el componente
  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://localhost:7283/api/userAuth/Login/${username}/${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include'
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud de autenticación');
      }

      const result = await response.json();

      if (result) {
       
        const token = result.token;

        if (token) {
          
          localStorage.setItem('token', token);
          
          localStorage.setItem('username', username);

          
          navigate('/home');
        } else {
          setError('Token no recibido. Por favor, inténtelo de nuevo.');
        }
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setError('Error al intentar iniciar sesión. Por favor, intente de nuevo.');
    }
  };

  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <img src="/logo-main.png" alt="Company Logo" className="h-16 m-4 px-16" />
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyDown}>
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
              ref={usernameInputRef}
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
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
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
