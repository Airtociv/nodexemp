import db from "../conexao.js";
import mysql from "mysql2/promise";

const conexao = mysql.createPool(db);

export const criandoFoto = async (caminho, alternativo) => {
  console.log("FotoModel :: criandoFoto");

  const sql = `INSERT INTO    
                    foto (caminho,alternativo)
                    VALUES(?,?)
                    `;
  const params = [caminho, alternativo];

  try {
    const [resposta] = await conexao.query(sql, params);
    return [201, { mensagem: "Foto cadastrada" }];
  } catch (error) {
    console.error({mensagem: "Erro Servidor", code:error.code,sql: error.sqlMessage});
    return [
      500,
      { mensagem: "Erro Servidor",
        code: error.code,
        sql: error.sqlMessage },
    ];
  }
};

export const mostrandoFoto = async() =>{
  console.log('FotoModel :: mostrandoFoto');

  const sql = 'SELECT * FROM foto';

  try {
    const [resposta] = await conexao.query(sql);
    return [200,resposta];
  } catch (error) {
    console.error({mensagem: "Erro Servidor", code:error.code,sql: error.sqlMessage});
    return [
      500,
      { mensagem: "Erro Servidor",
        code: error.code,
        sql: error.sqlMessage },
      ];
  }
  
}

export const readFoto = async (req,res) =>{
  console.log('FotoController :: readFoto');

  try {
    const [status,resposta] = await mostrandoFoto()
    return res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({mensagem:"erro ao mostrar fotos"});
    
  }
  
}

export const atualizarFoto = async(alternativo,id_foto) =>{
  console.log('FotoModel :: atualizarFoto');

  const sql = `UPDATE foto SET alternativo = ? WHERE id_foto = ? `;
  const params = [alternativo,id_foto] ;

  try {
    const [resposta] = await conexao.query(sql,params);
    if (resposta.affectedRows<1){
      return [400,{mensagem: 'Imagem não encontrada'}];
    }
    return[200,{mensagem:'Texto alternativo atualizado'}]
  } catch (error) {
    console.error({mensagem: "Erro Servidor", code:error.code,sql: error.sqlMessage});
    return [
      500,
      { mensagem: "Erro Servidor",
        code: error.code,
        sql: error.sqlMessage },
      ];
  }
}

export const apagarFoto = async(id_foto) =>{
  console.log('FotoModel :: apagarFoto');

  const sql = `DELETE FROM foto WHERE id_foto =?`;
  const params = [id_foto];

  try {
    const [resposta] = await conexao.query(sql,params);
    if (resposta.affectedRows <1){
      return [404,{mensagem:'Imagem não encontrada'}]
    }  return[200,{mensagem:'Imagem Deletada'}]
  } catch (error) {
    console.error({mensagem: "Erro Servidor", code:error.code,sql: error.sqlMessage});
    return [
      500,
      { mensagem: "Erro Servidor",
        code: error.code,
        sql: error.sqlMessage },
      ];
  }
  
}


export const mostaUmaFoto =async(id_foto) =>{
  console.log('Fotomodel :: mostraUmaFoto');

  const sql =`SELECT * FROM foto WHERE id_foto =? `;
  const params = [id_foto];

  try {
    const [resposta] = await conexao.query(sql,params);
    if (resposta.length<1){
      return [404,{mensagem: 'Imagem não encontrada'}];
    }
    return [200,resposta[0]];
  } catch (error) {
    return [
      500,
      { mensagem: "Erro Servidor",
        code: error.code,
        sql: error.sqlMessage },
      ];
  }

}