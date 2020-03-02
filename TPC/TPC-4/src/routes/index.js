var express = require('express');
var router = express.Router()
var axios = require('axios')

var prefix = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://www.semanticweb.org/ruicosta/ontologies/2020/1/untitled-ontology-14#>
    
`
var repo = 'http://localhost:7200/repositories/historia-pcr2020?query='



//pagina inicial
router.get('/', function(req, res, next) {
  var query = `
  select ?nome ?carro where{
        ?s a :Advogado.
    	  ?c a :Carro.
    	  ?s :dirige ?c.
        ?s :nome ?nome.
    	  ?c :tipoCarro ?carro. 
}
  `;
  var encoded = encodeURIComponent(prefix + query)
  console.log(repo+encoded)
  axios.get(repo + encoded)
    .then(dados => {
      var mydata = dados.data.results.bindings.map(advog => {return {nom: advog.nome.value, carro: advog.carro.value} })
      console.log('cheguei')
      console.log(JSON.stringify(mydata))
      res.render('index', { advogs: mydata });
    })
    .catch(erro => {
      res.render('error', {error : erro})   
    })
});




// //pagina particular
router.get('/:nome', function(req, res, next) {
  var id = req.params.nome
  console.log("nome",id)
  var query = `
  select ?nome ?carro ?bebida ?esp where{
    ?s a :Advogado.
    ?s :nome "${id}".
    ?c a :Carro.
    ?esp a :Especialidade.
    ?s :temEspecialidade ?esp.
    ?s :bebida ?bebida.
    ?s :dirige ?c.
    ?s :nome ?nome.
    ?c :tipoCarro ?carro. 
}`;

  var encoded = encodeURIComponent(prefix + query)
  console.log(repo+encoded)
  axios.get(repo + encoded)
    .then(dados => {
      var mydata = dados.data.results.bindings.map(advog => {
        return {
          nome: advog.nome.value, 
          carro: advog.carro.value, 
          bebida: advog.bebida.value,
          especialidade: (advog.esp.value).split("#")[1]}
      })
      res.render('particular', { advogados: mydata });
    })
    .catch(erro => {
      res.render('error', {error : erro})   
    })
});

module.exports = router;
