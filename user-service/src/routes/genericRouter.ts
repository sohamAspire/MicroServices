import express from 'express';

const genericRoutes = (controller: Record<string, any>) => {
  const router = express.Router();

  router.post('/', controller.create);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findOne);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};

export default genericRoutes;