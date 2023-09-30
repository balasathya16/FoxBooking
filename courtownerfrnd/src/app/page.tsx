import React from 'react';
import Link from 'next/link';

const SamplePage = () => {
  return (
    <div>
      <h1>Sample Page</h1>
      <p>This is a sample page content.</p>

      <Link href="/create-court">
        Go to Create Court
      </Link>
    </div>
  );
};

export default SamplePage;
