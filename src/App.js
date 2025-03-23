import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CareerForm from './components/CareerForm';
import Roadmap from './components/Roadmap'; // ✅ assuming Roadmap shows recommendations

function App() {
  return (
    <Router>
      <Switch>
        {/* Entire step flow handled by CareerForm */}
        <Route path="/" exact component={CareerForm} />
        
        {/* Final step navigated to manually */}
        <Route path="/roadmap" component={Roadmap} />
      </Switch>
    </Router>
  );
}

export default App;


