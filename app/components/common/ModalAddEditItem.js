import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ModalWindow from './ModalWindow';

class ModalAddEditItem extends Component {
    constructor(props) {
        super(props);

        this.state = { name: this.props.item };
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleClickBtn = this.handleClickBtn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleCancelClick() {
        this.props.closeModal();
    }

    handleClickBtn() {
        if(this.state.name !== '')
            this.props.handleItem(this.props.item, this.state.name.trim());
    }

    handleChange(e){
        this.setState({name : e.target.value});
    }

    render() {
        return (
            <ModalWindow>
                <div className="modal-header">
                    <h4>{this.props.header}</h4>
                </div>
                <div className="modal-body">
                    <input type="text"
                           className="form-control"
                           onChange={this.handleChange}
                           placeholder="Name"
                           name="name"
                           value={this.state.name}
                    />
                </div>
                <div className="modal-footer">
                    <Button classSet="btn-primary" handleClick={this.handleClickBtn} text="Ok"/>
                    <Button classSet="btn-danger" handleClick={this.handleCancelClick} text="Cancel"/>
                </div>
            </ModalWindow>
        )
    }
}

ModalAddEditItem.propTypes = {
    item : PropTypes.string,
    handleItem : PropTypes.func,
    closeModal : PropTypes.func
};

export default ModalAddEditItem;