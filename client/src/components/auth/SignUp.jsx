import { useState } from 'react';
import axios from 'axios';

const URL = import.meta.env.VITE_URL;

const SignUp = () => {

  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const newState = {...userData};
    newState[e.target.name] = e.target.value;
    setUserData(newState);
  }

  const handleSignUp = (e) => {
    if (userData.password !== userData.verifyPassword) {
      setError('Please ensure the passwords match');
    } else {
      const config = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } };
      axios.post(URL + '/signup', userData, config)
        .then((res) => console.log(res))
        .catch((err) => setError(err));
    }
  }

  return (
    <div onChange={(e) => handleInputChange(e)}>
      <input name="email" placeholder="Email"/>
      <input name="firstName" placeholder="First Name"/>
      <input name="lastName" placeholder="Last Name"/>
      <input name="password" placeholder="Password" />
      <input name="verifyPassword" placeholder="Verify Password"/>
      <button onClick={(e) => handleSignUp(e)}>Create Account</button>
    </div>
  )
}

export default SignUp;