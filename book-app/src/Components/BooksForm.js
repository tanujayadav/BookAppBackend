import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';

function BooksForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!title || !author || !genre || !isbn || !publishDate) {
      alert('Please fill in all fields.');
      return false;
    }
    return true;
  };

  async function handleCreate() {
    if (!validateInputs()) return;

    try {
      let bookDetails = {
        title,
        author,
        genre,
        isbn,
        publishDate
      };

      let response = await fetch('https://localhost:7038/api/Book', {
        method: 'POST',
        body: JSON.stringify(bookDetails),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Server Response:', responseData);
        alert('Creation Unsuccessful: ' + (responseData.message || 'Unknown error occurred.'));
      } else {
        alert('Book Created Successfully');
        navigate('/books');  // Navigate to books list or other page
      }
    } catch (error) {
      console.error('Error during creation:', error);
      alert('Creation Unsuccessful: ' + error.message);
    }
  }

  const handleBackClick = () => {
    navigate('/books'); // Navigate back to the books list or other page
  };

  return (
    <div>
      <Navbar bg="black" variant="light" expand="lg">
        <Nav.Link onClick={handleBackClick} style={{ color: 'white' }}>
          <FaArrowLeft style={{ fontSize: '24px' }} />
        </Nav.Link>
        <Navbar.Brand as={Link} to="/" style={{ fontFamily: 'Lobster, cursive', color: 'white' }}>
          
          {' '}
          BookStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/admin-view-books" style={{ color: 'white' }}>Books</Nav.Link>
            <Nav.Link onClick={() => navigate('/login')} style={{ color: 'white' }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <MDBRow className="justify-content-center w-100">
          <MDBCol md="8" lg="6" xl="5">
            <MDBCard>
              <MDBCardBody className="p-4">
                <h2 className="text-center mb-4">Book Registration</h2>
                <MDBRow>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Genre" type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="ISBN" type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Publish Date" type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} required />
                  </MDBCol>
                </MDBRow>
                <div className="text-center">
                  <Button onClick={handleCreate} color="primary" variant="contained" style={{ marginRight: '10px' }}>
                    Create
                  </Button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default BooksForm;
