import { useState, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

const Clock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('/images/timer.svg');
  background-size: cover;
`;

const Time = styled.span`
  transform: translateY(20%);
`;

const Timer = ({ initSec, resetTrigger }: { initSec: number; resetTrigger: any }) => {
  const [seconds, setSeconds] = useState(~~initSec);
  const timer = useRef<NodeJS.Timer>();

  useEffect(() => {
    timer.current = setTimeout(() => {
      if (seconds <= 0 && timer.current) {
        clearTimeout(timer.current);
        return;
      }
      setSeconds(seconds - 1);
    }, 1000);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [seconds]);

  useEffect(() => {
    setSeconds(initSec);
  }, [resetTrigger]);

  return (
    <Clock>
      <Time>{seconds}</Time>
    </Clock>
  );
};

export default Timer;
