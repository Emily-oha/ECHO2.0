const catalogCheckboxes = document.querySelectorAll('.catalog input[type="checkbox"]');
const selectedContainer = document.getElementById('selected-questions');
const addCustomInput = document.getElementById('custom-question');
const customTypeSelect = document.getElementById('custom-type');
const addCustomBtn = document.getElementById('add-custom-btn');
const saveBtn = document.getElementById('save-btn');
const previewBtn = document.getElementById('preview-btn');

let formQuestions = [];

function updateSelected(){
  selectedContainer.innerHTML='';
  formQuestions=[];
  catalogCheckboxes.forEach(cb=>{
    if(cb.checked){
      formQuestions.push({text:cb.value,type:cb.dataset.type});
      const div=document.createElement('div');
      div.className='form-question';
      div.textContent=cb.value+' ('+cb.dataset.type+')';
      selectedContainer.appendChild(div);
    }
  });
}

catalogCheckboxes.forEach(cb=>cb.addEventListener('change',updateSelected));

addCustomBtn.addEventListener('click',()=>{
  const text=addCustomInput.value.trim();
  if(text==='') return;
  const type=customTypeSelect.value;
  formQuestions.push({text,type});
  const div=document.createElement('div');
  div.className='form-question';
  div.textContent=text+' ('+type+')';
  selectedContainer.appendChild(div);
  addCustomInput.value='';
});

saveBtn.addEventListener('click',()=>{
  localStorage.setItem('echoForm',JSON.stringify(formQuestions));
  alert('Formulário salvo!');
});

const previewModal=document.getElementById('preview-modal');
const previewClose=document.getElementById('preview-close');
const previewQuestions=document.getElementById('preview-questions');

function createAnswerField(q){
  if(q.type==='text'){
    return `<input type="text" placeholder="Responder aqui...">`;
  } else if(q.type==='yesno'){
    return `<div class="radio-group">
              <label><input type="radio" name="${q.text}"> Sim</label>
              <label><input type="radio" name="${q.text}"> Não</label>
            </div>`;
  } else if(q.type==='multiple'){
    return `<div class="checkbox-group">
              <label><input type="checkbox"> Opção 1</label>
              <label><input type="checkbox"> Opção 2</label>
            </div>`;
  } else if(q.type==='rating'){
    return `<div class="stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>`;
  }
}

previewBtn.addEventListener('click',()=>{
  previewQuestions.innerHTML='';
  formQuestions.forEach(q=>{
    const div=document.createElement('div');
    div.className='preview-question';
    div.innerHTML=`<h3>${q.text}</h3>`+createAnswerField(q);
    previewQuestions.appendChild(div);
  });

  document.querySelectorAll('.stars').forEach(starDiv=>{
    const stars=starDiv.querySelectorAll('span');
    stars.forEach((star,i)=>{
      star.addEventListener('click',()=>{
        stars.forEach((s,j)=>s.classList.toggle('selected',j<=i));
      });
    });
  });

  previewModal.style.display='flex';
});

previewClose.addEventListener('click',()=>{previewModal.style.display='none';});
window.addEventListener('click',e=>{if(e.target===previewModal){previewModal.style.display='none';}});