import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import { RicohDetailData } from '../../types/Index';


const RicohDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ricoh, setRicoh] = useState<RicohDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.ricohId) {
        console.log("Fetching ricoh data for ricohId:", location.state.ricohId);
        try {
          const token = localStorage.getItem('token');
          const response = await fetchWithAuth(`https://localhost:7283/api/Ricohs/Obtener/${location.state.ricohId}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch ricoh data: ${response.statusText}`);
          }

          const text = await response.text();
          const result = text ? JSON.parse(text) : null;

          if (result && typeof result === 'object') {
            setRicoh(result);
          } else {
            throw new Error('Invalid ricoh data');
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No ricoh ID provided');
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleDelete = async () => {
    if (ricoh) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetchWithAuth(`https://localhost:7283/api/Ricohs/Eliminar/${ricoh.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}` 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete ricoh');
        }

        navigate('/ricohTable');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handleEdit = () => {
    if (ricoh) {
      navigate('/ricohForm', { state: { ricoh } });
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
    ricoh && (
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
              <th className="px-4 py-2 text-gray-600">Serial Number:</th>
              <td className="px-4 py-2">{ricoh.serialNumber}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Activo CR:</th>
              <td className="px-4 py-2">{ricoh.activoCr}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Net Name:</th>
              <td className="px-4 py-2">{ricoh.netName}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Model:</th>
              <td className="px-4 py-2">{ricoh.model}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Link:</th>
              <td className="px-4 py-2">{ricoh.link}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Location:</th>
              <td className="px-4 py-2">{ricoh.location}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Comment:</th>
              <td className="px-4 py-2">{ricoh.comment}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Created At:</th>
              <td className="px-4 py-2">{ricoh.createdAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Updated At:</th>
              <td className="px-4 py-2">{ricoh.updatedAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modified By:</th>
              <td className="px-4 py-2">{ricoh.modifiedBy}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default RicohDetail;
