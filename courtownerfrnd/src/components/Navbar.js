import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css'; // Create this CSS module for styling

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/"> {/* Use the Link component directly */}
          <a className={styles.logoLink}>FoxBookingForBusiness</a>
        </Link>
      </div>
      <div className={styles.userIcon}>
        {/* Add an icon or an image for the user */}
      </div>
    </nav>
  );
};

export default Navbar;
