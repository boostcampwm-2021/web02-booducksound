const replaceText = (str: string) => {
  return str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/ ]/gim, '').toLowerCase();
};

export default replaceText;
