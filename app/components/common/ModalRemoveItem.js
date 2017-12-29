import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ModalWindow from './ModalWindow';

const ModalRemoveItem = ({item, removeItem, closeModal})=>(
    <ModalWindow>
        <div className="modal-body">
            <h4>{`Do you really want do remove ${item.name} item?`}</h4>
        </div>
        <div className="modal-footer">
            <Button classSet="btn-primary" handleClick={()=>removeItem(item)} text="Remove"/>
            <Button classSet="btn-danger" handleClick={()=>closeModal()} text="Cancel"/>
        </div>
    </ModalWindow>
);

ModalRemoveItem.propTypes = {
    item : PropTypes.object,
    removeItem : PropTypes.func,
    closeModal : PropTypes.func
};

export default ModalRemoveItem;