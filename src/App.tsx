/*
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import BadgeTable from './components/Badges/BadgeTable';
import BadgeForm from './components/Badges/BadgeFrom';
import BadgeDetail from './components/Badges/BadgeDetail';
import CellphonesTable from './components/CellPhones/CellPhonesTable';
import CellPhoneForm from './components/CellPhones/CellPhoneForm';
import CellPhoneDetail from './components/CellPhones/CellPhoneDetail';
import ComputerTable from './components/Computers/ComputerTable';
import ComputerForm from './components/Computers/ComputerForm';
import ComputerDetail from './components/Computers/ComputerDetail';
import DockingTable from './components/Dockings/DockingTable';
import DockingForm from './components/Dockings/DockingForm';
import DockingDetail from './components/Dockings/DockingDetail';
import MonitorTable from './components/Monitors/MonitorTable';
import MonitorForm from './components/Monitors/MonitorForm';
import MonitorDetail from './components/Monitors/MonitorDetail';
import RicohTable from './components/Ricohs/RicohTable';
import RicohForm from './components/Ricohs/RicohForm';
import RicohDetail from './components/Ricohs/RicohDetail';
import StaticIPTable from './components/StaticIPs/StaticIPTable';
import StaticIPForm from './components/StaticIPs/StaticIPForm';
import StaticIPDetail from './components/StaticIPs/StaticIPDetail';
import TelephoneTable from './components/Telephones/TelephoneTable';
import TelephoneForm from './components/Telephones/TelephoneForm';
import TelephoneDetail from './components/Telephones/TelephoneDetail';
import TelCodeTable from './components/TeleCodes/TeleCodeTable';
import TelCodeForm from './components/TeleCodes/TeleCodeForm';
import TelCodeDetail from './components/TeleCodes/TeleCodeDetail';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';

const App: React.FC = () => {
  return (
    <Router>
      
      <Header/>
      <NavigationBar />
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navigationBar" element={<NavigationBar />} />
        <Route path="/table" element={<BadgeTable />} />
        <Route path="/badgeForm" element={<BadgeForm />} />
        <Route path="/badgeDetail" element={<BadgeDetail />} />
        <Route path="/cellPhoneTable" element={<CellphonesTable />} />
        <Route path="/cellPhoneForm" element={<CellPhoneForm />} />
        <Route path="/cellPhoneDetail" element={<CellPhoneDetail />} />
        <Route path="/computerTable" element={<ComputerTable />} />
        <Route path="/computerForm" element={<ComputerForm />} />
        <Route path="/computerDetail" element={<ComputerDetail />} />
        <Route path="/dockingTable" element={<DockingTable />} />
        <Route path="/dockingForm" element={<DockingForm />} />
        <Route path="/dockingDetail" element={<DockingDetail />} />
        <Route path="/monitorTable" element={<MonitorTable />} />
        <Route path="/monitorForm" element={<MonitorForm />} />
        <Route path="/monitorDetail" element={<MonitorDetail />} />
        <Route path="/ricohTable" element={<RicohTable />} />
        <Route path="/ricohForm" element={<RicohForm />} />
        <Route path="/ricohDetail" element={<RicohDetail />} />
        <Route path="/staticIPTable" element={<StaticIPTable />} />
        <Route path="/staticIPForm" element={<StaticIPForm />} />
        <Route path="/staticIPDetail" element={<StaticIPDetail />} />
        <Route path="/telephoneTable" element={<TelephoneTable />} />
        <Route path="/telephoneForm" element={<TelephoneForm />} />
        <Route path="/telephoneDetail" element={<TelephoneDetail />} />
        <Route path="/telCodeTable" element={<TelCodeTable />} />
        <Route path="/telCodeForm" element={<TelCodeForm />} />
        <Route path="/telCodeDetail" element={<TelCodeDetail />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App; 


import React from 'react'; 
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import BadgeTable from './components/Badges/BadgeTable';
import BadgeForm from './components/Badges/BadgeFrom';
import BadgeDetail from './components/Badges/BadgeDetail';
import CellphonesTable from './components/CellPhones/CellPhonesTable';
import CellPhoneForm from './components/CellPhones/CellPhoneForm';
import CellPhoneDetail from './components/CellPhones/CellPhoneDetail';
import ComputerTable from './components/Computers/ComputerTable';
import ComputerForm from './components/Computers/ComputerForm';
import ComputerDetail from './components/Computers/ComputerDetail';
import DockingTable from './components/Dockings/DockingTable';
import DockingForm from './components/Dockings/DockingForm';
import DockingDetail from './components/Dockings/DockingDetail';
import MonitorTable from './components/Monitors/MonitorTable';
import MonitorForm from './components/Monitors/MonitorForm';
import MonitorDetail from './components/Monitors/MonitorDetail';
import RicohTable from './components/Ricohs/RicohTable';
import RicohForm from './components/Ricohs/RicohForm';
import RicohDetail from './components/Ricohs/RicohDetail';
import StaticIPTable from './components/StaticIPs/StaticIPTable';
import StaticIPForm from './components/StaticIPs/StaticIPForm';
import StaticIPDetail from './components/StaticIPs/StaticIPDetail';
import TelephoneTable from './components/Telephones/TelephoneTable';
import TelephoneForm from './components/Telephones/TelephoneForm';
import TelephoneDetail from './components/Telephones/TelephoneDetail';
import TelCodeTable from './components/TeleCodes/TeleCodeTable';
import TelCodeForm from './components/TeleCodes/TeleCodeForm';
import TelCodeDetail from './components/TeleCodes/TeleCodeDetail';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';


const App: React.FC = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual

  return (
    <Router>
      <Header />
      {location.pathname !== '/' && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navigationBar" element={<NavigationBar />} />
        <Route path="/table" element={<BadgeTable />} />
        <Route path="/badgeForm" element={<BadgeForm/>} />
        <Route path="/badgeDetail" element={<BadgeDetail />} />
        <Route path="/cellPhoneTable" element={<CellphonesTable />} />
        <Route path="/cellPhoneForm" element={<CellPhoneForm />} />
        <Route path="/cellPhoneDetail" element={<CellPhoneDetail />} />
        <Route path="/computerTable" element={<ComputerTable />} />
        <Route path="/computerForm" element={<ComputerForm />} />
        <Route path="/computerDetail" element={<ComputerDetail />} />
        <Route path="/dockingTable" element={<DockingTable />} />
        <Route path="/dockingForm" element={<DockingForm />} />
        <Route path="/dockingDetail" element={<DockingDetail />} />
        <Route path="/monitorTable" element={<MonitorTable />} />
        <Route path="/monitorForm" element={<MonitorForm />} />
        <Route path="/monitorDetail" element={<MonitorDetail />} />
        <Route path="/ricohTable" element={<RicohTable />} />
        <Route path="/ricohForm" element={<RicohForm />} />
        <Route path="/ricohDetail" element={<RicohDetail />} />
        <Route path="/staticIPTable" element={<StaticIPTable />} />
        <Route path="/staticIPForm" element={<StaticIPForm />} />
        <Route path="/staticIPDetail" element={<StaticIPDetail />} />
        <Route path="/telephoneTable" element={<TelephoneTable />} />
        <Route path="/telephoneForm" element={<TelephoneForm />} />
        <Route path="/telephoneDetail" element={<TelephoneDetail />} />
        <Route path="/telCodeTable" element={<TelCodeTable />} />
        <Route path="/telCodeForm" element={<TelCodeForm />} />
        <Route path="/telCodeDetail" element={<TelCodeDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
*/


import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import BadgeTable from './components/Badges/BadgeTable';
import BadgeDetail from './components/Badges/BadgeDetail';
import CellphonesTable from './components/CellPhones/CellPhonesTable';
import CellPhoneForm from './components/CellPhones/CellPhoneForm';
import CellPhoneDetail from './components/CellPhones/CellPhoneDetail';
import ComputerTable from './components/Computers/ComputerTable';
import ComputerForm from './components/Computers/ComputerForm';
import ComputerDetail from './components/Computers/ComputerDetail';
import DockingTable from './components/Dockings/DockingTable';
import DockingForm from './components/Dockings/DockingForm';
import DockingDetail from './components/Dockings/DockingDetail';
import MonitorTable from './components/Monitors/MonitorTable';
import MonitorForm from './components/Monitors/MonitorForm';
import MonitorDetail from './components/Monitors/MonitorDetail';
import RicohTable from './components/Ricohs/RicohTable';
import RicohForm from './components/Ricohs/RicohForm';
import RicohDetail from './components/Ricohs/RicohDetail';
import StaticIPTable from './components/StaticIPs/StaticIPTable';
import StaticIPForm from './components/StaticIPs/StaticIPForm';
import StaticIPDetail from './components/StaticIPs/StaticIPDetail';
import TelephoneTable from './components/Telephones/TelephoneTable';
import TelephoneForm from './components/Telephones/TelephoneForm';
import TelephoneDetail from './components/Telephones/TelephoneDetail';
import TelCodeTable from './components/TeleCodes/TeleCodeTable';
import TelCodeForm from './components/TeleCodes/TeleCodeForm';
import TelCodeDetail from './components/TeleCodes/TeleCodeDetail';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import BadgeForm from './components/Badges/BadgeFrom';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout: React.FC = () => {
  const location = useLocation(); 

  return (
    <>
      <Header />

      {location.pathname !== '/' && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navigationBar" element={<NavigationBar />} />
        <Route path="/table" element={<BadgeTable />} />
        <Route path="/badgeForm" element={<BadgeForm />} />
        <Route path="/badgeDetail" element={<BadgeDetail />} />
        <Route path="/cellPhoneTable" element={<CellphonesTable />} />
        <Route path="/cellPhoneForm" element={<CellPhoneForm />} />
        <Route path="/cellPhoneDetail" element={<CellPhoneDetail />} />
        <Route path="/computerTable" element={<ComputerTable />} />
        <Route path="/computerForm" element={<ComputerForm />} />
        <Route path="/computerDetail" element={<ComputerDetail />} />
        <Route path="/dockingTable" element={<DockingTable />} />
        <Route path="/dockingForm" element={<DockingForm />} />
        <Route path="/dockingDetail" element={<DockingDetail />} />
        <Route path="/monitorTable" element={<MonitorTable />} />
        <Route path="/monitorForm" element={<MonitorForm />} />
        <Route path="/monitorDetail" element={<MonitorDetail />} />
        <Route path="/ricohTable" element={<RicohTable />} />
        <Route path="/ricohForm" element={<RicohForm />} />
        <Route path="/ricohDetail" element={<RicohDetail />} />
        <Route path="/staticIPTable" element={<StaticIPTable />} />
        <Route path="/staticIPForm" element={<StaticIPForm />} />
        <Route path="/staticIPDetail" element={<StaticIPDetail />} />
        <Route path="/telephoneTable" element={<TelephoneTable />} />
        <Route path="/telephoneForm" element={<TelephoneForm />} />
        <Route path="/telephoneDetail" element={<TelephoneDetail />} />
        <Route path="/telCodeTable" element={<TelCodeTable />} />
        <Route path="/telCodeForm" element={<TelCodeForm />} />
        <Route path="/telCodeDetail" element={<TelCodeDetail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
