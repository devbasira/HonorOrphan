
const Sidebar = () => {
  return (
    <div className="bg-[#FFFFF0] p-6 h-[80vh] w-[314px] overflow-y-hidden flex flex-col overflow-x-hidden">

    <div className="flex items-center gap-3 mb-8">
      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150"
          alt="Tou. J."
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-medium text-gray-700">Tou. J.</h3>
        <a href="#" className="text-sm text-gray-500">View profile</a>
      </div>
    </div>

   
    <div className="bg-[#FFA500] flex flex-col justify-center items-center w-[269px] h-[174px] rounded-lg p-4 mb-8">
      <div className="flex gap-[5px]">
      <h3 className="text-white text-lg mb-2">Start a </h3>
      <h3 className="text-white text-lg mb-2 font-bold">collective fund</h3>
      </div>
      <button className="w-[178px] border border-[2px] border-white text-white rounded-full py-2 mb-2 mt-2">
        Bismillah...
      </button>
      <a href="#" className="text-sm text-white mt-2 underline">
        Know more...
      </a>
    </div>

    {/* Navigation */}
    <nav className="flex-grow">
      <ul className="space-y-2">
        <li>
          <a href="#" className="flex items-center justify-between p-3 border border-[#1A6874] rounded-sm">
            <span>Home</span>
            <span className="text-gray-400">›</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center justify-between p-3 border border-[#7AB1C0] rounded-sm">
            <span>My Sponsorships</span>
            <span className="text-gray-400">›</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center justify-between p-3 border border-[#7AB1C0] rounded-sm">
            <span>Donations</span>
            <span className="text-gray-400">›</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center justify-between p-3 border border-[#7AB1C0] rounded-sm">
            <span>Account</span>
            <span className="text-gray-400">›</span>
          </a>
        </li>
      </ul>
    </nav>

   
    <button className="flex items-center justify-center w-full border border-[#FFA500] text-[#1A6874] font-semibold rounded-full py-3 mt-4">
      Log in/out
    </button>
  </div>
  );
};

export default Sidebar;