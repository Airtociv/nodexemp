import { promises as fs } from 'fs';

import path from 'path';
import url from 'url';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(path.join(__dirname,'lojas','201','funcionarios'));

const pasta = path.join(__dirname,'lojas','201','funcionarios');
try{
    await fs.mkdir(pasta);
    console.log('pasta criada com sucesso',pasta);
    
} catch(error){
    console.error(error.message);
}
