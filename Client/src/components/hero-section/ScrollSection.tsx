import downArrowBold from "../../assets/icons/down-arrow-bold.svg";
const ScrollSection = () => {
  return (
    <div className="w-full flex justify-end pr-16 scroll_section">
      <div className="flex flex-col items-center gap-6">
        <img src={downArrowBold} alt="" />
        <h1>Scroll to Explore</h1>
      </div>
    </div>
  );
};

export default ScrollSection;
