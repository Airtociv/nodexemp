import http from 'http';

const PORT = 3000;

const exemploResposta =(req,res)=>{


    // res.writeHead(200,{'Content-Type': 'text/plain'});
    // res.end('Primeiro APP');

    // res.writeHead(200,{'Content-Type': 'text/html'});
    // res.end('<h1> Mom Dia</h1>')

    // res.writeHead(200,{'Content-Type': 'application/json'});
    // res.end(JSON.stringify({nome:'SENAI'}));

    res.writeHead(200,{'Content-Type': 'application/xml'});
    res.end(`
        <note>
        <to> SENAI Vitória</to>
        <from>FINDES</from>
        <heading>Lembrete</heading>
        <body>
            Treinamento NODE
        </body>
        </note>
        `);

}

const server = http.createServer(exemploResposta);

server.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})