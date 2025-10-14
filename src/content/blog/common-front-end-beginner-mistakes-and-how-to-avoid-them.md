---
title: "Erros comuns de iniciantes no Front-End e como evitá-los"
description: "Descubra os erros comuns de iniciantes no Front-End e como evitá-los."
category: "Programação"
heroImage: "@assets/blog/Código-HTML-correto-e-incorreto.jpg"
heroImageAlt: "Ilustração de um computador mostrando exemplos de código HTML incorreto e correto. O incorreto usa tags em maiúsculas e texto sem parágrafo, enquanto o correto usa tags em minúsculas e envolve o texto dentro da tag <p>."
pubDate: "Sep 06 2025"
---

Entrar no mundo do desenvolvimento front-end pode ser empolgante. Logo nos primeiros projetos, é comum querer ver resultados rápidos e, nesse processo, cometer alguns deslizes que mais tarde dificultam a manutenção e a escalabilidade do código.

Neste artigo, vamos ver erros comuns de iniciantes no front-end, entender por que são prejudiciais e como evitá-los, adotando boas práticas desde cedo.

## 1. Usar `<br>` para criar espaçamento

```html
<p>Texto de exemplo</p>
<br />
<br />
<p>Outro texto</p>
```

❌ **Problema**: o `<br>` serve apenas para quebra de linha dentro de um texto, não para criar espaço entre elementos.  
✅ **Forma correta**: usar margens no CSS.

```html
<p class="mb-4">Texto de exemplo</p>
<p>Outro texto</p>
```

```css
.mb-4 {
  margin-bottom: 1rem;
}
```

## 2. Exagerar no CSS inline

```html
<button style="background-color: blue; color: white; padding: 10px;">
  Enviar
</button>
```

❌ **Problema**: dificulta a manutenção e deixa o HTML poluído.  
✅ **Forma correta**: separar o estilo em classes CSS.

```html
<button class="btn-primary">Enviar</button>
```

```css
.btn-primary {
  background-color: blue;
  color: white;
  padding: 10px;
}
```

## 3. Copiar código sem entender

❌ **Problema**: você pode até fazer funcionar, mas não sabe como corrigir se der erro.  
✅ **Forma correta**: estude cada trecho de código que você usa, mesmo que seja copiado.

## 4. Ignorar semântica do HTML

```html
<div>Menu</div>
<div>Rodapé</div>
```

❌ **Problema**: perde acessibilidade e SEO.  
✅ **Forma correta**: usar tags semânticas.

```html
<nav>Menu</nav>
<footer>Rodapé</footer>
```

## 5. Não organizar arquivos e pastas

❌ **Problema**: todos os arquivos soltos tornam o projeto caótico.  
✅ **Forma correta**: manter uma estrutura clara.

```
/project
  /assets
    /css
    /js
    /images
  index.html
```

## 6. Não usar classes reutilizáveis

```html
<h1 style="color: red;">Título</h1>
<p style="color: red;">Texto</p>
```

❌ **Problema**: repetição de código.  
✅ **Forma correta**: criar uma classe e reutilizá-la.

```html
<h1 class="text-red">Título</h1>
<p class="text-red">Texto</p>
```

```css
.text-red {
  color: red;
}
```

## 7. Esquecer do mobile (responsividade)

❌ **Problema**: o site fica quebrado em telas menores.  
✅ **Forma correta**: usar unidades flexíveis (`%`, `rem`, `vw`) e **media queries**.

```css
.container {
  width: 100%;
  max-width: 1200px;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}
```

## 8. Usar imagens muito pesadas

❌ **Problema**: o site demora a carregar.  
✅ **Forma correta**: otimizar imagens (usar formatos modernos como WebP e redimensionar).

```html
<img src="imagem-otimizada.webp" alt="Descrição da imagem" />
```

## 9. Não usar `alt` nas imagens

```html
<img src="foto.png" />
```

❌ **Problema**: prejudica acessibilidade e SEO.  
✅ **Forma correta**: sempre descrever a imagem.

```html
<img src="foto.png" alt="Foto de perfil do usuário" />
```

## 10. Misturar conteúdo e estilo

```html
<p><span style="font-weight: bold;">Atenção:</span> leia o aviso!</p>
```

❌ **Problema**: conteúdo e estilo ficam acoplados.  
✅ **Forma correta**: separar no CSS.

```html
<p><span class="bold">Atenção:</span> leia o aviso!</p>
```

```css
.bold {
  font-weight: bold;
}
```

## 11. Não testar em diferentes navegadores

❌ **Problema**: algo funciona no Chrome, mas quebra no Firefox ou Safari.  
✅ **Forma correta**: testar em múltiplos navegadores e usar ferramentas como BrowserStack.

## 12. Esquecer da acessibilidade

❌ **Problema**: sites que só funcionam com mouse.  
✅ **Forma correta**: usar atributos como `aria-label`, contraste adequado e foco visível.

```html
<button aria-label="Abrir menu">☰</button>
```

## 13. Não versionar o código (sem Git)

❌ **Problema**: você perde alterações ou não consegue voltar atrás.  
✅ **Forma correta**: aprender o básico de Git e usar repositórios (como GitHub ou GitLab).

## 14. Não validar o HTML e CSS

❌ **Problema**: tags mal fechadas ou propriedades inválidas.  
✅ **Forma correta**: usar validadores como [W3C Validator](https://validator.w3.org/).

## 15. Usar muitas `<div>` (o famoso _div soup_)

```html
<div>
  <div>
    <div>Conteúdo</div>
  </div>
</div>
```

❌ **Problema**: dificulta a leitura e torna o HTML confuso.  
✅ **Forma correta**: usar elementos semânticos (`header`, `main`, `section`, `article`, `footer`) quando fizer sentido.

## 16. Esquecer de fechar tags

```html
<p>Texto de exemplo</p>
<p>Outro texto</p>
```

❌ **Problema**: pode quebrar o layout ou gerar comportamentos inesperados.  
✅ **Forma correta**: sempre fechar tags corretamente.

```html
<p>Texto de exemplo</p>
<p>Outro texto</p>
```

## 17. Não comentar decisões importantes do código

❌ **Problema**: sem comentários, fica difícil entender depois o motivo de certas escolhas no código.  
✅ **Correto**: usar comentários claros para explicar decisões importantes, sem exagerar.

```css
/* Main header button */
.btn-primary {
  background-color: #0070f3;
  color: white;
}
```

## 18. Não usar reset ou normalize de CSS

❌ **Problema**: estilos padrões diferentes em cada navegador causam inconsistências.  
✅ **Forma correta**: usar um reset como o [Normalize.css](https://necolas.github.io/normalize.css/) ou configurar manualmente.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

## 19. Misturar lógica de layout e estilo em JavaScript sem necessidade

```javascript
element.style.display = "none";
element.style.color = "red";
```

❌ **Problema**: o JS vira responsável pelo estilo, o que deveria ser feito no CSS.  
✅ **Forma correta**: usar classes e alterná-las no JS.

```javascript
element.classList.add("hidden");
```

```css
.hidden {
  display: none;
}
```

## 20. Não pensar em performance

- Carregar 10 arquivos CSS separados.
- Usar imagens enormes.
- Não minificar o código.

✅ **Forma correta**:

- Minificar JS e CSS.
- Usar lazy loading em imagens.
- Carregar scripts no final da página (`defer` ou `async`).

## 21. Não testar acessibilidade com teclado

❌ **Problema**: elementos não ficam acessíveis via `Tab` ou `Enter`.  
✅ **Forma correta**: testar o site navegando **sem mouse**, só com o teclado, e garantir que tudo funciona.

## 22. Esquecer de tratar erros em JavaScript

```javascript
const data = JSON.parse(response); // se a resposta não for JSON válido → quebra
```

❌ **Problema**: o site quebra facilmente.  
✅ **Forma correta**: usar `try...catch` e tratar cenários inesperados.

```javascript
try {
  const data = JSON.parse(response);
} catch (e) {
  console.error("Erro ao processar os dados", e);
}
```

## 23. Não cuidar da tipografia

❌ **Problema**: textos muito pequenos ou difíceis de ler.  
✅ **Forma correta**:

- Usar unidades relativas (`rem`, `em`) em vez de `px`.
- Garantir contraste entre texto e fundo.
- Usar hierarquia clara (títulos maiores, subtítulos menores).

## 24. Não usar favicons e meta tags básicas

❌ **Problema**: o site parece incompleto nos navegadores e redes sociais.  
✅ **Forma correta**: adicionar no `<head>`:

```html
<link rel="icon" href="/favicon.ico" />
<meta property="og:title" content="Meu Site" />
<meta property="og:description" content="Descrição do site" />
<meta property="og:image" content="/capa.png" />
```

## 25. Não pensar em manutenção futura

Muitos iniciantes codam “apenas para funcionar”.

❌ **Problema**: o código fica difícil de dar manutenção quando o projeto cresce.  
✅ **Forma correta**:

- Usar nomes de classes e variáveis claros.
- Organizar estilos em componentes reutilizáveis.
- Evitar repetições desnecessárias.

## Conclusão

Errar é natural no começo, mas adotar boas práticas desde cedo torna o aprendizado muito mais produtivo. Evitar excessos de `<div>`, não depender de CSS inline, organizar arquivos, cuidar da acessibilidade e otimizar imagens são atitudes que fazem diferença no longo prazo.

Mais do que simplesmente fazer o código “funcionar”, é essencial compreender como e por que cada parte existe. Assim, você garante não só sites que rodam bem, mas também projetos claros, escaláveis e fáceis de manter.
