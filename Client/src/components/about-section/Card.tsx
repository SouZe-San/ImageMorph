interface CardProps {
  icon: string;
  title: string;
  text: string;
}

const Card = (props: CardProps) => {
  const cards = document.querySelectorAll(".card");

  window.addEventListener("mousemove", (ev) => {
    cards.forEach((e) => {
      const blob = e.querySelector(".blob");
      const fBlob = e.querySelector(".fakeBlob");
      const rec = fBlob?.getBoundingClientRect();

      if (blob && rec) {
        blob.animate(
          [
            {
              transform: `translate(${ev.clientX - rec.left - rec.width / 2}px,${
                ev.clientY - rec.top - rec.height / 2
              }px)`,
            },
          ],
          {
            duration: 300,
            fill: "forwards",
          }
        );

        (blob as HTMLElement).style.opacity = "1";
      }
    });
  });

  return (
    <div className="card ">
      <div className="blob absolute specialStyle"></div>
      <div className="fakeBlob absolute specialStyle"></div>
      <div className="cardIcon">
        <div className="icon">
          <img src={props.icon} alt="U" />
        </div>
      </div>
      <div className="card-body flex flex-col justify-end">
        <h1 className="card-title ">{props.title}</h1>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  );
};

export default Card;
