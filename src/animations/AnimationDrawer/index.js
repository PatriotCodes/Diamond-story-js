import React, { useEffect, useState } from 'react';
import Animation from '../Animation';

const AnimationDrawer = ({ animationList, onComplete }) => {
  const [animationsCompleted, setAnimationsCompleted] = useState(0);

  const handleAnimationComplete = () => {
    setAnimationsCompleted(animationsCompleted + 1);
  };

  useEffect(() => {
    if (animationsCompleted !== 0 && animationsCompleted === animationList.length) {
      onComplete();
    }
  }, [animationsCompleted]);

  return animationList.map((item, index) => (
    <Animation key={index} animation={item} onAnimationComplete={handleAnimationComplete} />
  ));
};

export default AnimationDrawer;
