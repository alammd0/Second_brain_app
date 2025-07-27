import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VideoComponent from "@/components/VideoCompontent";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="container px-4 py-16 flex flex-col items-center justify-center w-9/12 mx-auto gap-10">
        {/* Demo Video Section */}
        <div className="flex flex-col items-center justify-center gap-5"> 
          <h2 className="text-2xl font-bold font-OpenSans underline">Demo Video</h2>
          <div className="w-full shadow-2xl rounded-xl border border-gray-300 bg-white">
             <VideoComponent />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 mt-10">
          <h2 className="text-2xl font-bold font-OpenSans underline">Test using this Email and Password</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="bg-white shadow-2xl rounded-xl border border-gray-300 px-8 py-10 flex flex-col gap-4">
               <p className="text-xl font-OpenSans">Email : mdkhalidalam001@gmail.com</p>
               <p className="text-xl font-OpenSans">Password : Mdalam@0101</p>
             </div>
             <div className="bg-white shadow-2xl rounded-xl border border-gray-300 px-8 py-10 flex flex-col gap-4">
               <p className="text-xl font-OpenSans">Email: sonualam96314@gmail.com</p>
               <p className="text-xl font-OpenSans">Password: Mdalam@0101</p>
             </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
