import { connect } from 'react-redux';
import { getEvents } from '../actions/index';
import { withRouter } from 'react-router-dom';
import GeneralPage from '../components/GeneralPage';

const mapStateToProps = (state, props) => {
    return {
        events : state.main.events || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: () => {
            dispatch(getEvents())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralPage);