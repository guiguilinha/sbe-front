# 📋 Postman Requests - Maturidade Digital

## 🚀 Como usar:

### **1. Importar no Postman:**
1. Abra o Postman
2. Clique em **Import**
3. Selecione os arquivos:
   - `Get-User-Diagnostics.postman_request.json`
   - `Environment.postman_environment.json`

### **2. Configurar Environment:**
1. No Postman, vá em **Environments**
2. Selecione **"Maturidade Digital - Environment"**
3. Atualize as variáveis se necessário:
   - `base_url`: `http://localhost:8080` (backend)
   - `keycloak_token`: Token real do Keycloak

### **3. Obter Token do Keycloak:**
```bash
# No console do navegador (F12), execute:
console.log('Token:', keycloak.token);
```

### **4. Executar Request:**

#### **GET User Diagnostics:**
```
GET {{base_url}}/api/diagnostics/user/4
```

**Headers:**
```
Authorization: Bearer {{keycloak_token}}
Content-Type: application/json
```

## 📊 **Resposta Esperada:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 4,
      "company_id": 2,
      "performed_at": "2025-01-20T15:50:41.279Z",
      "overall_score": 35,
      "overall_insight": "Sua empresa está no caminho certo...",
      "status": "Concluído",
      "overall_level_id": 1,
      "created_at": "2025-01-20T15:50:41.279Z",
      "updated_at": "2025-01-20T15:50:41.279Z"
    }
  ]
}
```

## 🔧 **Outros Endpoints Disponíveis:**

### **Buscar Diagnóstico Específico:**
```
GET {{base_url}}/api/diagnostics/1
```

### **Salvar Novo Diagnóstico:**
```
POST {{base_url}}/api/diagnostics
```

### **Status do Enriquecimento de Usuário:**
```
GET {{base_url}}/api/auth/enrich-user-status
```

## 🐛 **Troubleshooting:**

### **Erro 401 Unauthorized:**
- Verifique se o `keycloak_token` está correto
- Token pode ter expirado (válido por 30 minutos)

### **Erro 500 Internal Server Error:**
- Verifique se o backend está rodando na porta 8080
- Verifique se o Directus está rodando na porta 8055

### **Erro de CORS:**
- O backend já está configurado para aceitar requests do frontend
- Se testando diretamente, pode ser necessário configurar CORS no backend
