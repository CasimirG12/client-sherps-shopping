import React, { useState } from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  ...props
}) => {
  const [ripples, setRipples] = useState<{ id: number }[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(event);
    const newRipple = { id: Date.now() };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full">
      <button
        onClick={handleClick}
        className="relative z-10 px-4 py-2 text-white bg-blue-600 rounded-lg overflow-hidden"
        {...props}
      >
        {children}
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute w-24 h-24 bg-gray-400 rounded-full opacity-50"
            style={{ translateX: "-25%", translateY: "-60%" }}
          />
        ))}
      </button>
    </div>
  );
};

export default AnimatedButton;
