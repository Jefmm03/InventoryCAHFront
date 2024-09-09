

import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);

   
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username'); 
    navigate('/'); 
  };

  const handleClickOutside = (event: MouseEvent) => {
    
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState); // Alternar el estado del dropdown
  };

  return (
    <header className="bg-red-600 p-2 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/Logo Cardinal blanco.png" alt="CompanyLog" className="h-9 cursor-pointer" onClick={handleLogout} />
          <img src="/Logo Cardinal Nombre blanco.png" alt="CompanyName" className="h-8 ml-2" />
        </div>
        {username && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-white focus:outline-none"
            >
              Welcome, {username} <span className="ml-1">&#x25BC;</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
