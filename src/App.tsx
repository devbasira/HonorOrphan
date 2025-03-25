import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import OrphanCard from './components/OrphanCard';
import OrphanDetails from './components/OrphanDetails';
import logo from './assets/logo.png';
// Sample data with multiple orphans
const orphansData = [
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
    imageUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400'
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
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
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
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
  }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);


  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < orphansData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };


  const handleWheel = (e: React.WheelEvent) => {
    if (isScrollLocked) return;
  
    if (e.deltaY > 0 && currentIndex < orphansData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsScrollLocked(true);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsScrollLocked(true);
    }
  
    // Lock scrolling for 400ms
    setTimeout(() => {
      setIsScrollLocked(false);
    }, 400);
  };

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

          <div className="md:col-span-3 w-[350px] border-r overflow-x-auto scrollbar-hide">
            <Sidebar />
          </div>

          <div
            className="md:col-span-5 flex flex-col items-center border-r"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <h1 className="text-3xl font-semibold text-teal-700 mb-6 mt-2" >
              Choose to Honor
            </h1>

            <div className="relative h-[700px] w-[340px] ml-2">
              {orphansData.map((orphan, index) => {
                let style = '';

                if (index === currentIndex) {
                  style = 'z-30 translate-x-0 scale-100 opacity-100';
                } else if (index === currentIndex + 1) {
                  style = 'z-20 -translate-x-4 scale-95 opacity-80';
                } else if (index === currentIndex + 2) {
                  style = 'z-10 -translate-x-8 scale-90 opacity-60';
                } else {
                  style = 'hidden';
                }

                return (
                  <div
                    key={index}
                    className={`absolute w-full transition-all duration-500 ease-in-out ${style}`}
                  >
                    <OrphanCard
                      name={orphan.name}
                      bio={orphan.biography}
                      needs={orphan.needs}
                  
                      onSelect={() => setCurrentIndex(index)}
                    />
                  </div>
                );
              })}
            </div>
            <div className='w-[340px]'>
              <button
                onClick={() => { }}
                className="bg-[#FFA500] w-[164px] hover:bg-orange-400 text-white font-semibold py-2 px-6 rounded-full transition-all"
              >
                Honor Now!
              </button>
            </div>

          </div>

          <div className="md:col-span-4 h-[85vh] overflow-y-auto pr-2 scrollbar-hide">

            <OrphanDetails {...orphansData[currentIndex]} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;