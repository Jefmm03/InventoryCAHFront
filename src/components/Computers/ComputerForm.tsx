import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';

const ComputerForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [serialNumber, setSerialNumber] = useState<string>('');
  const [assetNcr, setAssetNcr] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [status, setStatus] = useState<number | ''>('');
  const [wireMac, setWireMac]= useState<string>('');
  const [wirelessMac, setWirelessMac]= useState<string>('');
  const [memory, setMemory] = useState<number | ''>('');
  const [processor, setProcessor] = useState<string>('');
  const [processorSpeed, setProcessorSpeed] = useState<number | ''>('');
  const [hardDisk, setHardDisk] = useState<number | ''>('');
  const [operatingSystem, setOperatingSystem] = useState<string>('');
  const [computerName, setComputerName] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [opticalDrive, setOpticalDrive] = useState<string>('');
  const [padLock, setPadLock] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (location.state && location.state.computer) {
      const { computer } = location.state;
      setSerialNumber(computer.serialNumber);
      setAssetNcr(computer.assetNcr);
      setModel(computer.model);
      setUser(computer.user);
      setDepartment(computer.department);
      setStatus(computer.status)
      setWireMac(computer.wireMac)
      setWirelessMac(computer.wirelessMac)
      setMemory(computer.memory)
      setProcessor(computer.processor)
      setProcessorSpeed(computer.processorSpeed)
      setHardDisk(computer.setHardDisk)
      setOperatingSystem(computer.operatingSystem)
      setComputerName(computer.computerName)
      setDomain(computer.domain)
      setOpticalDrive(computer.opticalDrive)
      setPadLock(computer.padLock)
      setComment(computer.comment)
      
    }
  }, [location.state]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newComputer = {
      serialNumber,
      assetNcr,
      model,
      user,
      department,
      status,
      wireMac,
      wirelessMac,
      memory,
      processor,
      processorSpeed,
      hardDisk,
      operatingSystem,
      computerName,
      domain,
      opticalDrive,
      padLock,
      comment
    };

    try {
      const response = await fetch('https://localhost:7283/api/Cpus/Nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComputer),
      });

      if (!response.ok) {
        throw new Error('Failed to save cellphone');
      }

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save cellphone');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
            Serial Number (S/N) 
          </label>
          <input
            type="text"
            id="serial"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="assetNcr" className="block text-sm font-medium text-gray-700">
            Asset N CR *
          </label>
          <input
            type="text"
            id="asset"
            value={assetNcr}
            onChange={(e) => setAssetNcr(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">
            User
          </label>
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
 
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            type="number"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.valueAsNumber)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="wireMac" className="block text-sm font-medium text-gray-700">
            Wire Mac
          </label>
          <input
            type="text"
            id="wireMac"
            value={wireMac}
            onChange={(e) => setWireMac(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="wirelessMac" className="block text-sm font-medium text-gray-700">
            WireLess MAC
          </label>
          <input
            type="text"
            id="wirelessMac"
            value={wirelessMac}
            onChange={(e) => setWirelessMac(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="memory" className="block text-sm font-medium text-gray-700">
            Memory
          </label>
          <input
            type="number"
            id="memory"
            value={memory}
            onChange={(e) => setMemory(e.target.valueAsNumber)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="processor" className="block text-sm font-medium text-gray-700">
            Procesor
          </label>
          <input
            type="text"
            id="processor"
            value={processor}
            onChange={(e) => setProcessor(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="processorSpeed" className="block text-sm font-medium text-gray-700">
            User
          </label>
          <input
            type="number"
            id="processorSpeed"
            value={processorSpeed}
            onChange={(e) => setProcessorSpeed(e.target.valueAsNumber)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="processorSpeed" className="block text-sm font-medium text-gray-700">
            Processor Speed
          </label>
          <input
            type="number"
            id="processorSpeed"
            value={processorSpeed}
            onChange={(e) => setProcessorSpeed(e.target.valueAsNumber)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="hardDisk" className="block text-sm font-medium text-gray-700">
            Hard Disk
          </label>
          <input
            type="number"
            id="hardDisk"
            value={hardDisk}
            onChange={(e) => setHardDisk(e.target.valueAsNumber)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="operatingSystem" className="block text-sm font-medium text-gray-700">
            Operating System
          </label>
          <input
            type="text"
            id="operatingSystem"
            value={operatingSystem}
            onChange={(e) => setOperatingSystem(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="computerName" className="block text-sm font-medium text-gray-700">
            Computer Name
          </label>
          <input
            type="text"
            id="computerName"
            value={computerName}
            onChange={(e) => setComputerName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
            Domain
          </label>
          <input
            type="text"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="opticalDriver" className="block text-sm font-medium text-gray-700">
            Optical Driver
          </label>
          <input
            type="text"
            id="opticalDriver"
            value={opticalDrive}
            onChange={(e) => setOpticalDrive(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="padLock" className="block text-sm font-medium text-gray-700">
            Pad Lock
          </label>
          <input
            type="text"
            id="padLock"
            value={padLock}
            onChange={(e) => setPadLock(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="flex space-x-2">
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Return
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComputerForm;