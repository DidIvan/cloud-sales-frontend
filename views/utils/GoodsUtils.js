const DEFAULT_PICTURE = "/img/default/no_photo.png";
const CURRENCY_UAH = "₴";
const NO_PRICE_VALUE = "FREE";

module.exports = {
    convertPictureForDisplay: function (picture) {
        return picture || DEFAULT_PICTURE;
    },
    convertPriceForDisplay: function (price, currency) {
        if (price) {
            return (price / 100).toFixed(2) + " " + (currency || CURRENCY_UAH);
        }
        return NO_PRICE_VALUE;
    },
    getObjectById: function (id, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                return array[i];
            }
        }
    }
};