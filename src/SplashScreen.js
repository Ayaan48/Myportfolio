import { useEffect } from 'react';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000); // auto-redirect after 5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <video autoPlay muted playsInline className="splash-video">
        <source src="/video/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="skip-text" onClick={onFinish}>
        Skip ➤
      </div>
    </div>
  );
}
