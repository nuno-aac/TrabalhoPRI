$(document).ready(function () {
    $("#login").click(() => {
        var id = $('#username').val();
        var password = $('#password').val()
        var body = {id: id, password: password}
        fetch('http://localhost:6970/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err);
        })
    });
});