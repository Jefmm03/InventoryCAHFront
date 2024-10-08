import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import SuccessModal from '../SuccessModal';

const TelephoneForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState<number | null>(null);
  const [serie, setSerie] = useState<string>('');
  const [activo, setActivo] = useState<string>('');
  const [ext, setExt] = useState<number | ''>('');
  const [employee, setEmployee] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.telephone) {
      const { telephone } = location.state;
      setId(telephone.id)
      setSerie(telephone.serie);
      setActivo(telephone.activo);
      setExt(telephone.ext);
      setEmployee(telephone.employee);
      setComment(telephone.comment);
    }
  }, [location.state]);

  
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/telephoneTable');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTelephone = {
      serie,
      activo,
      ext,
      employee,
      comment,
    };

    try {
      const token = localStorage.getItem('token');


      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `https://localhost:7283/api/Telephones/Editar`
        : `https://localhost:7283/api/Telephones/Nuevo`;

      const response = await fetchWithAuth(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(id ? { ...newTelephone, id } : newTelephone), 
      });

      if (!response.ok) {
        throw new Error('Failed to save telephone');
      }
      setModalMessage(id ? 'Telephone editado correctamente' : 'Telephone creado correctamente');
      setShowModal(true);

      setTimeout(handleCloseModal, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save telephone');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="serie" className="block text-sm font-medium text-gray-700">
            Serie
          </label>
          <input
            type="text"
            id="serie"
            value={serie}
            onChange={(e) => setSerie(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="activo" className="block text-sm font-medium text-gray-700">
            Activo
          </label>
          <input
            type="text"
            id="activo"
            value={activo}
            onChange={(e) => setActivo(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="ext" className="block text-sm font-medium text-gray-700">
            Extension
          </label>
          <input
            type="number"
            id="ext"
            value={ext}
            onChange={(e) => setExt(e.target.valueAsNumber)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
            Employee
          </label>
          <input
            type="text"
            id="employee"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
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

export default TelephoneForm;
