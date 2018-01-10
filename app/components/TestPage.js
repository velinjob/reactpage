import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TestPage extends Component {
    componentDidMount() {
    	this.props.getTestContent();
    }

    render() {
        return (
        	<div className="container">
				{ 
                    this.props.testContent.map(item=>{
                        return <div key={item.key}>{item.name}</div>
                    })
                }
		    </div>
        )
    }
}

TestPage.propTypes = {
	getTestContent : PropTypes.func,
	testContent : PropTypes.array
};

export default TestPage;