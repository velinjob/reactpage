import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';
import '../../styles/members.css';

class MembersPage extends Component {
    componentDidMount() {
    	this.props.getMembersList();
        this.handleBtnAddMember = this.handleBtnAddMember.bind(this);
    }

    handleBtnAddMember(){
        console.log('test');

    }

    render() {
        return (
        	<div className="container">
                <div className="btn-toolbox">
                    <Button classSet="btn-success" handleClick={this.handleBtnAddMember} text="Добавить" />
                </div>
                <div>
    				{ 
                        this.props.members.map(item=>{
                            return <div className="test-member" key={item.id}>{item.name}</div>
                        })
                    }
                </div>
		    </div>
        )
    }
}

MembersPage.propTypes = {
	getMembersList : PropTypes.func,
	members : PropTypes.array
};

export default MembersPage;