var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        const to = this.parentNode.parentNode.childNodes[0].innerText
        const from = this.parentNode.parentNode.childNodes[2].innerText
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'to': to,
            'from': from
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        const to = this.parentNode.parentNode.childNodes[0].innerText
        const from = this.parentNode.parentNode.childNodes[2].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // 'name': name,
            'msg': msg,
            'to': to,
            'from': from
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
