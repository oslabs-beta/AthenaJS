import React from "react";
import { motion } from "framer-motion";

const pathVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1
  }
};

//This component is the Athena icon that gets drawn at the top of the screen on load for component mode
//It uses framer motion, where d is the path that the pen stroke follows (M moves the pen without drawing anything, L draws from the point that
//the pen is at currently to the point specified after the L)
const AthenaSvg = () => {

  return(
    <div id = 'athena-svg'>
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 20,90 L 50,10"
          fill="none"
          stroke="black"
          strokeWidth="5"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.path
          d="M 49,10 L 70,60"
          fill="none"
          stroke="#663EFF"
          strokeWidth="5"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 1,
            delay: 2.5,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M 70,58 L 15,58"
          fill="none"
          stroke="#663EFF"
          strokeWidth="5"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 1,
            delay: 3.5,
            ease: "easeInOut"
          }}
        />
      </motion.svg>
    </div>
  );
};

export default AthenaSvg;