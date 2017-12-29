import { connect } from 'react-redux';
import { getPages } from '../actions/index';
import App from '../components/App';

const mapStateToProps = (state, props) => {
	console.log(state);
	
    return {
        children : props.children,
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

export default connect(mapStateToProps, mapDispatchToProps)(App);