import xml.etree.ElementTree as ET



tree = ET.parse('arquivo-musica-digital.xml')
root = tree.getroot()

#povoar compositores

#povoar instrumentos

#povoar obras

f = open("convertido.ttl","w")

for child in root:
    tipo='none'
    #id da obra
    ido = child.attrib.get('id')
    #tipo da obra
    if child.find('tipo') is None:
        tipo = 'Null'
    else:
        tipo = child.find('tipo').text

    #titulo da obra
    if child.find('titulo') is None:
        titulo = 'Null'
    else:
        titulo = child.find('titulo').text
        
        
    #compositor da obra
    if child.find('compositor') is None:
        comp = 'Null'
    else:
        comp = child.find('compositor').text.replace(" ","").replace(",","")
        f.write(f'###  http://www.semanticweb.org/ruicosta/ontologies/2020/1/obras#{comp}\n')
        f.write(f':{comp} rdf:type owl:NamedIndividual ,\n')
        f.write(f'                       :Compositor ;\n')
        f.write(f'              :cria :{ido} .\n')

    

    #lista dos instrumentos da obra
    insts = []
    #instrumentos da obra
    if child.find('instrumentos') is None:
        insts = ['null']
    else:        
        for inst in child.find('instrumentos'):
            #nome do instrumento
            nome = inst.find('designacao').text.replace(" ","")
            #path da partitura do instrumento
            part = inst.find('partitura').attrib.get('path')
            f.write(f'###  http://www.semanticweb.org/ruicosta/ontologies/2020/1/obras#{nome}\n')
            f.write(f':{nome} rdf:type owl:NamedIndividual ,\n')
            f.write(f'                 :Instrumento ;\n')
            f.write(f'        :toca :{ido} ;\n')
            f.write(f'        :Partitura "{part}" .\n')
            insts.append(nome)


    #imprimir a obra
    f.write(f'###  http://www.semanticweb.org/ruicosta/ontologies/2020/1/obras#{ido}\n')
    f.write(f':{ido} rdf:type owl:NamedIndividual ,\n')
    f.write(f'             :Obra ;\n')
    if comp != 'Null':
        f.write(f'    :éCriadaPor :{comp} ;\n')
    if insts != ['null']:
        f.write(f'    :éTocadaPor :{insts[0]} ,\n')
        for instr in insts[1:-1]:
            f.write(f'                :{instr} ,\n')
        f.write(f'                :{insts[-1]} ;\n')
    if tipo != 'Null':
        f.write(f'    :Tipo "{tipo}" ;\n')
    if titulo != 'Null':
        f.write(f'    :Titulo "{titulo};" \n')
    f.write('.\n\n\n\n\n\n\n\n')




# ###  http://www.semanticweb.org/ruicosta/ontologies/2020/1/obras#m1
# :m1 rdf:type owl:NamedIndividual ,
#              :Obra ;
#     :éCriadaPor :Ilidio_Costa ;
#     :éTocadaPor :Flauta ,
#                 :clarinete ;
#     :Tipo "Marcha de Desfile" ;
#     :Titulo "Homenagem a J. Serra" .