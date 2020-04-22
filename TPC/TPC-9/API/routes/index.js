var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

/* GET home page. */
router.get('/filmes', function(req, res) {
  Filmes.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

router.get('/linguas/:id', function(req, res) {
  Filmes.getLinguas(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das línguas do filme ${req.params.id}: ${e}`))
});


router.get('/filmes/:id/atores', function(req, res) {
  Filmes.getAtoresDoFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos atores do filme ${req.params.id}: ${e}`))
});

router.get('/filmes/:id', function(req, res) {
  Filmes.getFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do filme ${req.params.id}: ${e}`))
});


// ATORES

router.get('/atores', function(req, res) {
  Atores.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos atores: ${e}`))
});

router.get('/atores/:id', function(req, res) {
  Atores.getAtor(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do ator ${req.params.id}: ${e}`))
});




module.exports = router;
