// import React from "react";
// import CareerForm from "./components/CareerForm";

// function App() {
//   return (
//     <div className="App">
//       <CareerForm />
//     </div>
//   );
// }

// export default App;

// //comment
// ------------------------------

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import StepOne from './components/StepOne';
// import StepTwo from './components/StepTwo';
// import Roadmap from './components/Roadmap'; // Update path if it's in pages/

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact component={StepOne} />
//         <Route path="/step-two" component={StepTwo} />
//         <Route path="/roadmap" component={Roadmap} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;

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


