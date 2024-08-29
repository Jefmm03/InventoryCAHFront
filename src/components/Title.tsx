import React from 'react'; 
import { useNavigate } from 'react-router-dom';

type TitleProps = {
  icon: string;
  title: string;
  linkTo: string;
  backgroundColor: string;
};

const Title: React.FC<TitleProps> = ({ icon, title, linkTo, backgroundColor }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(linkTo)}
      className={`flex  w-full h-32 ms-10 text-white rounded-lg cursor-pointer transform transition-transform hover:scale-95`}
      style={{ backgroundColor }}
    >
      
      <div className="flex flex-col sm:flex-row items-center">
        <img
          src={icon}
          alt={`${title} icon`}
          className="w-36 h-16 mb-6 sm:mb-0 sm:mr-2" 
        />
        <h3 className="text-xl font-semibold text-center">{title}</h3> 
      </div>
    </div>
  );
};

export default Title;

