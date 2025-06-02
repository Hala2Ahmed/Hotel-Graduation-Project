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

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const settingss = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <>
      <section
        className="bg-cover bg-center bg-no-repeat mx-0 h-screen"
        style={{ backgroundImage: `url(${img})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="flex justify-center items-center h-screen">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.5,
              }}
              className="text-center text-white"
              data-aos="fade-up"
            >
              <span className="block mb-3 text-uppercase">
                Welcome To Hope Hotel
              </span>
              <motion.h1 className="text-5xl font-bold">
                A Best Place To Stay
              </motion.h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="">
          <div className="flex justify-center gap-10 flex-col lg:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.3,
              }}
              className="w-full lg:w-1/2 mb-10 lg:mb-0"
              data-aos="fade-up"
            >
              <img src={img1} alt="Image" className="rounded-lg shadow-md" />
            </motion.div>
            <div className="w-full lg:w-1/3" data-aos="fade-up">
              <h2 className="text-3xl font-bold">Welcome!</h2>
              <p className="mb-4">
                Clean, modern lines combine with a balanced, subdued color
                scheme throughout the hotel’s elegantly masculine interiors.
                Behind the pivoting brass panels, a subdued palette, teamed with
                wooden floors and leather upholstery, creates a minimalist,
                masculine look. A modern spatial concept combines natural
                materials, clean lines, and glass—resulting in an elemental
                experience where all of the senses are in perfect harmony.
              </p>
              <p className="mb-4">
                Gert Wingårdh and his team pay homage to the storied structure’s
                roots while adding many signature touches. The building’s
                imposing sense of space and elaborate, elegant detailing gives
                the interiors a natural grandeur.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className=" mx-20">
          <div className="text-center mb-5">
            <div className="w-full md:w-7/12 mx-auto">
              <h2 className="text-4xl font-bold" data-aos="fade-up">
                Rooms &amp; Suites
              </h2>
              <p className="mt-4" data-aos="fade-up" data-aos-delay={100}>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mb-8" data-aos="fade-up">
              <a
                href="#"
                className="block bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={img2}
                  alt="room image"
                  className="w-full object-cover mb-3"
                />
                <div className="p-3 text-center">
                  <h2 className="text-xl font-semibold">Single Room</h2>
                  <span className="uppercase tracking-wider text-gray-600">
                    90$ / per night
                  </span>
                </div>
              </a>
            </div>
            <div className="mb-8" data-aos="fade-up">
              <a
                href="#"
                className="block bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={img3}
                  alt="room image"
                  className="w-full object-cover mb-3"
                />
                <div className="p-3 text-center">
                  <h2 className="text-xl font-semibold">Family Room</h2>
                  <span className="uppercase tracking-wider text-gray-600">
                    120$ / per night
                  </span>
                </div>
              </a>
            </div>
            <div className="mb-8" data-aos="fade-up">
              <a
                href="#"
                className="block bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={img4}
                  alt="room image"
                  className="w-full object-cover mb-3"
                />
                <div className="p-3 text-center">
                  <h2 className="text-xl font-semibold">Presidential Room</h2>
                  <span className="uppercase tracking-wider text-gray-600">
                    250$ / per night
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="py-20 bg-gray-100">
        <div className="text-center mb-5">
          <div className="w-full md:w-7/12 mx-auto">
            <h2 className="text-4xl font-bold" data-aos="fade-up">
              Photos
            </h2>
            <p className="mt-4" data-aos="fade-up" data-aos-delay={100}>
              From budget lodgings to luxurious accommodation. You can choose
              between basic dormitories, frill-free double rooms or stylish
              gallery studios
            </p>
          </div>
        </div>
        <div className="col-span-1 overflow-hidden p-12 mx-auto ">
          <Slider {...settingss}>
            <img
              src={img5}
              alt="Room"
              className="w-full object-contain rounded-lg shadow-md"
            />
            <img
              src={img6}
              alt="Room"
              className="w-full object-contain rounded-lg shadow-md"
            />
            <img
              src={img7}
              alt="Room"
              className="w-full object-contain rounded-lg shadow-md"
            />
            <img
              src={img8}
              alt="Room"
              className="w-full object-contain rounded-lg shadow-md"
            />
          </Slider>
        </div>
      </div>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold" data-aos="fade-up">
              People Says
            </h2>
          </div>
          <div className="mx-auto">
            <Slider {...settings}>
              <div className="text-center slider-item">
                <div className="mb-3">
                  <img
                    src={img9}
                    alt="Image placeholder"
                    className="rounded-full mx-auto w-24 h-24"
                  />
                </div>
                <blockquote>
                  <p className="text-lg italic">
                    &ldquo;A small river named Duden flows by their place and
                    supplies it with the necessary regelialia. It is a
                    paradisematic country, in which roasted parts of sentences
                    fly into your mouth.&rdquo;
                  </p>
                </blockquote>
                <p className="mt-3 text-sm text-gray-600">
                  <em>&mdash; Jean Smith</em>
                </p>
              </div>

              <div className="text-center slider-item">
                <div className="mb-3">
                  <img
                    src={img10}
                    alt="Image placeholder"
                    className="rounded-full mx-auto w-24 h-24"
                  />
                </div>
                <blockquote>
                  <p className="text-lg italic">
                    &ldquo;Even the all-powerful Pointing has no control about
                    the blind texts it is an almost unorthographic life One day
                    however a small line of blind text by the name of Lorem
                    Ipsum decided to leave for the far World of Grammar.&rdquo;
                  </p>
                </blockquote>
                <p className="mt-3 text-sm text-gray-600">
                  <em>&mdash; John Doe</em>
                </p>
              </div>

              <div className="text-center slider-item">
                <div className="mb-3">
                  <img
                    src={img11}
                    alt="Image placeholder"
                    className="rounded-full mx-auto w-24 h-24"
                  />
                </div>
                <blockquote>
                  <p className="text-lg italic">
                    &ldquo;When she reached the first hills of the Italic
                    Mountains, she had a last view back on the skyline of her
                    hometown Bookmarksgrove, the headline of Alphabet Village
                    and the subline of her own road, the Line Lane.&rdquo;
                  </p>
                </blockquote>
                <p className="mt-3 text-sm text-gray-600">
                  <em>&mdash; John Doe</em>
                </p>
              </div>
              <div className="text-center slider-item">
                <div className="mb-3">
                  <img
                    src={img12}
                    alt="Image placeholder"
                    className="rounded-full mx-auto w-24 h-24"
                  />
                </div>
                <blockquote>
                  <p className="text-lg italic">
                    &ldquo;When she reached the first hills of the Italic
                    Mountains, she had a last view back on the skyline of her
                    hometown Bookmarksgrove, the headline of Alphabet Village
                    and the subline of her own road, the Line Lane.&rdquo;
                  </p>
                </blockquote>
                <p className="mt-3 text-sm text-gray-600">
                  <em>&mdash; John Doe</em>
                </p>
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}
