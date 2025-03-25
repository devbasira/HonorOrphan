import React from 'react';
import { Video, Headphones } from 'lucide-react';
import img from '../assets/img.png';
interface OrphanDetailsProps {
  name: string;
  age: number;
  location: string;
  biography: string;
  needs: string[];
  imageUrl: string;
}

const OrphanDetails: React.FC<OrphanDetailsProps> = ({
  name,
  age,
  location,
  biography,
  needs,
}) => {
  return (
    <div className="bg-[#FFFFF0] px-6">
      <h2 className="text-2xl font-semibold text-teal-700 mb-6">
        Get to know {name}
      </h2>

      <div className="mb-6 flex items-center justify-center gap-4 relative">
        <div className="w-[250px] h-[250px] rounded-full overflow-hidden">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center text-orange-500 font-medium text-sm">
          <span className="-rotate-90 tracking-wider">Scroll</span>
          <span className="text-xl mt-1">↓</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <span className="font-medium">Name:</span> {name}
        </div>
        <div>
          <span className="font-medium">Age:</span> {age}
        </div>
        <div>
          <span className="font-medium">Location:</span> {location}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Short Biography:</h3>
        <p className="text-gray-600">{biography}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Key Needs:</h3>
        <ul className="list-disc list-inside text-gray-600">
          {needs.map((need, index) => (
            <li key={index}>{need}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-amber-100 text-amber-800 py-3 rounded-xl hover:bg-amber-200 transition-colors">
          <Video size={20} />
          <span>Watch {name}'s Video Message</span>
        </button>

        <button className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-800 py-3 rounded-xl hover:bg-amber-100 transition-colors">
          <Headphones size={20} />
          <span>Listen to {name}'s Audio Message</span>
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-800 py-3 rounded-xl hover:bg-amber-100 transition-colors">
          <Headphones size={20} />
          <span>Schedule an online meeting</span>
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-800 py-3 rounded-xl hover:bg-amber-100 transition-colors">
          <Headphones size={20} />
          <span>Request an in-person meeting</span>
        </button>
      </div>
    </div>
  );
};

export default OrphanDetails;