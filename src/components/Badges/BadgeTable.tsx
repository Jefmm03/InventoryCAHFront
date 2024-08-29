
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import ConfirmationModal from '../ConfirmationModal';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

type BadgeData = {
  id: number;
  number: string;
  department: string;
  status: number;
};

const BadgeTable: React.FC = () => {
  const [data, setData] = useState<BadgeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [badgeToDelete, setBadgeToDelete] = useState<BadgeData | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Nuevo estado para el término de búsqueda
  const pagesToShow = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7283/api/Badges/Lista');
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda
    setCurrentPage(1); // Reiniciar la página actual a la primera página
  };

  const handleDetailClick = (id: number) => {
    navigate('/badgeDetail', { state: { badgeId: id } });
  };

  const openDeleteConfirmation = (badge: BadgeData) => {
    setBadgeToDelete(badge);
    setIsModalOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setBadgeToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (badgeToDelete) {
      try {
        const response = await fetch(`https://localhost:7283/api/Badges/Eliminar/${badgeToDelete.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete badge');
        }

        setData(prevData => prevData.filter(item => item.id !== badgeToDelete.id));
        closeDeleteConfirmation();
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Badges');

    worksheet.columns = [
      { header: 'Number', key: 'number', width: 15 },
      { header: 'Department', key: 'department', width: 30 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    currentData.forEach(badge => {
      worksheet.addRow({
        number: badge.number,
        department: badge.department,
        status: badge.status === 1 ? 'Active' : 'Inactive',
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'Badges.xlsx');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredData = data.filter(item =>
    item.department && item.department.toLowerCase().includes(searchTerm.toLowerCase()) //1111111111
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(currentPage - halfPagesToShow, 1);
    let endPage = startPage + pagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-3 min-h-screen">
      {/* Contenedor de botones e input de búsqueda */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 items-center">

        {/* Contenedor de botones a la izquierda */}
        <div className="flex space-x-2 mb-4 sm:mb-0">
          <button
            onClick={() => navigate('/badgeForm')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + New
          </button>

          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaDownload />
            <span className="ml-2">Export</span>
          </button>

          <button className="bg-red-600 text-white px-4 py-2 rounded flex items-center">
            <MdDelete />
            <span className="ml-2">Show Deleted</span>
          </button>
        </div>

        <div className="flex items-center font-semibold">
          <input
            type="text"
            placeholder="Search"
            className="border px-2 py-2 w-80 rounded-l"
            onChange={handleSearchChange}
            value={searchTerm}
          />
        </div>
      </div>



      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Number</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="border p-2">{item.number}</td>
              <td className="border p-2">{item.department}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${item.status === 1 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                  {item.status === 1 ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => navigate('/badgeForm', { state: { badge: item } })}
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

      <div className="flex flex-col sm:flex-row justify-between mt-4">
        <select
          className="border px-4 py-2 rounded mb-4 sm:mb-0"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="10">Items 10</option>
          <option value="20">Items 20</option>
        </select>
        <div className="flex space-x-2 justify-center sm:justify-start">
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-2 rounded ${pageNumber === currentPage ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
                }`}
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

export default BadgeTable;
