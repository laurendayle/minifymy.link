import axios from 'axios';
import { useState } from 'react';

const App = () => {

  const headers = {'Content-Type': 'application/json'}

  const [inputUrl, setUrl] = useState('');

  const handleSubmit = () => {

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: JSON.stringify({ url: inputUrl }),
      url: 'http://127.0.0.1:3000/api/v1/shortenurl/new',
    };

    axios(options)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  return (
    <div className="App">
      <input
        onChange={(e) => setUrl(e.target.value)}
        onClick={() => handleSubmit(inputUrl)}
        defaultValue={inputUrl}
        placeholder="URL"/>
      <button>Shorten</button>
    </div>
  )
}

export default App
