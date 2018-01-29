import { connect } from 'react-redux';
import { getTestContent } from '../actions/test';
import TestPage from '../components/TestPage';

const mapStateToProps = (state, props) => {
    return {
        testContent : state.test.testContent || []
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