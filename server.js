import express from 'express';
import publicRouter from './routes/public.js'
import privateRouter from './routes/private.js'
import auth from './middwares/auth.js';
import cors from 'cors';

const app = express();
const PORT = 3000

app.use(express.json())
app.use(cors());


app.use('/', publicRouter)
app.use('/', auth, privateRouter)

app.listen(PORT, () =>{
    console.log("Esta Vivo");
});