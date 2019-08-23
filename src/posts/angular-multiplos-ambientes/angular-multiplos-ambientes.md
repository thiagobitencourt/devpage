---
title: "Conectando aplicação Angular com múltiplos backends"
date: "23/08/2019"
post: 3
summary: "Neste artigo mostro duas formas de configurar uma aplicação Angular para que fique simples alterar o destino das requisições HTTP."
---

Enquanto estamos desenvolvendo uma aplicação Angular é comum precisarmos conectar a múltiplos backends/APIs para fins de testes ou depuração, por exemplo, conectar ao backend de um ambiente de homologação ou até mesmo de produção.

Para "preparar" a aplicação Angular para se conectar a múltiplos ambientes podemos adotar duas estratégias: configurar a URL da API através do arquivo _environment.ts_ ou configurar um proxy para as requisições.

## URL base no arquivo _environment.ts_

A primeira forma de configurar o destino das requisições HTTP da aplicação angular é através do arquivo _environment_ no diretório _src/environments_.

**Configurar os arquivos de _environments_**

Por padrão, existe dois arquivos neste diretório: _environment.prod.ts_ e _environment.ts_ sendo que o primeiro contem as configurações a serem utilizadas em ambiente de produção e o segundo as configurações para o ambiente de desenvolvimento.

Vamos adicionar a estes arquivos um novo atributo, `baseUrl` para o qual vamos definir qual é a URL de destino das requisições HTTP.

Para o arquivo _environment.ts_, que são as configurações para ambiente de desenvolvimento padrão, definimos a URL que será utilizada por padrão em ambiente _dev_, por exemplo: 

```javascript
export const environment = {
  production: false,
  baseUrl: 'http://localhost:8000/api'
}
```

Para o arquivo _environment.prod.ts_, que são as configurações para ambiente de produção, definimos a URL que será utilizada quando a aplicação estiver sendo executada em ambiente de produção, por exemplo:

```javascript
export const environment = {
  production: true,
  baseUrl: 'https://minha-aplicacao.com/api'
}
```

Por padrão os valores destes arquivos estarão disponíveis na aplicação Angular e podemos obtelos importanto o arquivo _environment_ desta forma: 

```javascript
import { environment } from 'src/environments/environment';
```

Assim, podemos utilizar o valor de _baseUrl_ para fazer as requisições HTTP para a URL definida.

```javascript
import { environment } from 'src/environments/environment';

const URL = `${ environment.baseUrl }/caminho/endpoint`;
```

> Uma outra forma de utilizar este valor é através de um _Interceptor_, mas isso é assunto para um outro artigo.

Sempre que a aplicação for executada através do comando `ng serve` os valores providos serão os valores configurados no arquivo _src/environments/environment.ts_ e quando for executada após a o comando `ng build --prod` então os valores providos serão os valores configurados do arquivo _src/environments/environment.prod.ts_.

Agora, vamos adicionar um terceiro ambiente e chamá-lo de _homologação_ e então vamos configurar o Angular para que possamos utilizar esta nova configuração.

Podemos criar um novo arquivo de configuração, _environment.homolog.ts_ e neste arquivo vamos definir qual é o valor para o _baseUrl_ do ambiente de homologação: 

```javascript
export const environment = {
  production: false,
  baseUrl: 'https://homologacao.minha-aplicacao.com:8000/api'
}
```

Agora para utilizar esta nova configuração precisamos ajustar o arquivo _angular.json_ da seguinte forma: 

Localize o atributo `configurations` e adicione a configuração para o ambiente de homologação:

```json
    "configurations": {
        "production": { /* Deixe como está */ },
        "homolog": {
            "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.homolog.ts"
                }
            ]
        }
    }
```

Além disso, localize também o atributo `serve` e adicione a configuração para o ambiente de homologação:

```json
    "serve": {
        "configurations": {
            "production": { /* Deixe como está */ },
            "homolog": {
                "browserTarget": "{ nome-do-app }:build:homolog"
            }
        }
    }
```

Agora para utilizar esta nova configuração ao rodar a aplicação basta executar o comando:

```bash
> ng serve -c homolog
```

Para facilitar podemos adicionar um script ao arquivo _package.json_, `"homolog": "ng serve -c homolog"` e executar a aplicação através do comando: 

```bash
> npm run homolog
```

## Configurar _proxy_ do Angular

A segunda forma de configurar o destino das requisições HTTP da aplicação é através de arquivo _proxy.json_. Através deste arquivo é possível configurar qual será o destino de requições específicas, por exemplo, toda chamada para _/api_ será feita de fato para o destino que estiver configurado pelo proxy.

Podemos então criar dois arquivos, um chamado `proxy.dev.json` com a configuração para o ambiente de desenvolvimento e outro chamado `proxy.homolog.json` com a configuração para o ambiente de homologação: 

Arquivo _proxy.dev.json_:

```json
{
  "/api": {
    "target": "http://localhost:8000/api",
    "secure": false
  }
}
```

Arquivo _proxy.homolog.json_:

```json
{
  "/api": {
    "target": "https://homologacao.minha-aplicacao.com:8000/api",
    "secure": false
  }
}
```

Para executar utilizamos o comando `ng serve` passando o arquivo com a configuração de _proxy_, desta forma:

```bash
> ng serve --proxy-config proxy.[dev|homolog].json
```

Desta forma toda requisição HTTP que for feita para a URL _/api/*_ será redirecionada para a URL definida por _target_ no arquivo de configuração do proxy.

Para facilitar podemos também adicionar um script ao arquivo _package.json_, `"homolog": "ng serve --proxy-config proxy.homolog.json"` e executar a aplicação através do comando: 

```bash
npm run homolog
```

## Conclusão

Independente de qual das estratégias for adotada, conseguimos conectar a aplicação Angular a um backend de forma simples e com isso ganhamos bastante em produtividade e qualidade, uma vez que conseguimos testar e depurar em diversos ambientes.

Eu particularmente prefiro configurar a URL do backend utilizando _environments_ pois desta forma fica explicito qual é a URL destino das requisições, porém esta estratégia é um pouco mais complicada para configurar (apesar de que isso precisa ser feito apenas uma vez).