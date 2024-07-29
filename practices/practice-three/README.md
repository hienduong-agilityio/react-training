# React - Practice Three

This web application manages project information, including the project name, project manager, status, date created, timeline, and estimation. It helps streamline the management and tracking of various projects by providing a clear and organized view of all relevant details.

## RELATED DOCUMENTS

- React training plan ( [Document](https://docs.google.com/document/d/10GPuskxX7rd66huUL57eAjJ4k-qGsqgf5nMKDHh3ufc/edit) )
- Design for practice ( view via [Figma](<https://www.figma.com/design/1nkWBjRpkdkigZk0wHkfJf/Project-Management-(Copy)?node-id=0-1N>) )

## TIMELINE

- Estimate time ([link](https://docs.google.com/document/d/1e2G5DyyU9YI18dD4GWiOqObqCcdRBRD_3K3m7nYosmA/edit)): 10 days of working
- **Start date**: 07/26/2024
- **End date**: 08/08/2024

## TARGETS

- Apply React.Context API and React.useReducer hook for state management.
- Take a narrow view to check re-rendering and optimize performance of one React application.
- Become better understood and create your own custom hook to reduce redundant code.
- Study and apply uncontrolled components in some cases to avoid needless state management gradually.
- Be aware of catching common and specific errors (errors from api, from logic,...) for one React application to prevent crashing issues dramatically.
- Check [PageSpeed] (<https://pagespeed.web.dev/>) scores frequently during development time and ensure the scores at minimum 95 points.
- Keep moving with Storybook which will assist to manage components in the development environment.

## TECHNICAL STACKS

- [TypeScript](https://www.typescriptlang.org/)
  - TypeScript: typed JavaScript, compiles to plain JS, catches errors early, supports modern JS features, interfaces, enums, and type annotations, fosters robust and scalable apps, enhances dev experience
- [React](https://react.dev/learn)
  - React is a JavaScript library for building reusable user interfaces efficiently. It uses a virtual DOM for optimal rendering and updates only what's necessary. With a component-based approach, React simplifies application development and maintenance. It's popular for its simplicity, flexibility, and strong community support
- [StoryBook](https://storybook.js.org)
  - Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It’s open source and free
- [Tailwind](https://tailwindui.com/documentation)
  - Tailwind CSS is a utility-first CSS framework designed to help you build responsive web interfaces quickly and easily. When used in React development, Tailwind CSS allows you to leverage pre-defined CSS utility classes to create and customize interfaces flexibly and efficiently.

## OTHER TOOLS

- [Vite](https://vitejs.dev/)
  - Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.
- [Prettier](https://prettier.io/)
  - Prettier is an opinionated code formatter, supports many languages, integrates with most editors.
- [Eslint](https://eslint.org/)
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

## Author

- hien.duong <[hien.duong@asnet.com.vn](hien.duong@asnet.com.vn)>

## How to run

### Prerequisites

- Node: version 18.18.0
- pnpm: version 9.6.0

### Get source code

| Command                                                               | Action                       |
| :-------------------------------------------------------------------- | :--------------------------- |
| `git clone git@gitlab.asoft-python.com:hien.duong/react-training.git` | Clone Repository with SSH    |
| `cd react-training`                                                   | Redirect to training folder  |
| `git checkout feature/practice-three`                                 | Checkout branch              |
| `cd .\practices\practice-three\`                                      | Redirect to practices folder |

### Build and Run app

| Command              | Action                        | Port                    |
| :------------------- | :---------------------------- | :---------------------- |
| `pnpm i`             | Install packages dependencies | N/A                     |
| `pnpm run build`     | Run build project             | N/A                     |
| `pnpm run storybook` | Run Storybook                 | <http://localhost:6006> |
| `pnpm run dev`       | Run webpage                   | <http://localhost:3000> |
