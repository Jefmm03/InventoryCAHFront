
import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';

const BadgeForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [number, setNumber] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.badge) {
      const { badge } = location.state;
      setNumber(badge.number);
      setDepartment(badge.department);
      setStatus(badge.status);
      setComment(badge.comment)
      // Puedes establecer `comment` si tienes un valor inicial
    }
  }, [location.state]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newBadge = {
      number,
      department,
      status,
      comment,
    };

    try {
      const response = await fetch('https://localhost:7283/api/Badges/Nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBadge),
      });

      if (!response.ok) {
        throw new Error('Failed to save badge');
      }

      // Redirige al usuario a la lista de badges después de guardar
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save badge');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
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
            <option value="Inactive">Inactive</option>
            <option value="Active">Active</option>
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
          onClick={() => navigate(-1)} // Navega hacia atrás
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Return
        </button>
      </div>
    </form>
  </div>
);
};

export default BadgeForm;
