# Teststore

## About The Project

Do you find yourself on how to test different parts of your Angular or NestJs application?\
Is your teacher asking for you to come up with various test cases?
**Look no further, this app has a examples of all that**

Unit tests in NestJs, E2E endpoints tests for the API, Frontend E2E tests with Cypress, and a mix of integration tests in the backend and frontend validating the components and services. Many test cases, many tests, all your heart desires.

### Built With

- [NestJs](https://nestjs.com/) - api
- [Angular](https://angular.io/) - frontend
- [NX](https://nx.dev/) - repository structure as a monorepo
- [PostgreSql](https://www.postgresql.org/) - data persistance
- And love 💖

#### Configuration

The services are configured via a `.env` file, which is gitignored.\
If you wish to connect to a database other than a locally hosted one, create a `.env` file based on the [.env.template](.env.template) and store your data there.

```sh
cp .env.template .env
```

## Getting Started

### Prerequisites

Before you can run this project, you need to have the following things installed:

- Npm and Node - we recommend using [NVM (Linux, MacOS)](https://github.com/nvm-sh/nvm#about) or [NVM-Windows (Windows)](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows)

  > Use Node version `v16.14.0+`

- nx

```sh
npm install -g nx
```

> if you don't want to install NX globally, every NX command will have to be run through npx

> We try to use the latest version of NX, but it is under active development and gets updated often. If the latest version of NX doesn't work, try an older version and submit a bug report.\
> Current NX version used by the project can be found in the [package.json](package.json) under any of the `nrwl/` dev dependencies

### Installation

1. Clone the repo

```sh
git clone https://github.com/Kwandes/teststore.git
```

2. Install NPM packages

```sh
npm install
```

3. Configure the app

Update the `.env` file if needed.

The app requires a PostgreSql database instance to connect to with an existing schema `teststore`

You can run one locally via Docker with:

```docker
docker run --name postgres --restart unless-stopped -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=teststore -p 5432:5432 -d postgres
```

4. _[Optional]_ Populate (seed) the database with example data

```sh
npm run seed
```

5. Serve the apps

The system is composed of multiple apps, to get access to all of the functionalty all of them need to be running.

#### NX serve

You can either serve apps individually with:

```sh
nx serve api
nx serve teststore
```

or serve multiple apps using:

```sh
nx run-many --maxParallel 2 --parallel true --projects api, teststore --target serve
```

Find out more about how to use NX [here](https://nx.dev/latest/angular/getting-started/nx-cli)

#### Documentation

The API is documented using SwaggerUi, which you can access by runnign the api and navigating to [localhost:3333/api](http://localhost:3333/api)

The documentation contains all of the available endpoints as well as how to call them and what they return.

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
