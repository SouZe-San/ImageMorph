import PromptSection from "../../prompt-section/PromptSection";

// import React from "react";

const Items = ({ item }: { item: IItemsProps }) => {
  return (
    <div className="item relative">
      <img className="item-image" src={item.img} alt="item" />

      <PromptSection promptText={item.prompt} />
    </div>
  );
};

export default Items;
