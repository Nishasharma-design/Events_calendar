import Calendar from "./components/Calendar/Calendar";

import classes from './App.module.scss';

function App() {

  return (

     <div className={classes.app}>
      <h1 className={classes.app__title}>📅 Events Calendar</h1>
      <Calendar />
     </div>

  )
}

export default App;
