# Money In The Bank Web App

Initial work towards building Money In The Bank web app.

## Development Setup Steps

```
# installs node_modules/ folder
npm install

# initialize database schema to latest migration
npx knex migrate:latest

# initialize database with seed data
npx knex seed:run

# start express.js server on port 3000
npx nodemon index.js
```
