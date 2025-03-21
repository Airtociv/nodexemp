import db from '../conexao.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criandoProduto = async(nomeProduto) =>{
    console.log('ProdutoModel :: criandoProduto');
    
    const sql = 'INSERT INTO produto (nome_produto) VALUES (?)';

    const params = [nomeProduto];

    try {
        const resposta = await conexao.query(sql,params);
        // console.log(resposta);
        return [201,{mensagem:'produto atualizado com sucesso'}]
    } catch (error) {
        // console.error(error);
        return [500,{
            mensagem: 'Erro Servidor',
            code: error.code,
            sql: error.sqlMessage
        }]
    }
}

export const mostrarProdutos = async ()=>{
    console.log('ProdutoModel :: mostrarProdutos');
    const sql = 'SELECT * FROM produto';
    try {
        const [resposta] = await conexao.query(sql);
        // console.log(resposta);
        return [200,resposta]

    } catch (error) {
        // console.error(error);
        return [500,{
            mensagem: 'Erro Servidor',
            code: error.code,
            sql: error.sqlMessage
        }]
    
    }
    
}


export const atualizandoProduto = async(id_produto,nomeProduto) =>{
    console.log('ProdutoModel :: atualizandoProduto');

    const sql = `UPDATE produto SET nome_produto = ? WHERE  id_produto = ?`;
    
    const params = [nomeProduto,id_produto];

    try { // console.log(resposta);

        const [resposta] = await conexao.query(sql,params);

        if (resposta.affectedRows<1){
            return [404,{mensagem:'produto não encontrado'}]
        }else{
            return [200,{mensagem:'produto atualizado com sucesso'}]
        }
    } catch (error) {
        // console.error(error);
        return [500,{
            mensagem: 'Erro Servidor',
            code: error.code,
            sql: error.sqlMessage
    }] }
}


export const removerProduto = async (id_produto) =>{
    console.log('ProdutoModel :: removerProduto');

    const sql = `DELETE FROM produto WHERE id_produto = ?`;

    const params = [id_produto];

    try {
        const [resposta] = await conexao.query(sql,params);
        // console.log(resposta);
        if (resposta.affectedRows<1){
            return [404,{mensagem:'produto não encontrado'}]
        }else{
            return [200,{mensagem:'produto removido com sucesso'}]
        }
    } catch (error) {
        // console.error(error);
        return [500,{
            mensagem: 'Erro Servidor',
            code: error.code,
            sql: error.sqlMessage
        }]
    }
    
}

// console.log(await removerProduto(8));

// atualizandoProduto(8,'tomate');

// criandoProduto('goiaba');

// mostrarProdutos();