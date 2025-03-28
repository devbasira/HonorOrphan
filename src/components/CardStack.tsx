import React, { useState, useEffect, useRef, } from "react";
import { AnimatePresence } from "framer-motion";
import SwipeableCard from "./SwipeableCard";
import { cn } from "../lib/utils";

interface CardData {
  id: string;
  name: string;
  age: number;
  image: string;
  description: string;
  location: string;
  biography: string;
  needs: string[];
}


interface CardStackProps {
  className?: string;
  initialCards?: CardData[];
  index?: number;
  setIndex?: (index: number) => void;
  isAboutClicked : boolean,
}

const CardStack: React.FC<CardStackProps> = ({ className, initialCards,setIndex, isAboutClicked }) => {
  const [cards, setCards] = useState<CardData[]>(initialCards || []);
  const [lastDirection, setLastDirection] = useState<"left" | "right" | null>(null);
  const [history, setHistory] = useState<CardData[]>([]);
  const stackRef = useRef<HTMLDivElement>(null);
  
  const handleSwipe = (id: string, direction: "left" | "right") => {
    const cardIndex = cards.findIndex(card => card.id === id);
    if (cardIndex === -1) return;
  
    const swipedCard = cards[cardIndex];
    const updatedCards = cards.filter(card => card.id !== id);
    const nextTopCardId = updatedCards[0]?.id;
  
    setHistory(prev => [...prev, swipedCard]);
    setLastDirection(direction);
    setCards(updatedCards);
  
    // Update the external index
    if (setIndex) {
      const newIndex = initialCards?.findIndex(card => card.id === nextTopCardId) ?? 0;
      setIndex(updatedCards.length === 0 ? 0 : newIndex);
    }
  };

  

  
  useEffect(() => {
    if (cards.length === 0) {
      const timer = setTimeout(() => {
        setCards(initialCards || []);
        setHistory([]);
        setIndex?.(0);
      }, 1500);
  
      return () => clearTimeout(timer);
    }
  }, [cards]);
  
  return (
    <div 
      ref={stackRef}
      className={ cn( "flex justify-center relative card-stack w-full mx-auto h-[85dvh] lg:my-0 md:my-0  lg:h-[600px] md:h-[600px]", "transition-all duration-300 ease-in-out", className)}>
      <AnimatePresence>
        {cards.map((card, index) => (
          <SwipeableCard
            bio={card.biography} onSelect={function (): void {
              throw new Error("Function not implemented.");
            } } key={card.id}
            {...card}
            isAboutClicked = {isAboutClicked}
            onSwipe={handleSwipe}
            style={{
              zIndex: cards.length - index,
              transform: index > 0 ? `translateX(${index * 5}px) scale(${1 - index * 0.05})` : 'none',
              opacity: index > 3 ? 0 : 1 - index * 0.15,
            }}
            isTopCard={index === 0} />
        ))}
      </AnimatePresence>
      {cards.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center   rounded-3xl">
          <div className="animate-float text-center p-6">
            <h3 className="text-2xl font-medium mb-2">No more cards!</h3>
            <p className="text-muted-foreground">Check back soon for more profiles</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardStack;
