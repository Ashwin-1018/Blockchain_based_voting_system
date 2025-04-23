# Secure Voting App

A simple, secure, and privacy-preserving voting application built with React and IndexedDB for client-side storage. This app allows users to vote for political candidates in an election, tally the votes, and display the results in real time. Admins can also view the tally and delete all votes when necessary.

## Features

- **Secure Voting:** Votes are stored locally in IndexedDB, ensuring no external data leakage.
- **Real-Time Results:** Tally votes instantly as they are submitted, sorted by the number of votes.
- **Admin Control:** Admins can view the vote tally, see the winner(s), and delete all votes if needed.
- **Responsive UI:** Designed to be accessible and mobile-friendly, with a clean user interface.

## Tech Stack

- **Frontend:** React
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Client-side Database:** IndexedDB (via `idb` library)
- **Styling:** Custom CSS-in-JS styles for a modern and minimal design

## Getting Started

To get started with the project locally, follow the steps below.

### Prerequisites

Make sure you have `Node.js` and `npm` installed on your machine. You can check if you have them installed by running the following commands:

```bash
node -v
npm -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/voting-app.git
   cd voting-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   This will start the app in development mode. Open `http://localhost:3000` in your browser to view the app.

### Features in Detail

1. **Voting Form:**
   - Voters select a candidate from a list of political parties.
   - Votes are submitted, and a confirmation message is displayed.

2. **Vote Results:**
   - Admins can view the vote tally, sorted in descending order.
   - The top candidate(s) are displayed as the winner(s).
   - Admins can delete all votes from the database, clearing all the data.

3. **Voting Storage:**
   - All votes are stored locally in IndexedDB to maintain data privacy.
   - The `idb` library is used for interacting with the IndexedDB API.

### Directory Structure

```
/voting-app
├── /public
│   ├── index.html
│   └── ...
├── /src
│   ├── /components
│   │   ├── VoteForm.jsx
│   │   └── VoteResults.jsx
│   ├── /DB
│   │   ├── Indexdb.js
│   ├── App.jsx
│   ├── index.js
│   └── ...
├── package.json
├── .gitignore
└── README.md
```

### Components

1. **VoteForm:** A form component where users select a candidate and submit their vote.
2. **VoteResults:** Displays the total vote count for each candidate and shows the winner(s).
3. **DB/Indexdb:** Contains methods for interacting with IndexedDB to save and retrieve votes.

## Usage

1. **Casting a Vote:**
   - Select a candidate from the dropdown.
   - Click "Vote" to submit your vote.
   - A confirmation message will appear after submission.

2. **Viewing Results:**
   - The Admin can view the tally of votes.
   - The winner(s) will be displayed at the top.
   - If there are multiple candidates with the same highest vote count, they will all be displayed as winners.

3. **Deleting Votes:**
   - The Admin can delete all stored votes by clicking the "Delete All Votes" button.

## Contributing

If you'd like to contribute to this project, feel free to open an issue or submit a pull request. Please make sure to follow the standard GitHub flow:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add feature'`).
5. Push to your fork (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Future Improvements

- Implement authentication and secure vote encryption.
- Add a timer for voting deadlines.
- Improve error handling and provide feedback during data fetching.

---