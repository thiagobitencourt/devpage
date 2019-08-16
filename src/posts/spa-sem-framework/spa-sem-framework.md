---
title: "SPA moderno sem framework"
date: "06/08/2019"
post: 2
summary: "Como implementar uma aplicação single page simples usando apenas Javascript (ES6) e webpack."
---

Muito se descute sobre Angular x React, mas em vez de argumentar a favor de um destes e tentar chegar a uma conclusão de qual é o melhor que tal criar uma aplicação _single page_ com Javascript "puro" sem nenhum framework?

## Objetivo

Neste artigo vou mostrar como podemos criar uma aplicação _single page_ simples usando apenas Javascript (ES6) e webpack.

Vamos implementar um serviço de rotas que será responsável por renderizar as páginas da aplicação e vamos também implementar os componentes que estarão vinculados a cada rota.

## Serviço de rotas

Vamos implementar uma classe de serviço que será responsável por fazer o vinculo das diversas páginas da nossa aplicação a um componente e que também irá renderizar os componentes conforme a mudança das páginas. 

Então, esta classe de serviço ao ser instância recebe por parâmetro uma lista com a configuração das rotas da aplicação e o elemento base para a renderização do conteúdo das páginas, além disso está classe também inicia o "gerenciamento" das rotas:

```javascript
export default class RouterService {
    constructor(routes = [], rootSelector) {
        this.routes = routes;
        this.container = document.querySelector(selector);
        this.initRouter();
    }
}
```

A configuração de uma rota nada mais é que um objeto com dois atributos: o caminho da rota (_path_) e o componente associado (_component_), por exemplo: 

```javascript
{
    path: '#/pagina-um',
    component: PaginaUmComponent
}
```

Como pode ser observado no objeto de exemplo acima, o caminho da rota iniciar com `#` e portanto vamos usar o evento `hashchange` para identificar as mudanças nas rotas da página e assim renderizar o componente equivalente a rota acessada:

```javascript
initRouter() {
    window.addEventListener("hashchange", this.handleRouteChange.bind(this), false);
}
```

Sempre que o evento de página alterada for disparado vamos obter o componente vinculado a esta página e renderizá-lo no elemento base da nossa aplicação:

```javascript
handleRouteChange({ newURL }) {
    const routePath = `#/${ newURL.split('#/')[1] }`;
    const Component = this.routes.find(route => route.path === routePath).component;
    new Component(this.container).render();
}
```

## Componentes

Sempre que a página for alterada o componente referente a nova página será renderizado. Vamos agora implementar estes componentes.

Um componente é composto por um template e um método `render` que será responsável por renderizá-lo no elemento base, recebido como parâmetro pelo método construtor:

```javascript
import template from './pagina-um-component.html';

export default class PaginaUmComponent {
    constructor(container) {
        this.container = container;
    }

    render() {
        this.container.innerHTML = template({ date: new Date() });
    }
}
```

O template do componente nada mais é do que uma página HTML simples, porém podemos utilizar a sintaxe de _template-string_ do _EcmaScript 6_ para acessar os dados que foram passados para o template: 

```html
<section>
    <h1>Este é o componente da página um!</h1>
    <p>Renderizado em ${ this.date }</p>
</section>
```

Esta abordagem de utilizar _template string_ no HTML e renderizá-lo em um elemento é possível graças ao _plugin do webpack_ [html-es6-template-loader](https://www.npmjs.com/package/html-es6-template-loader).

## Navegação

Agora que já implementamos o serviço responsável por renderizar os componentes de acordo com a rota e já sabemos como implementar um componente, vamos juntar as coisas. Vamos implementar a configuração das rotas da página em um arquivo _index.js_:

```javascript
import RouterService from './app/router-service';
import PaginaUmComponent from './app/components/pagina-um/pagina-um-component';
import PaginaDoisComponent from './app/components/pagina-dois/pagina-dois-component';
import PaginaTresComponent from './app/components/pagina-tres/pagina-tres-component';

new RouterService([
    {
        path: '#/pagina-um',
        component: PaginaUmComponent
    },
    {
        path: '#/pagina-dois',
        component: PaginaDoisComponent
    },
    {
        path: '#/pagina-tres',
        component: PaginaTresComponent
    }
]);
```

Agora, para ver o resultado final vamos implementar o arquivo _index.html_: 

```html
<body>
    <nav id="nav-bar">
        <h3>Páginas</h3>
        <ul>
            <li>
                <a href="#/pagina-um">Pagina um</a>
            </li>
            <li>
                <a href="#/pagina-dois">Página dois</a>
            </li>
            <li>
                <a href="#/pagina-tres">Página tres</a>
            </li>
        </ul>
    </nav>
    <section id="root"></section>
</body>
```

E por fim, para configurar o _webpack_ foi utilizado o básico juntamente com o plugin de _load_ do HTML:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: { main: './src/index.js' },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-es6-template-loader']
            }
        ]
    }
};
```

## Conclusão

Claro que este exemplo é extremamente simples e há muitas outras coisas a serem consideradas em uma aplicação SPA, mas de qualquer maneira a ideia deste artigo não é propor uma alternativa à frameworks javascript e nem mesmo defender o não uso destes, mas sim uma forma divertida de brincar com Javascript e mostrar que tudo o que fazemos com uma ferramenta "moderna" podemos fazer por nós mesmos com um pouco de criatividade.

Para ver o resultado final, o código fonte está disponível no [repositório do GitHub](https://github.com/thiagobitencourt/spa-sem-framework) e a aplicação funcionando pode ser acessada [neste endereço](https://thiagobitencourt.github.io/spa-sem-framework).