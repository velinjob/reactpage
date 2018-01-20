import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TestPage extends Component {
    componentDidMount() {
    	this.props.getEvents();
    }

    render() {
        return (
        	<div className="container">
				{ 
                    this.props.events.map(event=>{
                        return <div key={event.id}>{event.name + ' (' + event.locality_name + ')'}</div>
                    })
                }
		    </div>
        )
    }
}

TestPage.propTypes = {
	getEvents : PropTypes.func,
	events : PropTypes.array
};

export default TestPage;