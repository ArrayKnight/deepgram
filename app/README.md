# Deepgram Coding Challenge: App

## Tech Stack 🤖

-   [Typescript](https://www.typescriptlang.org/)
-   [React](https://reactjs.org/)
-   [Next](https://nextjs.org/)
-   [GraphQL](https://graphql.org/)
-   [Apollo](https://www.apollographql.com/docs/react/)
-   [Styled Components](https://styled-components.com/)

## Decisions 💭

I opted to use a local Storybook deployment tool (that can be setup as part of a CI/CD pipeline as well) and Github pages simply down to ease of implementation. In its current state, it requires a developer to run the deployment command, but ideally for a long-standing production application this would be automated to be kept up-to-date

## Scripts 💻

**A valid `../.env` file is required for these to be successful**

### Build `npm run build`

Creates a production build

### Commit `npm run commit`

Runs linter, interactive Git file selector, and then git-cz for clean, consistently formatted commit messages

### GraphQL `npm run graphql`

Runs both sub GraphQL scripts in parallel.

#### GraphQL:Schema `npm run graphql:schema`

Creates a GraphQL schema file based on the connected GraphQL API for use with IDE GraphQL tools that provide intellisense when writing queries

#### GraphQL:Queries `npm run graphql:queries`

Creates a Typescript file with all types on the connected GraphQL API via introspection, as well as queries and hooks generated from within this codebase

### Lint `npm run lint`

Runs the linter on the entire project

### Serve `npm run serve`

Serves a production build (must be built previously)

### Start `npm run start`

Runs the development build and watches the codebase for changes

### Storybook `npm run storybook`

Runs Storybook locally

#### Storybook:Build `npm run storybook:build`

Creates a static version of the Storybook build

#### Storybook:Deploy `npm run storybook:deploy`

Pushes a static Storybook build to the `gh-pages` branch on Github which will update the Github Pages site

### Test `npm run test`

Runs the tests within the entire project

#### Test:Coverage `npm run test:coverage`

Runs tests as well as collects test coverage

### Upgrade `npm run upgrade`

Runs an interactive tool to check for new versions of existing dependencies, allowing for selective upgrading
