// src/components/VoteForm.jsx
import React, { useState } from 'react';
import { saveVote } from '../DB/Indexdb';
import { v4 as uuidv4 } from 'uuid';

const CANDIDATES = ['TVk', 'DMK', 'ADMK', 'DMDK', 'PBK', 'BJP', 'NTK', 'Congress'];

const VoteForm = ({ onVoteSubmitted }) => {
  const [candidate, setCandidate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!candidate) {
      setMessage('❗ Please select a candidate.');
      return;
    }

    const vote = {
      id: uuidv4(),
      candidate,
      timestamp: new Date().toISOString(),
    };

    await saveVote(vote);

    setCandidate('');
    setMessage('✅ Vote submitted successfully!');
    onVoteSubmitted();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        borderRadius: '12px',
        background: '#f0f8ff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif'
      }}
    >
    <h1 style={{ textAlign: 'center', color: '#333' }}>BlockChain Voting System</h1>
      <h2 style={{ textAlign: 'center', color: '#333' }}>🗳️ Cast Your Vote</h2>

      <div style={{ marginBottom: '1rem' }}>
        {CANDIDATES.map((c) => (
          <div key={c} style={{ margin: '0.5rem 0' }}>
            <label style={{ fontSize: '1rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="candidate"
                value={c}
                checked={candidate === c}
                onChange={(e) => setCandidate(e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
              {c}
            </label>
          </div>
        ))}
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Submit Vote
      </button>

      {message && (
        <p style={{ marginTop: '1rem', textAlign: 'center', color: candidate ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </form>
  );
};

export default VoteForm;
