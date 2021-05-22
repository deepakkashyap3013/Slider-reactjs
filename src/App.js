import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  const computeValidIndex = (currIndex) => {
    if (currIndex < 0) {
      setIndex(people.length - 1);
    } else if (currIndex > people.length - 1) {
      setIndex(0);
    } else {
      setIndex(currIndex);
    }
  };

  // auto slider functionality
  useEffect(() => {
    let slider = setInterval(() => {
      computeValidIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <section className="setion">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, quote, title } = person;
          {
            /* this is the main logic section of adding classes to whom */
          }
          let position = "nextSlide"; // by default the position is nextSlide

          if (personIndex === index) {
            // now if the personIndex matches the state value we will add the active slide
            position = "activeSlide";
          }
          if (
            // we will add the lastSlide to the item with index just before the currIndex but here is a bug if the index is 0 then there is no index=-1 so we add the class next slide to last item in the array
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          {
            /* end of logic */
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => computeValidIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => computeValidIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
