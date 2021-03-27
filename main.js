

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[0].innerText
        const to = this.parentNode.parentNode.childNodes[1].innerText
        const from = this.parentNode.parentNode.childNodes[2].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'msg': msg,
            'to': to,
            'from': from
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
