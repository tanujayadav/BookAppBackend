import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@material-ui/core';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

function Login({ setRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const encodedPassword = encodeURIComponent(password);

  async function login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter an email address in valid format");
      return;
    }

    if (email === '' || password === '') {
      alert("Please fill in all fields");
      return;
    }

    try {
      let item = { email, password };
      let result = await fetch(`https://localhost:7038/api/Login?email=${email}&password=${encodedPassword}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      let response = await result.json();
      console.log(response);

      if (result.ok) {
        setRole(response.role);
        localStorage.setItem("role", response.role);

        // Fetch the customer ID after a successful login
        fetchCustomerIdByEmail(email);

        alert('Login Successful');
        navigate('/Books');
      } else {
        alert('Login Unsuccessful: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login Unsuccessful: ' + error.message);
    }
  }

  const fetchCustomerIdByEmail = async (email) => {
    try {
      const response = await fetch(`https://localhost:7038/api/Signup/GetSignupIdByEmail?email=${email}`, {});
      const jsonData = await response.json();
      console.log('Customer ID:', jsonData);
      localStorage.setItem('CustomerId', jsonData);
    } catch (error) {
      console.error('Error fetching customer ID:', error);
    }
  };

  return (
    <MDBContainer fluid style={{ background: 'linear-gradient(135deg, #FFAF7B 0%, #D76D77 50%, #3A1C71 100%)', minHeight: '100vh' }}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol sm='12' md='6' lg='4'>
          <MDBCard className='bg-white my-5' style={{ borderRadius: '1rem', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <MDBCardBody className='p-5'>
              <h2 className='fw-bold mb-4 text-center'>Login</h2>
              <p className='text-black-50 mb-4 text-center'>Please enter your login and password!</p>
              <h5>Email Address</h5>
              <MDBInput wrapperClass='mb-4' value={email} onChange={(e) => setEmail(e.target.value)} type='email' size='lg' />
              <h5>Password</h5>
              <div style={{ position: 'relative' }}>
                <MDBInput
                  wrapperClass='mb-4'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  size='lg'
                />
                <Button
                  type='button'
                  onClick={toggleShowPassword}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </div>
              <Button
                onClick={login}
                color='primary'
                variant='contained'
                fullWidth
                style={{ marginTop: '1rem' }}
              >
                Login
              </Button>
              <p className='text-center mt-4'>
                New User? <a href='/'>Create Account</a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
