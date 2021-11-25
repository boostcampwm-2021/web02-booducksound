type InitRoomInfo = {
  title: string;
  playlistId: string;
  playlistName: string;
  password: string;
  needAnswerRatio: 0.01 | 0.25 | 0.5 | 0.75 | 1;
  timePerProblem: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
};

export default InitRoomInfo;
