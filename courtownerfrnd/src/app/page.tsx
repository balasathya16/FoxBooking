import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import '../../styles/Global.css'; // Import the global CSS file

export default function Home() {
  return (
    <div>
      {/* Include the Navbar at the top of the page */}
      <Navbar />

      <main className="">
        <div className="">
          {/* Content here */}
        </div>

        <div className="">
          {/* Content here */}
        </div>

        <div className="">
          {/* Content here */}
        </div>
      </main>
    </div>
  );
}
