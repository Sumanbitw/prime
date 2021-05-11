import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import SidebarMobile from './components/Sidebar/SidebarMobile';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Sidebar/>
    <SidebarMobile/>
    </div>
  );
}

export default App;
