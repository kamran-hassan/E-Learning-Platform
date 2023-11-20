const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require("cors");
const { upload } = require('./uploadStreams/Upload');
const { AuthApiUpKey, authenticateHeaderToken, upAuthenticateHeaderToken, AuthApiWaKey, waAuthenticateHeaderToken } = require('./auth/Authentication');
const watchStreamApi = require('./watchStreams/watchStrea');

var corsOptions = {
    origin: ["http://localhost:5500","http://localhost:8080", "http://localhost:3000", "http://192.168.29.76:3000"]
  };

app.use(cors(corsOptions));

app.use(express.json());

app.post('/quickBucket/getUploadKeys/', AuthApiUpKey)

app.post('/quickBucket/getWatchKeys/', AuthApiWaKey)


app.post('/quickBucket/upload/', upAuthenticateHeaderToken, upload.single('file'), (req, res) => {
    // Handle the uploaded file
    res.json({ message: 'File uploaded successfully!' });

});

app.get('/quickBucket/watch/', waAuthenticateHeaderToken, watchStreamApi)

// app.post('/upload', upload.single('file'), (req, res) => {
//     // Handle the uploaded file
//     res.json({ message: 'File uploaded successfully!' });
//   });



  // app.get('/video/:fileName', (req, res) => {
  //   const { fileName } = req.params;
  //   const videoPath = path.join(__dirname, 'uploads', fileName);
  //   console.log(videoPath)
  //   // Check if the file exists
  //   if (fs.existsSync(videoPath)) {
  //     const stat = fs.statSync(videoPath);
  //     const fileSize = stat.size;
  //     const range = req.headers.range;
  
  //     // Parse the Range header to get start and end values for streaming
  //     if (range) {
  //       const parts = range.replace(/bytes=/, '').split('-');
  //       const start = parseInt(parts[0], 10);
  //       const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  
  //       const chunksize = end - start + 1;
  //       const file = fs.createReadStream(videoPath, { start, end });
  //       const head = {
  //         'Content-Range': `bytes ${start}-${end}/${fileSize}`,
  //         'Accept-Ranges': 'bytes',
  //         'Content-Length': chunksize,
  //         'Content-Type': 'video/mp4', // Adjust the Content-Type according to your video format
  //       };
  
  //       res.writeHead(206, head);
  //       file.pipe(res);
  //     } else {
  //       const head = {
  //         'Content-Length': fileSize,
  //         'Content-Type': 'video/mp4', // Adjust the Content-Type according to your video format
  //       };
  //       res.writeHead(200, head);
  //       fs.createReadStream(videoPath).pipe(res);
  //     }
  //   } else {
  //     res.status(404).send('File not found');
  //   }
  // });

const PORT = 9999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
