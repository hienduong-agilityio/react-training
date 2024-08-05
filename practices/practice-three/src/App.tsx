// Components
import ProjectTable from '@/components/ProjectTable';

// Data
import PROJECT_ITEMS from '../database/data.json';

const App = () => {
  return <ProjectTable dataTable={PROJECT_ITEMS}></ProjectTable>;
};

export default App;
