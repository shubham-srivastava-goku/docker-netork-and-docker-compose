import { Router } from 'express';
import axios from 'axios';
import Favorite from '../models/favorite';
import { Mongoose } from 'mongoose';


const router = Router();

router.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json({
    favorites: favorites,
  });
});

router.post('/favorites', async (req, res) => {
  const { name, type, url } = req.body;

  try {
    if (type !== 'movie' && url !== 'character') {
      throw new Error('"type" should be "movie" or "character"!');
    }
    const existingFav = await Favorite.findOne({ name });
    if (existingFav) {
      throw new Error('Favorite exists already!');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name,
    type,
    url,
  });

  try {
    await favorite.save();
    res
      .status(201)
      .json({ message: 'Favorite saved!', favorite: favorite.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/movies2', async (req, res) => {
  try {
    console.log('Inside movies endpoint');
    const response = await axios.get('http://docker-test/movies');
    console.log(response);
    res.status(200).json({ movies: response.data });
  } catch (error) {
    console.log('Error inside movie endpoint = ', error.message);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/movies', async (req, res) => {
  try {
    console.log('Inside movies endpoint');
    const response = await axios.get('https://swapi.dev/api/films');
    res.status(200).json({ movies: response.data });
  } catch (error) {
    console.log('Error inside movie endpoint = ', error.message);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/people', async (req, res) => {
  try {
    console.log('Inside movies endpoint');
    const response = await axios.get('https://swapi.dev/api/people');
    res.status(200).json({ people: response.data });
  } catch (error) {
    console.log('Error inside people endpoint = ', error.message);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export = router;
