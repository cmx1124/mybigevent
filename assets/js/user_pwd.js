$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }

    });

    // 点击按钮修改密码
    $('.layui-form').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改密码失败！')
                }
                layer.msg('修改密码成功，请重新登录！')
                // 修改成功后清空表单里的值
                // 先转成DOM元素在调用reset方法清空表单
                $('.layui-form')[0].reset()
                setTimeout(function () {
                    window.parent.location.href = '/login.html'
                }, 1000);
                
            }
        })
    })


})