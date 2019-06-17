const express = require('express');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../Config/auth.json');

const router = express.Router();

/**
 * Função que vai gerar o token
 */
function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
   
}

/**
 * Rota para fazer cadastro
 */
router.post('/register', async (req, res) =>{
    const { email } = req.body;
    
    try {

        /**
         * IF para que se ja existir um email no usuario no BD retorna um erro 
         */
        if(await User.findOne({ email }))

        return res.status(400).send({ error: 'User already exists ' });

        const user = await User.create(req.body);

        user.password = undefined; //user.password serve para não retorna para o usuario o password digitado.

        return res.send({ 
            user,
            token: generateToken({ id: user.id }),
         });
        
    } catch (err) {
        return res.status(400).send({error: 'Registration Failed'});
    }
});

/**
 * Rota para fazer a autenticação
 */
router.post('/authenticate', async(req, res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    //If abaixo ira veriicar se o usuario existe ou não
    if(!user)
    return res.status(400).send({ erro: 'User not found' });

    //If abaixo vai validar se o password que foi cadastrado bate com o o banco de dados;
    if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid password'})

    user.password = undefined; //user.password serve para não retorna para o usuario o password digitado.   
    
    res.send({ 
        user, 
        token : generateToken({ id: user.id }),
    });
})

module.exports = app => app.use('/auth', router)