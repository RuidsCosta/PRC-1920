<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl"
    exclude-result-prefixes="xd"
    version="1.0">
    <xd:doc scope="stylesheet">
        <xd:desc>
            <xd:p><xd:b>Created on:</xd:b> Apr 27, 2020</xd:p>
            <xd:p><xd:b>Author:</xd:b> jcr</xd:p>
            <xd:p>FROM GEDXML to familyTree.ttl</xd:p>
        </xd:desc>
    </xd:doc>
    
    <xsl:output method="text"/>
    <xsl:key name="pessoas" match="pessoa" use="id"/>
    
    <xsl:template match="pessoa">
        ###  http://www.di.uminho.pt/prc2020/familyTree#<xsl:value-of select="id"/>
        :<xsl:value-of select="id"/> rdf:type owl:NamedIndividual ,
        :Person ;
        
        <xsl:if test="pai">
            :hasFather <xsl:value-of select="concat(':', pai)"/> ;
        </xsl:if>
        
        <xsl:if test="mae">
            :hasMother <xsl:value-of select="concat(':', mae)"/> ;
        </xsl:if>
        
        <xsl:if test="dataNasc">
            :dateBirth "<xsl:value-of select="dataNasc"/>" ;
        </xsl:if>
        <xsl:if test="localNasc">
            :placeBirth "<xsl:value-of select="localNasc"/>" ;
        </xsl:if>
        <xsl:if test="dataÓbito">
            :dateDeath "<xsl:value-of select="dataÓbito"/>" ;
        </xsl:if>
        <xsl:if test="título">
            :title "<xsl:value-of select="título"/>" ;
        </xsl:if>
        <xsl:if test="sexo">
            :sex "<xsl:value-of select="sexo"/>" ;
        </xsl:if>
  
        :name "<xsl:value-of select="nome"/>" .
        
    </xsl:template>
    
</xsl:stylesheet>