import Sidebar from '../components/layout/Sidebar';
import MainContent from '../components/layout/MainContent';

const WelcomePage = () => {

  return (
    <div className="flex h-screen">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default WelcomePage;