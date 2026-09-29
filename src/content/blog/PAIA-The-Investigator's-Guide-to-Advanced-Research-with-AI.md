---
title: "PAIA: O Guia do Investigador para Pesquisa Avançada com IA"
description: "Guia prático de investigação avançada com Inteligência Artificial (IA): como usar a PAIA para aplicar técnicas de Google Dorking em buscas inteligentes, com filtros prontos para background check, documentos expostos, conexões societárias, diários oficiais, redes sociais e fontes brasileiras, além de limites legais e éticos no Brasil."
category: "Inteligência Artificial"
heroImage: "@assets/blog/Logo-PAIA-white.jpg"
heroImageAlt: "Logo da Pesquisa Avançada com Inteligência Artificial (PAIA), representado por uma lupa com um globo e a palavra “web”, nós de circuito e um arco de progresso"
pubDate: "Sep 28 2026"
---

<details>
<summary>Navegue neste guia prático de investigação com Pesquisa Avançada com Inteligência Artificial</summary>

- [Combinações para investigação empresarial](#combinações-para-investigação-empresarial)
  - [Buscar notícias negativas e processos de um alvo](#buscar-notícias-negativas-e-processos-de-um-alvo)
  - [Encontrar documentos expostos](#encontrar-documentos-expostos)
  - [Mapear conexões societárias](#mapear-conexões-societárias)
  - [Pesquisar em diários oficiais e tribunais](#pesquisar-em-diários-oficiais-e-tribunais)
  - [Vasculhar redes sociais do investigado](#vasculhar-redes-sociais-do-investigado)
  - [Filtragem de informações em fontes brasileiras — exemplos prontos](#filtragem-de-informações-em-fontes-brasileiras--exemplos-prontos)
    - [Receita Federal e dados tributários](#receita-federal-e-dados-tributários)
    - [Juntas Comerciais estaduais](#juntas-comerciais-estaduais)
    - [Tribunais de Justiça](#tribunais-de-justiça)
    - [Portais de transparência](#portais-de-transparência)
    - [Cartórios e registros](#cartórios-e-registros)
  - [Limites legais e éticos da filtragem de informações web com IA no Brasil](#limites-legais-e-éticos-da-filtragem-de-informações-web-com-ia-no-brasil)
  - [Perguntas e respostas](#perguntas-e-respostas)
    - [A PAIA suporta parâmetros/operadores de outros mecanismos de busca web?](#a-paia-suporta-parâmetrosoperadores-de-outros-mecanismos-de-busca-web)
    - [A PAIA suporta parâmetros/operadores personalizados/inventados pelo usuário?](#a-paia-suporta-parâmetrosoperadores-personalizadosinventados-pelo-usuário)

</details>

Escrevi este artigo usando como base o conhecimento adquirido através do artigo [Google Dorking: O Guia do Investigador para Pesquisa Avançada no Google](https://www.sherlocker.com.br/blog/google-dorking) escrito pelo [Bruno Fraga](https://www.sherlocker.com.br/blog/autores/bruno-fraga). Este artigo tem como objetivo mostrar como as técnicas de investigação manual ensinadas por ele podem ser usadas com Inteligência Artificial (IA), mais precisamente com a [Pesquisa Avançada com Inteligência Artificial (PAIA)](https://advanced-research-ai.vercel.app/).

PAIA é uma SPA com interface gráfica que criei para facilitar o uso de filtros de busca web avançados a serem usados com IA e que pode, como uma de suas características, ser usada como um sistema de investigação inteligente.

Exemplo de uso da PAIA em comparação com um cenário de busca técnica normal.

1. Imagine que você precisa obter informações sobre fraudes envolvendo uma empresa usando IA.

Em um cenário sem a PAIA, você poderia escrever isso:

`Aja como um investigador de fraude e pesquise dentro do site 'jusbrasil.com.br' por fraude ou investigação ou processo envolvendo a empresa XYZ, e depois explique como funciona o processo de fraude envolvendo essa empresa, usando apenas o conhecimento vindo da fonte descrita`

Já em cenário usando a PAIA, você poderia preencher os seguintes campos da seguinte forma:

| Campo                            | Valor                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Esta palavra ou frase exata      | `empresa XYZ`                                                                                                |
| Este site ou domínio             | `jusbrasil.com.br`                                                                                           |
| Parâmetros/Operadores adicionais | `empresa OR investigação OR processo OR fraude`                                                              |
| E faça uma pergunta              | `Aja como um investigador de fraude e explique como funciona o processo de fraude envolvendo a empresa XYZ.` |

Note que tudo o que é feito usando a PAIA pode ser feito em cenários sem ela, mas ela simplifica o processo e evita a necessidade de definir uma série de comportamentos a serem seguidos pela IA, já que sua personalidade já define vários comportamentos e, entre eles, está a restrição para que o uso de conhecimento venha apenas das fontes externas acessadas.

## Combinações para investigação empresarial

Aqui é onde a PAIA pode ser usada como um instrumento de investigação inteligente. Os exemplos abaixo são baseados em filtros reais de investigação do dia a dia. Reproduza, teste e adapte para o seu caso.

### Buscar notícias negativas e processos de um alvo

Quando precisar de um background check rápido sobre pessoa ou empresa:

| Campo                            | Valor                                              |
| -------------------------------- | -------------------------------------------------- |
| Esta palavra ou frase exata      | `João da Silva`                                    |
| Este site ou domínio             | `jusbrasil.com.br`                                 |
| Parâmetros/Operadores adicionais | `processo OR investigação OR fraude OR condenação` |

Para ampliar para portais de notícias:

| Campo                            | Valor                               |
| -------------------------------- | ----------------------------------- |
| Esta palavra ou frase exata      | `Empresa XYZ`                       |
| Este site ou domínio             | `g1.globo.com folha.uol.com.br`     |
| Parâmetros/Operadores adicionais | `escândalo OR denúncia OR operação` |

Variação para capturar menções em diários oficiais:

| Campo                       | Valor                              |
| --------------------------- | ---------------------------------- |
| Esta palavra ou frase exata | `12.345.678/0001-99`               |
| Este site ou domínio        | `in.gov.br imprensaoficial.com.br` |

Limpeza de ruídos se o alvo tiver nome comum:

| Campo                            | Valor                             |
| -------------------------------- | --------------------------------- |
| Parâmetros/Operadores adicionais | `"João da Silva" AND "São Paulo"` |
| Nenhuma destas palavras          | `futebol jogador música`          |

**Observação:** Se você definir apenas os filtros de busca sem fazer nenhuma pergunta, a personalidade da PAIA irá instruir a IA a deduzir analiticamente o objetivo da busca e a usar apenas o conhecimento obtido através dela para responder o usuário, evitando que a IA use o seu próprio conhecimento.

### Encontrar documentos expostos

Contratos, balanços, atas de reunião, licitações — tudo isso aparece em buscas quando alguém publicou sem querer (ou quando é público por lei):

| Campo                            | Valor                                 |
| -------------------------------- | ------------------------------------- |
| Tipo de arquivo                  | `Adobe Acrobat PDF (.pdf)`            |
| Parâmetros/Operadores adicionais | `"contrato social" AND "Empresa XYZ"` |

| Campo                            | Valor                                                                |
| -------------------------------- | -------------------------------------------------------------------- |
| Parâmetros/Operadores adicionais | `ft=(pdf xlsx) ("balanço patrimonial" AND "Empresa XYZ") 2024..2026` |

**Observação:** Recomendo que use os campos de seleções opcionais `A partir da data` e `Antes da data` da seção `Período de publicação` apenas quando houver a necessidade de especificar o dia e o mês, além do ano:

| Campo            | Valor        |
| ---------------- | ------------ |
| A partir da data | `01/01/2024` |
| Antes da data    | `01/01/2026` |

| Campo                            | Valor                                          |
| -------------------------------- | ---------------------------------------------- |
| Tipo de arquivo                  | `Adobe Acrobat PDF (.pdf)`                     |
| Parâmetros/Operadores adicionais | `"ata de assembleia" AND "12.345.678/0001-99"` |

Para encontrar documentos em sites do governo:

| Campo                       | Valor                      |
| --------------------------- | -------------------------- |
| Esta palavra ou frase exata | `Empresa XYZ`              |
| Este site ou domínio        | `gov.br`                   |
| Tipo de arquivo             | `Adobe Acrobat PDF (.pdf)` |

### Mapear conexões societárias

Essa parte é interessante para quem deseja investigar sócios ocultos e laranjas. O truque é cruzar nomes com termos societários:

| Campo                            | Valor                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------- |
| Esta palavra ou frase exata      | `João da Silva`                                                               |
| Parâmetros/Operadores adicionais | `("sócio" OR "diretor" OR "administrador") AND ("CNPJ" OR "contrato social")` |

Para buscar em juntas comerciais:

| Campo                       | Valor                                      |
| --------------------------- | ------------------------------------------ |
| Esta palavra ou frase exata | `João da Silva`                            |
| Este site ou domínio        | `jucesponline.sp.gov.br jucerja.rj.gov.br` |

Variação para encontrar holdings e empresas conectadas:

| Campo                            | Valor                                             |
| -------------------------------- | ------------------------------------------------- |
| Esta palavra ou frase exata      | `João da Silva`                                   |
| Parâmetros/Operadores adicionais | `"holding" OR "participações" OR "investimentos"` |
| Tipo de arquivo                  | `Adobe Acrobat PDF (.pdf)`                        |

### Pesquisar em diários oficiais e tribunais

Publicações oficiais são ouro puro para investigação — especialmente em casos de lavagem de dinheiro e execuções fiscais. Filtros específicos:

| Campo                       | Valor         |
| --------------------------- | ------------- |
| Esta palavra ou frase exata | `Empresa XYZ` |
| Este site ou domínio        | `djsp.jus.br` |

| Campo                       | Valor                     |
| --------------------------- | ------------------------- |
| Esta palavra ou frase exata | `12.345.678/0001-99`      |
| Este site ou domínio        | `trf3.jus.br tjsp.jus.br` |

| Campo                            | Valor                                   |
| -------------------------------- | --------------------------------------- |
| Este site ou domínio             | `jus.br`                                |
| Parâmetros/Operadores adicionais | `"João da Silva" AND "execução fiscal"` |

Para buscar em diários oficiais da União:

| Campo                       | Valor                      |
| --------------------------- | -------------------------- |
| Esta palavra ou frase exata | `Empresa XYZ`              |
| Este site ou domínio        | `in.gov.br`                |
| Tipo de arquivo             | `Adobe Acrobat PDF (.pdf)` |

### Vasculhar redes sociais do investigado

Redes sociais revelam patrimônio, localização, conexões e estilo de vida. Aquele devedor que "não tem nada" mas posta foto no iate? A busca de bens começa aqui:

| Campo                            | Valor                               |
| -------------------------------- | ----------------------------------- |
| Parâmetros/Operadores adicionais | `"João da Silva" AND "empresa XYZ"` |
| Este site ou domínio             | `linkedin.com/in`                   |

| Campo                            | Valor                             |
| -------------------------------- | --------------------------------- |
| Parâmetros/Operadores adicionais | `"João da Silva" AND "São Paulo"` |
| Este site ou domínio             | `facebook.com`                    |

| Campo                       | Valor                       |
| --------------------------- | --------------------------- |
| Esta palavra ou frase exata | `@joaodasilva`              |
| Este site ou domínio        | `instagram.com twitter.com` |

Para encontrar fotos e vídeos (que podem revelar patrimônio):

| Campo                            | Valor                                    |
| -------------------------------- | ---------------------------------------- |
| Esta palavra ou frase exata      | `João da Silva`                          |
| Este site ou domínio             | `youtube.com`                            |
| Parâmetros/Operadores adicionais | `"empresa" OR "inauguração" OR "evento"` |

### Filtragem de informações em fontes brasileiras — exemplos prontos

Onde pesquisar quando seu alvo é brasileiro. Aqui estão filtros prontos para fontes que você talvez já use.

#### Receita Federal e dados tributários

| Campo                       | Valor                    |
| --------------------------- | ------------------------ |
| Esta palavra ou frase exata | `12.345.678/0001-99`     |
| Este site ou domínio        | `receita.fazenda.gov.br` |

| Campo                       | Valor                                      |
| --------------------------- | ------------------------------------------ |
| Esta palavra ou frase exata | `Empresa XYZ`                              |
| Este site ou domínio        | `cfrq.org.br portaldatransparencia.gov.br` |

#### Juntas Comerciais estaduais

| Campo                       | Valor                    |
| --------------------------- | ------------------------ |
| Esta palavra ou frase exata | `Empresa XYZ`            |
| Este site ou domínio        | `jucesponline.sp.gov.br` |

| Campo                       | Valor                      |
| --------------------------- | -------------------------- |
| Esta palavra ou frase exata | `João da Silva`            |
| Este site ou domínio        | `jucerja.rj.gov.br`        |
| Tipo de arquivo             | `Adobe Acrobat PDF (.pdf)` |

#### Tribunais de Justiça

| Campo                       | Valor              |
| --------------------------- | ------------------ |
| Esta palavra ou frase exata | `Empresa XYZ`      |
| Este site ou domínio        | `esaj.tjsp.jus.br` |

| Campo                       | Valor                                 |
| --------------------------- | ------------------------------------- |
| Esta palavra ou frase exata | `12.345.678/0001-99`                  |
| Este site ou domínio        | `trf1.jus.br trf2.jus.br trf3.jus.br` |

#### Portais de transparência

| Campo                       | Valor                          |
| --------------------------- | ------------------------------ |
| Esta palavra ou frase exata | `Empresa XYZ`                  |
| Este site ou domínio        | `portaldatransparencia.gov.br` |

| Campo                            | Valor                             |
| -------------------------------- | --------------------------------- |
| Este site ou domínio             | `comprasnet.gov.br gov.br`        |
| Parâmetros/Operadores adicionais | `"João da Silva" AND "licitação"` |

#### Cartórios e registros

| Campo                            | Valor                       |
| -------------------------------- | --------------------------- |
| Esta palavra ou frase exata      | `Empresa XYZ`               |
| Este site ou domínio             | `registradores.org.br`      |
| Parâmetros/Operadores adicionais | `"matrícula" OR "registro"` |

| Campo                            | Valor                            |
| -------------------------------- | -------------------------------- |
| Este site ou domínio             | `ieptb.org.br`                   |
| Parâmetros/Operadores adicionais | `"João da Silva" AND "protesto"` |

## Limites legais e éticos da filtragem de informações web com IA no Brasil

Filtrar informações web com <abbr title="Inteligência Artificial">IA</abbr> é legal quando se busca apenas dados públicos, sem quebrar senhas, invadir sistemas ou interceptar comunicações.

O que pode configurar ilícito:

- Acessar áreas restritas (ex.: páginas administrativas mesmo com login/senha expostos) — há risco concreto de tipificação pelo [Art. 154-A do Código Penal](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm) (invasão de dispositivo informático).
- Usar os dados obtidos para extorsão, assédio ou chantagem — é crime independentemente do método de coleta.
- Tratar dados pessoais em desacordo com a [<abbr title="Lei Geral de Proteção de Dados">LGPD</abbr>](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) — o tratamento de dados de acesso público é permitido (inclusive com base no legítimo interesse), mas exige finalidade específica, proporcionalidade e respeito aos princípios da lei.

Na prática, para investigação empresarial e [<abbr title="Conformidade">compliance</abbr>](https://www.sherlocker.com.br/blog/compliance-empresarial):

- Dados de juntas comerciais, tribunais, diários oficiais e portais de transparência são públicos por lei.
- Perfis públicos em redes sociais constituem fontes legítimas de <abbr title="Open Source Intelligence (Inteligência de Fontes Abertas)">OSINT</abbr>.
- Documentos indexados em sites de terceiros seguem a política de quem os publicou.

A regra é clara: encontrar e analisar informações públicas é permitido; o uso exige finalidade legítima. <abbr title="Diligência prévia">Due diligence</abbr>, recuperação de crédito, [<abbr title="Verificação de antecedentes">background check</abbr>](https://www.sherlocker.com.br/blog/background-check-empresarial) corporativo e investigação de [blindagem patrimonial](https://www.sherlocker.com.br/blog/blindagem-patrimonial) são finalidades legítimas. <abbr title="Assédio obsessivo / perseguição">Stalking</abbr>, exposição indevida e chantagem são crimes.

## Perguntas e respostas

### A PAIA suporta parâmetros/operadores de outros mecanismos de busca web?

Sim, desde que o modelo de IA escolhido pelo usuário suporte e permita seu uso. Recomendo que passe as referências dos parâmetros e operadores sempre que possível.

### A PAIA suporta parâmetros/operadores personalizados/inventados pelo usuário?

Sim, mas se os nomes/símbolos destes não deixarem claro a sua função, é recomendado que a sua referência seja passada para que o modelo de IA escolhido pelo usuário possa automaticamente interpretá-los e convertê-los em valores válidos.
