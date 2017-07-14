//testGet();
//testGetJSONP();
//testPost();
//testPut();
//testPutToBody();
testDelete();

$('#file').change(function (e) {
    var files = e.currentTarget.files;
    if (0 == files.length) return false;

    var params = new FormData();
    params.append('file', files[0]);
    params.append('key', '2017/07/12/1.jpg');

    Http.postFile('http://t.cn/test.php', params, function(data){
        console.info('success');
        console.info(data);
    }, function(data){
        console.info('error');
        console.info(data);
    }, function(p) {
        console.info('progress');
        console.info(p);
    })
});


function testGet() {
    Http.get('http://t.cn/test.php', {}, function(data){
        console.info(data);
        console.info(data.name);
    }, function(obj){
        console.info('ERROR');
        console.info(obj);
    }, Http.withCredentials());
}

function testDelete() {
    Http.delete('http://t.cn/test.php?ver=2', {'name': 'Tom', 'age': 10}, function(data){
        console.info(data);
        console.info(data.name);
    }, function(obj){
        console.info('ERROR');
        console.info(obj);
    });
}

function testGetJSONP() {
    Http.getJSONP('http://t.cn/test.php', {'value': '13555555555'}, function(data){
        console.info(data);
    }, function(obj){
        console.info('ERROR');
        console.info(obj.status);
        console.info(obj);
    });
}

function testPost() {
    Http.post('http://t.cn/test.php', {'username':'jerry', 'password': '111111'}, function(data){
        console.info(data);
    }, function(obj){
        console.info('ERROR');
        console.info(obj.status);
        console.info(obj);
    });
}

function testPut() {
    Http.put('http://t.cn/test.php', {'token':token, 'title': 'rrrrrrrrrrrrrrrrtyty'}, function(data){
        console.info(data);
    }, function(obj){
        console.info('ERROR');
        console.info(obj.status);
        console.info(obj);
    });
}

function testPutToBody() {
    Http.postToBody('http://t.cn/test.php', {'token':token, 'title': 'rrrrrrrrrrrrrrrrtyty'}, function(data){
        console.info(data);
    }, function(obj){
        console.info('ERROR');
        console.info(obj.status);
        console.info(obj);
    });
}
