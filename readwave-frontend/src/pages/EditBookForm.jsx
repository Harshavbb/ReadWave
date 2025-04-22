import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/axios';

const EditBookForm = () => {
  const { id } = useParams(); // Get book ID from the URL params
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    copiesAvailable: 0,
    department: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Updated to useNavigate

  // Fetch book details on mount
  useEffect(() => {
    console.log('Fetching book with ID:', id); // Debugging
    const fetchBook = async () => {
      try {
        const response = await API.get(`/books/${id}`);
        console.log('Fetched book data:', response.data); // Debugging
        setBook(response.data); // Populate form with book data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book details:', err);
        alert('Error loading book data.');
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to edit a book.');
      return;
    }

    try {
      const response = await API.put(`/books/${id}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Book updated successfully!');
      navigate('/admin-dashboard'); // Redirect to admin-dashboard after update
    } catch (err) {
      console.error('Error updating book:', err.response ? err.response.data : err.message);
      alert('Failed to update book.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Author Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* ISBN Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Copies Available Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Copies Available</label>
            <input
              type="number"
              name="copiesAvailable"
              value={book.copiesAvailable}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Department Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={book.department}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Book
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
