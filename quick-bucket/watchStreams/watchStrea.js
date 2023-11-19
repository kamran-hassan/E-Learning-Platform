const fs = require('fs');
const path = require('path');

function watchStreamApi(req, res){
    console.log(req.user)
    const videoPath = path.join(__dirname, '../uploads', req.user.key+".mp4");
    console.log(videoPath)
    if (fs.existsSync(videoPath)) {
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;
    
        // Parse the Range header to get start and end values for streaming
        if (range) {
          const parts = range.replace(/bytes=/, '').split('-');
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    
          const chunksize = end - start + 1;
          const file = fs.createReadStream(videoPath, { start, end });
          const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4', // Adjust the Content-Type according to your video format
          };
    
          res.writeHead(206, head);
          file.pipe(res);
        } else {
          const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4', // Adjust the Content-Type according to your video format
          };
          res.writeHead(200, head);
          fs.createReadStream(videoPath).pipe(res);
        }
      } else {
        res.status(404).send('File not found');
      }

}

module.exports = watchStreamApi;