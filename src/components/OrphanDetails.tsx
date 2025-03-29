import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo2.png';
import icon from '../assets/icon.png';
import { Video, Headphones } from 'lucide-react';

interface OrphanDetailsProps {
  name: string;
  age: number;
  location: string;
  biography: string;
  needs: string[];
  gender: string;
  image: string;
  showIntro: boolean;
  setHasSelectedCard: any;
  isSubmitted: boolean,
  setIsSubmitted: any
  setShowForm: any,
  showForm: boolean
}

const OrphanDetails: React.FC<OrphanDetailsProps> = ({
  name,
  age,
  location,
  biography,
  gender,
  needs,
  showIntro,
  isSubmitted,
  setIsSubmitted,
  setShowForm,
  showForm
}) => {


  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    whatsapp: '',
    interest: '',
    motivation: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    setTimeout(()=>{
      setIsSubmitted(true);
      setShowForm(false);
    },1500)
    
  };

  // === UI Flow ===
  if (showIntro) {
    if (isSubmitted) {
      return (
        <div className="relative bg-[#D9D9D9] h-[740px] mt-2 rounded-lg w-[740px] flex flex-col items-center justify-center gap-[30px]">
          <img src={icon} className=" h-auto" alt="icon" />
          <h1 className="px-[15px] text-center  font-semibold text-[20px]">
            You have met all
            <br />
            the little hearts waiting for support
          </h1>
          <h1 className=" text-[#1A6864] font-semibold text-[20px] text-center">
            I want to meet them again!
          </h1>
        </div>
      );
    }

    if (showForm) {
      return (
        <motion.div
          key="form"

          className="relative bg-[#D9D9D9] h-[740px] mt-2 rounded-lg w-[740px] flex flex-col px-[40px] py-[50px] gap-[20px] "
        >
          <div className="flex justify-between w-[70%] items-center ">
            <img className="w-[100px]" src={logo} alt="Logo" />
            <h2 className="text-[24px] font-semibold text-[#1A6864]">
              Pre-registration Form
            </h2>
          </div>
          <p className="text-center text-[16px] text-[#333333]">
            We’re building the platform—join us from the start!
          </p>
          <motion.form
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-4 w-full max-w-[560px] mx-auto mt-4"
          >
            <div className="text-md w-full text-center text-[#1A6864] font-medium">Register as:</div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-2 h-[45px] text-center rounded-lg border border-gray-400"
              required
            >
              <option value="">Sponsor/Orphanage Dropdown</option>
              <option value="sponsor">Sponsor</option>
              <option value="orphanage">Orphanage</option>
            </select>

            <input
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
            />
            <input
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
            />
            <input
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={formData.whatsapp}
              onChange={handleChange}
              className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
            />
            <input
              name="interest"
              placeholder="Interested to"
              value={formData.interest}
              onChange={handleChange}
              className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
            />
            <textarea
              name="motivation"
              placeholder="What is your motivation to join?"
              value={formData.motivation}
              onChange={handleChange}
              className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
            />

            <button
              type="submit"
              className="bg-[#1A6864] w-[212px] h-[45px] mt-[10px] text-white py-2 rounded-full font-semibold hover:bg-[#155a57] transition mx-auto"
            >
              Join the waitlist
            </button>

            <p className="text-center text-[#1A6864] text-sm underline cursor-pointer">
              or Just Subscribe for Update
            </p>
          </motion.form>
        </motion.div>
      );
    }

    // Default Intro
    return (
      <div className="relative bg-[#D9D9D9] h-[740px] mt-2 rounded-lg w-[740px] flex flex-col px-[50px] py-[50px] gap-[30px]">
        <img className="w-[200px] h-auto" src={logo} alt="Logo" />
        <div className="flex flex-col">
          <h1 className="text-[20px] font-semibold text-[#1A6864]">
            "No! But you do not honor the orphan."
          </h1>
          <p className="text-[16px] text-[#1A6864]">- Quran 89:71</p>
        </div>
        <div className="flex flex-col w-[496px] text-[#1A1A1A] py-[30px] font-sans space-y-4 leading-relaxed pr-[40px]">
          <p>
            <strong>Honor the Orphan</strong> is an upcoming platform that connects orphans with
            <strong> guardians of hope, hearts that care, and mentors who uplift</strong>—going
            beyond donations to build meaningful, life-changing relationships.
          </p>
          <p className="font-semibold">
            We’re building the platform
            <br />
            —<span className="text-[#1A6874]">join us from the start!</span>
          </p>
          <p>
            Pre-register now to be among the first sponsors and orphanages to create lasting
            impact.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="absolute bottom-[40px] right-[45px] w-[221px] h-[45px] text-[#1a6864] font-semibold bg-[#FFFFF0] rounded-full"
        >
          Join the waitlist
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FEF6E1] h-[740px] mt-2 px-[50px] py-[50px] rounded-lg w-[740px]">
      <div className="mb-6">
        <div className="text-[48px] text-[#1A6864] leading-none font-semibold ">
          {name}, {age}
        </div>
        <div>
          <span className="font-medium text-[#1A6864] text-[18px]">
            {gender} from {location}
          </span>
        </div>
      </div>

      <div className="mb-6 mt-[80px]">
        <p className="text-gray-600 text-[18px]">{biography}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2 text-[18px]">Key Needs:</h3>
        <ul className="list-disc list-inside text-gray-600">
          {needs.map((need, index) => (
            <li className="text-[16px]" key={index}>
              {need}
            </li>
          ))}
        </ul>
      </div>

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
