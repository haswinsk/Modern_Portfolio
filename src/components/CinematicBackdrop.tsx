import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

// Backdrop drones removed for mobile performance; keep lightweight particles and rings only.

interface CinematicBackdropProps {
  enabled?: boolean;
  mobile?: boolean;
  reducedMotion?: boolean;
}

export default function CinematicBackdrop({
  enabled = true,
  mobile = false,
  reducedMotion = false,
}: CinematicBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { scrollYProgress } = useScroll();
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.16, 0.28, 0.2]);
  // drones removed: no drone ref

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !mobile,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 18);

    const isMobile = mobile || window.innerWidth < 768;
    const particleCount = isMobile ? 28 : 120;
    const positions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index++) {
      positions[index * 3] = (Math.random() - 0.5) * 40;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 18;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: isMobile ? 0.035 : 0.07,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const gridGeometry = new THREE.TorusGeometry(9.5, 0.02, 8, 120);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.08,
    });
    const gridRing = new THREE.Mesh(gridGeometry, gridMaterial);
    gridRing.rotation.x = Math.PI / 2;
    scene.add(gridRing);

    // Lightweight drone representation: use low-poly octahedrons on desktop,
    // but switch to tiny sprite-based 'mini-drones' on mobile for smoothness.
    let createdTexture: THREE.Texture | null = null;
    // drones removed: no drone creation on purpose to improve mobile performance

    const primaryLight = new THREE.PointLight(0x00d4ff, isMobile ? 1.0 : 1.8, 55);
    primaryLight.position.set(-5, 4, 12);
    scene.add(primaryLight);

    const secondaryLight = new THREE.PointLight(0xa855f7, isMobile ? 0.7 : 1.2, 45);
    secondaryLight.position.set(6, -3, 10);
    scene.add(secondaryLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const resize = () => {
      const nextMobile = window.innerWidth < 768;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, nextMobile ? 1.25 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      if (document.hidden) {
        // Skip rendering when tab is not visible
        rafId = window.requestAnimationFrame(animate);
        return;
      }
      const elapsed = clock.getElapsedTime();

      points.rotation.y = elapsed * (isMobile ? 0.015 : 0.03);
      points.rotation.x = Math.sin(elapsed * 0.12) * (isMobile ? 0.02 : 0.05);
      gridRing.rotation.z = elapsed * (isMobile ? 0.03 : 0.08);

      // drones removed: nothing to animate here

      camera.position.x = Math.sin(elapsed * 0.06) * (isMobile ? 0.3 : 0.7);
      camera.position.y = Math.cos(elapsed * 0.05) * (isMobile ? 0.2 : 0.45);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    animate();

    const handleVisibility = () => {
      /* noop: animate() checks document.hidden and skips rendering when hidden */
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.cancelAnimationFrame(rafId);
      geometry.dispose();
      material.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      // no drone disposal needed
      renderer.dispose();
    };
  }, [enabled, mobile, reducedMotion]);

  return (
    <>
      <motion.div className="fixed inset-0 z-[1] pointer-events-none" style={{ opacity: reducedMotion ? 0.08 : glow }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 18%, rgba(0,212,255,0.14), transparent 40%), radial-gradient(circle at 20% 30%, rgba(168,85,247,0.10), transparent 28%), radial-gradient(circle at 80% 26%, rgba(0,240,255,0.08), transparent 30%)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(5,5,8,0.42), rgba(10,14,26,0.15) 45%, rgba(5,5,8,0.72))",
          }}
        />
        <motion.div
          className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(0,212,255,0.08)" }}
          animate={reducedMotion ? { opacity: 0.2 } : { opacity: [0.24, 0.45, 0.24], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      {!reducedMotion && <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none mix-blend-screen opacity-70" />}
      <motion.div
        className="fixed inset-0 z-[2] pointer-events-none opacity-40"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(0,212,255,0.02) 18px, rgba(0,212,255,0.02) 19px)",
        }}
        animate={reducedMotion ? { opacity: 0.08 } : { opacity: [0.18, 0.3, 0.18] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 45%, rgba(0,0,0,0.18) 100%)" }}
        animate={reducedMotion ? { opacity: 0.5 } : { opacity: [0.65, 0.45, 0.65] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
