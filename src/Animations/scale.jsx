import React from 'react';
import { animated, useSpring } from 'react-spring';

export const Scale = ({ scale = 1.1, timing = 150, children }) => {
    const [isScaled, setScaled] = React.useState(false);
    const style = useSpring({
        display: 'inline-block',
        backfaceVisibility: 'hidden',
        transform: isScaled
          ? `scale(${scale})`
          : `scale(1)`,
          config: {
            tension: 300,
            friction: 10,
          },
      });
    React.useEffect(() => {
      if (!isScaled) {
        return;
      }
      const timeoutId = window.setTimeout(() => {
        setScaled(false);
      }, timing);
      return () => {
        window.clearTimeout(timeoutId);
      };
    }, [isScaled, timing]);
    const trigger = () => {
      setScaled(true);
    };
    return (
      <animated.span onClick={trigger} style={style}>
        {children}
      </animated.span>
    );
  };