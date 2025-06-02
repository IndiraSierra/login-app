import { useEffect, useState } from "react";

function useWolfEyes(openDuration = 3000, cycleDuration = 11000) {
  const [showEyesOpen, setShowEyesOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowEyesOpen(true);
      const timeout = setTimeout(() => {
        setShowEyesOpen(false);
      }, openDuration);
      return () => clearTimeout(timeout);
    }, cycleDuration);

    return () => clearInterval(interval);
  }, [openDuration, cycleDuration]);

  return showEyesOpen;
}
 export default useWolfEyes;