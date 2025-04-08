const IssueRequest = require('../models/IssueRequest');
const Book = require('../models/Book');
const User = require('../models/User');

// Student requests a book
exports.requestBook = async (req, res) => {
  const { bookId } = req.params;
  const studentId = req.user.id;

  try {
    const existing = await IssueRequest.findOne({ student: studentId, book: bookId, status: 'pending' });
    if (existing) return res.status(400).json({ message: 'Request already pending for this book' });

    const request = await IssueRequest.create({ student: studentId, book: bookId });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin fetches all requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await IssueRequest.find().populate('student', 'name email').populate('book', 'title');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin approves/rejects request
exports.respondToRequest = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'

  try {
    const request = await IssueRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (status === 'approved') {
      const book = await Book.findById(request.book);
      if (book.copiesAvailable < 1) return res.status(400).json({ message: 'No copies available' });

      book.copiesAvailable -= 1;
      book.issuedCount += 1;
      await book.save();

      const student = await User.findById(request.student);
      student.booksTaken.push(request.book);
      await student.save();
    }

    request.status = status;
    await request.save();

    res.status(200).json({ message: `Request ${status}`, request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
