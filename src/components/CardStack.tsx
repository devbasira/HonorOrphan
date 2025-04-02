import { useImperativeHandle, forwardRef, useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SwipeableCard from "./SwipeableCard";
import { cn } from "../lib/utils";
import { subscribe } from "firebase/data-connect";

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
  isAboutClicked: boolean,
  waitClick: boolean,
  setIswaitClicked: any
  setHasSelectedCard : any
  setIsSubscribe: any,
  subscribe: boolean
}

const CardStack = forwardRef(({
  className,
  initialCards,
  setIndex,
  isAboutClicked,
  waitClick,
  setIswaitClicked,
  setHasSelectedCard,
  subscribe,
  setIsSubscribe
}: CardStackProps, ref) => {




  const [cards, setCards] = useState<CardData[]>(initialCards || []);
  const [lastDirection, setLastDirection] = useState<"left" | "right" | null>(null);
  const [history, setHistory] = useState<CardData[]>([]);
  const stackRef = useRef<HTMLDivElement>(null);


  const cardsRef = useRef<CardData[]>([]);
  cardsRef.current = cards;

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      const topCardId = cardsRef.current[0]?.id;
      if (topCardId) {
        handleSwipe(topCardId, "left");
      }
    },
    swipeRight: () => {
      const topCardId = cardsRef.current[0]?.id;
      if (topCardId) {
        handleSwipe(topCardId, "right");
      }
    }
  }));

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (cards.length === 0) {
      timer = setTimeout(() => {
        setCards(initialCards || []);
        setHistory([]); 
        setIndex?.(0);
      }, 1500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [cards, initialCards, setIndex]);


  const handleSwipe = (id: string, direction: "left" | "right") => {
    setHasSelectedCard(true)
    const cardIndex = cards.findIndex(card => card.id === id);
    if (cardIndex === -1) return;

    const swipedCard = cards[cardIndex];
    const updatedCards = cards.filter(card => card.id !== id);

    setHistory(prev => [...prev, swipedCard]);
    setLastDirection(direction);
    setCards(updatedCards);


    if (setIndex && updatedCards.length > 0) {
      const currentCardId = updatedCards[0].id;
      const newIndex = initialCards?.findIndex(card => card.id === currentCardId) ?? 0;
      setIndex(newIndex);
    }
  };

  return (
    <div
      ref={stackRef}
      className={cn("flex justify-center relative card-stack w-full mx-auto h-[85dvh] lg:my-0 md:my-0  lg:h-[600px] md:h-[600px]", "transition-all duration-300 ease-in-out", className)}>
      <AnimatePresence>
        {cards.map((card, index) => (
          <SwipeableCard
            bio={card.biography} onSelect={function (): void {
            }} key={card.id}
            {...card}
            isAboutClicked={isAboutClicked}
            waitClick={waitClick}
            setIswaitClicked={setIswaitClicked}
            onSwipe={handleSwipe}
            subscribe={subscribe} setIsSubscribe={setIsSubscribe} 
            style={{
              zIndex: cards.length - index,
              transform: index > 0 ? `translateX(${index * 5}px) scale(${1 - index * 0.05})` : 'none',
              opacity: index > 3 ? 0 : 1 - index * 0.15,
            }}
            isTopCard={index === 0} />
        ))}
      </AnimatePresence>
      {cards.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl">
          <div className="animate-float text-center p-6">
            <h3 className="text-2xl font-medium mb-2">No more cards!</h3>
            <p className="text-muted-foreground">Check back soon for more profiles</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default CardStack;
