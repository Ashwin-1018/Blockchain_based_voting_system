// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import VoteForm from './Components/VoteForm';
import VoteResults from './Components/VoteResults';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleVoteSubmitted = () => {
    setRefresh(!refresh);
  };

  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<VoteForm onVoteSubmitted={handleVoteSubmitted} />} />
          <Route path="/results" element={<VoteResults key={refresh} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
