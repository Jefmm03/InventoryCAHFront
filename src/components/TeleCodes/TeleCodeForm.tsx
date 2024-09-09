import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import SuccessModal from '../SuccessModal';

const TelCodeForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState<number | null>(null);
  const [code, setCode] = useState<number | ''>('');
  const [cor, setCor] = useState<number | ''>('');
  const [callType, setCallType] = useState<number | ''>('');
  const [asignation, setAsignation] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.telCode) {
      const { telCode } = location.state;
      setId(telCode.id)
      setCode(telCode.code);
      setCor(telCode.cor);
      setCallType(telCode.callType);
      setAsignation(telCode.asignation);
      setComment(telCode.comment);
    }
  }, [location.state]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/telCodeTable'); 
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTelCode = {
      code,
      cor,
      callType,
      asignation,
      comment
    };

    try {
      const token = localStorage.getItem('token');

     
      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `https://localhost:7283/api/TelCodes/Editar`
        : `https://localhost:7283/api/TelCodes/Nuevo`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(id ? { ...newTelCode, id } : newTelCode), 
      });

      if (!response.ok) {
        throw new Error('Failed to save telCode');
      }

      setModalMessage(id ? 'TelCode editado correctamente' : 'TelCode creado correctamente');
      setShowModal(true);

      setTimeout(handleCloseModal, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save telCode');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Code
          </label>
          <input
            type="number"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.valueAsNumber)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="cor" className="block text-sm font-medium text-gray-700">
            COR
          </label>
          <input
            type="number"
            id="cor"
            value={cor}
            onChange={(e) => setCor(e.target.valueAsNumber)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="callType" className="block text-sm font-medium text-gray-700">
            Call Type
          </label>
          <input
            type="number"
            id="callType"
            value={callType}
            onChange={(e) => setCallType(e.target.valueAsNumber)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="asignation" className="block text-sm font-medium text-gray-700">
            Asignation
          </label>
          <input
            type="text"
            id="asignation"
            value={asignation}
            onChange={(e) => setAsignation(e.target.value)}
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
            required
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

export default TelCodeForm;
