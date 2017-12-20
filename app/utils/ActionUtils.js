import  {FLAG_STORAGE} from '../dao/FavoriteDao'

export default class ActionUtils {

    /**
     * favoriteIcon单击回调函数
     * @param item
     * @param isFavorite
     */
    static onFavorite(favoriteDao,item, isFavorite,flag) {
        var key=flag===FLAG_STORAGE.flag_news? item.title:item.url;
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            favoriteDao.removeFavoriteItem(key);
        }
    }
}