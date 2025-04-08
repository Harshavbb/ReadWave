// controllers/bookRequestController.js
const BookRequest = require('../models/BookRequest');
const Book = require('../models/Book');
const User = require('../models/User'); 

exports.requestBook = async (req, res) => {
  const { bookId } = req.body;
  const studentId = req.user._id;

  try {
    const existingRequest = await BookRequest.findOne({ student: studentId, book: bookId, status: 'pending' });
    if (existingRequest) {
      return res.status(400).json({ message: 'You already requested this book' });
    }

    const request = await BookRequest.create({
      student: studentId,
      book: bookId
    });

    res.status(201).json({ message: 'Book request submitted', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveRequest = async (req, res) => {
    const requestId = req.params.id;
  
    try {
      const request = await BookRequest.findById(requestId).populate('book').populate('student');
  
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
  
      if (request.status !== 'pending') {
        return res.status(400).json({ message: 'Request already processed' });
      }
  
      const book = request.book;
      const student = request.student;
  
      if (book.copiesAvailable < 1) {
        return res.status(400).json({ message: 'No copies available' });
      }
  
      // ✅ Approve the request
      request.status = 'approved';
      await request.save();
  
      // ✅ Update Book copies
      book.copiesAvailable -= 1;
      book.issuedCount += 1;
      await book.save();
  
      // ✅ Update student's booksTaken list
      student.booksTaken.push(book._id);
      await student.save();
  
      res.status(200).json({ message: 'Book request approved', request });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };