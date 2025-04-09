import db from '../conexao.js';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const conexao = mysql.createPool(db);

export const criandoUsuario = async(nome,usuario,senha,tipo) =>{
    console.log("UsuarioModel :: criandoUsuario");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha,salt);
    const sql = `INSERT INTO usuarios (nome, usuario, senha, tipo) VALUES (?,?,?,?)`;

    const params =[nome, usuario, hash, tipo];

    try {
        const [resposta] = await conexao.query(sql,params);
        return[201,{mensagem:"Foto cadastrada com sucesso"}];
    } catch (error) {
        console.error({mensagem:"Erro Servidor", code: error.code,sql: error.sqlMessage });
        return [
            500,
            {mensagem:"Erro Servidor", code: error.code,sql: error.sqlMessage }
        ];
        
    }
};

export const mostrandoUsuario = async () =>{
    console.log("UsuarioModel :: mostrandoUsuarios");

    const sql = `SELECT * FROM usuarios`;

    try {
        const [resposta] = await  conexao.query(sql);
        return [200,{resposta}];
    } catch (error) {
        console.error({mensagem:"Erro Servidor", code: error.code,sql: error.sqlMessage });
        return[
            500, {mensagem:"Erro Servidor", code: error.code,sql: error.sqlMessage },
        ];
        
    }
    
}

export const atualizarUsuario = async (nome,usuario,senha,tipo,id_usuario) =>{
    console.log("UsuarioModel :: atualizarUsuarios");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha,salt);

    const sql = `UPDATE usuarios SET nome=?, usuario=?, senha=?, tipo=?, WHERE id_usuario=?`;
    const params =[nome, usuario, hash, tipo, id_usuario];

    try {
        const [resposta] = await conexao.query(sql,params);

        if (resposta.affectedRows<1) {
             return[404,{mensagem: "Usuario não encontrado."}];
        }
        return [200,{mensagem: "Usuario atualizado."}];
}catch(error){
    console.error({mensagem:"Erro Servidor", code: error.code,sql: error.sqlMessage });
    return[
        500 , {mensagem:"Erro Servidor", code: error.code,sql: error.sqlMessage }
    ]
    
}
}


export const deletarUsuario = async (id_usuario)=>{
    console.log("UsuarioModel :: deletarUsuario");
    const sql = `DELETE FROM usuarios WHERE id_usuario=?`;
    const params = [id_usuario];

    try { 
        const [resposta] = await conexao.query(sql,params);

        if (resposta.affectedRows<1) {
             return[404,{mensagem: "Usuario não encontrado."}];
        }
        return [200,{mensagem: "Usuario removido."}];
}catch(error){
    console.error({mensagem:"Erro Servidor", code: error.code,sql: error.sqlMessage });
    return[
        500 , {mensagem:"Erro Servidor", code: error.code,sql: error.sqlMessage }
    ]
    
}
    
}

export const verificarUsuarioSenha = async(usuario,senha) =>{
    console.log("UsuarioModel :: verificarUsuarioSenha");
    const sql = `SELECT * FROM usuarios WHERE usuario=?`;
    const params = [usuario];

try {
    const [resposta] = await conexao.query(sql,params);
    if (resposta.length<1){
        return[401,{mensagem: "Usuario não encontrado."}]
    }
    const hash = resposta[0].senha;
    const autenticado = bcrypt.compareSync(senha,hash);
    if (autenticado){
        return [200,{mensagem:"usuario logado",id_usuario:resposta[0].id_usuario}]
    }
} catch (error) {
    console.error({mensagem:"Erro Servidor", code: error.code,sql: error.sqlMessage });
    return[
        500 , {mensagem:"Erro Servidor", code: error.code,sql: error.sqlMessage }
    ]
    
}

}
const retorno = await verificarUsuarioSenha("dairna","4578*+GiMa-en")
// const retorno = await deletarUsuario(1)
// const retorno = await (atualizarUsuario("Pedro","paulo","987321+-TFClkhs","a","1"))
// const retorno = await mostrandoUsuarios();
console.log(JSON.stringify(retorno));

// const retorno = await(criandoUsuario("Jackson Duarte","dairna","4578*+GiMa-en","a"));

