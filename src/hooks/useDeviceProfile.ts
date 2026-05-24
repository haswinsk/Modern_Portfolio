import { useEffect, useState } from "react";

export type DeviceProfile = {
  isMobile: boolean;
  isReducedMotion: boolean;
  isLowPower: boolean;
};

export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>({
    isMobile: false,
    isReducedMotion: false,
    isLowPower: false,
  });

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateProfile = () => {
      const isMobile = window.innerWidth < 768;
      const connection = navigator.connection as any;
      const deviceMemory = (navigator as any).deviceMemory as number | undefined;
      const saveData = Boolean(connection?.saveData);
      const lowMemory = typeof deviceMemory === "number" && deviceMemory > 0 && deviceMemory <= 4;

      setProfile({
        isMobile,
        isReducedMotion: reducedMotionQuery.matches,
        isLowPower: saveData || lowMemory,
      });
    };

    updateProfile();
    window.addEventListener("resize", updateProfile, { passive: true });

    const onMotionChange = () => updateProfile();
    reducedMotionQuery.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("resize", updateProfile);
      reducedMotionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return profile;
}
