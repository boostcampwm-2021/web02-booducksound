import type { NextPage } from 'next';

// import RoomCard from '../components/atoms/RoomCard';
import StatusChip from '../components/atoms/StatusChip';

const Test: NextPage = () => {
  return (
    <>
      <StatusChip status="king" />
      <StatusChip status="prepare" />
      <StatusChip status="ready" />
    </>
  );
};

export default Test;
