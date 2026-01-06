
import React, { useEffect, useRef } from 'react';

interface CelestialBackgroundProps {
  isDarkMode: boolean;
}

const CelestialBackground: React.FC<CelestialBackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; opacity: number; speed: number; drift: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initElements();
    };

    const initElements = () => {
      stars = [];
      const count = isDarkMode 
        ? Math.floor((canvas.width * canvas.height) / 3000) 
        : 50; // Fewer "elements" in light mode
      
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: isDarkMode ? Math.random() * 2 : Math.random() * 100 + 50, // Stars vs "Clouds"
          opacity: Math.random() * 0.5,
          speed: Math.random() * 0.05,
          drift: Math.random() * 0.2 - 0.1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isDarkMode) {
        ctx.fillStyle = '#ffffff';
        stars.forEach(star => {
          ctx.globalAlpha = star.opacity;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          
          star.opacity += (Math.random() - 0.5) * 0.02;
          if (star.opacity < 0.1) star.opacity = 0.1;
          if (star.opacity > 0.8) star.opacity = 0.8;
          
          star.x += star.drift;
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
        });
      } else {
        // Light mode drawing (soft blurry circles for "clouds")
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.filter = 'blur(60px)';
        stars.forEach(star => {
          ctx.globalAlpha = star.opacity * 0.2;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          
          star.x += star.speed * 2;
          if (star.x > canvas.width + 100) star.x = -100;
        });
        ctx.filter = 'none';
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  const bgStyle = isDarkMode 
    ? 'linear-gradient(to bottom, #05050a, #0a0a20)' 
    : 'linear-gradient(to bottom, #f0f4f8, #e2e8f0)';

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000"
      style={{ background: bgStyle }}
    />
  );
};

export default CelestialBackground;
