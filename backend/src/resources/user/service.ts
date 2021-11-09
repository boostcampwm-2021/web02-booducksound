import User from '../../models/User';

const changeColor = async (id: string, color: string) => {
  await User.update({ id }, { color });
};

export default {
  changeColor,
};
