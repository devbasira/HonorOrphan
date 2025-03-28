import React, { useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../lib/utils";
import { useIsMobile } from "../lib/isMobile"
import logo from '../assets/logo2.png'


import bgImage from '../assets/image.png';

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
  isAboutClicked : boolean
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
  isTopCard = false,
}) => {
  const [exitX, setExitX] = useState<number | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  const scale = useTransform(x, [-300, 0, 300], [0.8, 1, 0.8]);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile()
  const cardRef = useRef<HTMLDivElement>(null);

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
      : "50%";

  const showOverlayContent = !isAboutClicked



  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "swipable-card lg:w-auto md:w-auto w-[calc(100vw-20px)] z-[1000] absolute",
        "lg:h-[665px] md:h-[665px] h-[calc(100%-20px)]",
        "transition-all duration-300 ease-in-out",
        "overflow-hidden rounded-3xl shadow-figma",
        className
      )}
      style={{
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
      animate={exitX !== null ? { x: exitX } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      exit={{
        x: exitX || 0,
        opacity: 0,
        transition: { duration: 0.3 }
      }}
    >
      <div className="rounded-3xl">
        <div
          className="h-[calc(100vh-100px)] w-full md:w-[333px] md:h-[665px] lg:w-[333px] lg:h-[665px] rounded-lg  mb-4 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 relative rounded-3xl"
          onClick={onSelect}
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <motion.div
            className={`overlay gap-[20px] absolute bottom-0 w-full rounded-3xl bg-opacity-${showOverlayContent ? '75' : '70'} bg-[#D9D9D9] px-[40px] pt-[40px] flex flex-col justify-start`}
            initial={false}
            animate={{
              height: overlayHeight
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
             {
              showOverlayContent && (
                <button
                className="fixed flex items-center justify-center  bottom-[90px] right-[10px] lg:hidden p-2 rounded-full bg-white/80 hover:bg-white transition-colors w-[45px] h-[45px]"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <motion.svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  animate={{
                    rotate: isExpanded ? 45 : 0
                  }}
                >
                  <path d="M12 5v14M5 12h14" />
                </motion.svg>
              </button>
              )
             }
            {showOverlayContent && (
              <div className="flex items-end justify-between w-full items-center gap-1">
              <div className="flex">
                <h2 className="text-[24px]  font-semibold text-gray-700">{name}</h2>
                <span className="flex font-semibold items-end text-sm ml-2 h-[31px] text-gray-700">{age} years, {location}</span>
              </div>
              
            </div>
            )}
            {showOverlayContent ? (
            <motion.div className="flex flex-col">
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
             
              {isMobile ? (
                <motion.div
                className="mb-5"
                  animate={{
                    display: isExpanded ? "block" : "none",
                    opacity: isExpanded ? 1 : 0
                  }}

                >
                  <h3 className="text-sm font-semibold mb-1">Key Needs:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {needs.map((need, index) => (
                      <li key={index}>{need}</li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <div>
                  <h3 className="text-sm font-semibold mb-1">Key Needs:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {needs.map((need, index) => (
                      <li key={index}>{need}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
            ) : (
              <div className="overflow-y-auto scrollbar-hide w-full h-full flex flex-col gap-[30px] justify-start items-start px-[20px] py-[60px]">
                <img className="w-[236px] h-120px[]" src={logo} alt="logo" />
                <div className="flex flex-col">
                <h1 className="text-[20px] font-semibold">
                "No! But you do not honor the orphan."
                </h1>
                <p className="text-[16px] text-gray-600">- Quran 89:71</p>
                </div>
                <div className="flex flex-col gap-[30px]">
                  <p className="text-[16px] ">
                  Honor the Orphan isn’t just about giving—it’s about honoring. Inspired by this Quranic call, our platform goes beyond sponsorship to nurture real, meaningful connections between sponsors and orphans. Through updates, letters, and engagement, sponsors become a source of love, stability, and hope. Because true care isn’t transactional—it’s about presence, protection, and belonging.
                  </p>
                  {isAboutClicked && (<p className = "text-[16px] font-semibold">
                  We’re building the platform—join us from the start!
                  </p>) }
                 {isAboutClicked && (
                   <p className="text-[16px]">
                   Pre-register now to be among the first sponsors and orphanages to create lasting impact
                   </p>
                 )}
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
