1️⃣ Produtos
Método	Rota	Descrição	Body / Query	Exemplo de Resposta
POST	/api/products	Criar produto com upload de imagem	form-data: image (arquivo), name, price, description, category, stock	{ "message": "Produto criado", "product": {...} }
GET	/api/products	Listar todos os produtos	query: category, available	[ { "_id": "...", "name": "Brigadeiro", "price": 10 } ]
GET	/api/products/:id	Consultar produto específico	–	{ "_id": "...", "name": "Brigadeiro", "price": 10 }
PUT	/api/products/:id	Atualizar produto	body: name, price, description, category, stock	{ "message": "Produto atualizado", "product": {...} }
DELETE	/api/products/:id	Deletar produto	–	{ "message": "Produto removido" }
PATCH	/api/products/:id/status	Ativar/desativar produto	body: `active: true	false`
POST	/api/products/upload-multiple	Upload de várias imagens (opcional)	form-data: images[] (arquivos)	{ "message": "Upload realizado", "files": ["img1.jpg", "img2.jpg"] }
2️⃣ Pedidos
Método	Rota	Descrição	Body / Query	Exemplo de Resposta
POST	/api/orders	Criar pedido	body: items: [{product, quantity, price}], customerName, customerEmail, status	{ "message": "Pedido criado", "order": {...} }
GET	/api/orders	Listar pedidos	query: `status=pending	completed
GET	/api/orders/:id	Consultar pedido específico	–	{ "_id": "...", "items": [...], "total": 100 }
PATCH	/api/orders/:id/status	Atualizar status do pedido	body: `status: pending	completed
DELETE	/api/orders/:id	Cancelar pedido	–	{ "message": "Pedido cancelado" }
GET	/api/orders/stats	Estatísticas gerais de pedidos	–	{ "totalOrders": 10, "totalRevenue": 500 }
GET	/api/orders/stats/period	Estatísticas filtradas por período	query: start=YYYY-MM-DD&end=YYYY-MM-DD	{ "totalOrders": 5, "totalRevenue": 250 }
GET	/api/orders/dashboard	Dashboard completo (vendas, top produtos, status)	query: start, end (opcional)	{ "totalOrders": 10, "bestSelling": [...], "ordersByStatus": [...] }
3️⃣ Dashboard e Estatísticas
Funcionalidade	Descrição	Endpoint sugerido
Faturamento diário	Total de vendas por dia	/api/orders/dashboard?start=YYYY-MM-DD&end=YYYY-MM-DD
Top produtos vendidos	Ranking de produtos por quantidade/faturamento	/api/orders/dashboard
Pedidos por status	Quantidade de pedidos pendentes, concluídos e cancelados	/api/orders/dashboard
Pedidos do período	Visualizar pedidos em determinado período	/api/orders/stats/period?start=&end=
Alertas	Notificação quando pedido é cancelado ou estoque baixo	Implementar via backend com e-mail ou webhook
4️⃣ Usuários e Admins (Futuro)
Método	Rota	Descrição	Body / Query
POST	/api/users	Criar usuário/admin	name, email, password, `role: admin
POST	/api/login	Login de usuário	email, password
GET	/api/users	Listar usuários	query: role
PATCH	/api/users/:id/role	Alterar papel	role

💡 Nota: implementação de autenticação com JWT seria ideal.

5️⃣ Relatórios e Exportação (Futuro)
Funcionalidade	Endpoint	Descrição
Exportar pedidos	`/api/orders/export?format=csv	pdf`
Exportar faturamento	/api/orders/export-revenue?start=&end=	Relatório de faturamento
Cupons e descontos	/api/coupons	Criar, validar e aplicar descontos nos pedidos
6️⃣ Observações importantes

Upload de imagens: campo no Postman deve ser image (single) ou images[] (multiple)

Pastas: src/uploads deve existir antes do upload

Middleware: validar produto (validateProduct) antes de salvar

Métodos HTTP corretos:

GET → ler dados

POST → criar dados

PUT → substituir dados

PATCH → atualizar parcialmente

DELETE → remover