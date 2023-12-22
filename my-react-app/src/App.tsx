import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './scripts/components/common/Buttons'
import "./main.css"
import TodoList from './scripts/test'

function App() {
  console.log(TodoList)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Button
        variant=''
        className = "bg-red-500"
      >
        {"hello"}
      </Button>
      <TodoList/>
    </>
  )
}

export default App
