import React, { useEffect, useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 🔁 Centralized function to fetch notes
  const fetchNotes = () => {
    fetch('http://localhost:5000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('❌ Failed to fetch notes:', err));
  };

  // 🧠 Fetch notes on component load
  useEffect(() => {
    fetchNotes();
  }, []);

  // ➕ Handle form submission (add note)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = { title, content };

    fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    })
      .then(res => res.json())
      .then(() => {
        fetchNotes(); // Auto-refresh
        setTitle('');
        setContent('');
      })
      .catch(err => console.error('❌ Failed to save note:', err));
  };

  // 🗑️ Handle deleting a note
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        fetchNotes(); // Auto-refresh
      })
      .catch(err => console.error('❌ Failed to delete note:', err));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>📝 My Notes App</h1>

      {/* ➕ Add Note Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{
            display: 'block',
            marginBottom: '10px',
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
          }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          style={{
            display: 'block',
            marginBottom: '10px',
            width: '100%',
            height: '100px',
            padding: '10px',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ➕ Add Note
        </button>
      </form>

      {/* 📝 Notes List */}
      {notes.length === 0 ? (
        <p>No notes yet...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notes.map(note => (
            <li
              key={note._id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '5px',
                position: 'relative',
              }}
            >
              <strong>{note.title}</strong>
              <p>{note.content}</p>
              <button
                onClick={() => handleDelete(note._id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
