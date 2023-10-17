1. Необходимо сверстать страницу, используя гриды или flexbox
   https://www.squadhelp.com/how-it-works + адаптив

ветка layout

два файла в папке HowItWorksPage:

HowItWorksPage.js
HowItWorksPage.module.sass

2. Динамический брендинг

ветка Dynamic-branding

файлы:
EventForm.js
EventTimer.js
и папка
EventsPage

3. Используя эту страницу https://www.squadhelp.com/start-contest?step=2&type=1
   необходимо сделать ButtonGroup компонент.

ветка Dynamic-branding

папка ButtonGroup

4. найти и посчитать, сколько записей в коллекции
   Messages содержат слово «паровоз»

ветка DB-No-SQL

подсчет сделан при отправке сообщения
в файле chatController
но он был сделан еще на MongoDb

5. К имеющейся no-sql DB необходимо разработать структуру
   базы данных с использованием SQL(PostgreSQL) для чатов,
   используя существующую БД в качестве эталона.

ветка Db-SQL

файлы в папке models
Conversation.js
Message.js
Catalog.js
а так же папка SQLModels с SQL запросами
скриншт находится : client/public/Screenshot_20230828_150837.png

были исправления при переходе с no-sql на sql, в последней задаче, модели и миграци откорректированы

6. Вывести количество юзеров по ролям {admin: 40, customer: 22, …}

ветка Db-SQL

папка SqlTask
countRole.js

7. по 10% кэшбэка

ветка Db-SQL

папка SqlTask

cashback.sql

8. Для роли сreative необходимо выплатить 3-м юзерам
   с самым высоким рейтингом по 10$ на их счета.

ветка Db-SQL

папка SqlTask

highRatingCustomer.js

9. Создать логгер ошибок и сюда же копирование содержимого

ветка Node-JS

файлы:
ApplicationError.js
LoggerError.js
так же добавлена папка logDir в которую по индексу добавляются файлы с ошибками отдельно каждая

10. Модерация предложений.

ветка Offer-moderation
добавлено moderatorDashboard
изменения в Header, OfferBox, RegistrationForm, ContestPage,
contestController, basicMiddlewares constans( server && client)

11. Взяв за основу структуру БД, разработанную в первом задании
    секции DB SQL, описать Sequelize модели и миграции

ветка SQL-Chats

откорректированы миграции и модели для
Conversation
Message
Catalog
связующая таблица CatalogChats
изменение ассоциаций в файле index.js в models
основные изменения в chatController, restController,
