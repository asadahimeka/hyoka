# Hyoka GraphQL Backend with MongoDB

Hyoka mp project server-side support created by Create-GraphQL

## Directory Structure

```bash
├── /data/                   # GraphQL generated schema
├── /scripts/                # Generate GraphQL schema script
├── /src/                    # Source code of GraphQL Server
│   ├── /connection/         # Connections types (Relay)
│   ├── /interface/          # NodeInterface (Relay)
│   ├── /loader/             # Loaders of the models using DataLoader
│   ├── /model/              # Models definition (Mongoose)
│   ├── /mutation/           # Mutations definition
├── /test/                   # Test helpers
```

## Create-GraphQL

If you want to move faster you should use [create-graphql](https://github.com/lucasbento/create-graphql) to simplify the creation of a GraphQL Server

## Command

### Setup

```bash
npm install
```

Note: If you do not have mongodb installed, please install it

### Develop

```bash
npm run watch
```

### Test

```bash
npm test
```

Or

```bash
npm run test:watch
```

#### Docker and docker-compose

No needs for installing dependencies or running `mongod` in another terminal window

```bash
docker-compose build && docker-compose up
```

Test

```bash
docker-compose -f docker-compose.test.yml build && docker-compose -f docker-compose.test.yml up
```

### Production

```bash
# first compile the code
npm run build

# run graphql compiled server
npm start
```

#### Schema

Update your schema

```bash
npm run update-schema
```

Take a look on the [Schema](https://github.com/sibelius/graphql-dataloader-boilerplate/blob/master/data/schema.graphql)
