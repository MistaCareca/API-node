import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/listar-usuarios', async (req, res) => {
    try{

        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true
            }
        });

        res.status(200).json({menssage: "usuarios listados", users})

    } catch(err){
        console.log(err);
        res.status(500).json({message: 'Falha no servidor'})
    }
})

export default router;