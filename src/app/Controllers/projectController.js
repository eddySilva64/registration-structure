/**
 * Controller para autenticar o token para o usuario utlizar as rotas depois de estar logado
 */
const express = require('express');
const authMiddleware = require('../Middlewares/auth')

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) =>{
  let db = res.send({ ok: true, user: req.userId});
});

module.exports = app => app.use('/projects', router)