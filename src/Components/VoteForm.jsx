import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase'; // Firebase config
import { v4 as uuidv4 } from 'uuid';

const CANDIDATES = [
  'TVk - Vijay', 'DMK - Stalin', 'ADMK - EPS & OPS', 'DMDK - Cap',
  'PBK - mani', 'BJP - modi', 'NTK - Seeman', 'Congress - Rahul'
];

const VoteForm = ({ onVoteSubmitted, userId }) => {
  const [candidate, setCandidate] = useState('');
  const [message, setMessage] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const checkVotingStatus = async () => {
      if (!userId) return;

      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists() && userSnapshot.data().hasVoted) {
        setHasVoted(true);
      }
    };

    checkVotingStatus();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage('⚠️ You must be logged in to vote.');
      return;
    }

    if (hasVoted) {
      setMessage('❗ You have already voted.');
      return;
    }

    if (!candidate) {
      setMessage('❗ Please select a candidate.');
      return;
    }

    try {
      const vote = {
        id: uuidv4(),
        candidate,
        timestamp: new Date().toISOString(),
      };

      // Save vote
      await addDoc(collection(db, 'votes'), vote);

      // Mark user as voted
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { hasVoted: true }, { merge: true });

      setCandidate('');
      setMessage('✅ Vote submitted successfully!');
      setHasVoted(true);
      onVoteSubmitted();
    } catch (err) {
      console.error("Vote submission error:", err);
      setMessage('❌ Failed to submit vote. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h1 style={{ textAlign: 'center' }}>🗳️ Cast Your Vote</h1>

      <div style={{ marginBottom: '1rem' }}>
        {CANDIDATES.map((c) => (
          <div key={c} style={{ margin: '0.5rem 0' }}>
            <label>
              <input
                type="radio"
                name="candidate"
                value={c}
                checked={candidate === c}
                onChange={(e) => setCandidate(e.target.value)}
                disabled={hasVoted}
              />
              {c}
            </label>
          </div>
        ))}
      </div>

      <button type="submit" style={buttonStyle} disabled={hasVoted}>
        Submit Vote
      </button>

      {message && (
        <p style={{
          marginTop: '1rem',
          textAlign: 'center',
          color: message.includes('✅') ? 'green' : 'red'
        }}>
          {message}
        </p>
      )}
    </form>
  );
};

const formStyle = {
  maxWidth: '400px',
  margin: '2rem auto',
  padding: '2rem',
  borderRadius: '12px',
  background: '#f0f8ff',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif'
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default VoteForm;
