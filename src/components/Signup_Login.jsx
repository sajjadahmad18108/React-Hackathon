import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './Signup.css';
import { auth } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpActive, setisSignUpActive] = useState(true);
  const [error, setError] = useState("");

  let submitHandler = (e) => {
    e.preventDefault();
    // console.log("the form is submitting")
  }

  let handlerMehodChange = () => {
    setisSignUpActive(!isSignUpActive);
    setError('');
  }

  let handlerSignIn = () => {
    if (!email || !password) {
      setError("Please Enter email and password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(response => {
        const user = response.user;
        navigate('../Dashboard');
      })
      .catch(error => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  let handlerSignUp = () => {
    if (!email || !password) {
      setError("Please Enter email and password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(response => {
        const user = response.user;
        // Clear the form fields after successful signup
        setEmail('');
        setPassword('');
        setError(''); // Optionally clear any error messages
        // navigate('/dashboard')  // Uncomment this if you want to navigate to the dashboard
      })
      .catch(error => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <div className='main-container'>
      <form onSubmit={submitHandler}>
        <h1> {isSignUpActive ? <span style={{ color: "#4caf50" }}>Signin</span> : <span style={{ color: "#2196f3" }}>Signup</span>} </h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        {error && <p className='error-message'> {error} </p>}

        {isSignUpActive ? (<button type="button" onClick={handlerSignIn} className='btn-signin'>Signin</button>) : <button type="button" onClick={handlerSignUp} className='btn-signup'> Signup</button>}

        <p>
          {isSignUpActive ? "Don't have an account  " : "Already have an account  "}
          <span onClick={handlerMehodChange}>
            {isSignUpActive ? "Signup" : "Signin"}
          </span>
        </p>
      </form>
    </div>
  )
}

export default Home;
