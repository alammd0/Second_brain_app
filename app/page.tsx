import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        {/* Demo Video Section */}
        <div>
          <video src=""></video>
        </div>

        {/* Tech Stack Section */}
        <div>
          <h2>Tech Stack</h2>
        </div>

        {/* About Section */}
        <div>
          <h2>About</h2>
        </div>

      </div>
    </div>
  );
}
