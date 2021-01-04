$(function () {
    
    getUserInfo();

    // 获取用户信息的函数
    function getUserInfo() {
        $.ajax({
            tpey: 'GET',
            url: '/my/userinfo',
            header: {
                Authorization:localStorage.getItem('token')
            },
            success: function (res) {
                console.log(res);
                
            }
        })
    }
  



})