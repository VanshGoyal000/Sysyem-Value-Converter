import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setCopied(false); // Reset copied state
    axios.post("http://localhost:3000/convert", { text })
      .then((res) => {
        console.log(res.data);
        setResponse(res.data.data); // Access the 'data' property from the response
      })
      .catch((err) => {
        setError('Error: ' + (err.response?.data?.error || 'Server error'));
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className='main'>
      <h1>Text To Binary Converter</h1>
      <div className='input'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={handleInputChange}
          />
          <button type="submit" id='btn'>Convert</button>
        </form>
      </div>
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="response">
          <p>Response: {response}</p>
          <CopyToClipboard text={response} onCopy={() => setCopied(true)}>
            <button>Copy to Clipboard</button>
          </CopyToClipboard>
          {copied && <p className="copied-message">Copied!</p>}
        </div>
      )}
    </div>
  );
}

export default App;
