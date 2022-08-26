import express from 'express';

const router = express.Router();

// create
router.post('/product', (req, res) => {
  const body = req.body;
  res.status(200).send({ message: 'v2 Create', status: 'success', data: body });
});

// read 1
router.get('/product/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).send({ message: 'v2 Get', status: 'success', data: { id: id } });

});

// read many
router.post('/product/get_by', (req, res) => {
  const body = req.body;
  res.status(200).send({ message: 'v2 List', status: 'success', data: body });
});

// update
router.put('/product', (req, res) => {
  const body = req.body;
  res.status(200).send({ message: 'v2 Put', status: 'success', data: body });
});

// delete
router.delete('/product', (req, res) => {
  const body = req.body;
  res.status(200).send({ message: 'v2 Delete', status: 'success', data: body });
});

export const v2 = router;
