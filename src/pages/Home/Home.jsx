import React from "react";
import img from "../../assets/bg.jpg";
import img1 from "../../assets/r6.jpg";
import img2 from "../../assets/slider-3.jpg";
import img3 from "../../assets/slider-4.jpg";
import img4 from "../../assets/slider-5.jpg";
import img5 from "../../assets/img_5.jpg";
import img6 from "../../assets/img_4.jpg";
import img7 from "../../assets/img_2.jpg";
import img8 from "../../assets/img_3.jpg";
import img9 from "../../assets/person_1.jpg";
import img10 from "../../assets/person_2.jpg";
import img11 from "../../assets/person_3.jpg";
import img12 from "../../assets/person_4.jpg";
import Slider from "react-slick/lib/slider";
import { motion } from "framer-motion";
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};
const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
};
export default function Home() {
  const rooms = [
    { img: img2, title: "Single Room", price: "90$ / per night" },
    { img: img3, title: "Family Room", price: "120$ / per night" },
    { img: img4, title: "Presidential Room", price: "250$ / per night" },
  ];
  const testimonials = [
    {
      img: img9,
      name: "Jean Smith",
      quote:
        "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth",
    },
    {
      img: img10,
      name: "John Doe",
      quote:
        "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.",
    },
    {
      img: img11,
      name: "John Doe",
      quote:
        "When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.",
    },
    {
      img: img12,
      name: "John Doe",
      quote:
        "When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.",
    },
  ];

  return (
    <>
      <section
        className="bg-cover bg-center bg-no-repeat mx-0 h-screen overflow-hidden"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="container">
          <div className="flex justify-center items-center h-screen">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="text-center text-white"
            >
              <motion.span
                className="block mb-4 text-xl"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Welcome To Hope Hotel
              </motion.span>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-5xl font-bold"
              >
                A Best Place To Stay
              </motion.h1>
            </motion.div>
          </div>
        </div>
      </section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-20 bg-gray-100 overflow-hidden p-10 dark:bg-secondaryDarkColor"
      >
        <div>
          <motion.div
            variants={staggerContainer}
            className="flex justify-center gap-10 flex-col lg:flex-row items-center"
          >
            <motion.div
              variants={fadeInUp}
              className="w-full lg:w-1/2 mb-10 lg:mb-0"
            >
              <motion.img
                whileHover={{ scale: 1.02 }}
                src={img1}
                alt="Image"
                className="rounded-lg shadow-md"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="w-full lg:w-1/2">
              <motion.h2 variants={fadeIn} className="text-3xl font-bold">
                Welcome!
              </motion.h2>
              <motion.p variants={fadeIn} className="mb-4">
                Clean, modern lines combine with a balanced, subdued color
                scheme throughout the hotel’s elegantly masculine interiors.
                Behind the pivoting brass panels, a subdued palette, teamed with
                wooden floors and leather upholstery, creates a minimalist,
                masculine look. A modern spatial concept combines natural
                materials, clean lines, and glass—resulting in an elemental
                experience where all of the senses are in perfect harmony.
              </motion.p>
              <motion.p variants={fadeIn} className="mb-4">
                Gert Wingårdh and his team pay homage to the storied structure’s
                roots while adding many signature touches. The building’s
                imposing sense of space and elaborate, elegant detailing gives
                the interiors a natural grandeur.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="py-12 overflow-hidden"
      >
        <div className=" mx-20">
          <div className="text-center mb-5">
            <motion.div
              variants={fadeInUp}
              className="w-full md:w-7/12 mx-auto"
            >
              <h2 className="text-4xl font-bold">Rooms &amp; Suites</h2>
              <p className="mt-4">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>
            </motion.div>
          </div>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {rooms.map((room, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg dark:bg-[#212529]"
              >
                <motion.img
                  src={room.img}
                  alt={room.title}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{room.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{room.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-20 bg-gray-100 overflow-hidden dark:bg-secondaryDarkColor"
      >
        <div className="text-center mb-5">
          <motion.div variants={fadeInUp} className="w-full md:w-7/12 mx-auto">
            <h2 className="text-4xl font-bold">Photos</h2>
            <p className="mt-4">
              From budget lodgings to luxurious accommodation. You can choose
              between basic dormitories, frill-free double rooms or stylish
              gallery studios
            </p>
          </motion.div>
        </div>
        <motion.div
          variants={fadeInUp}
          className="col-span-1 overflow-hidden mx-auto pb-5"
        >
          <Slider {...settings}>
            {[img5, img6, img7, img8].map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt="Gallery"
                  className="rounded-lg shadow-md w-[70%] h-[70%] mx-auto object-cover"
                />
              </div>
            ))}
          </Slider>
        </motion.div>
      </motion.div>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-20 overflow-hidden"
      >
        <div className="container mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <h2 className="text-3xl font-bold">People Says</h2>
          </motion.div>
          <motion.div variants={fadeInUp} className="mx-auto">
            <Slider {...settings}>
              {testimonials.map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center px-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.img
                    src={item.img}
                    alt={item.name}
                    className="rounded-full w-24 h-24 mx-auto mb-6"
                    whileHover={{ rotate: 5 }}
                  />
                  <blockquote className="text-lg italic mb-4 w-[60%] mx-auto">
                    {item.quote}
                  </blockquote>
                  <p className="text-gray-600 dark:text-gray-400">— {item.name}</p>
                </motion.div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
