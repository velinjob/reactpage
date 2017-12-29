// modules
import React from 'react';
import { render, browserHistory } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk'
import {IntlProvider, addLocaleData} from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import ruLocaleData from 'react-intl/locale-data/ru';
import rootReducer from './reducers';

// components
import HandleApp from './containers/HandleApp';
import WelcomePage from './components/WelcomePage';
import RequireAuth from './containers/RequireAuth';
import CheckAuth from './containers/CheckAuth';
//import Perf from 'react-addons-perf';

addLocaleData(enLocaleData);
addLocaleData(ruLocaleData);

//const {locale, messages} = window.App;

require("../styles/bootstrap.min.css");
require("../styles/style.css");
require('react-datepicker/dist/react-datepicker.css');

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// put window.store here to get an access to a store from utils/services.js/isTypeExist
window.store = store;

// Perf.start();

render(
    <IntlProvider locale="en" >        
		<Provider store={store}>
		    <Router history={browserHistory}>
			    <div>
					<Route exact path="/" component={CheckAuth(HandleApp)} />
		        	<Route path="/types" component={WelcomePage} />
			    </div>		        
		    </Router>
		</Provider>
    </IntlProvider>, document.getElementById('app')
);

//Perf.stop();
//Perf.printInclusive();
//Perf.printWasted();