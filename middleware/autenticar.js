const jwt = require("jsonwebtoken")
require("dotenv/config")

module.exports = async (req, res, next) => {
    const token = req.headers.authorization
    if (token == undefined)
        return res.send("Token não encontrado")
    const valor = token.split(" ")
    const [ baerer, valToken ] = valor
    if (!/^Bearer$/i.test(baerer))
        return res.send("Token formatado incorretamente")  
    await jwt.verify( valToken, process.env.CHAVE_SEGUR, (erro, data) =>{
        if (erro)
            return res.send("O Token é inválido ou já expirou")
        req.Id = data.userId
        req.nome = data.userNome
    })
    return next()
}