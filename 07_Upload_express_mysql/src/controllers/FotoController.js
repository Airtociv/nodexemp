import { apagarFoto, atualizarFoto, criandoFoto, mostaUmaFoto } from "../models/FotoModel.js";

import path from 'path';
import url from 'url';
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

export const createFoto = async(req,res) => {
    console.log('FotoController :: createFoto');
    // const caminho = req.body.caminho;
    const {alternativo} = req.body;
    const {foto} = req.files || {};

    // const [caminho,alternativo] = req.body;
    
if(!alternativo || !foto){
   return res.status(400).json({mensagem: 'A imagem e a descrição são obrigatorias'})
}

const nomeFoto = foto.name;
const extensao = path.extname(nomeFoto).toLocaleLowerCase();
const caminho = `${Date.now()}${extensao}`

    try {
        await foto.mv(path.join(__dirname,'..','..','public','img',caminho))

        const [status,resposta] = await criandoFoto(caminho,alternativo);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem:"erro ao criar foto"})
    }
}

export  const updateFoto = async(req,res) =>{
    console.log('FotoController::updateFoto');
    const {id_foto} = req.params;
    const {alternativo} = req.body;

    try {
        const [status,resposta] = await atualizarFoto(alternativo,id_foto)
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem:"erro ao atualizar dados"})
        
    }
    
}
export const deleteFoto = async(req,res) =>{
    console.log('FotoController :: deleteFoto');
    const {id_foto} = req.params;

    try {
        const [status,resposta] = await apagarFoto(id_foto);
        return res.status(status).json(resposta);
        
    } catch (error) {
        return res.status(500).json({mensagem:"erro ao deletar fotos"})
    }
}

export const showOneFoto = async(req,res) =>{
    console.log('FotoController :: showOneFoto');
    const {id_foto} = req.params;

    try {
        const [status,resposta] = await mostaUmaFoto(id_foto)
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem:"erro ao mostrar uma foto"})
    }
    
}