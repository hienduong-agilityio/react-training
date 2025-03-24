# React - Practice Four

This document is related to React practice four. Build a website about a converted data management dashboard based on practice three of React and change some project editing functionality

## RELATED DOCUMENTS

* React training plan ( [Document](https://docs.google.com/document/d/10GPuskxX7rd66huUL57eAjJ4k-qGsqgf5nMKDHh3ufc/edit) )
* Design for practice ( view via [Figma](https://www.figma.com/design/1nkWBjRpkdkigZk0wHkfJf/Project-Management-(Copy)?node-id=0-1N) )

## TIMELINE

* Estimate time ([link](https://docs.google.com/document/d/1npSSC3duQgFmrbDuSnISdkZ1x69-1ny6zPNaI762qjw/edit)): 15 days of working
* **Start date**: 08/29/2024
* **End date**: 09/20/2024

## TARGETS

* Apply knowledge of React Advanced.
* Take a narrow view to check re-rendering and optimize performance of one React application.
* Become better understood and create your own custom hook to reduce redundant code.
* Use React Query to manage data efficiently, focusing on caching, background refetching, and custom hooks for cleaning code.
* Apply Zustand for simple, lightweight local state management.
* Use React Router for seamless, SPA-style navigation with URL updates and optimize with route-based code-splitting.
* Study and apply uncontrolled components in some cases to avoid needless state management gradually.
* Be aware of catching common and specific errors (errors from api, from logic,...) for one React application to prevent crashing issues dramatically.
* Check [PageSpeed](<https://pagespeed.web.dev/>) scores frequently during development time and ensure the scores at minimum 95 points.
* Keep moving with Storybook which will assist to manage components in the development environment.

## TECHNICAL STACKS

* [TypeScript](https://www.typescriptlang.org/)
  * TypeScript: typed JavaScript, compiles to plain JS, catches errors early, supports modern JS features, interfaces, enums, and type annotations, fosters robust and scalable apps, enhances dev experience
* [React](https://react.dev/learn)
  * React is a JavaScript library for building reusable user interfaces efficiently. It uses a virtual DOM for optimal rendering and updates only what's necessary. With a component-based approach, React simplifies application development and maintenance. It's popular for its simplicity, flexibility, and strong community support
* [Zustand](https://www.npmjs.com/package/zustand)
  * A small, fast and scalable bearbones state-management solution using simplified flux principles.
* [React Router](https://reactrouter.com/)
  * A standard library for client-side routing in React, enabling navigation between different components without reloading the page.
* [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
  * A powerful asynchronous state management tool for data fetching, caching, synchronization, and server state management in React applications.
* [StoryBook](https://storybook.js.org)
  * Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It’s open source and free
* [Tailwind](https://tailwindui.com/documentation)
  * Tailwind CSS is a utility-first CSS framework designed to help you build responsive web interfaces quickly and easily. When used in React development, Tailwind CSS allows you to leverage pre-defined CSS utility classes to create and customize interfaces flexibly and efficiently.
* [Vite](https://vitejs.dev/)
  * Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.
* [Prettier](https://prettier.io/)
  * Prettier is an opinionated code formatter, supports many languages, integrates with most editors.
* [Eslint](https://eslint.org/)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

## Author

* hien.duong <[hien.duong@asnet.com.vn](hien.duong@asnet.com.vn)>

## How to run

### Prerequisites

* Node: version 18.18.0
* pnpm: version 9.6.0

### Get source code

| Command                                                                           | Action                        |
| :-------------------------------------------------------------------------------- | :---------------------------- |
| `git clone git@gitlab.asoft-python.com:hien.duong/react-training.git`             | Clone Repository with SSH     |
| `cd react-training`                                                               | Redirect to training folder   |
| `git checkout practice-four`                                              | Checkout branch               |
| `cd .\practices\practice-four\`                                                   | Redirect to practices folder  |

### Build and Run app

| Command                                                            | Action                        | Port                    |
| :------------------------------------------------------------------| :---------------------------- | :---------------------- |
| `pnpm i`                                                           | Install packages dependencies | N/A                     |
| `pnpm run build`                                                   | Run build project             | N/A                     |
| `pnpm run storybook`                                               | Run Storybook                 | <http://localhost:6006> |
| `pnpm run dev`                                                     | Run webpage                   | <http://localhost:3000> |
| `pnpm run start`                                                   | Run webpage and json-server   | <http://localhost:3000> |
