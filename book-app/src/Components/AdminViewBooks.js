import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';  // Importing Font Awesome icons
 // Replace with your book image

function AdminViewBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchGenre, setSearchGenre] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();

  const fetchBooks = () => {
    fetch('https://localhost:7038/api/Book/GetBooks')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    fetch(`https://localhost:7038/api/Book/Delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setBooks(books.filter(book => book.bookId !== id));
          alert('Book details deleted successfully!');
        } else {
          console.error('Error deleting book:', response);
        }
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    fetch(`https://localhost:7038/api/Book/Update/${selectedBook.bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedBook)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating book');
        }
        return response.json();
      })
      .then(data => {
        setBooks(books.map(book => (book.bookId === selectedBook.bookId ? selectedBook : book)));
        setShowEditModal(false);
        alert('Book details updated successfully!');
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  };

  const filteredBooks = books.filter(book => book.genre.toLowerCase().includes(searchGenre.toLowerCase()));

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar bg="black" variant="light" expand="lg">
        <Navbar.Brand as={Link} to="/" style={{ fontFamily: 'Lobster, cursive', color: 'white' }}>
          
          {' '}
          BookApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            <Nav.Link onClick={() => navigate('/login')} style={{ color: 'white' }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-4">
        <h2>Books</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by genre"
            value={searchGenre}
            onChange={(e) => setSearchGenre(e.target.value)}
          />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Publish Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => (
              <tr key={book.bookId}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>{new Date(book.publishDate).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-link p-0 mr-2" onClick={() => handleEdit(book)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-link p-0" onClick={() => handleDelete(book.bookId)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/book-form" className="btn btn-primary">Create</Link>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedBook && (
              <Form>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedBook.title}
                    onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedBook.author}
                    onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Genre</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedBook.genre}
                    onChange={(e) => setSelectedBook({ ...selectedBook, genre: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedBook.isbn}
                    onChange={(e) => setSelectedBook({ ...selectedBook, isbn: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Publish Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={new Date(selectedBook.publishDate).toISOString().split('T')[0]}
                    onChange={(e) => setSelectedBook({ ...selectedBook, publishDate: e.target.value })}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdminViewBooks;
