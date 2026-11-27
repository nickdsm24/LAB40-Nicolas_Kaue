// Testes de referência – Feature 18 (Identificador de maior valor)
// Execute com: node --test test/feature18.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const feature = require("../src/features/feature18");

test("mantém contrato do módulo com implemented=true", () => {
  assert.equal(feature.id, 18);
  assert.equal(feature.name, "Identificador de maior valor");
  assert.equal(feature.implemented, true);
  assert.equal(typeof feature.execute, "function");
});

test("identifica maior valor", () => {
  assert.equal(feature.execute({ valores: [8, 2, 5] }).maior, 8);
});

test("trata elemento único, negativos, repetidos e decimais", () => {
  assert.equal(feature.execute({ valores: [-8, -2, -5] }).maior, -2);
  assert.equal(feature.execute({ valores: [4] }).maior, 4);
  assert.equal(feature.execute({ valores: [2.5, 2.5] }).maior, 2.5);
  assert.equal(feature.execute({ valores: [-10, 0, 3.75, 3.74] }).maior, 3.75);
});

test("não modifica o array de entrada", () => {
  const entrada = [8, 2, 5];
  feature.execute({ valores: entrada });
  assert.deepEqual(entrada, [8, 2, 5]);
});

test("rejeita lista vazia, entrada ausente e item não numérico ou não finito", () => {
  for (const valores of [[], [1, "2"], [1, NaN], [1, Infinity], [1, -Infinity], [1, null], "8,2,5", null]) {
    assert.throws(() => feature.execute({ valores }), { name: "Error" });
  }
  assert.throws(() => feature.execute(), { name: "Error" });
  assert.throws(() => feature.execute(null), { name: "Error" });
  assert.throws(() => feature.execute({}), { name: "Error" });
});
