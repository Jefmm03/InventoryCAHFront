import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';

const RicohForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [serialNumber, setSerialNumber] = useState<string>('');
  const [activoCr, setActivoCr] = useState<string>('');
  const [netName, setNetName] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [locationData, setLocationData] = useState<string>(''); // renamed to avoid conflict with 'location' from react-router-dom
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.ricoh) {
      const { ricoh } = location.state;
      setSerialNumber(ricoh.serialNumber);
      setActivoCr(ricoh.activoCr);
      setNetName(ricoh.netName);
      setModel(ricoh.model);
      setLink(ricoh.link);
      setLocationData(ricoh.location);
      setComment(ricoh.comment);
    }
  }, [location.state]);

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
      const response = await fetch('https://localhost:7283/api/Ricohs/Nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRicoh),
      });

      if (!response.ok) {
        throw new Error('Failed to save ricoh data');
      }

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save ricoh data');
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
    </div>
  );
};

export default RicohForm;
