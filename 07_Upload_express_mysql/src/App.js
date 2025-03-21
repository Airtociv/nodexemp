import express from 'express';
import fileUpLoad from 'express-fileupload';
import path from 'path';
import url from 'url';

import { createFoto, updateFoto } from './controllers/FotoController.js';
import { readFoto } from './models/FotoModel.js';


const port = 3000;
const app = express();

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(fileUpLoad())

app.use('/public/img',express.static(path.join(__dirname,'..','public','img')))

app.get('/',(req,res)=>{
        res.status(200).json({mensagem:'API funcionando'})
});

app.post('/foto',createFoto);

app.get('/foto',readFoto)

app.put('/foto/:id_foto',updateFoto)

app.listen(port,()=>{
    console.log(`API Funcionando ${port}`);
    
})