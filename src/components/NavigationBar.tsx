
import React from 'react'; 
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  return (
    <nav className="bg-gray-500 p-6">
      <ul className="flex space-x-6 justify-center">
        <li><Link to="/" className="text-white hover:text-gray-400">Home</Link></li>
        <li><Link to="/table" className="text-white hover:text-gray-400">Badges</Link></li>
        <li><Link to="/cellphones" className="text-white hover:text-gray-400">Cellphones</Link></li>
        <li><Link to="/computers" className="text-white hover:text-gray-400">Computers</Link></li>
        <li><Link to="/dockings" className="text-white hover:text-gray-400">Dockings</Link></li>
        <li><Link to="/monitors" className="text-white hover:text-gray-400">Monitors</Link></li>
        <li><Link to="/ricohPrints" className="text-white hover:text-gray-400">Ricoh Prints</Link></li>
        <li><Link to="/staticIPs" className="text-white hover:text-gray-400">Static IPs</Link></li>
        <li><Link to="/telephones" className="text-white hover:text-gray-400">TelePhones</Link></li>
        <li><Link to="/codes" className="text-white hover:text-gray-400">Codes</Link></li>
        
      </ul>
    </nav>
  );
};

export default NavigationBar;
