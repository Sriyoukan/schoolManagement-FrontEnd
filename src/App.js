import logo from './logo.svg';
import './App.css';
import ExamResult from './components/examresult/examresult'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminExamResult from './components/examresult/adminExamResult';
import AdminLibraryPage from './components/librarymanagement/adminLibraryManagement';

function App() {
  return (
   <Router>
     <Switch>
       <Route path={"/examresult"} component={ExamResult}/>
       <Route path={"/adminExamResult"} component={AdminExamResult}/>
       <Route path={"/adminLibraryPage"} component = {AdminLibraryPage}/>
      
      </Switch>
  </Router>
  );
}

export default App;
