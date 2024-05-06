import { useFetcher } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import "./IconPicker.css";

export default function IconPicker({ icon_id, icon_set, cur_icon }) {
  const fetcher = useFetcher();
  const [currentElement, setCurrentElement] = useState(0);
  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load(`/icons/icon`);
    }
  }, [fetcher]);

  useEffect(() => {
    setCurrentElement(icon_id.theme_id - 1);
  }, [icon_id]);

  const elementOnClick = (e) => {
    setCurrentElement(e.target.dataset.element - 1);
  };

  return (
    <div id="icon-picker">
      <div id="element-select">
        {fetcher.data ? (
          fetcher.data.map((element) => {
            return (
              <div
              className="element-selector"
              active = {element.id==currentElement+1 ? "true" : "false"}
                data-element={element.id}
                onClick={elementOnClick}
                key={element.id}
                style={{
                  "--bgcolour": element.colour,
                  backgroundImage: `url('${element.path.slice(1)}')`,
                }}
              >
              </div>
            );
          })
        ) : (
          <div>{fetcher.state}</div>
        )}
      </div>
      <div id="icon-selector">
        {fetcher.data ? (
          fetcher.data[currentElement].icon.map((icon) => {
            return (
              <div
                data-element={icon.id}
                onClick={() => {
                  icon_set(icon.id);
                }}
                key={icon.id}
              >
                <Avatar user={icon} icon_id={cur_icon}></Avatar>
              </div>
            );
          })
        ) : (
          <div>{fetcher.state}</div>
        )}
      </div>
    </div>
  );
}
