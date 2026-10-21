const formulario = document.querySelector('#form-encomenda');
const recebimento = document.querySelector('#recebimento');
const endereco = document.querySelector('#endereco');
const campoEndereco = document.querySelector('#campo-endereco');
const resultado = document.querySelector('#resultado-encomenda');
const mensagemPronta = document.querySelector('#mensagem-pronta');
const botaoCopiar = document.querySelector('#copiar-mensagem');
const statusCopia = document.querySelector('#status-copia');

// A data mínima é hoje, de acordo com a data local do navegador.
const campoData = document.querySelector('#data');
const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, '0');
const dia = String(hoje.getDate()).padStart(2, '0');
campoData.min = `${ano}-${mes}-${dia}`;

function atualizarEndereco() {
  const precisaEndereco = recebimento.value === 'Entrega';
  campoEndereco.hidden = !precisaEndereco;
  endereco.required = precisaEndereco;
  if (!precisaEndereco) endereco.value = '';
}
recebimento.addEventListener('change', atualizarEndereco);
atualizarEndereco();

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  if (!formulario.reportValidity()) return;

  const dados = new FormData(formulario);
  const dataOriginal = dados.get('data');
  const [anoData, mesData, diaData] = dataOriginal.split('-');
  const dataFormatada = `${diaData}/${mesData}/${anoData}`;
  const linhas = [
    'Olá! Gostaria de consultar uma encomenda na Confeitaria Sempre Doces. ♡',
    '',
    `Nome: ${dados.get('nome')}`,
    `WhatsApp/telefone: ${dados.get('telefone')}`,
    `E-mail: ${dados.get('email') || 'Não informado'}`,
    `Bolo: ${dados.get('bolo')}`,
    `Tamanho: ${dados.get('tamanho')}`,
    `Quantidade: ${dados.get('quantidade')}`,
    `Data desejada: ${dataFormatada}`,
    `Horário preferido: ${dados.get('horario')}`,
    `Recebimento: ${dados.get('recebimento')}`,
  ];
  if (dados.get('recebimento') === 'Entrega') linhas.push(`Endereço: ${dados.get('endereco')}`);
  if (dados.get('detalhes')?.trim()) linhas.push(`Detalhes: ${dados.get('detalhes').trim()}`);
  linhas.push('', 'Entendo que a data, a disponibilidade e o valor precisam ser confirmados pela confeitaria.');

  mensagemPronta.value = linhas.join('\n');
  resultado.hidden = false;
  statusCopia.textContent = '';
  resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

botaoCopiar.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(mensagemPronta.value);
    statusCopia.textContent = 'Mensagem copiada! Agora é só colar no canal de atendimento da confeitaria.';
  } catch {
    mensagemPronta.focus();
    mensagemPronta.select();
    statusCopia.textContent = 'Não foi possível copiar automaticamente. Selecione o texto acima e copie manualmente.';
  }
});
