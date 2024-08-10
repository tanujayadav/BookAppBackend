import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  
  const navigate = useNavigate();

  async function Signup() {
    try {
      let item = { username, password, email, address, phoneNo };
      let result = await fetch('https://localhost:7038/api/Signup', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const responseData = await result.json();
      
      if (!result.ok) {
        // Handle HTTP errors
        alert('Signup Unsuccessful: ' + (responseData.message || JSON.stringify(responseData)));
      } else {
        if (responseData.status !== 400) {
          alert('Signup Successful');
          navigate('/login');
        } else {
          alert('Signup Unsuccessful: ' + (responseData.message || 'Unknown error'));
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup Unsuccessful: ' + error.message);
    }
  }

  const handleSignup = () => {
    Signup();
  }

  return (
    <MDBContainer fluid className='p-4' style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h3 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: '#333' }}>
            Welcome To<br />
            <span style={{ color: '#007bff', fontFamily: 'Lobster, cursive' }}>BookApp</span>
          </h3>
          <p className='px-3' style={{ color: '#555' }}>
            "Welcome to BookApp – your reliable solution for cooking gas cylinder delivery. With our easy-to-use app, you can book gas cylinders in just a few taps, ensuring your kitchen never runs out of fuel. Enjoy fast delivery, secure payments, and exceptional customer service. Experience the convenience of hassle-free gas bookings with BookApp today!"
          </p>
        </MDBCol>
        <MDBCol md='6' className='d-flex align-items-center justify-content-center'>
          <MDBCard className='my-5 bg-light shadow'>
            <MDBCardBody className='p-5'>
              <h4 className="text-center mb-4">Sign Up</h4>
              <MDBRow>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required type="text" />
                </MDBCol>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} required type='email' />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </MDBCol>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Phone Number' type='text' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
              <Button onClick={handleSignup} color="primary" variant="contained" fullWidth>
                Signup
              </Button>
              <p className='text-center mt-3'>
                Already have an account? <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login</a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignupForm;
