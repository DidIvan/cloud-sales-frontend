module.exports = {
    get: function (error, success, url) {
        console.log('GET to: '+ url);
        $.ajax({
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            url: url,
            success: function (data) {
                console.info('GET to: '+ url+' was successful');
                success(data);
            },
            error: function (xhr, status, err) {
                console.error('GET to: '+ url+' was failed.');
                error(xhr, status, err);
            }
        })
    },
    post: function (error, success, url, sendData) {
        $.ajax({
            url: url,
            type: "POST",
            data: sendData,
            success: function (data) {
                success(data);
            },
            error: function (xhr, status, err) {
                error(xhr, status, err);
            }
        });
    },
    put: function (error, success, url, sendData) {
        $.ajax({
            url: url,
            type: "PUT",
            data: sendData,
            success: function (data) {
                success(data);
            },
            error: function (xhr, status, err) {
                error(xhr, status, err);
            }
        });
    },
    delete: function (error, success, url, id) {
        $.ajax({
            url: url,
            type: "DELETE",
         /*   data:{'id':"row.id"}*/
            success: function (result) {
                alert(result);
            },
            error: function (xhr, status, err) {
                error(xhr, status, err);
            }
        });
    }
};