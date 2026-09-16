# Pesquisa Família Nishimura — Cloudflare Workers

Estrutura preparada para Cloudflare Workers + Static Assets + D1.

## Antes do deploy completo
1. Crie um banco D1 chamado `pesquisa-familia-nishimura`.
2. Execute `schema.sql` no banco.
3. Vincule o D1 ao Worker com o binding **DB**.
4. Configure `PAINEL_USUARIO` (ex.: admin) e o segredo `PAINEL_SENHA` no Worker.

O `wrangler.jsonc` não contém `database_id` de propósito: o vínculo D1 será feito no painel da Cloudflare após criarmos o banco.
