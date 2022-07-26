import axios from 'axios';
import { useState } from 'react';

const URL = import.meta.env.VITE_URL;
console.log(URL, 'URL');

const App = () => {


  const [inputUrl, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleSubmit = (e) => {
    console.log('inputUrl', inputUrl);
    e.preventDefault();
    const config = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } };
    const data = { url: inputUrl };

    axios.post(URL, data, config)
      .then(res => setShortenedUrl(res.data.shortened_url))
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <input
        onChange={(e) => setUrl(e.target.value)}
        defaultValue={inputUrl}
        placeholder="URL"/>
      <button onClick={(e) => handleSubmit(e)}>Shorten</button>
    </div>
  )
}

export default App
