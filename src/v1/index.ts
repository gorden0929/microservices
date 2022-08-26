import express from 'express';

export const v1 = () => {

  const router = express.Router();

  // create
  router.post('/product', (req, res) => {
    const body = req.body;
    res.status(200).send({ message: 'v1 Create', status: 'success', data: body });
  });

  // read 1
  router.get('/product/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).send({ message: 'v1 Get', status: 'success', data: { id: id } });

  });

  // read many
  router.post('/product/get_by', (req, res) => {
    const body = req.body;
    res.status(200).send({ message: 'v1 List', status: 'success', data: body });
  });

  // update
  router.put('/product', (req, res) => {
    const body = req.body;
    res.status(200).send({ message: 'v1 Put', status: 'success', data: body });
  });

  // delete
  router.delete('/product', (req, res) => {
    const body = req.body;
    res.status(200).send({ message: 'v1 Delete', status: 'success', data: body });
  });

  return router;
}
