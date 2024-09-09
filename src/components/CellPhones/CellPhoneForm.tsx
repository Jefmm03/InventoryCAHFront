
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import SuccessModal from '../SuccessModal';

const CellphoneForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState<number | null>(null);
  const [model, setModel] = useState<string>('');
  const [number, setNumber] = useState<number | ''>('');
  const [imei, setImei] = useState<number | ''>('');
  const [user, setUser] = useState<string>('');
  const [pin, setPin] = useState<number | ''>('');
  const [puk, setPuk] = useState<number | ''>('');
  const [icloudUser, setIcloudUser] = useState<string>('');
  const [icloudPass, setIcloudPass] = useState<string>('');
  const [comment, setComment] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.cellphone) {
      const { cellphone } = location.state;
      setId(cellphone.id);
      setModel(cellphone.model);
      setNumber(cellphone.number)
      setImei(cellphone.imei);
      setUser(cellphone.user);
      setPin(cellphone.pin);
      setPuk(cellphone.puk);
      setIcloudUser(cellphone.icloudUser);
      setIcloudPass(cellphone.icloudPass);
      setComment(cellphone.comment)
    }
  }, [location.state]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/cellPhoneTable'); 
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newCellphone = {
      model,
      number,
      imei,
      user,
      pin,
      puk,
      icloudUser,
      icloudPass,
      comment
    };

    try {
      const token = localStorage.getItem('token');

      const method = id ? 'PUT' : 'POST';
      const url = id
        ? 'https://localhost:7283/api/CellPhones/Editar'
        : `https://localhost:7283/api/CellPhones/Nuevo`;
      const response = await fetchWithAuth(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(id ? { ...newCellphone, id } : newCellphone),
      });

      if (!response.ok) {
        throw new Error('Failed to save cellphone');
      }


      setModalMessage(id ? 'Cellphone editado correctamente' : 'Cellphone creado correctamente');
      setShowModal(true);


      setTimeout(handleCloseModal, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save cellphone');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Number
          </label>
          <input
            type="number"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.valueAsNumber)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="imei" className="block text-sm font-medium text-gray-700">
            IMEI
          </label>
          <input
            type="imei"
            id="imei"
            value={imei}
            onChange={(e) => setImei(e.target.valueAsNumber)}
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
          <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
            PIN
          </label>
          <input
            type="number"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.valueAsNumber)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="puk" className="block text-sm font-medium text-gray-700">
            PUK
          </label>
          <input
            type="number"
            id="puk"
            value={puk}
            onChange={(e) => setPuk(e.target.valueAsNumber)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="iclouduser" className="block text-sm font-medium text-gray-700">
            iCloud User
          </label>
          <input
            type="text"
            id="iclouduser"
            value={icloudUser}
            onChange={(e) => setIcloudUser(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="icloudpass" className="block text-sm font-medium text-gray-700">
            iCloud Password
          </label>
          <input
            type="text"
            id="icloudpass"
            value={icloudPass}
            onChange={(e) => setIcloudPass(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comentario
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

export default CellphoneForm;
