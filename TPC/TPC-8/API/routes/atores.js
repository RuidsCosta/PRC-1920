var express = require('express');
var router = express.Router();
var Atores = require('../controllers/atores')

//ir buscar atores
router.get('/', function(req,res) {
    Atores.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de atores: ${e}`))
})

//ir bustar um ator e sua informação
router.get('/:id', async function(req, res, next) {
    try{
      var ator = await Atores.consultar(req.params.id)
      var filmes = await Atores.getFilmes(req.params.id)
      ator.push(filmes)
  
      res.jsonp(ator)
    }catch(e){
     res.status(500).send(`Erro na listagem do ator: ${e}`)
    }
  });
  
  module.exports = router;