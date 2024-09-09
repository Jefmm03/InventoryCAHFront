import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import ConfirmationModal from '../ConfirmationModal';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { FaDownload } from 'react-icons/fa';
import { fetchWithAuth } from '../../Utils/fetchWithAuth';
import { StaticIPData } from '../../types/Index';



const StaticIPTable: React.FC = () => {
  const [data, setData] = useState<StaticIPData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [staticIPToDelete, setStaticIPToDelete] = useState<StaticIPData | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pagesToShow = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetchWithAuth('https://localhost:7283/api/StaticIps/Lista',{
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

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
        const token = localStorage.getItem('token');
        const response = await fetchWithAuth(`https://localhost:7283/api/StaticIps/Eliminar/${staticIPToDelete.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
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

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };


  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('StaticIPs');

    worksheet.columns = [
      { header: 'Device', key: 'device', width: 15 },
      { header: 'Area', key: 'area', width: 30 },
      { header: 'Network Point', key: 'networkPoint', width: 15 },
      { header: 'Switch', key: 'switch', width: 15 },
      { header: 'IP Address', key: 'ipaddress', width: 30 },
      { header: 'Line', key: 'line', width: 15 },
      { header: 'Location', key: 'location', width: 15 }
    ];


    currentData.forEach(staticIP => {
      worksheet.addRow({
        device: staticIP.device,
        area: staticIP.area,
        networkPoint: staticIP.networkPoint,
        switch: staticIP.switch,
        ipaddress: staticIP.ipaddress,
        line: staticIP.line,
        location: staticIP.location
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'StaticIPs.xlsx');
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredData = data.filter(item =>
    item.area && item.area.toLowerCase().includes(searchTerm.toLowerCase()) 
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

       
        <div className="flex space-x-2 mb-4 sm:mb-0">
          <button
            onClick={() => navigate('/staticIPForm')}
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

export default StaticIPTable;
