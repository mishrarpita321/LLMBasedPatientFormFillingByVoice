import { FaStethoscope } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-green-500 text-white flex flex-col items-center justify-center p-8 animate-slide-right">
      <div className="mb-4">
        <FaStethoscope size={100} />
      </div>
      <h2 className="text-4xl font-bold text-center">
        Praxis Jung
      </h2>
    </div>
  );
};

export default Sidebar;