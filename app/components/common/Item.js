import React from 'react';
import { FormattedDate} from 'react-intl';

export default ({item, openModalEditItem, openModalRemoveItem})=>(
    <div className="list-row view-item  row-lg">
        <div className="list-column-left">
            <span className="label label-default" style={{fontWeight : "bold"}}>{item.type}</span>
        </div>
        <div className="list-column-right">
            <div className="">
                <span className="btn btn-default btn-margin-left fa fa-pencil" onClick={()=> openModalEditItem(item)} >{}</span>
                <span className="btn btn-default btn-margin-left fa fa-trash-o" onClick={()=> openModalRemoveItem(item)} >{}</span>
            </div>
        </div>
        <div className="list-column-middle">
            {item.type ?
                <div>
                    <div className="list-meta">
                        <span title="Date"><span className="fa fa-calendar">{}</span><FormattedDate value={item.date} /></span>
                        <span title="Time"><span className="fa fa-clock-o">{}</span>{item.time}</span>
                    </div>
                    <div className="list-text handle-list-item">
                        <span >{item.name}</span>
                        <span >({item.description})</span>
                    </div>
                </div> :
                <span>{item.name}</span>
            }
        </div>
    </div>
);