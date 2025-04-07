import React, { useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../lib/utils";
import { useIsMobile } from "../lib/isMobile";
import logo from "../assets/logo2.png";
import icon from "../assets/icon.png";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import "../index.css";
import { Video, Headphones } from "lucide-react";

interface SwipeableCardProps {
  id: string;
  name: string;
  bio: string;
  location: string;
  needs: string[];
  onSelect: () => void;
  age: number;
  image: string;
  description: string;
  onSwipe: (id: string, direction: "left" | "right") => void;
  style?: React.CSSProperties;
  className?: string;
  isTopCard?: boolean;
  isAboutClicked: boolean;
  waitClick: boolean;
  setIswaitClicked: any;
  setIsSubscribe: any;
  subscribe: boolean;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  id,
  name,
  location,
  age,
  bio,
  needs,
  onSelect,
  onSwipe,
  style,
  className,
  isAboutClicked,
  waitClick,
  setIswaitClicked,
  isTopCard = false,
  subscribe,
  setIsSubscribe,
  image,
}) => {
  const [exitX, setExitX] = useState<number | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  const scale = useTransform(x, [-300, 0, 300], [0.8, 1, 0.8]);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    whatsapp: "",
    interest: "",
    motivation: "",
    orphanageName: "",
    caretakerName: "",
    orphansCount: "",
    boysCount: "",
    girlsCount: "",
    address: "",
    location: "",
  });
  const [isVolunteer, setIsVolunteer] = useState(false);

  const [subData, setSubData] = useState({
    name: "",
    email: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePan = (info: PanInfo) => {
    if (Math.abs(info.offset.x) > 150) {
      const direction = info.offset.x > 0 ? "right" : "left";
      setExitX(info.offset.x);
      onSwipe(id, direction);
    }
  };

  const overlayHeight = isAboutClicked
    ? "100%"
    : isExpanded
    ? "100%"
    : isMobile
    ? "45.333333%"
    : "20%";

  const showOverlayContent = !isAboutClicked;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitToFirebase = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, "preRegistrations"), {
        ...data,
        isVolunteer,
        submittedAt: Timestamp.now(),
      });
      console.log("Document written with ID: ", docRef.id);
      return "success";
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitted Data:", formData);

    try {
      const response = await submitToFirebase(formData);

      if (response === "success") {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const submitSubscription = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, "subscriptions"), {
        name: data.name,
        email: data.email,
        submittedAt: Timestamp.now(),
      });
      console.log("Subscription added with ID:", docRef.id);
      return "success";
    } catch (error) {
      console.error("Subscription failed:", error);
      throw error;
    }
  };

  const handleSubChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setSubData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitted Data:", subData);

    try {
      const response = await submitSubscription(subData);

      if (response === "success") {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "swipable-card lg:w-auto md:w-auto w-[calc(100vw-40px)] z-[1000] absolute",
        "lg:h-[665px] md:h-[665px] h-[calc(100%-40px)]",
        "transition-all duration-300 ease-in-out",
        "overflow-hidden rounded-3xl shadow-figma",
        className
      )}
      style={{
        transformOrigin: "center center",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        x,
        rotate: isTopCard ? rotate : 0,
        opacity,
        scale: isTopCard ? scale : 1,
        ...style,
      }}
      drag={isTopCard ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(_, info) => isTopCard && handlePan(info)}
      whileTap={isTopCard ? { scale: 1 } : undefined}
      // whileHover={isTopCard ? { x: 8 } : undefined}
      animate={exitX !== null ? { x: exitX } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      exit={{
        x: exitX || 0,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      <div className="rounded-3xl">
        <div
          className="h-[calc(100vh-100px)]  w-full md:w-[333px] md:h-[665px] lg:w-[333px] lg:h-[665px] rounded-lg  mb-4 cursor-pointer transform transition-all duration-300 rounded-3xl"
          onClick={onSelect}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div
             className={`overlay gap-[20px] lg:overflow-y-hidden overflow-y-auto absolute bottom-0 ${isExpanded || (waitClick) ? 'opacity-100' : 'opacity-90'} w-full rounded-3xl bg-[#D9D9D9] px-[40px] py-[40px] flex flex-col justify-start`}
            initial={false}
            animate={{
              height: overlayHeight,
            }}
            style={{
              touchAction: "pan-y",
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            {showOverlayContent && (
              <div className="flex items-baseline justify-between w-full gap-1">
                <div className="flex flex-col items-baseline">
                  <h2 className="text-[24px] font-semibold text-gray-700">
                    {name}
                  </h2>
                  <span className="font-medium text-sm text-gray-700">
                    {age} years, {location}
                  </span>
                </div>
              </div>
            )}
            {showOverlayContent ? (
              <motion.div className="lg:hidden  flex flex-col gap-5">
                <motion.p
                  layout
                  className={cn(
                    "text-gray-700 text-sm transition-all",
                    !isExpanded ? "line-clamp-3" : ""
                  )}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {bio}
                </motion.p>
                {!isExpanded && (
                  <h1
                    className="text-sm text-[#1A6864] font-bold text-sm underline underline-offset-2 cursor-pointer hover:text-gray-900 transition"
                    onClick={() => setIsExpanded(!isExpanded)}>
                    Read more...
                  </h1>
                )}

                {isMobile ? (
                  <motion.div
                    className="mb-5 pb-5 "
                    animate={{
                      display: isExpanded ? "block" : "none",
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <h3 className="text-sm text-gray-700 font-semibold mb-1">
                      Key Needs:
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {needs.map((need, index) => (
                        <li key={index}>{need}</li>
                      ))}
                    </ul>
                    <div className=" space-y-3 mt-[30px]">
                      <button className="w-full flex items-center justify-center px-[40px] gap-2 bg-amber-50 text-gray-700 py-3 rounded-xl hover:bg-amber-200 transition-colors">
                        <Video size={20} />
                        <span> Video Message</span>
                      </button>

                      <button className="w-full flex items-center justify-center px-[40px] gap-2 bg-amber-50 text-gray-700 py-3 rounded-xl hover:bg-amber-100 transition-colors">
                        <Headphones size={20} />
                        <span> Audio Message</span>
                      </button>
                      <button className="w-full flex items-center justify-center px-[40px] gap-2 bg-amber-50 text-gray-700 py-3 rounded-xl hover:bg-amber-100 transition-colors">
                        <Headphones size={20} />
                        <span>Online Meeting</span>
                      </button>
                      <button className="w-full flex items-center justify-center px-[40px] gap-2 bg-amber-50 text-gray-700  py-3 rounded-xl hover:bg-amber-100 transition-colors">
                        <Headphones size={20} />
                        <span>In-person Meeting</span>
                      </button>
                    </div>
                    {isExpanded && (
                      <h1
                        className="text-sm my-6 text-sm text-[#1A6864] font-bold underline underline-offset-2 cursor-pointer hover:text-gray-900 transition"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        Read less..
                      </h1>
                    )}
                  </motion.div>
                ) : (
                  <div className="">
                    <h3 className="text-sm font-semibold mb-1">Key Needs:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {needs.map((need, index) => (
                        <li key={index}>{need}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : waitClick ? (
              <div className="overflow-y-auto scrollbar-hide w-full h-full flex flex-col  justify-start items-start">
                {formSubmitted ? (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-[30px]">
                    <img src={icon} className="w-[50px] h-auto " alt="" />
                    <h1 className="px-[10px] w-[210px] text-center text-gray-700 font-normal text-[16px]">
                      <h1 className="text-[30px] text-[#FFA500] font-semibold">
                        Thank you!
                      </h1>
                      <br />
                      You’re now part of the Honor the Orphan community!
                      <br />
                      We’ll keep you updated on our journey
                    </h1>
                  </div>
                ) : (
                  <div className="overflow-y-auto  scrollbar-hide w-full h-full flex flex-col gap-[30px] justify-start items-start pt-[30px]  pb-[20px]">
                    <div className="w-full flex flex-col items-center gap-[10px]">
                      <img className=" h-auto" src={icon} alt="" />
                      <h1 className="text-[24px] text-[#1A6874] font-semibold ">
                        Pre-registration Form
                      </h1>
                    </div>
                    <motion.form
                      initial={{ y: 300, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 300, opacity: 0 }}
                      transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.5,
                      }}
                      onSubmit={handleSubmit}
                      className="flex flex-col justify-center gap-4 w-full max-w-[560px] mx-auto mt-4"
                    >
                      {!subscribe && (
                        <>
                          <div className="text-md w-full text-center text-[#1A6864] font-medium">
                            Register as:
                          </div>
                          <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400"
                            required
                          >
                            <option value="">Select your role</option>
                            <option value="donor">Donor</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="orphanage">Orphanage</option>
                          </select>
                        </>
                      )}
                      {formData.role === "volunteer" && !subscribe && (
                        <>
                          <input
                            name="name"
                            placeholder="Name*"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="email"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="whatsapp"
                            type="text"
                            inputMode="numeric"
                            placeholder="WhatsApp Number* (Include country code)"
                            value={formData.whatsapp}
                            onChange={(e) => {
                              const sanitizedValue = e.target.value.replace(
                                /(?!^\+)\D/g,
                                ""
                              );
                              setFormData((prev) => ({
                                ...prev,
                                whatsapp: sanitizedValue,
                              }));
                            }}
                            required
                            maxLength={15}
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <div className="flex flex-col gap-1">
                            <label className="flex w-full justify-center items-center gap-2 text-sm text-[#1A6864] w-4 h-4 my-2">
                              How would you like to contribute?
                            </label>
                            <select
                              name="interest"
                              value={formData.interest}
                              onChange={handleChange}
                              required
                              className="p-2 h-[45px] rounded-lg border border-gray-400 bg-white text-sm text-center text-[#1A6864] focus:border-[#1A6864] focus:ring-1 focus:ring-[#1A6864] focus:outline-none transition duration-150"
                            >
                              <option value="" disabled hidden>
                                Select an option
                              </option>
                              <option value="Mentorship & Emotional Support">
                                Mentorship & Emotional Support
                              </option>
                              <option value="Fundraising & Awareness">
                                Fundraising & Awareness
                              </option>
                              <option value="Tech & Design Support">
                                {" "}
                                Tech & Design Support
                              </option>
                              <option value="Administrative & Outreach Support">
                                Administrative & Outreach Support
                              </option>
                              <option value="other"> Other</option>
                            </select>
                          </div>
                          {formData.interest === "other" && (
                            <textarea
                              name="motivation"
                              placeholder="How would you like to contribute?"
                              value={formData.motivation}
                              onChange={handleChange}
                              className="p-2 h-[40px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                            />
                          )}
                          <textarea
                            name="motivation"
                            placeholder="Why do you want to volunteer? (optional)"
                            value={formData.motivation}
                            onChange={handleChange}
                            className="p-2 h-[80px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                        </>
                      )}
                      {subscribe && (
                        <>
                          <input
                            name="name"
                            placeholder="Name*"
                            value={subData.name}
                            onChange={handleSubChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="email"
                            placeholder="Email*"
                            value={subData.email}
                            onChange={handleSubChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <button
                            onClick={handleSubscribe}
                            className="bg-[#1A6864] w-[212px] h-[45px] mt-[10px] text-white py-2 rounded-full font-semibold hover:bg-[#155a57] transition mx-auto"
                          >
                            Subscribe
                          </button>
                        </>
                      )}

                      {formData.role === "donor" && !subscribe && (
                        <>
                          <label className="flex w-full justify-center items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={isVolunteer}
                              onChange={(e) => setIsVolunteer(e.target.checked)}
                              className="accent-[#1A6864] w-4 h-4"
                            />
                            I would like to Volunteer as well
                          </label>

                          <input
                            name="name"
                            placeholder="Name*"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="email"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="whatsapp"
                            type="text"
                            inputMode="numeric"
                            placeholder="WhatsApp Number* (Include country code)"
                            value={formData.whatsapp}
                            onChange={(e) => {
                              const sanitizedValue = e.target.value.replace(
                                /(?!^\+)\D/g,
                                ""
                              );
                              setFormData((prev) => ({
                                ...prev,
                                whatsapp: sanitizedValue,
                              }));
                            }}
                            required
                            maxLength={15}
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <div className="flex flex-col gap-1">
                            <label className="flex w-full justify-center items-center gap-2 text-sm text-[#1A6864] w-4 h-4 my-2">
                              Interested to:
                            </label>
                            <select
                              name="interest"
                              value={formData.interest}
                              onChange={handleChange}
                              required
                              className="p-2 h-[45px] rounded-lg border border-gray-400 bg-white text-sm text-center text-[#1A6864] focus:border-[#1A6864] focus:ring-1 focus:ring-[#1A6864] focus:outline-none transition duration-150"
                            >
                              <option value="" disabled hidden>
                                Select an option
                              </option>
                              <option value="Donate only">Donate only</option>
                              <option value="Fully sponsor an orphan">
                                Fully sponsor an orphan
                              </option>
                            </select>
                          </div>
                          <textarea
                            name="motivation"
                            placeholder="What is your motivation to join? (optional)"
                            value={formData.motivation}
                            onChange={handleChange}
                            className="p-2 h-[80px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                        </>
                      )}

                      {formData.role === "orphanage" && !subscribe && (
                        <>
                          <input
                            name="orphanageName"
                            placeholder="Orphanage Name*"
                            value={formData.orphanageName || ""}
                            onChange={handleChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="caretakerName"
                            placeholder="Guardian/Caretaker Name*"
                            value={formData.caretakerName || ""}
                            onChange={handleChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="email"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="address"
                            placeholder="Address* (City, Country)"
                            value={formData.address || ""}
                            onChange={handleChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <label className="flex w-full justify-center items-center gap-2 text-sm text-[#1A6864] w-4 h-4 ">
                            Number of Orphans :
                          </label>
                          <input
                            name="boysCount"
                            type="number"
                            placeholder="No. of Boys*"
                            value={formData.boysCount || ""}
                            onChange={handleChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="girlsCount"
                            type="number"
                            placeholder="No. of Girls*"
                            value={formData.girlsCount || ""}
                            onChange={handleChange}
                            required
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                          <input
                            name="whatsapp"
                            type="text"
                            inputMode="numeric"
                            placeholder="WhatsApp Number* (Include country code)"
                            value={formData.whatsapp}
                            onChange={(e) => {
                              const sanitizedValue = e.target.value.replace(
                                /(?!^\+)\D/g,
                                ""
                              );
                              setFormData((prev) => ({
                                ...prev,
                                whatsapp: sanitizedValue,
                              }));
                            }}
                            required
                            maxLength={15}
                            className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                          />
                        </>
                      )}

                      {!subscribe && (
                        <>
                          <button
                            type="submit"
                            className="bg-[#1A6864] w-[212px] h-[45px] mt-[10px] text-white py-2 rounded-full font-semibold hover:bg-[#155a57] transition mx-auto"
                          >
                            Pre Register
                          </button>

                          <p
                            onClick={() => {
                              setIsSubscribe(true);
                            }}
                            className="text-center text-[#1A6864] text-sm underline cursor-pointer"
                          >
                            or Just Subscribe for Update
                          </p>
                        </>
                      )}
                    </motion.form>
                  </div>
                )}
              </div>
            ) : (
              <div className="overflow-y-auto scrollbar-hide w-full h-[85%] min-h-0 flex flex-col gap-[30px] justify-start items-start px-[7%] pt-[40px] pb-[40px] blur-bottom">
                <img className="w-[150px]" src={logo} alt="logo" />
                <div className="flex flex-col">
                  <h1 className="text-[20px] font-semibold">
                    "No! But you do not honor the orphan."
                  </h1>
                  <p className="text-[16px] text-gray-600">- Quran 89:71</p>
                </div>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[20px]">
                    <p>
                      <strong>Honor the Orphan</strong> is an upcoming platform
                      that connects orphans with
                      <strong>
                        {" "}
                        guardians of hope, hearts that care, and mentors who
                        uplift
                      </strong>
                      —going beyond donations to build meaningful, life-changing
                      relationships.
                    </p>
                  </div>
                  {isAboutClicked && (
                    <p className="text-[16px] font-semibold">
                      We’re building the platform—join us from the start!
                    </p>
                  )}
                  {isAboutClicked && (
                    <p className="text-[16px]">
                      Pre-register now to be among the first sponsors and
                      orphanages to create lasting impact
                    </p>
                  )}
                  <button
                    onClick={() => {
                      setIswaitClicked(!waitClick);
                    }}
                    className="bg-[#FFFFF0] w-[212px] h-[45px] rounded-full text-[#1A6864] font-semibold text-[16px] mb-[10px]"
                  >
                    Pre Register
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeableCard;
