
import React from 'react'; 
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  return (
    <nav className="bg-gray-200 p-4">
      <ul className="flex space-x-6 justify-center">
        <li><Link to="/home" className="text-black hover:text-gray-400 font-bold" >Home</Link></li>
        <li><Link to="/table" className="text-black hover:text-gray-400 font-bold">Badges</Link></li>
        <li><Link to="/cellPhoneTable" className="text-black hover:text-gray-400 font-bold">Cellphones</Link></li>
        <li><Link to="/computerTable" className="text-black hover:text-gray-400 font-bold">Computers</Link></li>
        <li><Link to="/dockingTable" className="text-black hover:text-gray-400 font-bold">Dockings</Link></li>
        <li><Link to="/monitorTable" className="text-black hover:text-gray-400 font-bold">Monitors</Link></li>
        <li><Link to="/ricohTable" className="text-black hover:text-gray-400 font-bold">Ricoh Prints</Link></li>
        <li><Link to="/staticIPTable" className="text-black hover:text-gray-400 font-bold">Static IPs</Link></li>
        <li><Link to="/telephoneTable" className="text-black hover:text-gray-400 font-bold">TelePhones</Link></li>
        <li><Link to="/telCodeTable" className="text-black hover:text-gray-400 font-bold">Codes</Link></li>
        
      </ul>
    </nav>
  );
};

export default NavigationBar;
