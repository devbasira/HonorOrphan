
import React, { useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../lib/utils";

import bgImage from '../assets/image.png';

interface SwipeableCardProps {
  id: string;
  name: string;
  bio: string;
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
        "swipable-card absolute h-[665px] mr-4  overflow-hidden rounded-xl",
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
      whileTap={isTopCard ? { scale: 1.02 } : undefined}
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
          backgroundSize: "cohver",
          backgroundPosition: "center"
        }}
      >

        <div className="absolute bottom-[340px] left-0 w-full px-6 mt-4 flex items-center gap-2">
          <h2 className="text-[24px] font-normal text-teal-700">{name}</h2>
          <span className="text-red-500 text-xl">❤️</span>
        </div>

        <div className="overlay absolute bottom-0 w-full rounded-lg h-1/2 bg-opacity-75 bg-[#D9D9D9] p-4 flex flex-col justify-between">
          <div>
            <p className="text-gray-700 text-sm mb-4">
              {bio}
            </p>

            <h3 className="text-sm font-semibold mb-1">Key Needs:</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {needs.map((need, index) => (
                <li key={index}>{need}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default SwipeableCard;
