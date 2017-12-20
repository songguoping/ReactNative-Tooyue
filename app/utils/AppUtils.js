/**
 * Created by user on 20/12/17.
 */

export default class AppUtils{
    /**
     * 检查该Item是否被收藏
     * **/
    static checkFavorite(key,items) {
        for (var i = 0, len = items.length; i < len; i++) {
            if (key.toString() === items[i]) {
                return true;
            }
        }
        return false;
    }
}
