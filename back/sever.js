import express from 'express';
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json([
    { message: 'Hello, World' },
  ]);
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);