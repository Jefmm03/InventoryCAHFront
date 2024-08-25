
import React from 'react'; 
import Title from '../components/Title';

const Home: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 p-8">
        <Title
          icon="/public/id-badge-solid.svg"
          title="Badges"
          linkTo="/table"
          backgroundColor="#ff0000"
        />
        <Title
          icon="/public/mobile-screen-button-solid.svg"
          title="Cellphones"
          linkTo="/cellPhoneTable"
          backgroundColor="#c0c0c0"
        />
        <Title
          icon="/public/computer-solid.svg"
          title="Computers"
          linkTo="/computerTable"
          backgroundColor="#ff0000"
        />
        <Title
          icon="/public/plug-solid.svg"
          title="Dockings"
          linkTo="/dockingTable"
          backgroundColor="#c0c0c0"
        />
        <Title
          icon="/public/desktop-solid.svg"
          title="Monitors"
          linkTo="/monitorTable"
          backgroundColor="#ff0000"
        />
        <Title
          icon="/public/print-solid.svg"
          title="Ricoh"
          linkTo="/ricohTable"
          backgroundColor="#c0c0c0"
        />
        <Title
          icon="/public/cloud-solid.svg"
          title="Static IPs"
          linkTo="/staticIPTable"
          backgroundColor="#ff0000"
        />
        <Title
          icon="/public/mobile-screen-button-solid.svg"
          title="Telephones"
          linkTo="/telephoneTable"
          backgroundColor="#c0c0c0"
        />
        <Title
          icon="/public/book-solid.svg"
          title="Codes"
          linkTo="/telCodeTable"
          backgroundColor="#ff0000"
        />
        <Title
          icon="/public/user-solid.svg"
          title="Users"
          linkTo="/Users"
          backgroundColor="#c0c0c0"
        />
      </div>
    </>
  );
};

export default Home; 
