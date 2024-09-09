import React from 'react';

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
        <p className="text-lg font-semibold text-center">{message}</p>
        <div className="mt-4 flex justify-center">

        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 

