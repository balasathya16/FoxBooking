import React from 'react';
import CreateCourtForm from '../components/court/CreateCourtForm';
import '../../styles/Global.css'; // Import the global CSS file


const CreateCourtPage = () => {
  return (
    <div>
      <h1>Create New Court</h1>
      <CreateCourtForm />
    </div>
  );
};

export default CreateCourtPage;
