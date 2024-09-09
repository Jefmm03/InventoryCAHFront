
import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import { TelephoneDetailData } from '../../types/Index';


const TelephoneDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [telephone, setTelephone] = useState<TelephoneDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.telephoneId) {
        console.log("Fetching telephone data for telephoneId:", location.state.telephoneId);
        try {
          const token = localStorage.getItem('token');
          const response = await fetchWithAuth(`https://localhost:7283/api/Telephones/Obtener/${location.state.telephoneId}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch telephone data: ${response.statusText}`);
          }

          const text = await response.text();
          const result = text ? JSON.parse(text) : null;

          if (result && typeof result === 'object') {
            setTelephone(result);
          } else {
            throw new Error('Invalid telephone data');
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No telephone ID provided');
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleDelete = async () => {
    if (telephone) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetchWithAuth(`https://localhost:7283/api/Telephones/Eliminar/${telephone.serie}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}` 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete telephone');
        }

        navigate('/telephoneTable');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handleEdit = () => {
    if (telephone) {
      navigate('/telephoneForm', { state: { telephone } });
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
    telephone && (
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
              <th className="px-4 py-2 text-gray-600">Serie:</th>
              <td className="px-4 py-2">{telephone.serie}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Activo:</th>
              <td className="px-4 py-2">{telephone.activo}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Extension:</th>
              <td className="px-4 py-2">{telephone.ext}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Employee:</th>
              <td className="px-4 py-2">{telephone.employee}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Comment:</th>
              <td className="px-4 py-2">{telephone.comment}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Creation Date:</th>
              <td className="px-4 py-2">{telephone.createdAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modification Date:</th>
              <td className="px-4 py-2">{telephone.updatedAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modified By:</th>
              <td className="px-4 py-2">{telephone.modifiedBy}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default TelephoneDetail;
