import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

const jwt_secret = process.env.jwt_secret;

router.post('/cadastro', async (req, res) => {
    try{
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

        const userDb = await prisma.user.create({
            data:{
                email: user.email,
                name: user.name,
                password: hashPassword,
            },
        })
        res.status(201).json(userDb);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Erro no Servidor, tente novamente!"});
    }
})

router.post('/login', async (req, res) => {
    try{
        const userInfo = req.body;
        const user = await prisma.user.findUnique({where: {email: userInfo.email}});

        if(!user){
            return res.status(404).json({menssage: "Usuario nao encontrado"});
        }
        
        const isMatch = await bcrypt.compare(userInfo.password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Credenciais inválidas!"}); 
        }
        
        const token = jwt.sign({id: user.id}, jwt_secret, { expiresIn: '7d' })

        res.status(200).json(token);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Erro no Servidor, tente novamente!"});
    }
})




export default router