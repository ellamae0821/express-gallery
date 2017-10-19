/*jshint esversion:6*/

const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.gallery;
const Author = db.author;


router.get('/', (req, res) => {
  return Gallery.findAll()
  .then ( (theGallery) => {
    res.render('partials/gallery', {Gallery: theGallery});
  });
});

router.post('/', (req, res) => {
  const author = req.body.author;
  const link = req.body.link;
  const description = req.body.description;
  return Gallery.create({author: author, link: link, description: description})
  .then ((newGallery) => {
    return res.json(newGallery);
  });
});

router.get('/new', (req, res) => {
  console.log('router.getnew');
});

router.get('/:id', (req, res) => {
  const galleryId = req.params.id;
  return Gallery.findById(galleryId)
  .then ((theGallery) => {
    return res.json(theGallery);
  });
});

router.delete('/:id', (req, res)=>{
  const galleryId = req.params.id;
  return Gallery.destroy({
    where: {
      id: galleryId
    }
  });
});




module.exports = router;