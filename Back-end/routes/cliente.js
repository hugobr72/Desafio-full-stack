const express = require('express');
const router = express.Router();
const { getController, putController, postController, deleteController, filterController, routeController } = require("../controllers/clienteController")

router.get('/', getController);

router.post('/', postController);

router.put('/', putController);

router.delete('/:id', deleteController);

router.get('/rota', routeController);

router.get('/:nome', filterController);




module.exports = router;
