import React, { useState, useEffect } from "react";
import { ThemeSwitch } from "@/components/ThemeSwitch";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [appBg, setAppBg] = useState<string>('');

  useEffect(() => {
    const bg = localStorage.getItem('app_background');
    if (bg) {
      setAppBg(bg);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated gradient mesh background or Custom Background */}
      {appBg ? (
        <>
          <div className="fixed inset-0 bg-background/90 z-0" />
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-30"
            style={{ backgroundImage: `url(${appBg})` }}
          />
        </>
      ) : (
        <div className="fixed inset-0 gradient-mesh dot-grid z-0" />
      )}
      
      {/* Torii gate silhouette */}
      <svg
        className="torii-gate"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 100 L50 120 L350 120 L350 100 M50 100 Q50 80, 70 80 L330 80 Q350 80, 350 100 M70 120 L70 300 M330 120 L330 300 M60 180 L340 180 M60 180 Q60 170, 70 170 L330 170 Q340 170, 340 180"
          stroke="currentColor"
          strokeWidth="4"
          className="text-primary"
        />
      </svg>
      
      {/* Sakura petals */}
      <div className="sakura-petal" />
      <div className="sakura-petal" />
      <div className="sakura-petal" />
      <div className="sakura-petal" />
      <div className="sakura-petal" />
      
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitch />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {children}
      </div>
    </div>
  );
}