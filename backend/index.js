const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.post('/convert', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  function textToBinary(text) {
    let binaryResult = '';
    for (let i = 0; i < text.length; i++) {
      const binaryChar = text[i].charCodeAt(0).toString(2);
      const paddedBinaryChar = '00000000'.substring(binaryChar.length) + binaryChar;
      binaryResult += paddedBinaryChar + ' ';
    }
    return binaryResult.trim();
  }

//   function binaryToText(text) {
//     const bytes = binay.match(/.{1,8}/g);
//     const textt = bytes.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
//     return textt;
// }

  const data = textToBinary(text);
  res.json({ data });
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
