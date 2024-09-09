
import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import SuccessModal from '../../components/SuccessModal'; 
import { fetchWithAuth } from '../../Utils/fetchWithAuth';

const BadgeForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState<number | null>(null);
  const [number, setNumber] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.badge) {
      const { badge } = location.state;
      setId(badge.id);
      setNumber(badge.number);
      setDepartment(badge.department);
      setStatus(badge.status.toString());
      setComment(badge.comment);
    }
  }, [location.state]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/table'); 
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newBadge = {
      number,
      department,
      status: parseInt(status),
      comment,
    };

    try {
      const token = localStorage.getItem('token');

      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `https://localhost:7283/api/Badges/Editar`
        : `https://localhost:7283/api/Badges/Nuevo`;

      const response = await fetchWithAuth(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(id ? { ...newBadge, id } : newBadge),
      });

      if (!response.ok) {
        throw new Error('Failed to save badge');
      }

      // Mostrar el modal de éxito
      setModalMessage(id ? 'Badge editado correctamente' : 'Badge creado correctamente');
      setShowModal(true);

      
      setTimeout(handleCloseModal, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save badge');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Number *
          </label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="0">Inactive</option>
            <option value="1">Active</option>
            
          </select>
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

      {/* Mostrar el modal si showModal es true */}
      {showModal && <SuccessModal message={modalMessage} onClose={handleCloseModal} />}
    </div>
  );
};

export default BadgeForm;
