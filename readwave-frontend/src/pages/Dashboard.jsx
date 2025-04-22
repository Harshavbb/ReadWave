import React, { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpenText, Search, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import calendarImage from '../assets/calender2.svg';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [showBooks, setShowBooks] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [bookIdToRequest, setBookIdToRequest] = useState('');
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [myRequests, setMyRequests] = useState([]);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showFinesModal, setShowFinesModal] = useState(false);
  const [bookIdToReturn, setBookIdToReturn] = useState('');


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await API.get('/users/profile');
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    const fetchBooks = async () => {
      try {
        const res = await API.get('/books');
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
    fetchUserProfile();
  }, [navigate]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookRequest = async () => {
    if (!bookIdToRequest.trim()) return alert('Please enter a Book ID');

    try {
      const res = await API.post('/book-requests/request', {
        bookId: bookIdToRequest,
      });
      alert('Book request submitted!');
      setShowRequestModal(false);
      setBookIdToRequest('');
    } catch (err) {
      console.error('Request error:', err);
      alert(err.response?.data?.message || 'Something went wrong!');
    }
  };

  const fetchMyRequests = async () => {
    try {
      const res = await API.get('/book-requests/my-requests');
      setMyRequests(res.data.requests); // ✅ fix: use setMyRequests instead of setRequests
      setShowRequestsModal(true);
    } catch (err) {
      console.error('Error fetching requests:', err);
      alert('Failed to load your requests.');
    }
  };
  
  const handleBookReturn = async () => {
    if (!bookIdToReturn.trim()) return alert('Please enter a Book ID');
  
    try {
      const res = await API.post('/book-requests/return', {
        bookId: bookIdToReturn,
      });
      alert('Book returned successfully!');
      setBookIdToReturn('');
      setShowReturnModal(false);
    } catch (err) {
      console.error('Return error:', err);
      alert(err.response?.data?.message || 'Something went wrong!');
    }
  };
  

  if (!user) {
    return <div className="text-center mt-20 text-lg text-gray-600">Loading user data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* ✅ User Info */}
        <Card className="col-span-1 shadow-xl rounded-2xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
            <div className="border-t pt-4 text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Roll No:</span> {user.rollNo}</p>
              <p><span className="font-medium">Department:</span> {user.department}</p>
              <p><span className="font-medium">Year:</span> {user.year}</p>
              <p><span className="font-medium">Section:</span> {user.section}</p>
            </div>
            <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white font-medium mt-2">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </CardContent>
        </Card>

        {/* ✅ Calendar */}
        <Card className="col-span-2 shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Calendar</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <img src={calendarImage} alt="Calendar Illustration" className="w-64 h-64 object-contain" />
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
                classNames={{
                  day_selected: 'bg-indigo-600 text-white rounded-full',
                  day_today: 'font-bold',
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Books */}
      <div className="bg-white rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Available Books</h2>
          <Button onClick={() => setShowBooks(!showBooks)} className="bg-indigo-600 hover:bg-indigo-700">
            <BookOpenText className="mr-2 h-5 w-5" /> {showBooks ? 'Hide Books' : 'Show Books'}
          </Button>
        </div>
        {showBooks && (
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <Search className="text-gray-500" />
              <Input
                type="text"
                placeholder="Search by name or author"
                className="w-full max-w-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <Card key={book._id} className="p-4 border rounded-xl shadow space-y-1">
                    <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <p className="text-xs text-gray-500 mt-2"><span className="font-medium">ID:</span> {book._id}</p>
                    <p className="text-xs text-gray-500"><span className="font-medium">Available Copies:</span> {book.copiesAvailable}</p>
                    <p className="text-xs text-gray-500"><span className="font-medium">Department:</span> {book.department}</p>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-gray-500">No books found.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Student Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Student Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowRequestModal(true)}>Request Book</Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={fetchMyRequests}>View Requests</Button>
          <Button className="bg-yellow-600 hover:bg-yellow-700">Return Book</Button>
      
<Button className="bg-rose-600 hover:bg-rose-700" onClick={() => setShowFinesModal(true)}>View Fines</Button>


        </div>
      </div>

      {/* ✅ Book Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Request a Book</h3>
            <Input
              type="text"
              placeholder="Enter Book ID"
              value={bookIdToRequest}
              onChange={(e) => setBookIdToRequest(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowRequestModal(false)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleBookRequest}>Submit</Button>
            </div>
          </div>
        </div>
      )}

{showFinesModal && (
  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
      <h3 className="text-lg font-bold mb-4">Your Fine</h3>
      <p className="text-gray-700 text-xl">
        ₹ {user?.fine ?? 0}
      </p>
      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={() => setShowFinesModal(false)}>Close</Button>
      </div>
    </div>
  </div>
)}


      {/* ✅ View Requests Modal */}
      {showRequestsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">My Book Requests</h3>
            {myRequests.length > 0 ? (
              <div className="space-y-4">
                {myRequests.map((req) => (
                  <div key={req._id} className="p-4 border rounded-md bg-gray-50">
                    <p><strong>Title:</strong> {req.book?.title || 'N/A'}</p>
                    <p><strong>Author:</strong> {req.book?.author || 'N/A'}</p>
                    <p><strong>Status:</strong> <span className={`font-medium ${req.status === 'approved' ? 'text-green-600' : req.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>{req.status}</span></p>
                    <p className="text-sm text-gray-500"><strong>Requested At:</strong> {new Date(req.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">You haven't made any requests yet.</p>
            )}
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => setShowRequestsModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
