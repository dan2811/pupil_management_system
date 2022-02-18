import React from 'react';
import { animated, useSpring } from 'react-spring';

export const Boop = ({ rotation = 0, timing = 150, children }) => {
    const [isBooped, setIsBooped] = React.useState(false);
    const style = useSpring({
        display: 'inline-block',
        backfaceVisibility: 'hidden',
        transform: isBooped
          ? `rotate(${rotation}deg) scale(1.1)`
          : `rotate(0deg) scale(1)`,
          config: {
            tension: 300,
            friction: 10,
          },
      });
    React.useEffect(() => {
      if (!isBooped) {
        return;
      }
      const timeoutId = window.setTimeout(() => {
        setIsBooped(false);
      }, timing);
      return () => {
        window.clearTimeout(timeoutId);
      };
    }, [isBooped, timing]);
    const trigger = () => {
      setIsBooped(true);
    };
    return (
      <animated.span onMouseEnter={trigger} style={style}>
        {children}
      </animated.span>
    );
  };