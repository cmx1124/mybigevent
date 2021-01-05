$(function () {
    var layer = layui.layer;
    getUserInfo();

    // 获取用户信息的函数
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token')
            // },
            success: function (res) {
                console.log(res, '------');
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // 成功就调用渲染头像函数
                renderAvatar(res.data);

            }
        })
    }

    // 渲染用户头像和昵称
    function renderAvatar(user) {
        var name = user.nickname || user.username;
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            $('.text-avatar').html(name[0].toUpperCase()).show();
        }

    };

    // 点击按钮实现退出功能
    $('#btnOut').on('click', function () {

        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = '/login.html';
            layer.close(index);
        });
    })


})