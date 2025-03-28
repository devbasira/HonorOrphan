import React from 'react';
import { Video, Headphones } from 'lucide-react';

interface OrphanDetailsProps {
  name: string;
  age: number;
  location: string;
  biography: string;
  needs: string[];
  image: string;
}

const OrphanDetails: React.FC<OrphanDetailsProps> = ({
  name,
  age,
  location,
  biography,
  needs,
}) => {
  return (
    <div className="bg-[#FFFFF0] px-6 ">

      <div className="space-y-1 mb-6">
        <div className='text-[48px] font-semibold '>
         {name}
        </div>
        <div>
          <span className="font-medium text-[18px]">Age:</span> {age}
        </div>
        <div>
          <span className="font-medium text-[18px]">Location:</span> {location}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 text-[18px]">{biography}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2 text-[18px]">Key Needs:</h3>
        <ul className="list-disc list-inside text-gray-600">
          {needs.map((need, index) => (
            <li className='text-[16px]' key={index}>{need}</li>
          ))}
        </ul>
      </div>
      <h3 className="font-medium mb-2 text-[18px]">Connect with {name}:</h3>

      <div className="space-y-3 mt-[30px]">
        <button className="w-[400px] flex items-center justify-start px-[40px] gap-2 bg-amber-100 text-amber-800 py-3 rounded-xl hover:bg-amber-200 transition-colors">
          <Video size={20} />
          <span>Watch {name}'s Video Message</span>
        </button>

        <button className="w-[400px] flex items-center justify-start px-[40px] gap-2 bg-amber-50 text-amber-800 py-3 rounded-xl hover:bg-amber-100 transition-colors">
          <Headphones size={20} />
          <span>Listen to {name}'s Audio Message</span>
        </button>
        <button className="w-[400px] flex items-center justify-start px-[40px] gap-2 bg-amber-50 text-amber-800 py-3 rounded-xl hover:bg-amber-100 transition-colors">
          <Headphones size={20} />
          <span>Schedule an online meeting</span>
        </button>
        <button className="w-[400px] flex items-center justify-start px-[40px] gap-2 bg-amber-50 text-amber-800 py-3 rounded-xl hover:bg-amber-100 transition-colors">
          <Headphones size={20} />
          <span>Request an in-person meeting</span>
        </button>
      </div>
    </div>
  );
};

export default OrphanDetails;