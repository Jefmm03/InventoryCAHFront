import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import ConfirmationModal from '../ConfirmationModal';

type RicohData = {
  id: number;
  serialNumber: string;
  activoCr: string;
  netName: string;
  model: string;
  link: string;
  location: string;
};

const RicohTable: React.FC = () => {
  const [data, setData] = useState<RicohData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ricohToDelete, setRicohToDelete] = useState<RicohData | null>(null);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7283/api/Ricohs/Lista');
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
    navigate('/ricohDetail', { state: { ricohId: id } });
  };

  const openDeleteConfirmation = (ricoh: RicohData) => {
    setRicohToDelete(ricoh);
    setIsModalOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setRicohToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (ricohToDelete) {
      try {
        const response = await fetch(`https://localhost:7283/api/Ricohs/Eliminar/${ricohToDelete.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete ricoh');
        }

        setData(prevData => prevData.filter(item => item.id !== ricohToDelete.id));
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
          onClick={() => navigate('/ricohForm')}
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
            <th className="border p-2">Activo CR</th>
            <th className="border p-2">Net Name</th>
            <th className="border p-2">Model</th>
            <th className="border p-2">Link</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="border p-2">{item.serialNumber}</td>
              <td className="border p-2">{item.activoCr}</td>
              <td className="border p-2">{item.netName}</td>
              <td className="border p-2">{item.model}</td>
              <td className="border p-2">{item.link}</td>
              <td className="border p-2">{item.location}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate('/ricohForm', { state: { ricoh: item } })}
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

export default RicohTable;
