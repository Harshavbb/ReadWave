import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import API from '../utils/axios'; // Assuming you have API configured

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await API.get('/books');
        setBooks(response.data);
      } catch (err) {
        setError('Error fetching books.');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await API.delete(`/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
      alert('Book deleted successfully!');
    } catch (err) {
      console.error('Error deleting book:', err);
      alert('Failed to delete book.');
    }
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Books List</h1>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md">
            <div>
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
            <div>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-500 text-white p-2 rounded-md mr-2"
              >
                Delete
              </button>
              <Link to={`/edit-book/${book._id}`}>
                <button className="bg-yellow-500 text-white p-2 rounded-md">
                  Edit
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
