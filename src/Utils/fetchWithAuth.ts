
  export const fetchWithAuth = async (url: string, options: RequestInit): Promise<Response> => {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  
    // Verifica si el token ha expirado o si el usuario no está autorizado
    if (response.status === 401) {
      localStorage.removeItem('token');
      // Redirige al usuario al login
      window.location.href = '/'; 
    }
  
    return response;
  };
