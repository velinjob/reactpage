import { connect } from 'react-redux';
import { getPages } from '../actions/index';
import { withRouter } from 'react-router-dom';
import App from '../components/App';

const mapStateToProps = (state, props) => {
	console.log(state);
	
    return {
        openSignInModal :  state.auth.openSignInModal,
    	openSignUpModal :  state.auth.openSignUpModal,
        pages : state.main.pages || [],
        toSpin : state.auth.toSpin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPages: () => {
            dispatch(getPages())
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));