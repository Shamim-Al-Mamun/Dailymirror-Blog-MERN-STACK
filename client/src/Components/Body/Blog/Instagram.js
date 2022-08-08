import React from "react";

import instapic1 from "../../../assets/images/instapic1.jpg";
import instapic2 from "../../../assets/images/instapic2.jpg";
import instapic3 from "../../../assets/images/instapic3.jpg";
import instapic4 from "../../../assets/images/instapic4.jpg";
import instapic5 from "../../../assets/images/instapic5.jpg";
import instapic6 from "../../../assets/images/instapic6.jpg";
import instapic7 from "../../../assets/images/instapic7.jpg";
import instapic8 from "../../../assets/images/instapic8.jpg";

function Instagram() {
  return (
    <div className="text-center text-dark my-5">
      <p className="mb-4">Follow me © instagram</p>
      <div className="d-flex">
        <img src={instapic1} alt="instapic1" className="instapic" />
        <img src={instapic2} alt="instapic2" className="instapic" />
        <img src={instapic3} alt="instapic3" className="instapic" />
        <img src={instapic4} alt="instapic4" className="instapic" />
        <img src={instapic5} alt="instapic1" className="instapic" />
        <img src={instapic6} alt="instapic1" className="instapic" />
        <img src={instapic7} alt="instapic7" className="instapic" />
        <img src={instapic8} alt="instapic8" className="instapic" />
      </div>
    </div>
  );
}

export default Instagram;
