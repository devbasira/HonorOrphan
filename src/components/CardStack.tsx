import { useImperativeHandle, forwardRef, useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SwipeableCard from "./SwipeableCard";
import { cn } from "../lib/utils";
import icon from '../assets/icon.png';

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
  setHasSelectedCard: any
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
  const [countdown, setCountdown] = useState<number | null>(null);

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

  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let countdownInterval: NodeJS.Timeout;

    if (cards.length === 0 && !userInteracted) {
      setCountdown(10);

      countdownInterval = setInterval(() => {
        setCountdown(prev => (prev !== null && prev > 0 ? prev - 1 : null));
      }, 1000);

      timer = setTimeout(() => {
        setCards(initialCards || []);
        setIndex?.(0);
        setCountdown(null);
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [cards, initialCards, setIndex, userInteracted]);

  const handleReset = () => {
    setUserInteracted(true);
    setCards(initialCards || []);
    setIndex?.(0);
    setCountdown(null);

    setTimeout(() => setUserInteracted(false), 200);
  };

  const handleGoBack = () => {
    if (!initialCards || initialCards.length === 0) return;

    setUserInteracted(true);
    const lastCard = initialCards[initialCards.length - 1];
    setCards([lastCard]);
    setIndex?.(initialCards.length - 1);
    setCountdown(null);

    setTimeout(() => setUserInteracted(false), 200);
  };



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
      className={cn("flex  justify-center relative card-stack w-full mx-auto h-[85dvh] lg:my-0 md:my-0  lg:h-[600px] md:h-[600px]", "transition-all duration-300 ease-in-out", className)}>
      <AnimatePresence>
        {cards.map((card, index) => (
          <SwipeableCard
            bio={card.biography} onSelect={function (): void {
            }} key={card.id}
            {...card}
            image={card.image}
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
          <div className="relative h-[740px] mt-2 rounded-3xl flex flex-col items-center justify-center gap-[30px]">
            <img src={icon} className="h-auto" alt="icon" />
            <h1 className="px-[15px] text-center font-semibold text-[20px]">
              You have met all
              <br />
              the little hearts waiting for support
            </h1>
            {countdown !== null && (
              <div className="flex flex-col gap-[10px]">
                <button
                  onClick={handleReset}
                  className="bg-[#1A6874] hover:bg-[#14545d] active:scale-95 transition-all duration-150 text-white h-[30px] w-[130px] px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1A6874]/50"
                >
                  Reset
                </button>  

                <button
                  onClick={handleGoBack}
                  className="bg-[#1A6874] hover:bg-[#14545d] active:scale-95 transition-all duration-150 text-white h-[30px] w-[130px] px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1A6874]/50"
                >
                  Go back
                </button>

              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
});
{/* {true && ( */ }
export default CardStack;
