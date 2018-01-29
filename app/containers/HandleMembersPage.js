import { connect } from 'react-redux';
import { getMembersList } from '../actions/members';
import MembersPage from '../components/MembersPage';

const mapStateToProps = (state, props) => {
    return {
        members : state.members.members || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMembersList: () => {
            dispatch(getMembersList())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersPage);