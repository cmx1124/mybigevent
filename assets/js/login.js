$(function () {
    // 点击注册链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击登录链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    // 密码框验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=pwd]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });
    // 注册账号功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=pwd]').val()

            },
            success: function (res) {
                // console.log(res.message);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录！');
                $('#link_login').click();

            }
        })
    });
    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: {
                username: $('#form_login [name=username]').val(),
                password: $('#form_login [name=pwd]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                console.log(res, "--------");

                // 登录成功后把token保存到本地存储
                localStorage.setItem('token', res.token);
               //  跳转到后台主页
                location.href = '/index.html';

            }
        })
    })

})