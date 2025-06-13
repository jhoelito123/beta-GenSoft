import Footer from "../../../components/ui/footer";
import Blog from "../components/Blog";
import Hero from "../components/hero";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";

const MainLayout = () => { 
  return (
      <div className="bg-[#FCFCFC] w-full flex flex-col items-center justify-center">
        <Hero/>
        <Testimonials/>
        <Pricing/>
        <Blog/>
        <Footer />
      </div>
  );
};

export default MainLayout;
