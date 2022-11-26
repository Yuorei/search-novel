import express from 'express';
import 'dotenv/config'; // このモジュールで.envから環境変数を設定する
const port = process.env.PORT;
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