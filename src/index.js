function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function unauthorized() {
  return new Response('Não autorizado', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Painel Família Nishimura"', 'Cache-Control': 'no-store' },
  });
}

function authOK(request, env) {
  const h = request.headers.get('Authorization') || '';
  if (!h.startsWith('Basic ') || !env.PAINEL_SENHA) return false;
  try {
    const decoded = atob(h.slice(6));
    const sep = decoded.indexOf(':');
    if (sep < 0) return false;
    const u = decoded.slice(0, sep);
    const p = decoded.slice(sep + 1);
    return u === (env.PAINEL_USUARIO || 'admin') && p === env.PAINEL_SENHA;
  } catch { return false; }
}

async function salvarResposta(request, env) {
  try {
    const d = await request.json();
    const required = ['frequencia','qualidade','variedade','atendimento','limpeza','custo_beneficio','compraria_sobremesa','recomendacao'];
    if (required.some(k => d[k] === undefined || d[k] === '') || !Array.isArray(d.sobremesas) || !d.sobremesas.length) {
      return json({ ok:false, error:'Campos obrigatórios ausentes' }, 400);
    }
    const q = `INSERT INTO respostas (frequencia,qualidade,variedade,atendimento,limpeza,custo_beneficio,prato_favorito,prato_desejado,compraria_sobremesa,sobremesas,sobremesa_outra,recomendacao,comentario) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    await env.DB.prepare(q).bind(
      String(d.frequencia).slice(0,80), +d.qualidade, +d.variedade, +d.atendimento, +d.limpeza, +d.custo_beneficio,
      (d.prato_favorito || '').slice(0,300), (d.prato_desejado || '').slice(0,300),
      String(d.compraria_sobremesa).slice(0,80), JSON.stringify(d.sobremesas.slice(0,30)),
      (d.sobremesa_outra || '').slice(0,120), +d.recomendacao, (d.comentario || '').slice(0,600)
    ).run();
    return json({ ok:true });
  } catch (e) {
    console.error(e);
    return json({ ok:false, error:'Erro interno' }, 500);
  }
}

async function carregarPainel(request, env) {
  if (!authOK(request, env)) return unauthorized();
  try {
    const rows = (await env.DB.prepare(`SELECT id,criado_em,frequencia,qualidade,variedade,atendimento,limpeza,custo_beneficio,prato_favorito,prato_desejado,compraria_sobremesa,sobremesas,sobremesa_outra,recomendacao,comentario FROM respostas ORDER BY id DESC LIMIT 1000`).all()).results || [];
    return json({ ok:true, respostas:rows });
  } catch (e) {
    console.error(e);
    return json({ ok:false, error:'Erro ao carregar resultados' }, 500);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/respostas') {
      if (request.method !== 'POST') return new Response('Method Not Allowed', { status:405, headers:{Allow:'POST'} });
      return salvarResposta(request, env);
    }
    if (url.pathname === '/api/painel') {
      if (request.method !== 'GET') return new Response('Method Not Allowed', { status:405, headers:{Allow:'GET'} });
      return carregarPainel(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
