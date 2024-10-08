import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import { CellphoneDetailData } from '../../types/Index';



const CellPhoneDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cellphone, setCellphone] = useState<CellphoneDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.cellphoneId) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetchWithAuth(`https://localhost:7283/api/CellPhones/Obtener/${location.state.cellphoneId}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch cellphone data: ${response.statusText}`);
          }

          const text = await response.text();
          const result = text ? JSON.parse(text) : null;

          if (result && typeof result === 'object') {
            setCellphone(result);
          } else {
            throw new Error('Invalid cellphone data');
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No cellphone ID provided');
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleDelete = async () => {
    if (cellphone) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetchWithAuth(`https://localhost:7283/api/CellPhones/Eliminar/${cellphone.imei}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete cellphone');
        }

        navigate('/cellPhoneTable');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handleEdit = () => {
    if (cellphone) {
      navigate('/cellphoneForm', { state: { cellphone } });
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
    cellphone && (
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md min-h-screen">
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
              <th className="px-4 py-2 text-gray-600">Model:</th>
              <td className="px-4 py-2">{cellphone.model}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">IMEI:</th>
              <td className="px-4 py-2">{cellphone.imei}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Numero:</th>
              <td className="px-4 py-2">{cellphone.number}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">User:</th>
              <td className="px-4 py-2">{cellphone.user}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">PIN:</th>
              <td className="px-4 py-2">{cellphone.pin}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">PUK:</th>
              <td className="px-4 py-2">{cellphone.puk}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">iCloud User:</th>
              <td className="px-4 py-2">{cellphone.icloudUser}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">iCloud Password:</th>
              <td className="px-4 py-2">{cellphone.icloudPass}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Comment:</th>
              <td className="px-4 py-2">{cellphone.comment}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Creation Date:</th>
              <td className="px-4 py-2">{cellphone.createdAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modification Date:</th>
              <td className="px-4 py-2">{cellphone.updatedAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modified By:</th>
              <td className="px-4 py-2">{cellphone.modifiedBy}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default CellPhoneDetail;
