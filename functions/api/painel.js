function unauthorized(){return new Response('Não autorizado',{status:401,headers:{'WWW-Authenticate':'Basic realm="Painel Família Nishimura"'}})}
function authOK(request,env){
 const h=request.headers.get('Authorization')||'';
 if(!h.startsWith('Basic ')) return false;
 try{const [u,p]=atob(h.slice(6)).split(':');return u===(env.PAINEL_USUARIO||'admin') && p===env.PAINEL_SENHA}catch{return false}
}
export async function onRequestGet({request,env}){
 if(!env.PAINEL_SENHA || !authOK(request,env)) return unauthorized();
 try{
  const rows=(await env.DB.prepare(`SELECT id,criado_em,frequencia,qualidade,variedade,atendimento,limpeza,custo_beneficio,prato_favorito,prato_desejado,compraria_sobremesa,sobremesas,sobremesa_outra,recomendacao,comentario FROM respostas ORDER BY id DESC LIMIT 1000`).all()).results||[];
  return Response.json({ok:true,respostas:rows},{headers:{'Cache-Control':'no-store'}})
 }catch(e){return Response.json({ok:false,error:'Erro ao carregar resultados'},{status:500})}
}
