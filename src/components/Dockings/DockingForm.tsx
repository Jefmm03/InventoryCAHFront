
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import SuccessModal from '../SuccessModal';

const DockingForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState<number | null>(null);
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.docking) {
      const { docking } = location.state;
      setId(docking.id);
      setSerialNumber(docking.serialNumber);
      setUser(docking.user);
      setKey(docking.key);
      setComment(docking.comment);
    }
  }, [location.state]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/dockingTable'); 
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newDocking = {
      serialNumber,
      user,
      key,
      comment,
    };

    try {
      const token = localStorage.getItem('token');

      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `https://localhost:7283/api/Dockings/Editar`
        : `https://localhost:7283/api/Dockings/Nuevo`;

      const response = await fetchWithAuth(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(id ? { ...newDocking, id } : newDocking),
      });

      if (!response.ok) {
        throw new Error('Failed to save Docking');
      }

      setModalMessage(id ? 'Docking editado correctamente' : 'Docking creado correctamente');
      setShowModal(true);


      setTimeout(handleCloseModal, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save Docking');
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
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">
            User
          </label>
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="key" className="block text-sm font-medium text-gray-700">
            Key
          </label>
          <input
            type="text"
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
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

export default DockingForm; 
