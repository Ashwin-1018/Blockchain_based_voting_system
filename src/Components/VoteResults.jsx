import React, { useState, useEffect } from 'react';
import { db } from '../Firebase'; // Firebase config
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // For Firebase Authentication

const VoteResults = () => {
  const [tallied, setTallied] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Firebase authentication
  const auth = getAuth();

  // Fetch votes from Firestore
  const fetchVotes = async () => {
    try {
      const voteCollection = collection(db, 'votes');
      const voteSnapshot = await getDocs(voteCollection);
      const allVotes = voteSnapshot.docs.map(doc => doc.data());

      let results = {};

      allVotes.forEach((vote) => {
        const candidate = vote.candidate;
        if (candidate) {
          results[candidate] = (results[candidate] || 0) + 1;
        }
      });

      const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);
      setTallied(sortedResults);
      setError('');
      setSuccessMessage('');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch or process votes.');
    }
  };

  // Delete all votes from Firestore (only for admin users)
  const handleDeleteAllVotes = async () => {
    try {
      const user = auth.currentUser; // Check if the user is authenticated (you can use `firebase.auth()` for this)

      if (user && user.email === "admin@example.com") { // Or check if user has admin role (using custom claims)
        const voteCollection = collection(db, 'votes');
        const voteSnapshot = await getDocs(voteCollection);

        const deletePromises = voteSnapshot.docs.map((voteDoc) =>
          deleteDoc(doc(db, 'votes', voteDoc.id))
        );
        
        await Promise.all(deletePromises);

        setTallied([]);
        setSuccessMessage('✅ All votes have been successfully deleted.');
        setError('');
      } else {
        setError('❌ Only an admin can delete all votes.');
        setSuccessMessage('');
      }
    } catch (err) {
      console.error(err);
      setError('❌ Failed to delete votes.');
      setSuccessMessage('');
    }
  };

  // Get the winners based on vote count
  const getWinners = () => {
    if (tallied.length === 0) return [];
    const highestCount = tallied[0][1];
    return tallied.filter(([_, count]) => count === highestCount);
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        background: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1rem' }}>
        🗳️ Admin Vote Tally
      </h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      {tallied.length > 0 ? (
        <>
          <h3 style={{ textAlign: 'center', color: '#4CAF50' }}>
            🏆 Winner{getWinners().length > 1 ? 's' : ''}:{' '}
            {getWinners().map(([name], i) => (
              <span key={name}>
                {name}
                {i < getWinners().length - 1 ? ', ' : ''}
              </span>
            ))}{' '}
            with {tallied[0][1]} vote(s)
          </h3>

          <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem' }}>
            {tallied.map(([candidate, count]) => (
              <li
                key={candidate}
                style={{
                  padding: '0.5rem 1rem',
                  margin: '0.5rem 0',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1rem',
                }}
              >
                <strong>{candidate}</strong>
                <span>{count} vote(s)</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleDeleteAllVotes}
            style={{
              display: 'block',
              width: '100%',
              marginTop: '2rem',
              backgroundColor: '#e53935',
              color: 'white',
              padding: '0.75rem',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            🗑️ Delete All Votes
          </button>
        </>
      ) : (
        <p style={{ textAlign: 'center', color: '#777' }}>No votes have been cast yet.</p>
      )}
    </div>
  );
};

export default VoteResults;
