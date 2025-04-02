import { useState, useRef } from 'react';
import OrphanDetails from './components/OrphanDetails';
import logo from './assets/logo2.png';
import CardStack from './components/CardStack';
import { useIsMobile } from "./lib/isMobile"
import { X } from 'lucide-react';

import pic1 from './assets/pic1.png'
import pic2 from './assets/pic2.png'
import pic3 from './assets/pic3.png'

interface CardData {
  id: string;
  name: string;
  age: number;
  image: string;
  gender: string;
  description: string;
  location: string;
  biography: string;
  needs: string[];
}

const initialCards: CardData[] = [
  {
    name: 'Faris',
    age: 10,
    location: 'Delhi, India',
    gender: 'Boy',
    biography: 'Faris is a resilient young soul growing up with a gentle heart and a deep longing for familial love. Despite facing hardships, his optimism shines through. He loves learning and dreams of a future filled with opportunity and kindness.',
    needs: [
      'Educational support (school supplies, tuition assistance)',
      'Basic daily essentials',
      'Healthcare access'
    ],
    image: pic1,
    id: 'faris',
    description: ''
  },
  {
    name: 'Sarah',
    age: 8,
    location: 'Mumbai, India',
    gender: 'Girl',
    biography: 'Sarah has a bright smile that lights up any room. She shows remarkable resilience and maintains a positive attitude despite her circumstances. She loves art and dreams of becoming a teacher one day.',
    needs: [
      'Art supplies and educational materials',
      'Daily necessities',
      'Medical check-ups'
    ],
    image:pic2,
    id: 'sarah',
    description: ''
  },
  {
    name: 'Ahmed',
    age: 12,
    location: 'Bangalore, India',
    gender: 'Boy',
    biography: 'Ahmed is a curious and intelligent boy who excels in mathematics. Despite facing challenges, he maintains excellent grades and helps younger children with their studies. He dreams of becoming an engineer.',
    needs: [
      'Advanced study materials',
      'School uniform and supplies',
      'Regular meals and nutrition'
    ],
    image: pic3,
    id: 'ahmed',
    description: ''
  }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile()
  const [isAboutClicked, setIsAbout] = useState(false);
  const [waitClick, setIswaitClicked] = useState(false);
  const [hasSelectedCard, setHasSelectedCard] = useState(true);
  const cardStackRef = useRef<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [subscribe, setIsSubscribe] = useState(false);


  return (
    <div className=" bg-[#FFFFF0] min-h-screen overflow-hidden">
      <header className="w-screen justify-center h-[10vh] bg-[#FFFFF0] px-6 hidden lg:flex items-center">
        <div className="w-full pl-[40px] pr-[30px] max-w-[1200px] flex items-center  justify-between">

          <div className="w-[140px] h-auto p-1 rounded-sm">
            <img src={logo} alt="Honor the Orphan" className="h-[60px] w-auto" />
          </div>

          <div className="flex items-center flex-grow justify-end gap-4">
            
            <button
              onClick={() => {
                setHasSelectedCard(!hasSelectedCard);        
                // setShowIntro(false);             
              
                if (subscribe) setIsSubscribe(false);
                if (showForm) setShowForm(false);
                if (isSubmitted) setIsSubmitted(false);
              }}
              className={`font-semibold transition-all ${!hasSelectedCard
                ? 'bg-red-500 hover:bg-red-600 h-[45px] w-[45px] rounded-full flex items-center justify-center'
                : 'bg-[#1A6874] text-white h-[45px] w-[130px] px-6 rounded-full'
                }`}
            >
              {!hasSelectedCard ? <X size={24} className="text-white" /> : 'About'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex justify-center items-center max-w-[1200px] mx-auto  lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-8">

          <div style={isMobile ? { height: '100dvh' } : {}} className="flex flex-col lg:col-span-1 md:col-span-1 md:w-full lg:w-full w-screen lg:h-auto md:h-auto h-screen lg:w-full  lg:border-gray-300 flex lg:justify-center md:justify-center justify-start lg:item-center md:items-center lg:overflow-x-auto md:overflow-x-auto  scrollbar-hide">
            <div className="flex-col justify-center items-center ">
              <CardStack
                ref={cardStackRef}
                setHasSelectedCard={setHasSelectedCard}
                initialCards={initialCards}
                setIndex={setCurrentIndex}
                index={currentIndex}
                isAboutClicked={isAboutClicked}
                waitClick={waitClick}
                setIswaitClicked={setIswaitClicked}
                subscribe={subscribe} setIsSubscribe={setIsSubscribe} 
                className="lg:mt-6 md:mt-6 lg:pt-0 lg:pb-0 md:pt-0 md:pb-0 pb-[20px] pt-[10px] lg:mb-20"
              />
              {
                isMobile ? (<div className=''>
                  <div className="border-t fixed  bottom-0 left-0 w-[340px] flex justify-between items-center px-[20px] md:mt-6 lg:mt-5 h-[14vh] w-screen">
                    <button
                      onClick={() => {
                        setIsAbout(!isAboutClicked)
                        setIswaitClicked(true);
                      }}
                      className="bg-[#FFA500] w-[60%] h-[50%] hover:bg-orange-400 text-white font-semibold py-2 px-6 rounded-full transition-all"
                    >
                      Honor {initialCards[currentIndex].name}
                    </button>
                    <button
                      onClick={() => {
                        if(subscribe)
                          {
                            setIsSubscribe(false)
                          }
                        setIsAbout(!isAboutClicked)
                        if (waitClick) {
                          setIswaitClicked(false);
                        }
                      }}
                      className={`font-semibold transition-all ${isAboutClicked
                        ? 'bg-red-500 hover:bg-red-600 h-[50%] aspect-square rounded-full flex items-center justify-center'
                        : 'bg-[#1A6874] text-white w-[35%] h-[50%] py-2 px-6 rounded-full'
                        }`}
                    >
                      {isAboutClicked ? (
                        <X size={24} className="text-white" />
                      ) : (
                        'About'
                      )}
                    </button>
                  </div>
                </div>) : (
                  <div className="w-[340px] flex justify-between items-center pt-4 md:mt-6 lg:mt-5 mx-auto gap-2">
                    <button
                      onClick={() => {
                        setHasSelectedCard(true)
                        cardStackRef.current?.swipeLeft();
                      }}
                      className="w-[45px] h-[45px] rounded-full bg-[#EAEAEA] flex items-center justify-center hover:bg-[#ddd] transition"
                    >
                      <span className="text-[#1A6864] text-xl">←</span>
                    </button>

                    <button
                      onClick={() => {
                        setHasSelectedCard(false)
                        setShowForm(true)
                      }}
                      className="bg-[#FFA500] w-[200px] hover:bg-orange-400 text-white font-semibold py-2 h-[45px] rounded-full transition-all"
                    >
                      Honor {initialCards[currentIndex].name}
                    </button>


                    <button
                      onClick={() => {
                        setHasSelectedCard(true)
                        cardStackRef.current?.swipeRight();
                      }}
                      className="w-[45px] h-[45px] rounded-full bg-[#EAEAEA] flex items-center justify-center hover:bg-[#ddd] transition"
                    >
                      <span className="text-[#1A6864] text-xl">→</span>
                    </button>
                  </div>

                )
              }
            </div>
          </div>
          <div className="ml-6  hidden lg:flex justify-center items-center  lg:col-span-2 md:col-span-3 h-[85vh] overflow-y-auto pr-2 scrollbar-hide">
            <OrphanDetails subscribe={subscribe} setIsSubscribe={setIsSubscribe}  showForm={showForm} setShowForm={setShowForm} setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted} setHasSelectedCard={setHasSelectedCard} showIntro={!hasSelectedCard} {...initialCards[currentIndex]} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;