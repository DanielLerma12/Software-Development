# Software Development

Courses, projects, and reference material from various instructors focused on software development.

---

## [General Configs](general-configs/)

Reference notes and cheat sheets for common dev tooling.

| File                                                               | Description                                                                    |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [ESLint Config](general-configs/eslint-config.txt)                 | ESLint installation and configuration for JS (Node/Browser)                    |
| [General Config](general-configs/general-config.txt)               | `package.json` scripts examples (Prisma, JSON, dev modes)                      |
| [Terminal Commands](general-configs/general-terminal-commands.txt) | Basic terminal commands (`mkdir`, `rm`)                                        |
| [Git & GitHub](general-configs/git-github.txt)                     | Git/GitHub cheat sheet (init, commit, branch, merge, remote, push, tag, clone) |
| [Monorepo](general-configs/monorepo.txt)                           | npm workspaces / monorepo setup                                                |
| [npm/pnpm Init](general-configs/npm-pnpm-init.txt)                 | `npm`/`pnpm` init, `add` vs `install`                                          |

---

## [Languages](languages/)

### [JavaScript — Brais Moure](languages/javascript-brais-moure/)

Basic and intermediate course with 50+ practical exercises.

- **[Basic](languages/javascript-brais-moure/basic/)** — Variables, data types, operators, strings, conditionals, arrays, sets, maps, loops, functions, objects, destructuring, classes, error handling, console methods, modules
- **[Intermediate](languages/javascript-brais-moure/intermediate/)** — Advanced functions, advanced structures, advanced objects/classes, async/await, APIs, DOM manipulation, debugging, regex, testing

### [TypeScript — Midudev](languages/typescript-midu/)

TypeScript fundamentals: types, generics, type aliases, union/intersection types, interfaces, narrowing, enums, arrays, tuples, assertions.

### [Hand Challenge — Midudev](languages/hand-challenge-test-midu/)

Interpreter for an emoji-based esoteric programming language — pointers, memory, loops.

---

## [Web Development](web-development/)

### [Frontend](web-development/frontend/)

#### [HTML Course — Midudev](web-development/frontend/html-course-midu/)

HTML basics: semantic HTML, meta tags, Open Graph, portfolio page.

#### [React Course — Midudev](web-development/frontend/react-course-midu/)

15 React projects in an npm workspace monorepo, progressing from basics to advanced patterns.

| Project                                                                                                             | Description                | Key Technologies                         |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------- |
| [01 - Twitter Follow Card](web-development/frontend/react-course-midu/projects/01-twitter-follow-card/)             | Component with props       | React, Vite                              |
| [01b - Calculator](web-development/frontend/react-course-midu/projects/01b-calculator/)                             | Calculator app             | React, Vite, ESLint                      |
| [02 - Tic Tac Toe](web-development/frontend/react-course-midu/projects/02-tic-tac-toe/)                             | Tic-tac-toe game           | React, Vite                              |
| [02b - Follow the Square](web-development/frontend/react-course-midu/projects/02b-follow-the-square/)               | Follow-the-square game     | React, Vite, ESLint                      |
| [03 - Mouse Follower](web-development/frontend/react-course-midu/projects/03-mouse-follower/)                       | Mouse follower effect      | React, Vite                              |
| [04 - Cat API](web-development/frontend/react-course-midu/projects/04-cat-api/)                                     | Cat API integration        | React, Vite, Playwright                  |
| [05 - Movie Finder](web-development/frontend/react-course-midu/projects/05-movie-finder/)                           | Movie search app           | React, Vite                              |
| [06 - Shopping Cart](web-development/frontend/react-course-midu/projects/06-shopping-cart/)                         | Shopping cart              | React, useReducer, Context               |
| [07 - React Router Fruit Game](web-development/frontend/react-course-midu/projects/07-react-router-fruitgame/)      | Fruit game with routing    | React, React Router                      |
| [08 - TS Todo App](web-development/frontend/react-course-midu/projects/08-ts-todo-app/)                             | Todo app                   | React, TypeScript, Vite                  |
| [09 - TS Google Translate Clone](web-development/frontend/react-course-midu/projects/09-ts-google-translate-clone/) | Google Translate clone     | React, TypeScript, External API          |
| [10 - TS React Query](web-development/frontend/react-course-midu/projects/10-ts-react-query/)                       | Data fetching              | React, TypeScript, React Query           |
| [10b - TS React Query Mutations](web-development/frontend/react-course-midu/projects/10b-ts-react-query-mutate/)    | Mutations with mock server | React, TypeScript, React Query           |
| [11 - Zustand JS Quiz](web-development/frontend/react-course-midu/projects/11-zustand-javascript-quiz/)             | Quiz app                   | React, TypeScript, Zustand               |
| [12 - Zustand CRUD](web-development/frontend/react-course-midu/projects/12-zustand-crud/)                           | CRUD app                   | React, TypeScript, Zustand, Tailwind CSS |

#### [Jikan API Test](web-development/frontend/jikanapi-test/)

Practice project using the unofficial MyAnimeList API (Jikan). Vanilla JS, multi-page app.

#### [Tetris](web-development/frontend/tetris-test-midu/)

Classic Tetris game. Vanilla JS + Vite, with audio assets.

---

### [Backend](web-development/backend/)

#### [Callbacks & Promises Test — Midudev](web-development/backend/callbacks-promises-test-midu/)

7 technical exercises: callback-to-promise conversion, file I/O, dotenv implementation, Express CRUD API.

#### [Node.js Course — Midudev](web-development/backend/nodejs-course-midu/)

| Class                                                                                               | Description                                                                        | Key Technologies                |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------- |
| [01–03: Fundamentals](web-development/backend/nodejs-course-midu/class-01-03/)                      | OS info, fs (sync/async/promises), path, HTTP server, Express, routing, validation | Node Modules, Express, Zod      |
| [04: REST API + Deploy](web-development/backend/nodejs-course-midu/class-04-rest-api-deploy/)       | Full REST API with MVC architecture, Prisma ORM, MySQL/PostgreSQL, CORS            | Express, Prisma, MVC            |
| [04: REST API Frontend](web-development/backend/nodejs-course-midu/class-04-rest-api-deploy-front/) | Frontend for the REST API                                                          | HTML/CSS/JS                     |
| [05: Real-time Chat](web-development/backend/nodejs-course-midu/class-05-chat-realtime/)            | Real-time chat app                                                                 | Socket.io, Prisma, JWT, Cookies |

---

### [Fullstack — JSCamp Bootcamp — Midudev](web-development/fullstack/jscamp-midu/)

Complete 10-module bootcamp covering the full stack.

| Module                                                                                     | Description                                        | Key Technologies                         |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------- | ---------------------------------------- |
| [01: HTML/CSS/JS DOM](web-development/fullstack/jscamp-midu/01-html-css-javascript%20dom/) | HTML/CSS/JS fundamentals, DOM manipulation         | HTML, CSS, JS, Fetch API                 |
| [02: Router & Zustand](web-development/fullstack/jscamp-midu/02-router-and-zustand/)       | Job board app with routing and state management    | React, React Router, Zustand             |
| [03: Node.js](web-development/fullstack/jscamp-midu/03-node/)                              | CLI application, file management                   | Node.js                                  |
| [04: Express](web-development/fullstack/jscamp-midu/04-express/)                           | REST API with MVC architecture                     | Express, MVC                             |
| [05: Testing](web-development/fullstack/jscamp-midu/05-testing/)                           | E2E testing with Playwright and AI-powered testing | Playwright, Stagehand                    |
| [06: TypeScript](web-development/fullstack/jscamp-midu/06-typescript/)                     | TS fundamentals, functions, interfaces & types     | TypeScript                               |
| [07: AI Integration](web-development/fullstack/jscamp-midu/07-inteligencia-artificial/)    | AI-powered features with Google AI SDK             | Google AI SDK, Vercel AI, React, Express |
| [08: SQL](web-development/fullstack/jscamp-midu/08-sql/)                                   | Database layer with TypeScript backend             | SQL, TypeScript, pnpm                    |
| [09: CI/CD](web-development/fullstack/jscamp-midu/09-ci-cd/)                               | Continuous integration & deployment pipelines      | Node.js, React, pnpm workspaces          |
| [10: Docker](web-development/fullstack/jscamp-midu/10-docker/)                             | 8 progressive exercises: basics to Vercel deploy   | Docker, Docker Compose, Go, Python Flask |

---

## [AI Engineering](ai-engineering/)

### [OpenCode Course — Midudev](ai-engineering/opencode-midu/)

OpenCode as an AI coding assistant: agents, skills, commands. Includes a vanilla HTML/CSS/JS dinosaur game project and OpenCode configuration (`.opencode/`).

---

## [Scripts](scripts/)

### [MP3Gain Undetected](scripts/mp3gain-undetected-mp3/)

Node.js utility to check the default target volume (95) of `.mp3` files whose filenames contain symbols that the MP3Gain app does not detect. Uses `ffmpeg-static` for ReplayGain analysis.
