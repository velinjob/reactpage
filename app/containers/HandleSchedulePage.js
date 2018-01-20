import { connect } from 'react-redux';
import { getScheduleItems, handleForm } from '../actions/schedule';
import SchedulePage from '../components/SchedulePage';

const mapStateToProps = (state, props) => {
    return {
        items : state.schedule.items || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getScheduleItems: () => {
            dispatch(getScheduleItems())
        },
        handleForm : (item) => {
        	dispatch(handleForm(item));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);