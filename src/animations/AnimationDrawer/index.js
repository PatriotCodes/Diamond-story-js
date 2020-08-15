import React, { useEffect } from 'react';
import Animation from '../Animation';

const AnimationDrawer = ({ animationList }) => {
  let animationsCompleted = 0;

  const handleAnimationComplete = () => animationsCompleted++;

  useEffect(() => {
    if (animationsCompleted === animationList.length) {
      console.log('All animation completed');
    }
  }, [animationsCompleted]);

  return animationList.map((item, index) => <Animation key={index} animation={item} onAnimationComplete={handleAnimationComplete} />);
};

export default AnimationDrawer;
