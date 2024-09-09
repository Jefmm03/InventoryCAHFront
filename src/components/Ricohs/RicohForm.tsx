import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import SuccessModal from '../SuccessModal';

const RicohForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState<number | null>(null);
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [activoCr, setActivoCr] = useState<string>('');
  const [netName, setNetName] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [locationData, setLocationData] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.ricoh) {
      const { ricoh } = location.state;
      setId(ricoh.id);
      setSerialNumber(ricoh.serialNumber);
      setActivoCr(ricoh.activoCr);
      setNetName(ricoh.netName);
      setModel(ricoh.model);
      setLink(ricoh.link);
      setLocationData(ricoh.location);
      setComment(ricoh.comment);
    }
  }, [location.state]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/ricohTable'); 
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newRicoh = {
      serialNumber,
      activoCr,
      netName,
      model,
      link,
      location: locationData,
      comment
    };

    try {
      const token = localStorage.getItem('token');

      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `https://localhost:7283/api/Ricohs/Editar`
        : `https://localhost:7283/api/Ricohs/Nuevo`;

      const response = await fetchWithAuth(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(id ? { ...newRicoh, id } : newRicoh), 
      });

      if (!response.ok) {
        throw new Error('Failed to save ricoh');
      }

      setModalMessage(id ? 'Ricoh editado correctamente' : 'Ricoh creado correctamente');
      setShowModal(true);

      
      setTimeout(handleCloseModal, 2000);

    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
            Serial Number
          </label>
          <input
            type="text"
            id="serialNumber"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="activoCr" className="block text-sm font-medium text-gray-700">
            Activo CR
          </label>
          <input
            type="text"
            id="activoCr"
            value={activoCr}
            onChange={(e) => setActivoCr(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="netName" className="block text-sm font-medium text-gray-700">
            Net Name
          </label>
          <input
            type="text"
            id="netName"
            value={netName}
            onChange={(e) => setNetName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">
            Link
          </label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
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
            value={locationData}
            onChange={(e) => setLocationData(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
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

export default RicohForm;
