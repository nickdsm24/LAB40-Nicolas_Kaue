// Funcionalidade 18: Identificador de maior valor.
// Objetivo: Retorna o maior elemento de uma lista numérica.
// Exemplo de entrada: { valores: [8, 2, 5] }
// Implemente conforme as regras e critérios do enunciado fornecido pelo professor.

const implemented = true;

// Desenvolva a regra de negócio e valide todos os dados de entrada.
function execute(input) {
  const { valores } = input || {};
  if (!Array.isArray(valores) || valores.length === 0 || !valores.every(Number.isFinite)) {
    throw new Error("Informe array não vazio de números finitos.");
  }

  let maior = valores[0];
  for (let i = 1; i < valores.length; i += 1) {
    if (valores[i] > maior) {
      maior = valores[i];
    }
  }

  return { maior };
}

// Mantém o contrato de integração utilizado pela API central.
module.exports = {
  id: 18,
  name: "Identificador de maior valor",
  description: "Retorna o maior elemento de uma lista numérica.",
  implemented,
  execute
};
