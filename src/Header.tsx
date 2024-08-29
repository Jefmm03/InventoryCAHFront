import React from 'react'; 

const Header: React.FC = () => {
  return (
    <header className="bg-red-600 p-2">
      <div className="container mx-auto flex justify-start">
        <img src="/public/Logo Cardinal blanco.png" alt="Company Logo" className="h-9" />
        <img src="/public/Logo Cardinal Nombre blanco.png" alt="Company Logo" className="h-8" />
      </div>
    </header>
  );
};

export default Header;
