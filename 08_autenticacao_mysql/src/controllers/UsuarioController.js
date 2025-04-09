import { atualizarUsuario, criandoUsuario, deletarUsuario, mostrandoUsuario, verificarUsuarioSenha } from "../models/UsuarioModel.js";

 

 export const createUsuario = async (req,res)=>{
    console.log("UsuarioController :: createUsuario");
    const {nome, usuario, senha, tipo} = req.body;
    
try {
    const [status,resposta] = await criandoUsuario(nome,usuario,senha,tipo);
    return res.status(status).json(resposta);
} catch (error) {
    console.error(error);
    return res.status(500).json({mensagem:"erro ao criar usuario"})
}

 };

 export const readUsuario = async(req,res)=>{
    console.log("UsusarioController :: readUsuario");
    try {
        const [status,resposta] = await mostrandoUsuario();
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
    return res.status(500).json({mensagem:"erro ao mostrar usuario"})
    }
 };

 export const updateUsuario = async (req,res)=>{
    console.log("UsuarioController :: updateUsuario");
    const {nome,usuario,senha,tipo} = req.body;
    const { id_usuario } = req.params;
    try {
        const [ status, resposta] = await atualizarUsuario(nome,usuario,senha,tipo,id_usuario)
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem:"erro ao atualizar usuario"})
        
    }
 };

 export const deleteUsuario = async (req, res) => {
    console.log("UsuarioController :: deleteUsuario");
    const { id_usuario } = req.params;
    try {
      const [status, resposta] = await deletarUsuario(id_usuario);
      return res.status(status).json(resposta);    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "erro ao deletar usuario" });  
    }
  };

  export const login = async (req,res) =>{
    console.log("UsuarioController :: login");
    const { usuario, senha } = req.body;
  
    try {
      const [status, resposta] = await verificarUsuarioSenha(usuario, senha );
      return res.status(status).json(resposta);    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "erro ao deletar usuario" });  
    }
  };