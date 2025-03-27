import React, { useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../lib/utils";
import { useIsMobile } from "../lib/isMobile"


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


  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "swipable-card z-[1000] absolute h-[665px]  overflow-hidden rounded-3xl shadow-figma",
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
      <div className=" overflow-hidden  rounded-3xl ">
        <div
          className="bg-blue-200 w-[333px] h-[665px] rounded-lg shadow-lg mb-4 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 relative rounded-3xl"
          onClick={onSelect}
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <motion.div
            className="overlay gap-[20px] absolute bottom-0 w-full rounded-lg bg-opacity-75 bg-[#D9D9D9] p-4 flex flex-col justify-end"
            initial={false}
            animate={{
              height: isExpanded
                ? "100%"
                : isMobile
                  ? "33.333333%"
                  : "50%"
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            <div className="flex items-center justify-between w-full items-center gap-1">
              <div className="flex">
                <h2 className="text-[24px] font-normal text-teal-700">{name}</h2>
                <span className="flex items-end text-sm ml-2 h-7 text-teal-700">{age}, {location}</span>
                <span className="text-xl text-teal-700">❤️</span>
              </div>
              <button
                className="flex lg:hidden p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <motion.svg
                  width="22"
                  height="22"
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
            </div>

            <motion.div>
              <motion.p
                layout
                className="text-gray-700 text-sm mb-4"
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeableCard;
