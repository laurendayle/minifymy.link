import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const URL = import.meta.env.VITE_URL;

const App = () => {

  const [inputUrl, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } };
    const data = { url: inputUrl };

    axios.post(URL + '/shortenurl/new', data, config)
      .then(res => setShortenedUrl(res.data.shortened_url))
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
      <input
        onChange={(e) => setUrl(e.target.value)}
        defaultValue={inputUrl}
        placeholder="URL"/>
      <button onClick={(e) => handleSubmit(e)}>Shorten</button>
    </div>
  )
}

export default App;
