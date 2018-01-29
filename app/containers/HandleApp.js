import { connect } from 'react-redux';
import { getInitContent } from '../actions/index';
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
        getInitContent: () => {
            dispatch(getInitContent())
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));