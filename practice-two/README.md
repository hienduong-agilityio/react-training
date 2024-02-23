# React - Practice Two

This document is related to React Practice Two. Build a website about this Pokédex app created with ReactJS + TypeScript. Maintain the basic functions of the Pokédex and add some functions to increase the experience

## RELATED DOCUMENTS

- React training plan ( [Document](https://docs.google.com/document/d/1FccvCvbxBk1a0DATS9KPbAoABbeDIx4MLeRZ_N536wI/edit) )
- Design for practice ( view via [Figma](https://www.figma.com/file/HYzBfb62C1hdppcLrrE3WY/big-dev-soon-pokedex?type=design&mode=design&t=6DnO2L6esL8jhTsT-0) )
- Task management board ( [Trello](https://trello.com/b/3RDyqziK/bghtraining-hienduong-react-training-plan-basic-concept) )

## TIMELINE

- Estimate time ([link](https://docs.google.com/document/d/1As_O0q9EB18ZCJigGJOKZBXhNXgbZHnmvTyPs4vYvHA/edit#heading=h.2plc81jtb936)): 10 dayse of working
- **Start date**: 02/02/2024
- **End date**: 02/22/2024

## TARGETS

- Apply knowledge of React Advanced:
  - Passing data deeply with context
  - Error Boundaries
  - Optimizing Performance
  - Uncontrolled Components
  - Building own hooks
- Apply Unit testing (coverage greater than 90%)
- Manager local state and global state
- Use Code-Splitting to improve the performance of the application
- Improve PageSpeed scores at minimum 98 points.

## TECHNICAL STACKS

- [TypeScript](https://www.typescriptlang.org/)
  - TypeScript: typed JavaScript, compiles to plain JS, catches errors early, supports modern JS features, interfaces, enums, and type annotations, fosters robust and scalable apps, enhances dev experience
- [React](https://react.dev/learn)
  - React is a JavaScript library for building reusable user interfaces efficiently. It uses a virtual DOM for optimal rendering and updates only what's necessary. With a component-based approach, React simplifies application development and maintenance. It's popular for its simplicity, flexibility, and strong community support
- [StoryBook](https://storybook.js.org/docs/get-started/install)
  - Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It’s open source and free
- [Jest](https://jestjs.io/docs/setup-teardown)
  - Jest is a popular JavaScript testing framework specifically designed for unit testing React applications. It simplifies the testing process with built-in functionalities for writing and running tests, assertions, and mocks. Jest supports snapshot testing and handles asynchronous testing seamlessly. Often used with Enzyme or React Testing Library, Jest is a key tool for ensuring the reliability of React components
- [React-Testing-Library](https://github.com/testing-library/react-testing-library)
  - React Testing Library is a user-centric testing utility for React. It emphasizes testing user behavior rather than implementation details, promoting robust and maintainable tests. Compatible with Jest and other testing frameworks, it simplifies the process of writing effective tests for React components
- [Tailwind](https://tailwindui.com/documentation)
  - Tailwind CSS is a utility-first CSS framework designed to help you build responsive web interfaces quickly and easily. When used in React development, Tailwind CSS allows you to leverage pre-defined CSS utility classes to create and customize interfaces flexibly and efficiently.

## Author

- hien.duong <[hien.duong@asnet.com.vn](hien.duong@asnet.com.vn)>

## How to run

### Prerequisites

- Node: version 18.18.0
- pnpm: version 8.12.1
- Prettier: version 3.1.0
- Eslint: version 8.54.0

### Get source code

| Command                                                               | Action                       |
| :-------------------------------------------------------------------- | :--------------------------- |
| `git clone git@gitlab.asoft-python.com:hien.duong/react-training.git` | Clone Repository with SSH    |
| `cd react-training`                                                   | Redirect to training folder  |
| `git checkout feature/practice-two`                                   | Checkout branch              |
| `cd .\practice-two\`                                                  | Redirect to practices folder |

### Build and Run app

| Command              | Action                        | Port                    |
| :------------------- | :---------------------------- | :---------------------- |
| `pnpm i`             | Install packages dependencies | N/A                     |
| `pnpm run build`     | Run build project             | N/A                     |
| `pnpm run storybook` | Run Storybook                 | <http://localhost:6006> |
| `pnpm run test`      | Run Unit test                 | N/A                     |
| `pnpm run dev`       | Run webpage                   | <http://localhost:5173> |
