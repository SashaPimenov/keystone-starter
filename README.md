# Проект для изучения Keystone.js

## 📋 Описание проекта

Этот проект предназначен для изучения основных возможностей Keystone.js, Prisma, GraphQL.  Цель проекта — создать простое приложение, включающее авторизацию, моделирование данных и взаимодействие с API, а также эксперименты с Prisma и GraphQL. Тематика приложения — Книги, но эти концепции можно адаптировать для других случаев. Вы реализуете базовый CRUD-функционал, настраиваете схемы данных и взаимодействуете как с серверной, так и с клиентской частью.
---

## 🛠️ Используемые технологии

### Серверная часть:
- **[Keystone.js v6](https://keystonejs.com/)**: Headless CMS и фреймворк для работы с API.
- **[Prisma](https://www.prisma.io/)**: ORM для управления базой данных и генерации схем.
- **[GraphQL](https://graphql.org/)**: Язык запросов для API.

### Тестирование:
- **[Jest](https://jestjs.io/)**: Фреймворк для тестирования JavaScript.

### Клиентская часть:
- **[Next.js](https://nextjs.org/docs)**: Для создания пользовательских интерфейсов.
- **[Apollo Client](https://www.apollographql.com/docs/react)**: Для взаимодействия с GraphQL API.

### База данных:
- **SQLite** (по умолчанию) или любая другая база данных, поддерживаемая Prisma (например, PostgreSQL, MySQL).
---

## 🚀 Что нужно сделать

### 1. **Настройка проекта**
1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/A14X4Y/keystone-starter.git keystone-starter
   cd keystone-starter
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Скопируйте перменные окружения
  ```bash
  cp .env.example .env
  ```

4. Создайте БД для подключения
```bash
docker compsoe up -d 
```
5. Запустите сервер разработки next и keystone:

Keystone:
   ```bash
   npm run keystone:dev
   ```

Next.js:
 ```bash
   npm run next:dev
   ```

### 2. **Функционал для реализации**

#### A. Авторизация
- Реализовать вход и регистрацию пользователей с использованием модуля аутентификации Keystone.js.

#### B. Модели данных
- Создайте следующие сущности (тематика может варьироваться в зависимости от предпочтений):
  1. **User (Пользователь)**: представляет аутентифицированного пользователя, который может оставлять отзывы или комментарии.
  2. **MainEntity** (основная сущность, например):
     - **Book (Книга)**: книга, которую можно оценивать и обсуждать.
     - Или **Post (Пост)**: запись блога, которую можно комментировать.
     - Или **Movie (Фильм)**: фильм, для которого можно оставлять рецензии.
  3. **Review (Отзыв)** или **Comment (Комментарий)**: представляет текстовый отзыв, комментарий или оценку (например, от 1 до 5 звезд).
  4. **Дополнительные сущности**(опционально): 
   - Author (Автор): представляет создателя книги
   - Genre (Жанр): 
   - Rating (Рейтинг)




#### C. API эндпоинты
- Keystone.js автоматически генерирует GraphQL-эндпоинты для сущностей.
- Создайте кастомный GraphQL-запрос
Например, реализуйте запрос для получения средней оценки для конкретной книги. Это можно сделать несколькими способами:
    1. **Через кастомный GraphQL-запрос**: создайте запрос, который вычисляет среднюю оценку на основе связанных данных отзывов.
    2. **С помощью виртуального поля**: добавьте поле `averageRating` в модель книги, которое будет вычисляться динамически.

#### D. Страницы клиентской части
- Создайте базовый интерфейс для отображения списка книг, просмтра самой книги, отзывов у книги и форму для добавления нового отзыва, а также страницу аутентификации

#### E. Тестирование
- Напишите [тесты](https://keystonejs.com/docs/guides/testing#title) для проверки авторизации, работы API и базовой валидации данных.
---

## 📌 Чеклист задач
- [ ] Настроить проект Keystone.js с аутентификацией.
- [ ] Создать модели данных для `User`, `Book` и `Review`
- [ ] Добавить валидацию данных в схемах
- [ ] Настроить [access control](https://keystonejs.com/docs/config/access-control#list-access-control) для каждой схемы
- [ ] Добавить трекинг-поля (createdAt, createdBy, updatedAt, updatedBy) для каждой сущности. B настроить значения, который убдут автоматом  присваиваться. Для этого можно использовать hooks.
- [ ] Добавить кастомный GraphQL-запрос для книг и их отзывов. [extendGraphqlSchema](https://keystonejs.com/docs/config/config#extend-graphql-schema).
- [ ]  Создать собственное кастомное поле, например: звёздный рейтинг,цветовой пикер для фона поста блога, кастомный select, реакции и прочее [custom field](https://keystonejs.com/docs/guides/custom-fields)
- [ ] Создать клиентскую часть для отображения книг и отзывов.
- [ ] Реализовать связку уникальных полей в схемах с использованием Prisma, например, сделать комбинацию userId + bookId уникальной, чтобы пользователь мог оставить только один отзыв на одну книгу.
- [ ] Написать юнит- тесты для ключевого функционала.


## 📖 Ресурсы
- [Документация Keystone.js](https://keystonejs.com/docs/)
- [Документация Prisma](https://www.prisma.io/docs/)
- [Документация по GraphQL](https://graphql.org/learn/)
- [Документация Apollo Client](https://www.apollographql.com/docs/react)
- [Документация Jest](https://jestjs.io/docs/getting-started)
---


