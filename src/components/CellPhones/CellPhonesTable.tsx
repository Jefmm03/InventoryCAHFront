/*
import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import ConfirmationModal from '../ConfirmationModal';

type CellphoneData = {
  id: number;
  model: string;
  imei: number;
  user: string;
  pin: number;
  puk: number;
  iclouduser: string;
  icloudpass: string;
};

const CellphonesTable: React.FC = () => {
  const [data, setData] = useState<CellphoneData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cellphoneToDelete, setCellphoneToDelete] = useState<CellphoneData | null>(null);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7283/api/CellPhones/Lista');
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
    navigate('/cellPhoneDetail', { state: { cellphoneId: id } });
  };

  const openDeleteConfirmation = (cellphone: CellphoneData) => {
    setCellphoneToDelete(cellphone);
    setIsModalOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setCellphoneToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (cellphoneToDelete) {
      try {
        const response = await fetch(`https://localhost:7283/api/CellPhones/Eliminar/${cellphoneToDelete.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete cellphone');
        }

        setData(prevData => prevData.filter(item => item.id !== cellphoneToDelete.id));
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
          onClick={() => navigate('/cellphoneForm')}
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
            <th className="border p-2">Model</th>
            <th className="border p-2">IMEI</th>
            <th className="border p-2">User</th>
            <th className="border p-2">PIN</th>
            <th className="border p-2">PUK</th>
            <th className="border p-2">iCloud User</th>
            <th className="border p-2">iCloud Password</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="border p-2">{item.model}</td>
              <td className="border p-2">{item.imei}</td>
              <td className="border p-2">{item.user}</td>
              <td className="border p-2">{item.pin}</td>
              <td className="border p-2">{item.puk}</td>
              <td className="border p-2">{item.iclouduser}</td>
              <td className="border p-2">{item.icloudpass}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate('/cellPhoneForm', { state: { cellphone: item } })}
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

export default CellphonesTable;



import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import ConfirmationModal from '../ConfirmationModal';

type CellphoneData = {
  id: number;
  model: string;
  imei: number;
  user: string;
  pin: number;
  puk: number;
  iclouduser: string;
  icloudpass: string;
};

const CellphonesTable: React.FC = () => {
  const [data, setData] = useState<CellphoneData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cellphoneToDelete, setCellphoneToDelete] = useState<CellphoneData | null>(null);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7283/api/CellPhones/Lista');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result); // Verifica que los datos estén llegando correctamente
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
    navigate('/cellPhoneDetail', { state: { cellphoneId: id } });
  };

  const openDeleteConfirmation = (cellphone: CellphoneData) => {
    setCellphoneToDelete(cellphone);
    setIsModalOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setCellphoneToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (cellphoneToDelete) {
      try {
        const response = await fetch(`https://localhost:7283/api/CellPhones/Eliminar/${cellphoneToDelete.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete cellphone');
        }

        setData(prevData => prevData.filter(item => item.id !== cellphoneToDelete.id));
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
          onClick={() => navigate('/cellphoneForm')}
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
            <th className="border p-2">Model</th>
            <th className="border p-2">IMEI</th>
            <th className="border p-2">User</th>
            <th className="border p-2">PIN</th>
            <th className="border p-2">PUK</th>
            <th className="border p-2">iCloud User</th>
            <th className="border p-2">iCloud Password</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="border p-2">{item.model}</td>
              <td className="border p-2">{item.imei}</td>
              <td className="border p-2">{item.user}</td>
              <td className="border p-2">{item.pin}</td>
              <td className="border p-2">{item.puk}</td>
              <td className="border p-2">{item.iclouduser}</td>
              <td className="border p-2">{item.icloudpass}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate('/cellPhoneForm', { state: { cellphone: item } })}
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

export default CellphonesTable;
*/

import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import ConfirmationModal from '../ConfirmationModal';

type CellphoneData = {
  id: number;
  model: string;
  imei: number;
  number: number
  user: string;
  pin: number;
  puk: number;
  icloudUser: string; 
  icloudPass: string; 
};

const CellphonesTable: React.FC = () => {
  const [data, setData] = useState<CellphoneData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cellphoneToDelete, setCellphoneToDelete] = useState<CellphoneData | null>(null);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7283/api/CellPhones/Lista');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result); // Verifica que los datos estén llegando correctamente
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
    navigate('/cellPhoneDetail', { state: { cellphoneId: id } });
  };

  const openDeleteConfirmation = (cellphone: CellphoneData) => {
    setCellphoneToDelete(cellphone);
    setIsModalOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setCellphoneToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (cellphoneToDelete) {
      try {
        const response = await fetch(`https://localhost:7283/api/CellPhones/Eliminar/${cellphoneToDelete.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete cellphone');
        }

        setData(prevData => prevData.filter(item => item.id !== cellphoneToDelete.id));
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
          onClick={() => navigate('/cellphoneForm')}
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
            <th className="border p-2">Model</th>
            <th className="border p-2">IMEI</th>
            <th className="border p-2">Numero</th>
            <th className="border p-2">User</th>
            <th className="border p-2">PIN</th>
            <th className="border p-2">PUK</th>
            <th className="border p-2">iCloud User</th>
            <th className="border p-2">iCloud Password</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="border p-2">{item.model}</td>
              <td className="border p-2">{item.imei}</td>
              <td className="border p-2">{item.number}</td>
              <td className="border p-2">{item.user}</td>
              <td className="border p-2">{item.pin}</td>
              <td className="border p-2">{item.puk}</td>
              <td className="border p-2">{item.icloudUser}</td>
              <td className="border p-2">{item.icloudPass}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate('/cellPhoneForm', { state: { cellphone: item } })}
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

export default CellphonesTable;
