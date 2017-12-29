import React from 'react';
import Item from './Item';

export default ({items, openModalEditItem, openModalRemoveItem})=>(
    <div>
        {items && items.map((item)=>{
            return <Item key={item.name+item._id} item={item}
                         openModalEditItem={openModalEditItem} openModalRemoveItem={openModalRemoveItem} />
        })}
    </div>
);