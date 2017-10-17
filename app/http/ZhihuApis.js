/**
 * Created by user on 11/10/17.
 */

const HOST = "http://news-at.zhihu.com/api/4/";



export const getDailyList = () => {
  return HOST+'news/latest';
};

export const getThemeList = () => {
  return HOST+'themes';
};

export const getSectionsList = () => {
  return HOST+'sections';
};

export const getHotList = () => {
  return HOST+'news/hot';
};

export const getDetailInfo = (id) => {
  return HOST+'news/'+id;
};




