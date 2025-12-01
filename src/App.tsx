import { Outlet } from 'react-router';
import Header from './layout/header';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
