# Web project group 10

### Development preparation steps:

1. Have node 18 installed

- you might want to use nvm

2. Check that you are using node 18

```sh
node -v
# should say v18.6.0
```

2. Install typescript globally

- the backend uses typescript

```sh
npm install typescript -g
```

2. Install Docker

- for windows / mac [Docker Desktop](https://www.docker.com/products/docker-desktop/) is good for this

3. Run npm install in the monorepo root
4. Initialize mongodb with `./scripts/setup-mongo.sh`

- In the future it can be started with `./scripts/start-mongo.sh`
- Mongo can be killed with `./scripts/stop-mongo.sh`

5. Create `.env` file under ´packages/app´ and `packages/server`

.env content for `packages/app/.env`

```sh
VITE_BACKEND_URL=127.0.0.1:3000
```

.env content for `packages/server/.env`

```sh
MONGO_DB_URI=mongodb://127.0.0.1:27017
MONGO_DB_NAME=web-project
PORT=3000
JWT_SECRET=somestringhere
```

## Frontend

### Developing

```sh
npm run dev -w app
```

### Adding new dependencies

```sh
npm install <package_name> -w app
```

## Backend

### Developing

- Make sure mongo is running. can be done with
  `./scripts/start-mongo.sh` in the monorepo root.

```sh
npm run dev -w server
```

### Adding new dependencies

```sh
npm install <package_name> -w server
```
