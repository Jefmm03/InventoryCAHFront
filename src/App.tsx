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

const App: React.FC = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </Router>
  );
};

export default App; 

