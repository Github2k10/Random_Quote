import { useState, useRef, useEffect } from "react";
import { Tooltip } from "bootstrap";

import link from "../assets/link.svg";
import changeIcon from "../assets/Regroup.svg";

const url = "https://api.quotable.io/random";

const RandomQuote = () => {
  const [quote, setQuote] = useState({});
  const [tags, setTags] = useState([]);
  const tooltipRef1 = useRef();
  const tooltipRef2 = useRef();

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQuote(data);
        setTags(data.tags);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    var tooltipElement1 = new Tooltip(tooltipRef1.current, {
      title: "Change Quote",
      placement: "left",
      trigger: "hover",
    });
  });

  useEffect(() => {
    var tooltipElement2 = new Tooltip(tooltipRef2.current, {
      title: "Copy Quote",
      placement: "right",
      trigger: "hover",
    });
  });

  return (
    <div className="container">
      <div className="box">
        <div className="item">
          <h3 className="item-author">{quote.author}</h3>
          <div className="item-tags">
            {tags.map((tag) => (
              <span className="item-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <p>"{quote.content}"</p>
        </div>
        <div className="box-lower">
          <div>
            <img
              src={changeIcon}
              onClick={() => {
                fetch(url)
                  .then((response) => response.json())
                  .then((data) => {
                    setQuote(data);
                    setTags(data.tags);
                  })
                  .catch((error) => console.log(error));
              }}
              ref={tooltipRef1}
              alt="change"
            />
            <img
              src={link}
              onClick={() => {
                navigator.clipboard.writeText(quote.content);
                alert("Copied the text: " + quote.content);
              }}
              ref={tooltipRef2}
              alt="copy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
