import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
      <p style={{ margin: '0' }}>SCAAN &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
