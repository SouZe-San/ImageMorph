import Items from "./Items";

// import React from 'react'
const ItemsBlock = (props: IItemsProps[]) => {
  return (
    <div className="items_block">
      <div className="rows">
        <Items item={props[0]} />
      </div>
      <div className="rows grid grid-cols-2 gap-4">
        <Items item={props[1]} />
        <Items item={props[2]} />
      </div>
    </div>
  );
};

export default ItemsBlock;
