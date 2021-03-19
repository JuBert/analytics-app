import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Pages
import Home from './pages/home';
import Dashboard from './pages/dashboard';
// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
