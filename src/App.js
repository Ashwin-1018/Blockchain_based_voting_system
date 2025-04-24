import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import VoteForm from './Components/VoteForm';
import VoteResults from './Components/VoteResults';
import Login from './Components/Login';

function AppWrapper() {
  const [userId, setUserId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleVoteSubmitted = () => {
    setRefresh(!refresh); // Trigger re-render of the VoteResults component
  };

  return (
    <Router>
      <AppRoutes
        userId={userId}
        setUserId={setUserId}
        handleVoteSubmitted={handleVoteSubmitted}
        refresh={refresh}
      />
    </Router>
  );
}

const AppRoutes = ({ userId, setUserId, handleVoteSubmitted, refresh }) => {
  const navigate = useNavigate();

  const handleLogin = (id) => {
    setUserId(id);
    navigate("/vote");
  };

  // Redirect to login if not logged in
  if (!userId) {
    navigate('/');
  }

  return (
    <div style={{ padding: '1rem' }}>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/vote" element={<VoteForm userId={userId} onVoteSubmitted={handleVoteSubmitted} />} />
        <Route path="/results" element={<VoteResults key={refresh} />} />
      </Routes>
    </div>
  );
};

export default AppWrapper;
