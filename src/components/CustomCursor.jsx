import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

/**
 * CustomCursor — Elegant dual-element custom cursor.
 *
 * - Inner dot: 6px, white, mix-blend-mode: difference
 * - Outer ring: 32px, 1px solid white/30, no fill
 * - Hover state: ring → 48px, dot disappears, ring border → white/60
 * - Hidden on touch devices
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    /* Detect touch devices */
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    /* Attach hover listeners to interactive elements */
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, .hoverable, [role="button"], input[type="submit"]'
      );
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    };

    const onHoverIn = () => setIsHovering(true);
    const onHoverOut = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    /* Re-attach when DOM changes */
    observerRef.current = new MutationObserver(addHoverListeners);
    observerRef.current.observe(document.body, { childList: true, subtree: true });
    addHoverListeners();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observerRef.current?.disconnect();
    };
  }, []);

  /* Don't render on touch devices */
  if (isTouchDevice) return null;

  /* Shared spring config */
  const springConfig = { type: 'spring', damping: 25, stiffness: 400, mass: 0.3 };

  /* Ring dimensions */
  const ringSize = isHovering ? 48 : 32;
  const dotSize = 6;

  return (
    <>
      {/* Inner dot — 6px, white, blend mode: difference */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: '#ffffff',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
        animate={{
          x: pos.x - dotSize / 2,
          y: pos.y - dotSize / 2,
          opacity: isVisible && !isHovering ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={springConfig}
      />

      {/* Outer ring — 32px default, 48px on hover */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
        }}
        animate={{
          x: pos.x - ringSize / 2,
          y: pos.y - ringSize / 2,
          width: ringSize,
          height: ringSize,
          opacity: isVisible ? 1 : 0,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: isHovering
            ? 'rgba(255, 255, 255, 0.6)'
            : 'rgba(255, 255, 255, 0.3)',
        }}
        transition={springConfig}
      />
    </>
  );
}
