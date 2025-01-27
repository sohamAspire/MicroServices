import express from 'express';
import { createProductWithNonRegisteredUser } from '../controllers/product.controller';

const genericRoutes = (controller: Record<string, any>) => {
  const router = express.Router();

  router.post('/', controller.create);
  router.post('/create' , createProductWithNonRegisteredUser)
  router.get('/', controller.findAll);
  router.get('/:id', controller.findOne);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};

export default genericRoutes;