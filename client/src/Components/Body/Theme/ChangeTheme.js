import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { AnimatePresence, motion } from "framer-motion";

function ChangeTheme() {
  const [colorSet, SetColorSet] = useState([]);

  const setColors = (color) => {
    SetColorSet(color);
    localStorage.setItem("colors", JSON.stringify(color));
    var root = document.querySelector(":root");
    root.style.setProperty("--primary-color", color[0]);
    root.style.setProperty("--primary-color-light", color[1]);
    root.style.setProperty("--primary-color-deep", color[2]);
  };

  useEffect(() => {
    const colors = JSON.parse(localStorage.getItem("colors"));
    if (colors) {
      SetColorSet(colors);
    } else {
      SetColorSet(["#9b4b64", "#9b4b6480", "#6e3547"]);
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: "3px" }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="login text-center ">
          <Card className="themeCard customCard ">
            <h5 className="">Change Theme</h5>
            <hr />
            <div className="d-flex w-50 align-items-center">
              <div className="">
                <input
                  inline
                  name="group1"
                  value="red"
                  onClick={(e) =>
                    setColors(["#9b4b64", "#9b4b6480", "#6e3547"])
                  }
                  type="radio"
                  checked={colorSet[0] === "#9b4b64"}
                  className="radio-btn text-info"
                />
              </div>
              <div className="small mx-3 purple">Purple*</div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div className="d-flex w-50 align-items-center">
                <div className="">
                  <input
                    inline
                    name="group1"
                    value="red"
                    onClick={(e) =>
                      setColors(["#ff4747", "#ffb3b3", "#b30000"])
                    }
                    type="radio"
                    checked={colorSet[0] === "#ff4747"}
                    className="radio-btn text-info"
                  />
                </div>
                <div className="small mx-3 red">Red</div>
              </div>
              <div className="d-flex w-50 align-items-center">
                <div className="">
                  <input
                    inline
                    name="group1"
                    value="green"
                    onClick={(e) =>
                      setColors(["#008000", "#00b300", "#004d00"])
                    }
                    type="radio"
                    checked={colorSet[0] === "#008000"}
                    className="radio-btn text-info"
                  />
                </div>
                <div className="small mx-3 green">Green</div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex w-50 align-items-center">
                <div className="">
                  <input
                    inline
                    name="group1"
                    value="blue"
                    onClick={(e) =>
                      setColors(["#4d4dff", "#8080ff", "#000080"])
                    }
                    type="radio"
                    checked={colorSet[0] === "#4d4dff"}
                    className="radio-btn text-info"
                  />
                </div>
                <div className="small mx-3 blue">Blue</div>
              </div>
              <div className="d-flex w-50 align-items-center">
                <div className="">
                  <input
                    inline
                    name="group1"
                    onClick={(e) =>
                      setColors(["#4d4d4d", "#808080", "#404040"])
                    }
                    type="radio"
                    checked={colorSet[0] === "#4d4d4d"}
                    className="radio-btn text-info"
                  />
                </div>
                <div className="small mx-3 grey">Dark</div>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ChangeTheme;
