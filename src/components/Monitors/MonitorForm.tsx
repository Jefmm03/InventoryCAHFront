import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';

const MonitorForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [serialNumber, setSerialNumber] = useState<string>('');
  const [activoCr, setActivoCr] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [size, setSize] = useState<number | ''>('');
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.monitor) {
      const { monitor } = location.state;
      setSerialNumber(monitor.serialNumber);
      setActivoCr(monitor.activoCr);
      setModel(monitor.model);
      setUser(monitor.user);
      setSize(monitor.size);
      setComment(monitor.comment);
    }
  }, [location.state]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newMonitor = {
      serialNumber,
      activoCr,
      model,
      user,
      size,
      comment,
    };

    try {
      const response = await fetch('https://localhost:7283/api/Monitors/Nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMonitor),
      });

      if (!response.ok) {
        throw new Error('Failed to save monitor');
      }

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save monitor');
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
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <input
            type="number"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.valueAsNumber)}
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
    </div>
  );
};

export default MonitorForm;
