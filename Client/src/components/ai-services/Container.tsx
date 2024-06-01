import { useState, ChangeEvent } from "react";
import "./style.scss";
import { useSearchParams } from "react-router-dom";

// const placeholder = [
//   "your negative prompt",
//   "What you do not wish to see",
//   "replace cherry with orange",
// ];

const stylePreset: string[] = ["anime", "comic-book", "digital-art", "fantasy-art"];
const imageRatios: string[] = ["1:1", "3:2", "4:5", "9:16", "16:9"];

const Container = ({ apiType }: { apiType: number }) => {
  // const [index, setIndex] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const [styleInd, setStyleInd] = useState<number | null>(null);
  const [rationInd, setRatioInd] = useState<number>(0);
  const [willTake, makeDecision] = useState<boolean[]>([false, false, false, false]);
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const apiProps = searchParams.get("api");
  console.log(apiProps);
  return (
    <section className="ai-user-section">
      <div className="section-outer-left-section grow flex flex-col gap-8">
        <div className="prompt-box w-full">
          <input type="text" name="input" id="input" placeholder="Your Prompt..." />
        </div>
        <div className="image-in-out-section w-full flex gap-8">
          <aside
            className="section-left-box grow-0  justify-center "
            style={apiType === 0 ? { width: "0%" } : {}}
          >
            <div
              className="image-add-box relative"
              style={apiType === 0 ? { borderColor: "transparent", display: "none" } : {}}
            >
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <img src={selectedImage as string} alt="Selected" className="absolute top-0" />
              )}

              <h1 className="tag text-center absolute">
                <span>&#43;</span> <br /> Add Or Drop Image
              </h1>
            </div>
          </aside>
          <div className="section-middle-box flex-grow">
            <h1>
              <span className="info-icon">?</span> <br /> Image will appear here
            </h1>
          </div>
        </div>
      </div>
      <aside className="section-outer-right-section grow-0 flex flex-col">
        <button>Generate</button>

        <div className="section-under-box flex flex-col ">
          <div className="choice-input ">
            <label htmlFor="negativePrompt" className=" flex flex-col gap-2">
              <div className="input order-2">
                <textarea
                  name="negativePrompt"
                  rows={5}
                  id="negativePrompt"
                  placeholder="Negative Prompt ..."
                  // placeholder={placeholder[index]}
                />
              </div>
              <h5 className="order-1">
                Negative Prompt <span className="info-icon">?</span>
                <span className="hidden-text">what you do not wish to see</span>
              </h5>
            </label>
          </div>
          <div className="choice-input ">
            <label htmlFor="negativePrompt" className=" flex flex-col gap-2">
              <div className="input order-2">
                <input
                  type="text"
                  name="negativePrompt"
                  id="negativePrompt"
                  placeholder="Default 0"
                />
              </div>
              <h5 className="order-1">
                Seed <span className="info-icon">?</span>
                <span className="hidden-text"> Reduce the randomness</span>
              </h5>
            </label>
          </div>
          <div className="choice-input ">
            <h5 className="">
              Image Ratio <span className="info-icon">?</span>
              <span className="hidden-text">
                The aspect ratio of the generated image(Default 1:1)
              </span>
            </h5>
            <div className="choice-items gap-4">
              {imageRatios.map((style, index) => (
                <div
                  key={index}
                  className={`item ${rationInd === index ? "selected-item" : ""}`}
                  onClick={() => setRatioInd(index)}
                >
                  {style}
                </div>
              ))}
            </div>
          </div>
          <div className="choice-input ">
            <h5 className="">
              Style Preset <span className="info-icon">?</span>
              <span className="hidden-text">Guides the image model towards a particular style</span>
            </h5>
            <div className="choice-items" style={{ gap: "1rem 1.4rem" }}>
              {stylePreset.map((style, index) => (
                <div
                  key={index}
                  className={`item extra-space-item ${
                    styleInd === index ? (willTake[index] ? "selected-item" : "") : ""
                  }`}
                  onClick={() => {
                    setStyleInd(index);
                    makeDecision((prev) => prev.map((_, i) => (i === index ? !prev[i] : false)));
                  }}
                >
                  {style}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Container;
