import app from './app.js';

const HOST = 'localhost';
const PORT = 4444;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is started: http://${HOST}:${PORT}`);
});
