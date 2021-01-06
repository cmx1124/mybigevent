$(function () {
    var layer = layui.layer;

    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在 1~6 个字符之间！'
            }
        }
    })

    // 初始化用户信息
    function initUserinfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                $('.layui-form [name=id]').val(res.data.id)
                $('.layui-form [name=username]').val(res.data.username)
                $('.layui-form [name=nickname]').val(res.data.nickname)
                $('.layui-form [name=email]').val(res.data.email)

            }
        })

    };

    initUserinfo();

    // 点击重置按钮重置信息
    $('#btnReset').on('click', function (e) {
        // 阻止重置按钮的默认重置行为
        e.preventDefault();
        // 再次调用初始化用户信息
        initUserinfo();
    });

    // 点击提交按钮更新用户信息
    $('.layui-form').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改信息失败！')
                }
                layer.msg('修改信息成功！')
                // 修改成功后再次渲染用户信息
                // 调用index里的获取用户信息函数
                window.parent.getUserInfo();
                
            }
        })
    })

})