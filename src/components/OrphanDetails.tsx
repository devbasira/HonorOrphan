// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo2.png';
import icon from '../assets/icon.png';
import { Video, Headphones } from 'lucide-react';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import '../index.css'
import { isValidPhoneNumber } from 'libphonenumber-js';
import PhoneInputField from './PhoneInputField';



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
  showForm: boolean,
  setIsSubscribe: any,
  subscribe: boolean
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
  showForm,
  setIsSubscribe,
  subscribe
}) => {


  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    whatsapp: '',
    interest: '',
    motivation: '',
    orphanageName: '',
    caretakerName: '',
    orphansCount: '',
    boysCount: '',
    girlsCount: '',
    address: '',
    location: ''
  });
  const [isVolunteer, setIsVolunteer] = useState(false);

  const [subData, setSubData] = useState({
    name: '',
    email: ''
  })

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) return 'Please enter a valid email address';
    return '';
  };



  const submitToFirebase = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, "preRegistrations"), {
        ...data,
        isVolunteer,
        submittedAt: Timestamp.now()
      });
      console.log("Document written with ID: ", docRef.id);
      return "success";
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  const submitSubscription = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, "subscriptions"), {
        name: data.name,
        email: data.email,
        submittedAt: Timestamp.now()
      });
      console.log("Subscription added with ID:", docRef.id);
      return "success";
    } catch (error) {
      console.error("Subscription failed:", error);
      throw error;
    }
  };



  const handleSubChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setSubData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(subData.email);
    if (emailError) {
      alert(emailError);
      return;
    }

    console.log("Submitted Data:", subData);

    try {
      const response = await submitSubscription(subData);

      if (response === "success") {
        setIsSubmitted(true);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  }

  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (value: string | undefined) => {
    const phoneNumber = value || '';
    setFormData(prev => ({ ...prev, whatsapp: phoneNumber }));

    if (phoneError && phoneNumber) setPhoneError('');
  };

  const validatePhoneNumber = () => {
    if (!formData.whatsapp) {
      setPhoneError('Phone number is required');
      return false;
    }
    if (!isValidPhoneNumber(formData.whatsapp)) {
      setPhoneError('Invalid phone number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const emailError = validateEmail(formData.email);
    if (emailError) {
      alert(emailError);
      return;
    }
    e.preventDefault();

    console.log("Submitted Data:", formData);

    try {
      const response = await submitToFirebase(formData);

      if (response === "success") {
        setIsSubmitted(true);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  };




  if (showIntro) {
    if (isSubmitted) {
      return (
        <div className="relative bg-[#D9D9D9] h-[740px] mt-2 rounded-3xl w-[740px] flex flex-col items-center justify-center gap-[30px]">
          <img src={icon} className=" h-auto" alt="icon" />
          <h1 className="px-[15px] text-center  font-normal text-[16px]">
            <h1 className='text-[30px] text-[#FFA500] font-semibold'>
              Thank you!
            </h1>
            <br />
            You’re now part of the Honor the Orphan community!
            <br />
            We’ll keep you updated on our journey
          </h1>
        </div>
      );
    }

    if (showForm) {
      return (
        <motion.div
          key="form"
          className="relative overflow-y-auto scrollbar-hide  items-center  bg-[#D9D9D9] h-[735px]  min-h-[400px] max-h-[90vh] mt-2 rounded-3xl w-[740px] flex flex-col px-[40px] py-[7%] gap-[20px] "
        >
          <div className='relative overflow-y-auto scrollbar-hide bg-[#D9D9D9] h-[740px] mt-2 rounded-3xl w-[740px] flex flex-col px-[40px] py-[20px] gap-[20px] '>
            <div className="flex justify-center w-full items-center ">

              <div className='flex flex-col w-full items-center gap-[10px]'>
                <img src={icon} className=" h-auto" alt="icon" />
                <h2 className="text-[30px] font-semibold text-gray-700">
                  Pre-registration Form
                </h2>
              </div>
            </div>
            <p className="text-center text-[16px] text-gray-700">
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
              <div className="text-md w-full text-center text-gray-700  font-medium">{
                subscribe ? 'Subscribe: ' : 'Register as:'}</div>
              {!subscribe && (
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="p-2 h-[45px] text-center rounded-lg border border-gray-400"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="orphanage">Orphanage</option>
                </select>
              )}
              {formData.role === "volunteer" && !subscribe && (
                <>
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
                    type="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <PhoneInputField
                    international
                    defaultCountry="IN"
                    placeholder="WhatsApp Number* (Include country code)"
                    value={formData.whatsapp}
                    onChange={handlePhoneChange} />
                  <input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <div className="flex flex-col gap-1">
                    <label className="flex w-full justify-center items-center gap-2 text-sm text-[#1A6864] w-4 h-4 my-2">How would you like to contribute?</label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className="p-2 h-[45px] rounded-lg border border-gray-400 bg-white text-sm text-center text-[#1A6864] focus:border-[#1A6864] focus:ring-1 focus:ring-[#1A6864] focus:outline-none transition duration-150"
                    >
                      <option value="" disabled hidden>Select an option</option>
                      <option value="Mentorship & Emotional Support">Mentorship & Emotional Support
                      </option>
                      <option value="Fundraising & Awareness">Fundraising & Awareness</option>
                      <option value="Tech & Design Support"> Tech & Design Support</option>
                      <option value="Administrative & Outreach Support">Administrative & Outreach Support</option>
                      <option value="other"> Other</option>
                    </select>
                  </div>
                  {formData.interest === "other" && (
                    <textarea
                      name="motivation"
                      placeholder="How would you like to contribute?"
                      value={formData.motivation}
                      onChange={handleChange}
                      className="p-2 h-[40px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                    />
                  )}
                  <textarea
                    name="motivation"
                    placeholder="Why do you want to volunteer? (optional)"
                    value={formData.motivation}
                    onChange={handleChange}
                    className="p-2 h-[80px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                </>
              )}
              {formData.role === "donor" && !subscribe && (
                <>
                  <label className="flex w-full justify-center items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={isVolunteer}
                      onChange={(e) => setIsVolunteer(e.target.checked)}
                      className="accent-[#1A6864] w-4 h-4"
                    />
                    I would like to Volunteer as well
                  </label>

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
                    type="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <PhoneInputField
                    international
                    defaultCountry="IN"
                    placeholder="WhatsApp Number* (Include country code)"
                    value={formData.whatsapp}
                    onChange={handlePhoneChange} />
                  <input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <div className="flex flex-col gap-1">
                    <label className="flex w-full justify-center items-center gap-2 text-sm text-[#1A6864] w-4 h-4 my-2">Interested to:</label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className="p-2 h-[45px] rounded-lg border border-gray-400 bg-white text-sm text-center text-[#1A6864] focus:border-[#1A6864] focus:ring-1 focus:ring-[#1A6864] focus:outline-none transition duration-150"
                    >
                      <option value="" disabled hidden>Select an option</option>
                      <option value="Donate only">Donate only</option>
                      <option value="Fully sponsor an orphan">Fully sponsor an orphan</option>
                    </select>
                  </div>
                  <textarea
                    name="motivation"
                    placeholder="What is your motivation to join? (optional)"
                    value={formData.motivation}
                    onChange={handleChange}
                    className="p-2 h-[80px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                </>
              )}
              {subscribe && (
                <>
                  <input
                    name="name"
                    placeholder="Name*"
                    value={subData.name}
                    onChange={handleSubChange}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email*"
                    value={subData.email}
                    onChange={handleSubChange}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <div className='w-full flex flex-col gap-[5px]'>
                    <button
                      onClick={handleSubscribe}
                      className="bg-[#1A6864] w-[212px] h-[45px] mt-[10px] text-white py-2 rounded-full font-semibold hover:bg-teal-800 transition mx-auto"
                    >
                      Subscribe
                    </button>
                    <p
                      onClick={() => setIsSubscribe(false)}
                      className="text-center text-gray-700 underline cursor-pointer font-medium"
                    >
                      Go Back
                    </p>
                  </div>

                </>
              )}

              {formData.role === "orphanage" && !subscribe && (
                <>
                  <input
                    name="orphanageName"
                    placeholder="Orphanage Name*"
                    value={formData.orphanageName || ""}
                    onChange={handleChange}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <input
                    name="caretakerName"
                    placeholder="Guardian/Caretaker Name*"
                    value={formData.caretakerName || ""}
                    onChange={handleChange}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <input
                    name="address"
                    placeholder="Address* (City, Country)"
                    value={formData.address || ""}
                    onChange={handleChange}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <label className="flex w-full justify-center items-center gap-2 text-sm text-[#1A6864] w-4 h-4 ">Number of Orphans :</label>
                  <input
                    name="boysCount"
                    type="number"
                    placeholder="No. of Boys*"
                    min="0"
                    value={formData.boysCount || ""}
                    onChange={handleChange}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <input
                    name="girlsCount"
                    type="number"
                    min="0"
                    placeholder="No. of Girls*"
                    value={formData.girlsCount || ""}
                    onChange={handleChange}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                  <input
                    name="whatsapp"
                    type="text"
                    inputMode="numeric"
                    placeholder="WhatsApp Number* (Include country code)"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/(?!^\+)\D/g, "");
                    }}
                    required
                    className="p-2 h-[45px] text-center rounded-lg border border-gray-400 placeholder:text-[#1a6864]"
                  />
                </>
              )}
              {
                !subscribe && (
                  <div className='w-full flex flex-col justify-between h-[90px] items-center'>
                    <button
                      type="submit"
                      className="bg-[#1A6864] w-[212px] h-[45px] mt-[10px] text-white py-2 rounded-full font-semibold hover:bg-[#155a57] transition mx-auto"
                    >
                      Pre Register
                    </button>

                    <p
                      onClick={() => setIsSubscribe(true)}
                      className="text-center text-gray-700 text-sm underline cursor-pointer"
                    >
                      or Just <span className="font-semibold">Subscribe</span> for Update
                    </p>
                  </div>
                )
              }
            </motion.form>
          </div>

        </motion.div>
      );
    }
    return (
      <div className="relative bg-[#E4E4E4] flex flex-col overflow-y-auto justify-start h-[735px] min-h-[400px] max-h-[90vh] mt-3 rounded-3xl w-[740px] flex flex-col px-[50px] py-[50px] gap-[30px]">
        <img className="w-[200px] h-auto" src={logo} alt="Logo" />
        <div className="flex flex-col mt-[40px]">
          <h1 className="text-[20px] font-semibold text-gray-800">
            "No! But you do not honor the orphan."
          </h1>
          <p className="text-[16px] text-gray-600">- Quran 89:71</p>
        </div>
        <div className="flex flex-col w-[496px] text-gray-600 py-[30px] font-sans space-y-4 leading-relaxed pr-[40px]">
          <p>
            <strong>Honor the Orphan</strong> is an upcoming platform that connects orphans with
            <strong> guardians of hope, hearts that care, and mentors who uplift</strong>—going
            beyond donations to build meaningful, life-changing relationships.
          </p>
          <p className="font-semibold">
            We’re building the platform

            —<span className=""> join us from the start!</span>
          </p>
          <p>
            Pre-register now to be among the first sponsors and orphanages to create lasting
            impact.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="absolute bottom-[60px] left-[50px] w-[200px] h-[45px] text-[#1a6864] font-semibold bg-[#FFFFF0] rounded-full"
        >
          Pre-register!
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FEF6E1] flex flex-col overflow-y-auto justify-start min-h-[400px] max-h-[90vh] mt-4 px-[50px] py-8 rounded-3xl w-[740px] scrollbar-hide">
      <div className="mb-6">
        <div className="text-[48px] text-gray-700 leading-none font-semibold ">
          {name}, {age}
        </div>
        <div>
          <span className="font-medium text-gray-700 text-[18px]">
            {gender} from {location}
          </span>
        </div>
      </div>

      <div className="mb-6 mt-[80px]">
        <p className="text-gray-600 text-[18px]">{biography}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2 text-[18px]">Key Needs:</h3>
        <ul className="list-disc list-inside text-gray-600">
          {needs.map((need, index) => (
            <li className="text-[16px]" key={index}>
              {need}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3 mt-[30px]">
        <button className="w-[400px] flex items-center justify-start px-[40px] gap-2 bg-amber-50 text-gray-700 py-3 rounded-xl hover:bg-amber-200 transition-colors">
          <Video size={20} />
          <span>Watch {name}'s Video Message</span>
        </button>

        <button className="w-[400px] flex items-center justify-start px-[40px] gap-2 bg-amber-50 text-gray-700 py-3 rounded-xl hover:bg-amber-100 transition-colors">
          <Headphones size={20} />
          <span>Listen to {name}'s Audio Message</span>
        </button>
        <button className="w-[400px] flex items-center justify-start px-[40px] gap-2 bg-amber-50 text-gray-700 py-3 rounded-xl hover:bg-amber-100 transition-colors">
          <Headphones size={20} />
          <span>Schedule an online meeting</span>
        </button>
        <button className="w-[400px] flex items-center justify-start px-[40px] gap-2 bg-amber-50 text-gray-700 py-3 rounded-xl hover:bg-amber-100 transition-colors">
          <Headphones size={20} />
          <span>Request an in-person meeting</span>
        </button>
      </div>
    </div>
  );
};

export default OrphanDetails;
