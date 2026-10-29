# Pergunte ao corvo

Chat flutuante do portfólio que responde só perguntas sobre o Julien. O site continua estático no GitHub Pages; este Cloudflare Worker guarda a chave da Anthropic e conversa com o Claude.

```
site (GitHub Pages)  ──POST /──▶  Worker (Cloudflare)  ──▶  Claude Haiku 5.5
   ChatCorvo.astro                 1. origem permitida?        lê /conhecimento.txt
                                   2. limite por IP            (gerado pelo site)
                                   3. porteiro (filtro.ts)
                                   4. Turnstile (opcional)
```

## Como a pergunta é filtrada sem gastar token

`src/filtro.ts` roda dentro do Worker, antes de qualquer chamada à IA:

- vazia ou com mais de 500 caracteres: resposta pronta;
- palavrão ou ofensa: uma resposta pronta com humor viking, sorteada entre várias;
- agradecimento ou despedida ("obrigado", "valeu", "tchau") e reações curtas ("ok", "kkkk"): resposta pronta e simpática;
- saudação ("oi", "bom dia"): o corvo se apresenta, sem IA;
- tentativa de mudar as regras ("ignore as instruções", "system prompt"): recusa pronta;
- pedido genérico (código, poema, tradução, receita): recusa pronta;
- sem nenhum assunto ligado ao Julien (carreira, empresas, stack, projetos, IA…): recusa pronta.

Só o que passa por tudo isso chega ao modelo, que também tem ordem de recusar em uma frase o que for fora do tema. Para ver o porteiro em ação: `npm test`.

Proteções contra abuso: só aceita chamadas de `jcrouzillard.github.io` (e `localhost:4321`), 6 perguntas por minuto por IP, 15 perguntas por conversa, histórico curto e, se quiser, o captcha invisível Turnstile. O teto de gasto mensal no console da Anthropic é a última trava.

## O que o corvo sabe

O Worker lê `https://jcrouzillard.github.io/conhecimento.txt`, gerado no build do site por `src/pages/conhecimento.txt.ts` a partir de `src/data/curriculo.ts`, `src/data/site.ts`, `src/data/pessoal.ts` (o lado pessoal e os limites de intimidade) e dos projetos em `src/content/projetos/`. Editou o currículo e publicou o site? Em até 10 minutos o corvo já sabe. O e-mail fica de fora de propósito.

## Custo

Cada pergunta manda cerca de 6 mil tokens de contexto (em cache) e recebe até 600. Com o Claude Haiku 5.5 (US$ 0,10 por milhão de tokens de entrada, US$ 0,50 de saída), isso dá por volta de US$ 0,0005 por pergunta: mil perguntas por mês custam menos de US$ 1. A Cloudflare é grátis até 100 mil requisições por dia. Para trocar de modelo, mude `MODELO` no `wrangler.toml`.

## Deploy (uma vez)

1. **Anthropic.** Em [console.anthropic.com](https://console.anthropic.com), compre créditos (mínimo US$ 5), defina um limite de gasto mensal em *Settings → Limits* (ex.: US$ 5) e crie uma chave em *API Keys* (ex.: `portfolio-chat`).
2. **Cloudflare.** Crie uma conta grátis em [dash.cloudflare.com](https://dash.cloudflare.com).
3. **Publicar o Worker**, nesta pasta:

   ```sh
   cd worker
   npm install
   npx wrangler login                        # abre o navegador para entrar na Cloudflare
   npx wrangler secret put ANTHROPIC_API_KEY # cole a chave quando pedir
   npx wrangler deploy                       # mostra a URL: https://corvo-chat.<sua-conta>.workers.dev
   ```

4. **Ligar o chat no site.** Coloque a URL em `chat` no `src/data/site.ts` e publique. Com `chat` vazio, o botão nem aparece.

### Turnstile (opcional, recomendado)

No painel da Cloudflare, *Turnstile → Add widget*, domínio `jcrouzillard.github.io` (e `localhost`), modo **Invisible**. Coloque a *site key* em `turnstile` no `src/data/site.ts` e guarde a *secret key* no Worker:

```sh
npx wrangler secret put TURNSTILE_SECRET
```

## Testar no próprio Mac

```sh
cd worker
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .dev.vars   # fica fora do git
npx wrangler dev                                   # http://localhost:8787
curl -s localhost:8787 -H 'Origin: http://localhost:4321' -H 'Content-Type: application/json' \
  -d '{"pergunta":"Qual a experiência do Julien com Kafka?"}'
```

Para ver o chat no site local, ponha `chat: 'http://localhost:8787'` no `src/data/site.ts` e rode `npm run dev` na raiz. Os logs do Worker em produção saem em `npx wrangler tail`, com o uso de tokens de cada resposta.
