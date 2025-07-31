# Ad Tracking Pro 🚀

Plataforma de tracking de links, cliques e conversões — estilo Ratoeira Ads e ClickMagick — com integração ao Facebook Conversion API (CAPI).

---

## 📦 Estrutura do Projeto (Monorepo)

```
ad-tracking-pro/
├── apps/
│   ├── api/       # Backend: FastAPI
│   │   └── requirements.txt
│   └── web/       # Frontend: Next.js
├── libs/          # Lógica de rastreamento
└── .env.api.render
```

---

## ⚙️ FastAPI (Backend) – Deploy no Render

### 🧾 Pré-requisitos

1. O arquivo `apps/api/requirements.txt` precisa conter:

```
fastapi
uvicorn
sqlalchemy
requests
python-dotenv
```

2. Configure seu serviço no Render com:

- **Root Directory**: `apps/api`
- **Build Command**:
  ```
  pip install -r requirements.txt
  ```
- **Start Command**:
  ```
  uvicorn main:app --host 0.0.0.0 --port 8000
  ```

### 🌍 Variáveis de Ambiente (Render API)

Configure em **Environment > Add Environment Variable**:

```
WEBHOOK_TOKEN=default_token
FB_PIXEL_ID=1312332810316342
FB_ACCESS_TOKEN=SEU_TOKEN_REAL
DATABASE_URL=sqlite:///./test.db
```

---

## 🌐 Next.js (Frontend) – Deploy no Render

- **Root Directory**: `apps/web`
- **Build Command**:
  ```
  npm install && npm run build
  ```
- **Start Command**:
  ```
  npm start
  ```

### 🌍 Variável no frontend:

```
NEXT_PUBLIC_API_URL=https://SEU_BACKEND_RENDER_URL
```

---

## 🧪 Endpoints da API

| Método | Rota                                | Descrição                        |
|--------|--------------------------------------|----------------------------------|
| GET    | `/links`                             | Lista os links                   |
| POST   | `/links`                             | Cria novo link                   |
| GET    | `/clicks/{link_id}`                  | Redireciona e registra clique    |
| POST   | `/webhook/convert`                   | Recebe conversão via webhook     |
| GET    | `/conversions/by-link/{link_id}`     | Lista conversões por link        |
| POST   | `/conversions/send-facebook`         | Reenvia evento para Facebook CAPI|

---

## 🧪 Teste local (opcional)

```bash
cd apps/api
uvicorn main:app --reload
```

Depois acesse: `http://localhost:8000/docs` para ver a API interativa.

---

## 🧠 Observação

- Após cada clique, você pode passar `fbp` e `fbc` via query string.
- Conversões podem ser disparadas automaticamente para o Facebook.
- Webhook é protegido por `X-Webhook-Token`.

---

Feito com 💻 por @oflucas445
