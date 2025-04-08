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
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.status !== 'pending') return res.status(400).json({ message: 'Request already processed' });

    const book = request.book;
    const student = request.student;

    if (book.copiesAvailable < 1) return res.status(400).json({ message: 'No copies available' });

    // Approve the request
    request.status = 'approved';
    await request.save();

    // Update book and user
    book.copiesAvailable -= 1;
    book.issuedCount += 1;
    await book.save();

    student.booksTaken.push(book._id);
    await student.save();

    res.status(200).json({ message: 'Book request approved', request });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Return Book - by student directly
exports.returnBook = async (req, res) => {
  const studentId = req.user._id;
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    const student = await User.findById(studentId);

    if (!book || !student) return res.status(404).json({ message: 'Book or student not found' });

    if (!student.booksTaken.includes(bookId)) {
      return res.status(400).json({ message: 'This book is not taken by the student' });
    }

    // Remove book from student's booksTaken list
    student.booksTaken = student.booksTaken.filter(id => id.toString() !== bookId);
    await student.save();

    // Update book inventory
    book.copiesAvailable += 1;
    book.issuedCount -= 1;
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBookRequests = async (req, res) => {
  try {
    const requests = await BookRequest.find()
      .populate('student', 'name email rollNo') // you can customize what fields to show
      .populate('book', 'title author');

    res.status(200).json({ message: 'All book requests', requests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  const studentId = req.user._id;

  try {
    const requests = await BookRequest.find({ student: studentId })
      .populate('book', 'title author') // populate book title and author
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({ message: 'Requests fetched', requests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
