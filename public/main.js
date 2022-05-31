var star = document.getElementsByClassName("fa-star");
var trash = document.getElementsByClassName("fa-trash");

console.log(star)

Array.from(star).forEach(function(element) {

      element.addEventListener('click', function(){
        
        const docId = this.parentNode.parentNode.childNodes[7].innerText
       
        console.log(docId)
        

        fetch('favorite', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'id': docId
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
        const date = this.parentNode.parentNode.childNodes[1].innerText
        const log = this.parentNode.parentNode.childNodes[3].innerText
        fetch('entries', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'date': date,
            'log': log
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
