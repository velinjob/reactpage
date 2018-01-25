import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MembersPage extends Component {
    componentDidMount() {
    	this.props.getMembersList();
    }

    render() {
        return (
        	<div className="container">
				{ 
                    this.props.members.map(item=>{
                        return <div key={item.id}>{item.name}</div>
                    })
                }
		    </div>
        )
    }
}

MembersPage.propTypes = {
	getMembersList : PropTypes.func,
	members : PropTypes.array
};

export default MembersPage;