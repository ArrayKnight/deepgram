# Deepgram Coding Challenge

## Getting Started 🏃

**Required:** Create an `.env` file and copy the contents of `.env.example`

### `npm install && npm start`

#### Server: [http://localhost:4000/](http://localhost:4000/)

#### Client: [http://localhost:3000/](http://localhost:3000/)

## Instructions 📚

#### See [requirements](/requirements.pdf)

## Tooling 🧰

-   [Codegen](https://graphql-code-generator.com/)
-   [CommitLint](https://commitlint.js.org/#/)
-   [ESLint](https://eslint.org/)
-   [Jest](https://jestjs.io/)
-   [Prettier](https://prettier.io/)
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
-   [Storybook](https://storybook.js.org/)

## Decisions 💭

I wanted to treat the backend and frontend as separate entities which would be more typical in a production application but didn't want to establish two repos/codebases, so I merged them into this single project. In a production environment this not the setup I would recommend since it won't scale well or deploy as cleanly. Since I opted to NextJS for the frontend portion, I could have integrated the API into a single codebase that way as well, but again I was thinking about how I would expect a larger enterprise architecture to be established

## Scripts 💻

**A valid `.env` file is required for these to be successful**

### Commit `npm run commit`

Runs linter, interactive Git file selector, and then git-cz for clean, consistently formatted commit messages

### Lint `npm run lint`

Runs the linter on the entire project

### Start `npm run start`

Runs the development build and server and watches the codebase for changes

### Test `npm run test`

Runs the tests within the entire project

### Upgrade `npm run upgrade`

Runs an interactive tool to check for new versions of existing dependencies, allowing for selective upgrading
