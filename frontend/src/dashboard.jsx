import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('Access Denied. You are not logged in!');
      setLoading(false);
      return;
    }

    fetch('http://localhost:5000/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Guard blocked you! Token is invalid.');
        return res.json();
      })
      .then((data) => {
        setProfileData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  if (loading) return <div style={{ padding: '20px' }}>Checking security clearance...</div>;

  if (error) {
    return (
      <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: 'red' }}>🚫 Security Guard Alert</h2>
        <p>{error}</p>
        <button onClick={() => window.location.href = '/login'} style={{ padding: '10px 20px', cursor: 'pointer' }}>Go to Login Page</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <div style={{ background: '#e6f4ea', border: '1px solid #137333', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ color: '#137333' }}>🔓 Passed the Guard!</h2>
        <p><strong>Message:</strong> {profileData?.message}</p>
        <p><strong>Email:</strong> {profileData?.user?.email}</p>
        <button onClick={handleLogout} style={{ marginTop: '20px', padding: '8px 16px', background: '#d93025', color: '#fff', border: 'none', cursor: 'pointer' }}>Log Out</button>
      </div>
    </div>
  );
}