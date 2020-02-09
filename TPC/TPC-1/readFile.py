import csv
#x[0] -> numero do aluno
#x[1] -> Nome
#x[2] -> git
#x[3-23] -> notas
with open("Avaliação.csv") as data:
    data_reader = csv.reader(data, delimiter=',') #leitura do ficheiro csv
    f = open("alunos.owl","w")
    for x in data_reader:
        f.write(f'###  http://www.semanticweb.org/ruicosta/ontologies/2020/1/untitled-ontology-3#{x[0]}\n')
        f.write(f':{x[0]} rdf:type owl:NamedIndividual ,\n')
        f.write(f'\t\t:ALuno ;\n')
        f.write(f'\t:frequenta :PRI ;\n')
        f.write(f'\t:cadeiras "PRI";\n')
        f.write(f'\t:curso "MIEI" ;\n')
        f.write(f'\t:email "{x[0]}@alunos.uminho.pt" ;\n')
        f.write(f'\t:identificador "{x[0]}" ;\n')
        f.write(f'\t:nome "{x[1]}" .\n')
    f.close()
 