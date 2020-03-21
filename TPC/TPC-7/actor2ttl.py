# ###  http://www.di.uminho,pt/ruicosta/2020/2/cinema#Robert_Pattinson
# :Robert_Pattinson rdf:type owl:NamedIndividual ,
#                            :Ator ;
#                   :atuou :Twilight ;
#                   :sexo "M" .

#!/usr/bin/python3

import csv

f = open("generated/atores.ttl", "w")

with open('data/atores.csv') as csv_file:

    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0

    for row in csv_reader:

        if line_count == 0:

            line_count+=1

        else:

            nome = row[0]
            id = nome.replace(' ', '_')

            genero = row[1]
            if genero == "male":
                genero = 'M'
            else:
                genero = 'F'

            f.write(f'###  http://www.di.uminho,pt/ruicosta/2020/2/cinema#{id}\n')
            f.write(f':{id} rdf:type owl:NamedIndividual ,\n')
            f.write('        :Pessoa ;\n')
            f.write(f'  :sexo "{genero}"^^xsd:string .\n')
            f.write('\n')

            line_count+=1

    print(f'Processed {line_count} lines!')