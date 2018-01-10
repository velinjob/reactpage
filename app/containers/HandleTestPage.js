import { connect } from 'react-redux';
import { getTestContent } from '../actions/index';
import { withRouter } from 'react-router-dom';
import TestPage from '../components/TestPage';

const mapStateToProps = (state, props) => {
    return {
        testContent : state.main.testContent || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTestContent: () => {
            dispatch(getTestContent())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);