import BooksList from './BooksList'; // or wherever you created this
import AddBookForm from './AddBookForm'; // Same for AddForm

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AddBookForm />
      <BooksList />
    </div>
  );
}
export default AdminDashboard;