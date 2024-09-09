import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import { DockingDetailData } from '../../types/Index';

const DockingDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [docking, setDocking] = useState<DockingDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.dockingId) {
        console.log("Fetching docking data for dockingId:", location.state.dockingId);
        try {
          const token = localStorage.getItem('token');
          const response = await fetchWithAuth(`https://localhost:7283/api/Dockings/Obtener/${location.state.dockingId}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch docking data: ${response.statusText}`);
          }

          const text = await response.text();
          const result = text ? JSON.parse(text) : null;

          if (result && typeof result === 'object') {
            setDocking(result);
          } else {
            throw new Error('Invalid docking data');
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No docking ID provided');
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleDelete = async () => {
    if (docking) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetchWithAuth(`https://localhost:7283/api/Dockings/Eliminar/${docking.serialNumber}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete docking');
        }

        navigate('/dockings');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handleEdit = () => {
    if (docking) {
      navigate('/dockingForm', { state: { docking } });
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
    docking && (
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
              <td className="px-4 py-2">{docking.serialNumber}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">User:</th>
              <td className="px-4 py-2">{docking.user}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Key:</th>
              <td className="px-4 py-2">{docking.key}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modified By:</th>
              <td className="px-4 py-2">{docking.modifiedBy}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Comment:</th>
              <td className="px-4 py-2">{docking.comment}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Creation Date:</th>
              <td className="px-4 py-2">{docking.createdAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modification Date:</th>
              <td className="px-4 py-2">{docking.updatedAt}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default DockingDetail;
