import { Fragment } from 'react';
import SimpleInput from './components/SimpleInput';
import BasicForm from './components/BasicForm';

function App() {
  return (
    <Fragment>
      <div className="app">
        <p>Simple Form</p>
        <SimpleInput />
      </div>
      <div className="app">
        <p>Basic Form</p>
        <BasicForm />
      </div>
    </Fragment>
  );
}

export default App;
