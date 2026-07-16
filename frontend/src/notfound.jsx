import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #022c22 0%, #032541 50%, #000000 100%)',
      color: '#ffffff',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    },
    errorCode: { fontSize: '96px', fontWeight: '800', margin: 0, color: '#10b981' },
    title: { fontSize: '24px', fontWeight: '700', margin: '10px 0' },
    message: { color: '#a1a1aa', marginBottom: '30px', maxWidth: '400px' },
    btn: {
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '700',
      cursor: 'pointer',
      backgroundColor: '#10b981',
      color: '#ffffff',
      fontSize: '14px',
      textDecoration: 'none',
      display: 'inline-block'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.message}>
        Oops! The page you are looking for doesn't exist or has been moved by the system guard.
      </p>
      
      <Link to="/" style={styles.btn}>
        Back to Security Login
      </Link>
    </div>
  );
}