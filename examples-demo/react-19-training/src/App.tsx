import { ToastContainer } from './components/ToastContainer';
import './index.css';
import LoginForm from './LoginForm';

function App() {
  return (
    <>
      <div className='flex flex-col justify-center items-center h-dvh bg-gray-400'>
        <LoginForm />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
