import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import ConfirmationModal from '../ConfirmationModal'; // Importa el modal de confirmación

type StaticIPData = {
  id: number;
  device: string;
  area: string;
  networkPoint: string;
  switch: string;
  ipaddress: string;
  line: string;
  location: string;
};

const StaticIPTable: React.FC = () => {
  const [data, setData] = useState<StaticIPData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [staticIPToDelete, setStaticIPToDelete] = useState<StaticIPData | null>(null);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7283/api/StaticIps/Lista');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetailClick = (id: number) => {
    navigate('/staticIPDetail', { state: { staticIPId: id } });
  };

  const openDeleteConfirmation = (staticIP: StaticIPData) => {
    setStaticIPToDelete(staticIP);
    setIsModalOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setStaticIPToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (staticIPToDelete) {
      try {
        const response = await fetch(`https://localhost:7283/api/StaticIps/Eliminar/${staticIPToDelete.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete Static IP');
        }

        setData(prevData => prevData.filter(item => item.id !== staticIPToDelete.id));
        closeDeleteConfirmation();
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate('/staticIPForm')}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          + New
        </button>
        <div className="flex space-x-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Export</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Show Deleted</button>
          <input
            type="text"
            placeholder="Search"
            className="border px-4 py-2 rounded"
          />
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Device</th>
            <th className="border p-2">Area</th>
            <th className="border p-2">Network Point</th>
            <th className="border p-2">Switch</th>
            <th className="border p-2">IP Address</th>
            <th className="border p-2">Line</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="border p-2">{item.device}</td>
              <td className="border p-2">{item.area}</td>
              <td className="border p-2">{item.networkPoint}</td>
              <td className="border p-2">{item.switch}</td>
              <td className="border p-2">{item.ipaddress}</td>
              <td className="border p-2">{item.line}</td>
              <td className="border p-2">{item.location}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate('/staticIPForm', { state: { staticIP: item } })}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => openDeleteConfirmation(item)}
                  className="bg-gray-500 text-white px-2 py-1 rounded mr-2"
                >
                  <MdDelete />
                </button>
                <button
                  onClick={() => handleDetailClick(item.id)}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  <BiSolidDetail />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <select
          className="border px-4 py-2 rounded"
          value={itemsPerPage}
          disabled
        >
          <option value="10">Items 10</option>
        </select>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-2 rounded ${pageNumber === currentPage ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'}`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDeleteConfirm}
        message="Do you really want to delete the selected item?"
      />
    </div>
  );
};

export default StaticIPTable;
