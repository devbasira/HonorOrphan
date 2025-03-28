import { useState } from 'react';
import OrphanDetails from './components/OrphanDetails';
import logo from './assets/logo.png';
import CardStack from './components/CardStack';
import { useIsMobile } from "./lib/isMobile"
import { X } from 'lucide-react';



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

const initialCards: CardData[] = [
  {
    name: 'Faris',
    age: 10,
    location: 'Delhi',
    biography: 'Faris is a resilient young soul growing up with a gentle heart and a deep longing for familial love. Despite facing hardships, his optimism shines through. He loves learning and dreams of a future filled with opportunity and kindness.',
    needs: [
      'Educational support (school supplies, tuition assistance)',
      'Basic daily essentials',
      'Healthcare access'
    ],
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400',
    id: 'faris',
    description: ''
  },
  {
    name: 'Sarah',
    age: 8,
    location: 'Mumbai',
    biography: 'Sarah has a bright smile that lights up any room. She shows remarkable resilience and maintains a positive attitude despite her circumstances. She loves art and dreams of becoming a teacher one day.',
    needs: [
      'Art supplies and educational materials',
      'Daily necessities',
      'Medical check-ups'
    ],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    id: 'sarah',
    description: ''
  },
  {
    name: 'Ahmed',
    age: 12,
    location: 'Bangalore',
    biography: 'Ahmed is a curious and intelligent boy who excels in mathematics. Despite facing challenges, he maintains excellent grades and helps younger children with their studies. He dreams of becoming an engineer.',
    needs: [
      'Advanced study materials',
      'School uniform and supplies',
      'Regular meals and nutrition'
    ],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    id: 'ahmed',
    description: ''
  }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile()
  const [isAboutClicked, setIsAbout] = useState(false);
  // const [isHonorClicked, setIsHonor] = useState(false)

  return (
    <div className=" bg-[#FFFFF0] min-h-screen overflow-hidden">
      <header className="lg:flex hidden w-screen h-[77px] lg:bg-[#1A6874] bg-[#FFFFF0] text-white p-4">
        <div className="lg:w-[1200px] md:w-[900px] max-w-[1200px]  mx-auto flex lg:flex-row md:flex-row gap-[20px] flex-col justify-between items-center">
          <div className="items-center gap-2">
            <img src={logo} alt="" />
          </div>
          <div className="lg:flex hidden font-semibold text-gray-200">"No! But you do not honor the orphan."</div>
        </div>
      </header>
      <main className="flex justify-center items-center max-w-[1200px] mx-auto lg:py-8 lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col lg:col-span-1 md:col-span-1 md:w-full lg:w-full w-screen lg:h-auto md:h-auto h-screen lg:w-full lg:border-r lg:border-gray-300 flex lg:justify-center md:justify-center justify-start lg:item-center md:items-center lg:overflow-x-auto md:overflow-x-auto  scrollbar-hide">
            <div className="  flex-col justify-center items-center">

              <CardStack
                initialCards={initialCards}
                setIndex={setCurrentIndex}
                isAboutClicked = {isAboutClicked}
                // isHonorClicked = {isHonorClicked}
                className="lg:mt-6 md:mt-6 mt-[10px] lg:mb-20"
              />
              {
                isMobile ? (<div>
                  <div className="absolute bottom-0 left-0 w-[340px] flex justify-between items-center px-[20px] mt-32 md:mt-6 lg:mt-5 h-[60px] w-screen">
                    <button
                      onClick={() => { }}
                      className="bg-[#FFA500] w-[212px] h-[45px] hover:bg-orange-400 text-white font-semibold py-2 px-6 rounded-full transition-all"
                    >
                      Honor {initialCards[currentIndex].name}
                    </button>
                    <button
                      onClick={() => { setIsAbout(!isAboutClicked) }}
                      className={`font-semibold transition-all ${
                        isAboutClicked 
                          ? 'bg-red-500 hover:bg-red-600 w-[45px] h-[45px] rounded-full flex items-center justify-center' 
                          : 'bg-[#1A6874] hover:bg-orange-400 text-white w-[130px] h-[45px] py-2 px-6 rounded-full'
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
                  <div className="w-[340px] flex justify-between items-center px-2 mt-32 md:mt-6 lg:mt-5">
                    <button
                      onClick={() => { }}
                      className="bg-[#FFA500] w-[164px] hover:bg-orange-400 text-white font-semibold py-2 px-6 rounded-full transition-all"
                    >
                      Honor Now!
                    </button>
                    <h3 className="text-[#FFA500] font-semibold">
                      Learn More...
                    </h3>
                  </div>
                )
              }
            </div>
          </div>
          <div className="ml-6 hidden lg:flex justify-center items-center  lg:col-span-1 md:col-span-3 h-[85vh] overflow-y-auto pr-2 scrollbar-hide">
            <OrphanDetails {...initialCards[currentIndex]} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;