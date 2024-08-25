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
      className={`flex items-center justify-center w-60 h-32 m-3 text-white rounded-lg cursor-pointer transform transition-transform hover:scale-95`}
      style={{ backgroundColor }}
    >
      <img src={icon} alt={`${title} icon`} className="w-8 h-8 mr-3" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
};

export default Title;
