import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Success');
});

app.use('/api', router);

const startServer = async () => {
  try {
    const port = process.env.PORT || 9090;
    app.listen(port);

    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.error(error);
  }
};

startServer();
