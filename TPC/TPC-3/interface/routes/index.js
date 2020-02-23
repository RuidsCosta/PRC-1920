var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefix = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rfd-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX h: <http://www.semanticweb.org/ruicosta/ontologies/2020/1/untitled-ontology-14#>
`

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:7200/repositories")
    .then(dados => {
      data = []
      for(let i = 0; i < dados.data.results.bindings.length; i++){
        data[i] = dados.data.results.bindings[i].id.value
      } 
      dquery = []
      res.render('index', {data,dquery, title: 'SPARQL' });
    })
    .catch(erro => res.status(500).jsonp(erro))
});


router.get('/query',function(req, res){
  let query = req.query.query
  let repo = req.query.repo
  axios.get(`http://localhost:7200/repositories/${repo}/namespaces`)
    .then(dado => {
      let pref = prefix + 'PREFIX : <'+dado.data.results.bindings[0].namespace.value+'>'
      var encoded = encodeURIComponent(pref + query)
      link = `http://localhost:7200/repositories/${repo}?query=${encoded}`

      axios.get(link)
        .then(dados => {
          dquery = []
          for(let i = 0; i < dados.data.results.bindings.length; i++)
            dquery[i] = dados.data.results.bindings[i]
          res.render('index', {dquery,data , title: 'SPARQL' });
        })
        .catch(erro => {
          dquery =[]
          dquery[0] = "query inválida, Tente novamente"
          res.render ('index',{dquery,data,title:'SPARQL'}) 
        })
    })
})

module.exports = router;
