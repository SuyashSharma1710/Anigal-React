import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import { anipics } from "./constant";

function App() {
  const [img, setImg] = useState(anipics[1].pics[0]);
  const [imageSources, setImageSources] = useState(anipics[1].pics.slice(1, 12));
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const handleClick = () => {
    setTriggerAnimation((prev) => !prev);
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
    <div className="relative h-screen w-full overflow-hidden">
      <img
        src={img}
        alt=""
        className="absolute top-0 z-0 h-full w-full object-cover object-center"
      />
      <motion.img
        src={img}
        className="static z-0 h-full w-full object-cover object-center"
        alt="Background"
        animate={
          triggerAnimation
            ? { opacity: [0, 1], scale: [0.95, 1] }
            : { opacity: [0, 1], scale: [0.955, 1] }
        }
        transition={{
          opacity: { duration: 0.5, times: [0, 0.5, 1] },
          scale: { duration: 0.5 },
        }}
      />

      <nav className="absolute top-0 z-10 flex w-full gap-1 overflow-x-auto px-2 py-3 sm:justify-evenly sm:gap-2 sm:py-4 md:overflow-visible md:px-4">
        {anipics.map((anipic, index) => (
          <div key={index} className="flex shrink-0 justify-center md:flex-1">
            <motion.p
              onClick={() => bgimg(index)}
              className="cursor-pointer whitespace-nowrap rounded-md bg-black/30 px-2 py-1 text-[10px] leading-none text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:text-xs"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
            >
              {anipic.name}
            </motion.p>
          </div>
        ))}
      </nav>

      <div className="absolute bottom-3 left-1/2 z-10 flex w-[96vw] -translate-x-1/2 items-center gap-2 overflow-x-auto rounded-2xl bg-black/35 p-2 backdrop-blur-sm sm:bottom-4 sm:w-[94vw] sm:rounded-3xl sm:p-3 md:w-[90vw] lg:w-[85vw]">
        <AnimatePresence>
          {imageSources.map((src, index) => (
            <motion.div
              key={src}
              className="h-28 w-24 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white/30 sm:h-32 sm:w-28 md:h-36 md:w-32"
              onClick={() => handleImageClick(src)}
              initial={{ opacity: 1 }}
              whileTap={{ scale: 1.05, opacity: 0.85, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <motion.img
                src={src}
                className="h-full w-full object-cover"
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
