import React, { useState, useEffect, useRef, } from "react";
import { AnimatePresence } from "framer-motion";
import SwipeableCard from "./SwipeableCard";
import { ArrowLeft } from "lucide-react";
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
}

const CardStack: React.FC<CardStackProps> = ({ className, initialCards,setIndex }) => {
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

  const handleUndo = () => {
    if (history.length === 0) return;
  
    const lastCard = history[history.length - 1];
    const newCards = [lastCard, ...cards];
    setCards(newCards);
    setHistory(prev => prev.slice(0, -1));
    setLastDirection(null);
  
    if (setIndex) {
      const restoredIndex = initialCards?.findIndex(card => card.id === lastCard.id) ?? 0;
      setIndex(restoredIndex);
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
      className={cn("relative card-stack w-full max-w-sm mx-auto h-[500px] md:h-[600px]", className)}>
      <AnimatePresence>
        {cards.map((card, index) => (
          <SwipeableCard
            bio={card.biography} onSelect={function (): void {
              throw new Error("Function not implemented.");
            } } key={card.id}
            {...card}
            onSwipe={handleSwipe}
            style={{
              zIndex: cards.length - index,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              transform: index > 0 ? `translateX(${index * 5}px) scale(${1 - index * 0.05})` : 'none',
              // right: index > 0 ? `${index * 10}px` : '0',
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
      {history.length > 0 && (
        <button
          onClick={handleUndo}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white hover:bg-slate-50 shadow-md px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Undo Last Swipe</span>
        </button>
      )}
    </div>
  );
};

export default CardStack;
