PESQUISA DE SATISFAÇÃO — FAMÍLIA NISHIMURA

Conteúdo:
- /index.html: pesquisa pública
- /painel/: painel privado de resultados
- /functions/api/respostas.js: grava respostas no D1
- /functions/api/painel.js: lê resultados com autenticação Basic no servidor
- schema.sql: tabela do banco

CONFIGURAÇÃO NO CLOUDFLARE
1. Publique este projeto no Cloudflare Pages.
2. Crie um banco D1 e execute o conteúdo de schema.sql.
3. No projeto Pages, adicione um binding D1 com o nome: DB
4. Em Settings > Variables and Secrets, crie:
   PAINEL_USUARIO = o usuário que você quiser (se não definir, será admin)
   PAINEL_SENHA = uma senha forte escolhida por você
   IMPORTANTE: PAINEL_SENHA deve ser configurada como segredo/secret e não deve ser escrita nos arquivos do site.
5. Faça um novo deploy.
6. Pesquisa: https://SEU-ENDERECO.pages.dev/
7. Painel: https://SEU-ENDERECO.pages.dev/painel/
   O navegador solicitará usuário e senha antes de liberar os dados.

Observação: o painel exibe até as 1000 respostas mais recentes, suficiente para esta campanha temporária. O acesso aos dados acontece somente pela Function autenticada.
