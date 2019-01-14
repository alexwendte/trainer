import * as React from 'react';
import ReactDOM from 'react-dom';
import { init } from 'utils/api';
import App from './App';
import './styles/index.css';
import './styles/reset.css';
// import * as serviceWorker from './serviceWorker';

init();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
