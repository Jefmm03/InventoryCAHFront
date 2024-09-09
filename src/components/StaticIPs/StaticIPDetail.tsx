import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import { StaticIPDetailData } from '../../types/Index';


const StaticIPDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staticIP, setStaticIP] = useState<StaticIPDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.staticIPId) {
        console.log("Fetching Static IP data for staticIPId:", location.state.staticIPId);
        try {
          const token = localStorage.getItem('token');
          const response = await fetchWithAuth(`https://localhost:7283/api/StaticIPs/Obtener/${location.state.staticIPId}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch staticIP data: ${response.statusText}`);
          }

          const text = await response.text();
          const result = text ? JSON.parse(text) : null;

          if (result && typeof result === 'object') {
            setStaticIP(result);
          } else {
            throw new Error('Invalid staticIP data');
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No staticIP ID provided');
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleDelete = async () => {
    if (staticIP) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetchWithAuth(`https://localhost:7283/api/StaticIPs/Eliminar/${staticIP.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}` 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete Static IP');
        }

        navigate('/staticIPTable');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handleEdit = () => {
    if (staticIP) {
      navigate('/staticIPForm', { state: { staticIP } });
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
    staticIP && (
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
              <th className="px-4 py-2 text-gray-600">Device:</th>
              <td className="px-4 py-2">{staticIP.device}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Area:</th>
              <td className="px-4 py-2">{staticIP.area}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Network Point:</th>
              <td className="px-4 py-2">{staticIP.networkPoint}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Switch:</th>
              <td className="px-4 py-2">{staticIP.switch}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">IP Address:</th>
              <td className="px-4 py-2">{staticIP.ipaddress}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Line:</th>
              <td className="px-4 py-2">{staticIP.line}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Location:</th>
              <td className="px-4 py-2">{staticIP.location}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Comment:</th>
              <td className="px-4 py-2">{staticIP.comment}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Creation Date:</th>
              <td className="px-4 py-2">{staticIP.createdAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modification Date:</th>
              <td className="px-4 py-2">{staticIP.updatedAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modified By:</th>
              <td className="px-4 py-2">{staticIP.modifiedBy}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default StaticIPDetail;
