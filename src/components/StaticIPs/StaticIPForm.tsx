import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import SuccessModal from '../SuccessModal';

const StaticIPForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState<number | null>(null);
  const [device, setDevice] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [networkPoint, setNetworkPoint] = useState<string>('');
  const [switchField, setSwitchField] = useState<string>(''); 
  const [ipaddress, setIpaddress] = useState<string>('');
  const [line, setLine] = useState<string>('');
  const [locationField, setLocationField] = useState<string>(''); 
  const [comment, setComment] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');


  useEffect(() => {
    if (location.state && location.state.staticIP) {
      const { staticIP } = location.state;
      setId(staticIP.id)
      setDevice(staticIP.device);
      setArea(staticIP.area);
      setNetworkPoint(staticIP.networkPoint);
      setSwitchField(staticIP.switch);
      setIpaddress(staticIP.ipaddress);
      setLine(staticIP.line);
      setLocationField(staticIP.location);
      setComment(staticIP.comment);
    }
  }, [location.state]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/staticIPTable'); 
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newStaticIP = {
      device,
      area,
      networkPoint,
      switch: switchField,
      ipaddress,
      line,
      location: locationField,
      comment
    };

    try {
      const token = localStorage.getItem('token');

      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `https://localhost:7283/api/StaticIps/Editar`
        : `https://localhost:7283/api/StaticIps/Nuevo`;

      const response = await fetchWithAuth(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(id ? { ...newStaticIP, id } : newStaticIP), 
      });

      if (!response.ok) {
        throw new Error('Failed to save staticIP');
      }

      setModalMessage(id ? 'StaticIP editado correctamente' : 'StaticIP creado correctamente');
      setShowModal(true);

      setTimeout(handleCloseModal, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save staticIP');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="device" className="block text-sm font-medium text-gray-700">
            Device
          </label>
          <input
            type="text"
            id="device"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Area
          </label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="networkPoint" className="block text-sm font-medium text-gray-700">
            Network Point
          </label>
          <input
            type="text"
            id="networkPoint"
            value={networkPoint}
            onChange={(e) => setNetworkPoint(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="switch" className="block text-sm font-medium text-gray-700">
            Switch
          </label>
          <input
            type="text"
            id="switch"
            value={switchField}
            onChange={(e) => setSwitchField(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="ipaddress" className="block text-sm font-medium text-gray-700">
            IP Address
          </label>
          <input
            type="text"
            id="ipaddress"
            value={ipaddress}
            onChange={(e) => setIpaddress(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="line" className="block text-sm font-medium text-gray-700">
            Line
          </label>
          <input
            type="text"
            id="line"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={locationField}
            onChange={(e) => setLocationField(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="flex space-x-2">
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Return
          </button>
        </div>
      </form>
      {showModal && <SuccessModal message={modalMessage} onClose={handleCloseModal} />}
    </div>
  );
};

export default StaticIPForm;
