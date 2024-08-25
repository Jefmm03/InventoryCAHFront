import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import ConfirmationModal from '../ConfirmationModal';

type ComputerData = {
  id: number;
  serialNumber: string;
  assetNcr: string;
  model: string;
  user: string;
  computerName: string;
  
};

const ComputerTable: React.FC = () => {
  const [data, setData] = useState<ComputerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [computerToDelete, setComputerToDelete] = useState<ComputerData | null>(null);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7283/api/Cpus/Lista');
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
    navigate('/computerDetail', { state: { computerId: id } });
  };

  const openDeleteConfirmation = (computer: ComputerData) => {
    setComputerToDelete(computer);
    setIsModalOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setComputerToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (computerToDelete) {
      try {
        const response = await fetch(`https://localhost:7283/api/Cpus/Eliminar/${computerToDelete.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete computer');
        }

        setData(prevData => prevData.filter(item => item.id !== computerToDelete.id));
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
          onClick={() => navigate('/computerForm')}
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
            <th className="border p-2">Serial Number</th>
            <th className="border p-2">Asset N CR</th>
            <th className="border p-2">Model</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Computer Name</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="border p-2">{item.serialNumber}</td>
              <td className="border p-2">{item.assetNcr}</td>
              <td className="border p-2">{item.model}</td>
              <td className="border p-2">{item.user}</td>
              <td className="border p-2">{item.computerName}</td>

              <td className="border p-2">
                <button
                  onClick={() => navigate('/computerForm', { state: { computer : item } })}
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

export default ComputerTable;
