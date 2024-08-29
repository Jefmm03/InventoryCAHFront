import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import ConfirmationModal from '../ConfirmationModal';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { FaDownload } from 'react-icons/fa';

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
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pagesToShow = 5;

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); 
    setCurrentPage(1); 
  };

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

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); 
  };

  
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ricohs');

    worksheet.columns = [
      { header: 'Serial Number', key: 'serialNumber', width: 15 },
      { header: 'Activo CR', key: 'activoCr', width: 30 },
      { header: 'Net Name', key: 'netName', width: 15 },
      { header: 'Model', key: 'model', width: 15 },
      { header: 'Link', key: 'link', width: 30 },
      { header: 'Location', key: 'location', width: 15 },
    ];

    
    currentData.forEach(ricoh => {
      worksheet.addRow({
        serialNumber: ricoh.serialNumber,
        activoCr: ricoh.activoCr,
        netName: ricoh.netName,
        model: ricoh.model,
        link: ricoh.link,
        location: ricoh.location
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'Ricohs.xlsx');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredData = data.filter(item =>
    item.model && item.model.toLowerCase().includes(searchTerm.toLowerCase()) //1111111111
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);
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
    <div className="p-4 min-h-screen">
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
          onChange={handleItemsPerPageChange}
        >
          <option value="10">Items 10</option>
          <option value="20">Items 20</option>
        </select>
        <div className="flex space-x-2">             
          {getPageNumbers().map((pageNumber) => ( 
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
