var heart = document.getElementsByClassName('fa-heart');
var submit = document.getElementsByClassName('submit');
var trash = document.getElementsByClassName('fa-trash');

Array.from(heart).forEach(function (element) {
  element.addEventListener('click', function () {
    const to = this.parentNode.parentNode.childNodes[1].innerText
    const from = this.parentNode.parentNode.childNodes[3].innerText
    const note = this.parentNode.parentNode.childNodes[5].innerText
    const heart = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
    fetch('/messages', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: to,
        from: from,
        note: note,
        heart: heart
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});

// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('thumbDown', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name, //body object is holding these three properties and making it a string
//             'msg': msg,
//             'thumbUp':thumbUp //which is the name of our counter, this is the thumbUp property of the body
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const to = this.parentNode.parentNode.childNodes[1].innerText;
    const from = this.parentNode.parentNode.childNodes[3].innerText;
    const note = this.parentNode.parentNode.childNodes[5].innerText;

    fetch('notes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: to,
        from: from,
        note: note,

        'id': id
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
