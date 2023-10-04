require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let arr = [];
let num = 0;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:urlID', (req, res) => {
  const urlID = req.params.urlID
  const foundURL = arr.find(({ id }) => id === Number(urlID))
  if (!foundURL) {
    res.status(400).send('please provide a valid shorturl id')
  }
  res.status(301).redirect(foundURL.url)
  // res.status(200).json(foundURL.url)
})

app.post('/api/shorturl', (req, res) => {
  if (!req.body.url.startsWith("http")) {
    res.json({ error: "invalid url" })
  }
  arr = [...arr, { "id": num, "url": req.body.url }]
  res.json({
    original_url: arr[num].url,
    short_url: arr[num].id
  })
  console.log(arr)
  num++
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

