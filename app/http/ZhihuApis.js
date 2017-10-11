/**
 * Created by user on 11/10/17.
 */

const HOST = "http://news-at.zhihu.com/api/4/";



const getDailyList = () => {
  return HOST+'news/latest';
};

export {
    getDailyList,
}

