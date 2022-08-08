import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import UserContext from "../../../Context/UserContext";
import Button from "react-bootstrap/Button";
import { AnimatePresence, motion } from "framer-motion";

function Analytics() {
  const getTime = (mili) => {
    const date = new Date(mili);
    return date.getMonth();
  };
  const { posts } = useContext(UserContext);

  var postMonths =
    posts &&
    posts.length &&
    posts.length > 0 &&
    posts.map((post) => {
      return getTime(post.timestamp);
    });
  const getBarHeight = () => {
    var x = postMonths.toString();
    let jan = (x.match(/0/g) || []).length;
    let feb = (x.match(/1/g) || []).length;
    let march = (x.match(/2/g) || []).length;
    let april = (x.match(/3/g) || []).length;
    let may = (x.match(/4/g) || []).length;
    let june = (x.match(/5/g) || []).length;
    let july = (x.match(/6/g) || []).length;
    return { jan, feb, march, april, may, june, july };
  };

  useEffect(() => {
    getBarHeight();
  });
  return (
    <div className="analytics">
      <Container>
        <main className="m-auto">
          <div className="AnalyticsCard bg-light m-auto">
            <div className="ms-2 mb-2">
              <Button className="primary-btn"> 2022</Button>
              <h6 className="text-center mt-2">
                Number of posts corresponding to the months
              </h6>
            </div>

            <div
              className="d-flex relative justify-content-around "
              style={{ height: getBarHeight().jan * 200 }}
            >
              <div>
                <AnimatePresence>
                  <motion.p
                    initial={{ opacity: 0, scale: [0] }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1, delay: 1 }}
                    className="postNum"
                    style={{ bottom: getBarHeight().jan * 50 }}
                  >
                    {getBarHeight().jan}
                  </motion.p>
                </AnimatePresence>
                <div className="width50px d-flex justify-content-center">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0.5, height: 1 }}
                      animate={{ opacity: 1, height: getBarHeight().jan * 50 }}
                      transition={{ duration: 1 }}
                      className="bar"
                    ></motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <AnimatePresence>
                  <motion.p
                    initial={{ opacity: 0, scale: [0] }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1, delay: 1 }}
                    className="postNum"
                    style={{ bottom: getBarHeight().feb * 50 }}
                  >
                    {getBarHeight().feb}
                  </motion.p>
                </AnimatePresence>
                <div className="width50px d-flex justify-content-center">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0.5, height: 1 }}
                      animate={{ opacity: 1, height: getBarHeight().feb * 50 }}
                      transition={{ duration: 1 }}
                      className="bar"
                    ></motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <AnimatePresence>
                  <motion.p
                    initial={{ opacity: 0, scale: [0] }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1, delay: 1 }}
                    className="postNum"
                    style={{ bottom: getBarHeight().march * 50 }}
                  >
                    {getBarHeight().march}
                  </motion.p>
                </AnimatePresence>
                <div className="width50px d-flex justify-content-center">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0.5, height: 1 }}
                      animate={{
                        opacity: 1,
                        height: getBarHeight().march * 50,
                      }}
                      transition={{ duration: 1 }}
                      className="bar"
                    ></motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <AnimatePresence>
                  <motion.p
                    initial={{ opacity: 0, scale: [0] }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1, delay: 1 }}
                    className="postNum"
                    style={{ bottom: getBarHeight().april * 50 }}
                  >
                    {getBarHeight().april}
                  </motion.p>
                </AnimatePresence>
                <div className="width50px d-flex justify-content-center">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0.5, height: 1 }}
                      animate={{
                        opacity: 1,
                        height: getBarHeight().april * 50,
                      }}
                      transition={{ duration: 1 }}
                      className="bar"
                    ></motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <AnimatePresence>
                  <motion.p
                    initial={{ opacity: 0, scale: [0] }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1, delay: 1 }}
                    className="postNum"
                    style={{ bottom: getBarHeight().may * 50 }}
                  >
                    {getBarHeight().may}
                  </motion.p>
                </AnimatePresence>
                <div className="width50px d-flex justify-content-center">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0.5, height: 1 }}
                      animate={{ opacity: 1, height: getBarHeight().may * 50 }}
                      transition={{ duration: 1 }}
                      className="bar"
                    ></motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <AnimatePresence>
                  <motion.p
                    initial={{ opacity: 0, scale: [0] }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1, delay: 1 }}
                    className="postNum"
                    style={{ bottom: getBarHeight().june * 50 }}
                  >
                    {getBarHeight().june}
                  </motion.p>
                </AnimatePresence>
                <div className="width50px d-flex justify-content-center">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0.5, height: 1 }}
                      animate={{ opacity: 1, height: getBarHeight().june * 50 }}
                      transition={{ duration: 1 }}
                      className="bar"
                    ></motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <AnimatePresence>
                  <motion.p
                    initial={{ opacity: 0, scale: [0] }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1, delay: 1 }}
                    className="postNum"
                    style={{ bottom: getBarHeight().july * 50 }}
                  >
                    {getBarHeight().july}
                  </motion.p>
                </AnimatePresence>
                <div className="width50px d-flex justify-content-center">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0.5, height: 1 }}
                      animate={{ opacity: 1, height: getBarHeight().july * 50 }}
                      transition={{ duration: 1 }}
                      className="bar"
                    ></motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div
              className="d-flex  justify-content-around w-100"
              style={{ height: getBarHeight().jan * 200 }}
            >
              <div className="width50px text-center small">Jan</div>
              <div className="width50px text-center small">Feb</div>
              <div className="width50px text-center small">March</div>
              <div className="width50px text-center small">April</div>
              <div className="width50px text-center small">May</div>
              <div className="width50px text-center small">june</div>
              <div className="width50px text-center small">july</div>
            </div>
          </div>
        </main>
      </Container>
    </div>
  );
}

export default Analytics;
