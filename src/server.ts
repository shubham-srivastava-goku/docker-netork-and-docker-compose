import express from 'express';
import http from 'http';
import Mongoose from 'mongoose';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/', routes);

const connectToDatabase = (): Promise<typeof Mongoose> => {
  const dbip = process.env.DBIP || 'localhost';
  console.log('dbip = ', dbip);
  return Mongoose.connect(
    `mongodb://${dbip}:27017/swfavorites`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log('DB Connected');
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
    http.createServer(app).listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  } catch (error) {
    console.error('Error creating mongo connection ', error);
  }
};

startServer();
