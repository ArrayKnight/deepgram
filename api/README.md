# Deepgram Coding Challenge: Api

## Tech Stack 🤖

-   [Typescript](https://www.typescriptlang.org/)
-   [TypeGraphQL](https://typegraphql.com/)
-   [GraphQL](https://graphql.org/)
-   [Apollo](https://www.apollographql.com/docs/apollo-server/)
-   [ExpressJS](https://expressjs.com/)
-   [NeDB](https://github.com/louischatriot/nedb)

## Decisions 💭

I wanted to use a database (even a simple local file based one) because this nicely helps define the service layer which ultimately could be swapped with an adapter to a more production grade database. This could have been done in memory with mocked asynchronicity, but felt like the right want to go

I truly believe that APIs should be GraphQL moving forward. Its flexibility is amazing and the tooling for building applications on top makes things so great. So while I didn't meet the letter of the requirements, I believe that I have fulfilled the spirit of the requirements

I really like the code first approach to defining a schema; it's far less code and the entire developer experience just feels easier/simpler. So I chose an easy to implement Typescript GraphQL Express server that I haven't used before but enjoyed learning

## Scripts 💻

**A valid `../.env` file is required for these to be successful**

### Commit `npm run commit`

Runs linter, interactive Git file selector, and then git-cz for clean, consistently formatted commit messages

### Lint `npm run lint`

Runs the linter on the entire project

### Start `npm run start`

Runs the server and watches the codebase for changes

### Test `npm run test`

Runs the tests within the entire project

#### Test:Coverage `npm run test:coverage`

Runs tests as well as collects test coverage

### Upgrade `npm run upgrade`

Runs an interactive tool to check for new versions of existing dependencies, allowing for selective upgrading
