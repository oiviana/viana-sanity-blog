# Viana Sanity Blog

Sanity Studio usado para administrar o conteudo do blog Viana Archives.

Este repositorio define o schema dos posts, configura o Studio e conecta o projeto ao dataset usado pelo frontend `viana-archives-blog`.

## Stack

- Sanity 4
- React 19
- TypeScript
- Styled Components
- `@sanity/vision` para consultas GROQ dentro do Studio
- `@sanity/code-input` para blocos de codigo nos artigos

## Estrutura

```txt
schemas/
  blogPost.ts
schemaTypes/
  index.ts
static/
  .gitkeep
sanity.cli.ts
sanity.config.ts
package.json
tsconfig.json
eslint.config.mjs
```

## Principais arquivos

- `sanity.config.ts`: configuracao principal do Studio, projeto, dataset, plugins e schemas.
- `sanity.cli.ts`: configuracao usada pela CLI do Sanity.
- `schemaTypes/index.ts`: exporta os schemas disponiveis para o Studio.
- `schemas/blogPost.ts`: define o documento `blogPost`, usado pelo frontend.
- `static/`: pasta para arquivos estaticos do Studio, quando necessario.

## Projeto Sanity

Configuracao atual em `sanity.config.ts`:

```ts
projectId: 'juuo6rlg'
dataset: 'production'
```

O mesmo `projectId` e `dataset` sao usados no frontend `viana-archives-blog`, em `src/lib/sanityClient.ts`.

## Plugins

O Studio carrega estes plugins:

- `structureTool()`: interface padrao de estrutura e edicao de documentos.
- `visionTool()`: ferramenta para testar consultas GROQ.
- `codeInput()`: campo customizado para blocos de codigo.

## Schema `blogPost`

O documento principal do Studio e `blogPost`.

Campos:

- `postTitle`: titulo do post. Campo obrigatorio.
- `slug`: slug gerado a partir de `postTitle`. Campo obrigatorio.
- `postDescription`: descricao curta do post.
- `postDate`: data de publicacao. Campo obrigatorio.
- `updatedPostDate`: data da ultima atualizacao do post.
- `postCategory`: categoria exibida no card e na pagina do artigo.
- `authorName`: nome do autor.
- `authorImage`: imagem do autor com hotspot.
- `readingTime`: tempo estimado de leitura em minutos.
- `thumbnailImage`: imagem principal/thumbnail do post com hotspot.
- `references`: lista de blocos Portable Text para referencias.
- `postContent`: conteudo principal do post.

O campo `postContent` aceita:

- blocos de texto;
- imagens com hotspot;
- blocos de codigo via `@sanity/code-input`.

## Relacao com o frontend

O frontend `viana-archives-blog` consulta documentos do tipo `blogPost`.

Campos usados na home:

- `postTitle`
- `postDescription`
- `slug`
- `thumbnailImage`
- `postCategory`
- `authorName`
- `readingTime`

Campos usados na pagina de artigo:

- `postTitle`
- `postDescription`
- `postDate`
- `updatedPostDate`
- `postCategory`
- `authorName`
- `authorImage`
- `readingTime`
- `thumbnailImage`
- `references`
- `postContent`

O campo `updatedPostDate` e opcional; quando preenchido, o frontend exibe a data de atualizacao na pagina do artigo.

## Scripts

```bash
yarn dev
```

Inicia o Sanity Studio em desenvolvimento.

```bash
yarn start
```

Inicia o Studio usando o comando `sanity start`.

```bash
yarn build
```

Gera a build do Studio.

```bash
yarn deploy
```

Publica o Studio no hosting do Sanity.

```bash
yarn deploy-graphql
```

Publica a API GraphQL do Sanity, caso ela seja usada.

Tambem e possivel rodar os mesmos scripts com `npm run`, caso as dependencias sejam instaladas com npm.

## Como rodar localmente

Instale as dependencias:

```bash
yarn install
```

Inicie o Studio:

```bash
yarn dev
```

Por padrao, o Sanity Studio informa a URL local no terminal, normalmente:

```txt
http://localhost:3333
```

Para ver os posts no site, rode tambem o frontend no repositorio `viana-archives-blog`.

## Fluxo de publicacao

1. Acesse o Studio local ou publicado.
2. Crie um documento `Blog Post`.
3. Preencha titulo, slug, data, thumbnail, autor, tempo de leitura, categoria e conteudo.
4. Publique o documento.
5. O frontend passa a consumir o post pelo dataset `production`.

## Consultas GROQ

O plugin Vision pode ser usado para testar as mesmas consultas usadas pelo frontend.

Listagem de posts:

```groq
*[_type == "blogPost"]{
  postTitle,
  postDescription,
  slug,
  thumbnailImage,
  postCategory,
  authorName,
  readingTime
}
```

Post por slug:

```groq
*[_type == "blogPost" && slug.current == $slug][0]{
  postTitle,
  postDescription,
  postDate,
  updatedPostDate,
  postCategory,
  authorName,
  authorImage,
  readingTime,
  thumbnailImage,
  references,
  postContent
}
```

## Deploy

Para publicar o Studio:

```bash
yarn deploy
```

Antes do deploy, revise:

- se `projectId` e `dataset` estao corretos;
- se o schema esta alinhado com o frontend;
- se os dominios do frontend foram liberados em CORS no painel do Sanity, quando necessario;
- se os campos obrigatorios cobrem o minimo necessario para o site renderizar sem dados faltando.

## Pontos de manutencao

- Sempre que adicionar ou renomear campos no schema, atualize as queries e tipos do frontend.
- Quando adicionar um novo tipo de bloco no Portable Text, crie tambem o renderer correspondente no frontend.
- Use o Vision para validar consultas antes de alterar o frontend.
- Padronize o gerenciador de pacotes do projeto. Este repositorio ja possui `yarn.lock`.

## Repositorio relacionado

- `viana-archives-blog`: frontend publico em Next.js que consome os posts deste Studio.
