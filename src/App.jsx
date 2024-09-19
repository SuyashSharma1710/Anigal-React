import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import { anipics } from "./constant";

function App() {
  const [img, setImg] = useState(anipics[1].pics[0]);
  const [imageSources, setImageSources] = useState(anipics[1].pics.slice(1, 12));
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const handleClick = () => {
    setTriggerAnimation(!triggerAnimation); // Toggle the state to trigger the animation
  };

  const bgimg = (index) => {
    const newImg = anipics[index].pics[0];
    setImg(newImg);
    handleClick();


    const newArray = anipics[index].pics.slice(1, 12);
    setImageSources(newArray);
  };
  const handleImageClick = (src) => {
    setImg(src);
    handleClick();
    setImageSources((prevSources) => {
      const updatedSources = prevSources.filter((image) => image !== src);

      const currentCategory = anipics.find((category) =>
        category.pics.includes(src)
      );
      const additionalImages = currentCategory.pics
        .filter((image) => !updatedSources.includes(image))
        .slice(0, 1);

      return [...updatedSources, ...additionalImages];
    });
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img src={img} alt="" className="h-full w-full object-center object-cover absolute top-0   z-0"   />
      <motion.img
        src={img}
        className="h-full w-full object-center object-cover static z-0"
        alt="Background"
          animate={triggerAnimation ? { opacity: [0, 1], scale: [0.95, 1] } : { opacity: [0, 1], scale: [0.955, 1]  }}
        transition={{
          opacity: { duration: 0.5, times: [0, 0.5, 1] },
          scale: { duration: 0.5 },
        }}
      />

      <nav className="h-20 w-full flex justify-evenly items-center absolute z-10 top-0">
        {anipics.map((anipic, index) => (
          <div key={index} className="flex-1 flex justify-center items-center">
            <motion.p
              onClick={() => bgimg(index)}
              className="text-xs leading-none rounded-md p-1 cursor-pointer text-nowrap bg-black bg-opacity-15 hover:bg-opacity-60"
              whileHover={{ scale: 1.5, width: "120px" }}
              whileTap={{ scale: 1.2 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            >
              {anipic.name}
            </motion.p>
          </div>
        ))}
      </nav>

      <div className="bg-black h-48 w-[137vw] rounded-3xl bg-opacity-30 absolute top-[350px] left-1/2 flex p-2 gap-2 items-center">
        <AnimatePresence>
          {imageSources.map((src, index) => (
            <motion.div
              key={src}
              className="h-full w-40 overflow-hidden rounded-3xl bg-white bg-opacity-30 cursor-pointer"
              onClick={() => handleImageClick(src)}
              initial={{ opacity: 1 }}
              whileTap={{ scale: 1.2, opacity: 0, x:-30 , y:-30 }}
              transition={{ duration: 0.2 }}
            >
              <motion.img
                src={src}
                className="object-cover h-full w-full"
                alt={`Gallery item ${index + 1}`}
                transition={{ duration: 1 }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
