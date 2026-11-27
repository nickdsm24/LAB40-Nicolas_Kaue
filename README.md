# LAB40 – Laboratório de Funcionalidades Web (Enunciado 18)

Projeto-base para avaliação prática de Integração e Entrega Contínua (CI/CD), com implementação do **Enunciado 18 – Identificador de maior valor** (`src/features/feature18.js`).

## Requisitos
- Node.js 20 ou superior.
- npm.
- Docker (opcional para execução em container).

## Executar localmente
```bash
npm install
npm start
```
Acesse http://localhost:3000. Para desenvolvimento com reinicialização automática: `npm run dev`.

## Endpoints
- `GET /health`: verificação de disponibilidade.
- `GET /api/features`: lista as 40 funcionalidades e seus estados.
- `POST /api/features/:id`: executa uma funcionalidade, recebendo JSON no corpo.

Exemplo para a **Feature 18 (Identificador de maior valor)**:
```bash
curl -X POST http://localhost:3000/api/features/18 -H "Content-Type: application/json" -d '{"valores":[8,2,5]}'
```
Saída esperada:
```json
{"id":18,"name":"Identificador de maior valor","result":{"maior":8}}
```

## Testes Automatizados, Lint, Smoke Test e Auditoria
- **Testes unitários (`node:test`)**:
  ```bash
  npm test
  # ou com saída detalhada:
  npm run test:spec
  ```
- **Análise estática (ESLint)**:
  ```bash
  npm run lint
  ```
- **Smoke test da API**:
  ```bash
  npm run test:smoke
  ```
- **Auditoria de dependências**:
  ```bash
  npm audit --audit-level=high
  ```
  Resultado observado: `found 0 vulnerabilities` (apenas `eslint` como dependência de desenvolvimento).

## Roteiro de Testes Manuais (Feature 18)
1. Inicie a aplicação com `npm start` e confirme em `http://localhost:3000/health` que o retorno é `{"status":"ok","application":"LAB40"}`.
2. Acesse `http://localhost:3000/` no navegador e localize o cartão **18 – Identificador de maior valor**.
3. Informe o JSON de referência `{"valores":[8,2,5]}` e execute; confirme que a resposta apresenta `maior: 8`.
4. Teste um caso de fronteira com números negativos e decimais, como `{"valores":[-8,-2,-5.5]}`, confirmando `maior: -2`.
5. Teste uma entrada inválida, como `{"valores":[]}` ou `{"valores":[1,"2"]}`, confirmando que a API retorna HTTP 400 com mensagem de erro clara sem derrubar o servidor.

## Docker
```bash
docker build --pull -t lab40:feature18 .
docker run -d --name lab40-container -p 3000:3000 lab40:feature18
curl --fail http://localhost:3000/health
curl --fail -X POST http://localhost:3000/api/features/18 -H "Content-Type: application/json" -d '{"valores":[8,2,5]}'
docker stop lab40-container && docker rm lab40-container
```

## Estrutura
```text
lab40/
├── .github/workflows/ci.yml
├── public/
├── scripts/smoke.js
├── src/
│   ├── app.js
│   ├── server.js
│   └── features/feature18.js
├── test/feature18.test.js
├── Dockerfile
├── .dockerignore
├── eslint.config.js
├── package.json
└── package-lock.json
```
