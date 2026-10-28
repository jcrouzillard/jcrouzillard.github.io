# Portfólio

Site estático em [Astro](https://astro.build) com estudos de caso dos meus projetos privados. Publicado em `https://jcrouzillard.github.io`.

## Rodar local

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # gera dist/
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome, título, links de contato | `src/data/site.ts` |
| Princípios ("método") e linha do tempo ("trajetória") | `src/data/site.ts` |
| Mascote e fala de um projeto (`mascote`, `mascoteFala`) | `src/content/projetos/<projeto>.md` |
| Cores, fontes e papel pautado (estilo "Duas vozes") | `src/layouts/Base.astro` |
| Carimbo de aprovação humana | `src/components/Carimbo.astro` |
| Números da home e stack | `src/pages/index.astro` |
| Um projeto (texto, fluxo, fases, métricas) | `src/content/projetos/<projeto>.md` |
| Imagens de um projeto | `src/assets/projects/<projeto>/` |

### Abrir o código de um projeto

No `.md` do projeto, troque `visibilidade: privado` por `em-breve` ou por `publico`. No caso de `publico`, inclua também `repo: https://github.com/...`. O selo do card e da página muda sozinho.

### Novo projeto

Copie um `.md` de `src/content/projetos/`, ajuste o frontmatter e a `ordem`. O schema fica em `src/content.config.ts`, e o build falha se faltar algum campo obrigatório.

## Publicar

1. Crie o repositório público `jcrouzillard.github.io` e faça push deste diretório para a `main`.
2. Em **Settings → Pages**, escolha **Source: GitHub Actions**.
3. A partir daí, cada push na `main` publica o site (`.github/workflows/deploy.yml`).

O rascunho do README do perfil está em `perfil-readme/README.md`. Ele vai no repositório `jcrouzillard/jcrouzillard`.
