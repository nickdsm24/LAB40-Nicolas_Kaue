const http = require("node:http");
const assert = require("node:assert/strict");
const app = require("../src/app");

async function runSmokeTest() {
  const server = http.createServer(app);

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // 1. Verifica endpoint /health
    const healthRes = await fetch(`${baseUrl}/health`);
    assert.equal(healthRes.status, 200, "GET /health deve retornar status 200");
    const healthJson = await healthRes.json();
    assert.equal(healthJson.status, "ok", "GET /health deve retornar status: ok");

    // 2. Verifica endpoint /api/features e estado da feature 18
    const listRes = await fetch(`${baseUrl}/api/features`);
    assert.equal(listRes.status, 200, "GET /api/features deve retornar status 200");
    const listJson = await listRes.json();
    assert.equal(listJson.total, 40, "Deve listar 40 funcionalidades");
    const f18 = listJson.items.find((item) => item.id === 18);
    assert.ok(f18, "Feature 18 deve estar registrada");
    assert.equal(f18.implemented, true, "Feature 18 deve estar com implemented=true");

    // 3. Verifica execução válida da feature 18 via POST /api/features/18
    const execRes = await fetch(`${baseUrl}/api/features/18`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valores: [8, 2, 5] })
    });
    assert.equal(execRes.status, 200, "POST /api/features/18 válido deve retornar status 200");
    const execJson = await execRes.json();
    assert.equal(execJson.result.maior, 8, "Resultado esperado para [8,2,5] é maior=8");

    // 4. Verifica rejeição de entrada inválida via HTTP 400
    const errRes = await fetch(`${baseUrl}/api/features/18`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valores: [] })
    });
    assert.equal(errRes.status, 400, "POST /api/features/18 inválido deve retornar status 400");

    console.log("Smoke test passou com sucesso: /health, /api/features e /api/features/18 OK.");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

runSmokeTest().catch((err) => {
  console.error("Smoke test falhou:", err);
  process.exit(1);
});
