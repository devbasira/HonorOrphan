import React from 'react';
import bgImage from '../assets/image.png';

interface OrphanCardProps {
  name: string;
  bio: string;
  needs: string[];
  onSelect: () => void;
}

const OrphanCard: React.FC<OrphanCardProps> = ({ name, bio, needs, onSelect, }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="bg-blue-200 w-[333px] h-[665px] rounded-lg shadow-lg mb-4 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 relative"
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
  );
};

export default OrphanCard;
