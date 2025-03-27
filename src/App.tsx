import { useState } from 'react';
import Sidebar from './components/Sidebar';
import OrphanDetails from './components/OrphanDetails';
import logo from './assets/logo.png';
import CardStack from './components/CardStack';



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

  return (
    <div className="bg-[#FFFFF0] min-h-screen overflow-hidden">

      <header className="bg-[#1A6874] text-white p-4">
        <div className="max-w-7xl mx-auto flex lg:flex-row md:flex-row gap-[20px] flex-col justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" />
          </div>
          <div className="font-semibold text-gray-200">"No! But you do not honor the orphan."</div>
        </div>
      </header>


      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          <div className=" md:col-span-3 w-[350px] flex lg:justify-center md:justify-center justify-end items-center border-r overflow-x-auto scrollbar-hide">
            <Sidebar />
          </div>

          <div
            className="md:col-span-5  flex flex-col items-center border-r"
          >
            <h1 className="text-3xl font-semibold text-teal-700 mb-6 mt-2" >
              Choose to Honor
            </h1>
            <CardStack initialCards={initialCards} setIndex={setCurrentIndex} className="mt-6 mb-20" />
            <div className='w-[340px] mt-32 md:mt-6 lg:mt-5'>
              <button
                onClick={() => { }}
                className="bg-[#FFA500] w-[164px] hover:bg-orange-400 text-white font-semibold py-2 px-6 rounded-full transition-all"
              >
                Honor Now!
              </button>
            </div>

          </div>
          <div className="md:col-span-4 h-[85vh] overflow-y-auto pr-2 scrollbar-hide">
            <OrphanDetails {...initialCards[currentIndex]} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;