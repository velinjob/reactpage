import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';
import ModalWindow from './common/ModalWindow';

class TestPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            isModalWinowAddEditItemOpen : false, 
            name: '', 
            periodicity : 1, 
            time_start: '',
            time_end: ''
        };

        this.clickBtnAddItem = this.clickBtnAddItem.bind(this);
        this.closeAddEditItemModalWindow = this.closeAddEditItemModalWindow.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeTimeStart = this.changeTimeStart.bind(this);
        this.changeTimeEnd = this.changeTimeEnd.bind(this);
        this.addEditItem = this.addEditItem.bind(this);
        this.changePeriodicity = this.changePeriodicity.bind(this);
    }

    componentDidMount() {
        this.props.getScheduleItems();
    }

    clickBtnAddItem(){
        this.setState({isModalWinowAddEditItemOpen : true});
    }

    closeAddEditItemModalWindow(){
        this.setState({isModalWinowAddEditItemOpen : false});
    }

    changeName(e){
        this.setState({name : e.target.value});
    }

    changeTimeStart(e){
        this.setState({time_start : e.target.value});
    }

    changeTimeEnd(e){
        this.setState({time_end : e.target.value});
    }    

    addEditItem(){
        this.props.handleForm({
            name : this.state.name, 
            periodicity : this.state.periodicity, 
            time_start: this.state.time_start,
            time_end: this.state.time_end
        });
    }

    changePeriodicity(e){
        this.setState({periodicity : e.target.value});
    }

    render() {
        return (
        	<div className="container">
                <Button classSet='btn-primary' text='Добавить' handleClick={this.clickBtnAddItem} />
                { this.props.items && this.props.items.length > 0 ? 
                    this.props.items.map(event=>{
                        return <div key={event.id}>{event.name + ' (' + event.locality_name + ')'}</div>
                    })
                    : <div>Расписание путое</div>
                }

                {this.state.isModalWinowAddEditItemOpen && 
                    <ModalWindow>
                        <div className="modal-body">
                            <input type="text"
                                   className="form-control"
                                   onChange={this.changeName}
                                   placeholder="Название"
                                   name="name"
                                   value={this.state.name}
                            />
                            <select className="form-control" value={this.state.periodicity} onChange={this.changePeriodicity} >
                                <option value="0" >Ежедневно</option>
                                <option value="1" >Еженедельно</option>
                                <option value="2" >Конкретный день</option>
                            </select>
                            <input type="password"
                                   className="form-control"
                                   onChange={this.changeTimeStart}
                                   placeholder="начало"
                                   name="time_start"
                                   value={this.state.time_start}
                            />
                            <input type="password"
                                   className="form-control"
                                   onChange={this.changeTimeEnd}
                                   placeholder="окончание"
                                   name="time_end"
                                   value={this.state.time_end}
                            />
                        </div>
                        <div className="modal-footer">
                            <Button classSet="btn-primary" handleClick={this.addEditItem} text="Ok"/>
                            <Button classSet="btn-danger" handleClick={this.closeAddEditItemModalWindow} text="Cancel"/>
                        </div>
                    </ModalWindow>
                }
		    </div>
        )
    }
}

TestPage.propTypes = {
	getScheduleItems : PropTypes.func,
    handleForm : PropTypes.func,
	items : PropTypes.array
};

export default TestPage;