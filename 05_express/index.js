import express from "express";

const app = express();

const port = 3000;


const frutas = ['maçã','banana','laranja']
frutas.push('pessego');

app.get('/',(req,res) =>{
    res.send('API funcionando')
});

app.get('/frutas',(req,res)=>{
    res.json(frutas);
})

app.post('/frutas/:fruta',(req,res)=>{
    const fruta =req.params.fruta;
    frutas.push(fruta);
    res.status(200).json({mensagem:'fruta inserida'})

})

app.delete('/frutas/:fruta',(req,res)=>{
    const fruta = req.params.fruta;
    const index = frutas.indexOf(fruta);

    if(index < 0){
        res.status(404).json({mensagem:'fruta não encontrada'})
    }else{
        frutas.splice(index,1);
        res.status(200).json({mensagem:'fruta deletata'})
    }
})

app.listen(port,()=>{
    console.log(`Aplicativo rodadndo na porta ${port}`)    
});


// app.get('/saudacao',(req,res)=>{
//     res.send('Bom Dia!')
// })