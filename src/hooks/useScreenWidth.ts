"use client";

import { useEffect, useState } from "react";

const useScreenWidth = () => {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop" | null>(
    null
  );
  const [screenWidth, setScreenWidth] = useState(0);

  const handleResize = () => {
    const screenWidth = window.screen.width;
    setScreenWidth(screenWidth);
    if (screenWidth < 768) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { deviceType, screenWidth };
};

export default useScreenWidth;
