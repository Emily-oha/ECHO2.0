const feedbacks = [

{
title:"Comunicação interna",
count:25,
status:"green",
comments:["Mensagem pouco clara","Reuniões frequentes demais"],
stats:"25 pessoas mencionaram",
suggestions:"Revisar fluxo de comunicação",
profiles:"RH, Marketing",
date:"20/09/2025",
type:"Neutro",
priority:"Média",
history:"Nenhuma ação recente",
summary:"Tendência estável"
},

{
title:"Atendimento ao cliente",
count:40,
status:"red",
comments:["Demora no retorno","Equipe atenciosa"],
stats:"40 pessoas mencionaram",
suggestions:"Treinamento de equipe",
profiles:"Suporte, Vendas",
date:"21/09/2025",
type:"Negativo",
priority:"Alta",
history:"Feedback de treinamento enviado",
summary:"Necessita atenção imediata"
},

{
title:"Processos internos",
count:15,
status:"yellow",
comments:["Formulários longos","Processo burocrático"],
stats:"15 pessoas mencionaram",
suggestions:"Simplificar processos",
profiles:"Administração, RH",
date:"19/09/2025",
type:"Positivo",
priority:"Baixa",
history:"Processos revisados recentemente",
summary:"Leve melhora observada"
},

{
title:"Satisfação com liderança",
count:30,
status:"yellow",
comments:["Liderança inspiradora","Falta de feedback"],
stats:"30 pessoas mencionaram",
suggestions:"Reuniões de alinhamento",
profiles:"Gestores, RH",
date:"22/09/2025",
type:"Neutro",
priority:"Média",
history:"Sessão de coaching realizada",
summary:"Tendência estável"
},

{
title:"Engajamento da equipe",
count:18,
status:"green",
comments:["Boa interação","Pouca motivação em alguns times"],
stats:"18 pessoas mencionaram",
suggestions:"Eventos internos",
profiles:"Todos departamentos",
date:"23/09/2025",
type:"Positivo",
priority:"Baixa",
history:"Atividades internas implementadas",
summary:"Tendência de melhora"
},

{
title:"Treinamento e capacitação",
count:22,
status:"red",
comments:["Treinamentos insuficientes","Conteúdo desatualizado"],
stats:"22 pessoas mencionaram",
suggestions:"Novo calendário de treinamentos",
profiles:"RH, Todos departamentos",
date:"24/09/2025",
type:"Negativo",
priority:"Alta",
history:"Plano de atualização em andamento",
summary:"Necessita atenção"
},

{
title:"Infraestrutura e recursos",
count:12,
status:"green",
comments:["Espaço adequado","Falta de equipamentos"],
stats:"12 pessoas mencionaram",
suggestions:"Revisar equipamentos e mobiliário",
profiles:"Administração, TI",
date:"25/09/2025",
type:"Positivo",
priority:"Média",
history:"Novos equipamentos adquiridos",
summary:"Melhoria recente"
},

{
title:"Cultura e valores",
count:35,
status:"yellow",
comments:["Cultura inclusiva","Falta de engajamento"],
stats:"35 pessoas mencionaram",
suggestions:"Campanhas de cultura",
profiles:"Todos departamentos",
date:"26/09/2025",
type:"Neutro",
priority:"Média",
history:"Workshops realizados",
summary:"Tendência estável"
}

];

const cardFeed = document.getElementById('card-feed');

const sidePanel = document.getElementById('side-panel');
const overlay = document.getElementById('overlay');

const commentsList = document.getElementById('comments-list');
const statsDiv = document.getElementById('stats');
const suggestionsDiv = document.getElementById('suggestions');
const profilesDiv = document.getElementById('profiles');

const dateDiv = document.getElementById('date');
const typeDiv = document.getElementById('type');
const priorityDiv = document.getElementById('priority');
const historyDiv = document.getElementById('history');
const summaryDiv = document.getElementById('summary');

const sortSelect = document.getElementById('sort-select');
const filterSelect = document.getElementById('filter-select');

function renderCards(array){

cardFeed.innerHTML='';

array.forEach(f=>{

const card = document.createElement('div');

card.className='card';

card.innerHTML=`
<div class="status-circle ${f.status}"></div>
<h3>${f.title}</h3>
<p>${f.count} pessoas</p>
`;

cardFeed.appendChild(card);

card.addEventListener('click',()=>{

commentsList.innerHTML = f.comments
.map(c=>`<div class="comment-item">${c}</div>`)
.join('');

statsDiv.innerHTML = f.stats;
suggestionsDiv.innerHTML = f.suggestions;
profilesDiv.innerHTML = f.profiles;

dateDiv.innerHTML = "Data: " + f.date;
typeDiv.innerHTML = "Tipo: " + f.type;
priorityDiv.innerHTML = "Prioridade: " + f.priority;
historyDiv.innerHTML = "Histórico: " + f.history;
summaryDiv.innerHTML = "Resumo rápido: " + f.summary;

sidePanel.classList.add('open');
overlay.classList.add('show');

});

});

}

function sortFeedbacks(array,criterion){

if(criterion==='count'){
return array.slice().sort((a,b)=>b.count-a.count);
}

if(criterion==='priority'){

const order = {
"Alta":3,
"Média":2,
"Baixa":1
};

return array.slice().sort((a,b)=>order[b.priority]-order[a.priority]);

}

return array;

}

function filterFeedbacks(array,status){

if(status==='all'){
return array;
}

return array.filter(f=>f.status===status);

}

function updateFeed(){

let updated = filterFeedbacks(feedbacks,filterSelect.value);

updated = sortFeedbacks(updated,sortSelect.value);

renderCards(updated);

}

sortSelect.addEventListener('change',updateFeed);

filterSelect.addEventListener('change',updateFeed);

updateFeed();

document.getElementById('close-panel')
.addEventListener('click',()=>{

sidePanel.classList.remove('open');
overlay.classList.remove('show');

});

overlay.addEventListener('click',()=>{

sidePanel.classList.remove('open');
overlay.classList.remove('show');

});