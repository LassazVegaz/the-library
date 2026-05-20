# The Library

A simple application to manage a library.

## Key features

- Manage books: Adding, removing, editing, viewing and listing
- Users: Creating, editing, deleting and viewing user profiles
  - Only the authenticated user can make changes to one's profile
  - Admin can view all users
- Borowing books
  - Admin can mention in the system that a user has borrowed

## Features in the wish list

- Search: search books and users
- Borrowed history: History of borrowed books by each user
- Returning books: Mark as books are turned

## Setup application

You need the following software to execute this application in your machine. Follow the links to download them.

- [NodeJS](https://nodejs.org/en/download)
- [PNPM](https://pnpm.io/installation)

You also need a PostgreSQL DB. You can have one online or download free PostgreSQL Server from [here](https://www.postgresql.org/download).

Please make a copy of `.env.example` file and rename it to `.env`. Add the DB URL and a key for JWT encryption. `.env` should be placed in the root folder of the project.

Please open the terminal in the root folder and execute the following command to install dependancies of the project.

```bash
pnpm install
```

Then please execute the following command to create DB schemas

```bash
pnpm prisma migrate dev
```

Then please execute the following command to generate DB types

```bash
pnpm prisma generate
```

Finally, following command to start the application in development environment

```bash
pnpm dev
```

You see the application in [localhost:3000](http://localhost:3000/)

---

Unfortunately I did not have time to implement all the features I wanted to.
