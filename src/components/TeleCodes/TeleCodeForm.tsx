import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';

const TelCodeForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [code, setCode] = useState<number | ''>('');
  const [cor, setCor] = useState<number | ''>('');
  const [callType, setCallType] = useState<number | ''>('');
  const [asignation, setAsignation] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.telCode) {
      const { telCode } = location.state;
      setCode(telCode.code);
      setCor(telCode.cor);
      setCallType(telCode.callType);
      setAsignation(telCode.asignation);
      setComment(telCode.comment);
    }
  }, [location.state]);

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
      const response = await fetch('https://localhost:7283/api/TelCodes/Nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTelCode),
      });

      if (!response.ok) {
        throw new Error('Failed to save tel code');
      }

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save tel code');
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
    </div>
  );
};

export default TelCodeForm;
