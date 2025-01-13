import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );
  let timeout;
  const nextCard = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
    return () => clearTimeout(timeout);
  });
  return (
    <div aria-label="Carrousel" className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          aria-label={`slide${idx + 1}`}
          aria-current={index === idx ? "true" : "false"}
          key={`${event.title} + ${event.id}`}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <ol aria-label="Pagination carrousel" className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <li
              key={event.id}
              aria-current={index === radioIdx ? "true" : "false"}
            >
              <button
                type="button"
                aria-label={`slide${radioIdx + 1}`}
                aria-pressed={index === radioIdx}
                className={index === radioIdx ? "selected" : "notSelected"}
                onClick={() => setIndex(radioIdx)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Slider;
