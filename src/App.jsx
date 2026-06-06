import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import MemberList from './components/MemberList';
import BorrowingRecords from './components/BorrowingRecords';

function App() {
  return (
    <LibraryProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/members" element={<MemberList />} />
              <Route path="/borrowings" element={<BorrowingRecords />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LibraryProvider>
  );
}

export default App;