const VideoComponent = () => {
  return (
    <div className="video-wrapper shadow-2xl shadow-gray-500 rounded-xl overflow-hidden border border-gray-300 bg-white">
      <video width="100%" height="auto" autoPlay loop muted>
        <source src="/SndBrain.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoComponent;
