$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();

    })
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();

    })
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'
        ],
        repass: function(value) {
            var psd = $('.reg-box [name = password]').val();
            if (psd !== value) {
                return "两次密码不一致"
            }

        }
    })
    $("#form-reg").on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(reg) {
            if (reg.status !== 0) {
                return layer.msg(reg.message, { icon: 6 });
            }
            layer.msg(reg.message, { icon: 6 })
            $('#link-login').click()
        })

    })
    $("#form-login").submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'

            }
        })
    })



})