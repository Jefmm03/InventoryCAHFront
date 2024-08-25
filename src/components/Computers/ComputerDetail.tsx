import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';

type ComputerDetailData = {
  serialNumber: string;
  assetNcr: string;
  model: string;
  user: string;
  department: string;
  status: string;
  wireMac: string;
  wirelessMac: string;
  memory: string;
  processor: string;
  processorSpeed: string;
  hardDisk: string;
  operatingSystem: string;
  computerName: string;
  domain: string;
  opticalDrive: string;
  padLock: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  modifiedBy: string;
};

const ComputerDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [computer, setComputer] = useState<ComputerDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.computerId) {
        console.log("Fetching computer data for computerId:", location.state.computerId);
        try {
          const response = await fetch(`https://localhost:7283/api/Computers/Obtener/${location.state.computerId}`);
         
          if (!response.ok) {
            throw new Error(`Failed to fetch computer data: ${response.statusText}`);
          }

          const text = await response.text();
          console.log("Raw response text:", text);

          const result = text ? JSON.parse(text) : null;
          console.log("Parsed JSON result:", result);

          if (result && typeof result === 'object') {
            setComputer(result);
          } else {
            throw new Error('Invalid computer data');
          }
        } catch (error) {
          console.error("Error fetching computer data:", error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No computer ID provided");
        setError('No computer ID provided');
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleDelete = async () => {
    if (computer) {
      try {
        const response = await fetch(`https://localhost:7283/api/Computers/Eliminar/${computer.serialNumber}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete computer');
        }

        navigate('/');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handleEdit = () => {
    if (computer) {
      navigate('/computerForm', { state: { computer } });
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
    computer && (
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
              <td className="px-4 py-2">{computer.serialNumber}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Asset NCR:</th>
              <td className="px-4 py-2">{computer.assetNcr}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Model:</th>
              <td className="px-4 py-2">{computer.model}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">User:</th>
              <td className="px-4 py-2">{computer.user}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Department:</th>
              <td className="px-4 py-2">{computer.department}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Status:</th>
              <td className="px-4 py-2">{computer.status}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Wire MAC:</th>
              <td className="px-4 py-2">{computer.wireMac}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Wireless MAC:</th>
              <td className="px-4 py-2">{computer.wirelessMac}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Memory:</th>
              <td className="px-4 py-2">{computer.memory}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Processor:</th>
              <td className="px-4 py-2">{computer.processor}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Processor Speed:</th>
              <td className="px-4 py-2">{computer.processorSpeed}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Hard Disk:</th>
              <td className="px-4 py-2">{computer.hardDisk}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Operating System:</th>
              <td className="px-4 py-2">{computer.operatingSystem}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Computer Name:</th>
              <td className="px-4 py-2">{computer.computerName}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Domain:</th>
              <td className="px-4 py-2">{computer.domain}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Optical Drive:</th>
              <td className="px-4 py-2">{computer.opticalDrive}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Pad Lock:</th>
              <td className="px-4 py-2">{computer.padLock}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Comment:</th>
              <td className="px-4 py-2">{computer.comment}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Creation Date:</th>
              <td className="px-4 py-2">{computer.createdAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modification Date:</th>
              <td className="px-4 py-2">{computer.updatedAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modified By:</th>
              <td className="px-4 py-2">{computer.modifiedBy}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default ComputerDetail;


