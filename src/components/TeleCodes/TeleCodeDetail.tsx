import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';

type TelCodeDetailData = {
  id: number;
  code: number;
  cor: number;
  callType: number;
  asignation: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  modifiedBy: string;
};

const TelCodeDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [telCode, setTelCode] = useState<TelCodeDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.telCodeId) {
        console.log("Fetching tel code data for telCodeId:", location.state.telCodeId);
        try {
          const response = await fetch(`https://localhost:7283/api/TelCodes/Obtener/${location.state.telCodeId}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch tel code data: ${response.statusText}`);
          }

          const text = await response.text();
          console.log("Raw response text:", text);

          const result = text ? JSON.parse(text) : null;
          console.log("Parsed JSON result:", result);

          if (result && typeof result === 'object') {
            setTelCode(result);
          } else {
            throw new Error('Invalid tel code data');
          }
        } catch (error) {
          console.error("Error fetching tel code data:", error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No tel code ID provided");
        setError('No tel code ID provided');
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleDelete = async () => {
    if (telCode) {
      try {
        const response = await fetch(`https://localhost:7283/api/TelCodes/Eliminar/${telCode.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete tel code');
        }

        navigate('/');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handleEdit = () => {
    if (telCode) {
      navigate('/telCodeForm', { state: { telCode } });
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    telCode && (
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-between mb-6">
          <button onClick={handleReturn} className="bg-gray-500 text-white px-4 py-2 rounded">
            Return
          </button>
          <div className="space-x-2">
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>

        <table className="table-auto w-full text-left">
          <tbody>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Code:</th>
              <td className="px-4 py-2">{telCode.code}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">COR:</th>
              <td className="px-4 py-2">{telCode.cor}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Call Type:</th>
              <td className="px-4 py-2">{telCode.callType}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Asignation:</th>
              <td className="px-4 py-2">{telCode.asignation}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Comment:</th>
              <td className="px-4 py-2">{telCode.comment}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Creation Date:</th>
              <td className="px-4 py-2">{telCode.createdAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modification Date:</th>
              <td className="px-4 py-2">{telCode.updatedAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modified By:</th>
              <td className="px-4 py-2">{telCode.modifiedBy}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default TelCodeDetail; 
