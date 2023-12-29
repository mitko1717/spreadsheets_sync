http://localhost:3334/api/spreadsheets - GET
робить запит на spreadsheets, отримує всі поля, парсить та записує існуючі там товари до локальної бд. повертає відформатований масив.

http://localhost:3334/api/localDb - GET
повертає всі записи продуктів у локальній бд

http://localhost:3334/api/localDb/:id (id - тобто articleNumber) - GET
повертає один продукт з бази

http://localhost:3334/api/localDb/size/:size - GET
повертає ті продукти, в наявності яких є розмір у запиті

http://localhost:3334/api/localDb/params - GET
повертає відфільтровані продукти. реалізовано фільтр для 4 параметрів (brand, price, model, size)

filter by brand: http://localhost:3334/api/localDb/params?brand=Nike
price range (>= 100): http://localhost:3334/api/localDb/params?price=%3E=100
model "Yeezy": http://localhost:3334/api/localDb/params?model=Yeezy
specific size: http://localhost:3334/api/localDb/params?size=42
combined: http://localhost:3334/api/localDb/params?brand=Adidas&price=%3E=3300

http://localhost:3334/api/localDb/:id - PUT - де id = номеру артикулу в таблиці
редагування продукту в локал бд

з таким, наприклад, обʼєктом в боді
{
"price": 2299.99,
"category": "adidas",
"subcategory": "adidas"
}

///

запуск в консолі node cron.js викликає метод SpreadsheetsService.processAndCreateProducts, який виконує синхронізацію спредшітс з локальною базою.
там форматує дані, проходить по кожному товару, звірює по артикулу з базою. якщо такий артикул є, то дивиться чи не змінились розміри, у випадку якщо немає товару в базі, то створює його

...

у проекті використовував MySql DB, express & sequelize, бо добре знайомий з цими інструментами. позаяк бракує часу, то вирішив реалізувати завдання перевіреними інструментами.

...

.ENV

DB_DATABASE=resto_waves
DB_USER=root
DB_PASSWORD=**\*\*\*\***
DB_HOST=127.0.0.1
DB_SOCKET=""
DB_PORT=3306
SERVER_PORT=3334
API_KEY=**\*\*\*\***\***\*\*\*\***

ну, і звісно, по хорошому, треба додати додаткові таблиці типу brand_id, model_id і привʼязати до продукту, витягуючи по звʼязку по id, але не зараз

..
