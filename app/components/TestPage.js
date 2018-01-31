import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/test_table.css';

class TestPage extends Component {
    componentDidMount() {
    	this.props.getTestContent();
    }

    render() {
        return (
        	<div className="container">
            <button   href="#" className="btn btn-success "><i class="fa fa-plus" aria-hidden="true"></i> Добавить</button>
            <table className="table">
             
             <thead>
             
        <tr className="row-name">
           
           <th> Название <i class="fa fa-chevron-down" aria-hidden="true"></i></th>
           <th> Место проведения</th>
           <th> Даты</th>
           
        </tr>
        </thead>
              
        <tbody>
        <tr className="row-content">
           
           <td> Мини-конференция и тур в Израиле (9-13 февраля)</td>
           <td> Нетания</td>
           <td> 09.02 - 13.02  <i class="fa fa-arrow-down " aria-hidden="true"></i></td>
           
        </tr>
        </tbody>       
        </table>
	</div>	   
        )
    }
}

TestPage.propTypes = {
	getTestContent : PropTypes.func,
	testContent : PropTypes.array
};

export default TestPage;