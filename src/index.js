let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const addToyForm = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector("#toy-collection")
const inputText = document.querySelector(".input-text")
const likeBtns = document.querySelectorAll(".like-btn")
console.log(likeBtns)

document.addEventListener("DOMContentLoaded", () => {


  // When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
  
    fetch('http://localhost:3000/toys')
    .then((response) => response.json())
    .then((arr) => arr.forEach(toy => addSingleToy(toy)))
    .catch((error) => { alert("whoops, try again");
    document.querySelector('body').append(error.message);
  })

  // Add a New Toy When a user submits the toy form: 1. A POST request should be sent and the new toy added to Andy's Toy Collection. 2. If the post is successful, the toy should be added to the DOM without reloading the page.

  addToyForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    let toy = {
      name: e.target[0].value,
      image: e.target[1].value,
      likes:0
    }
    console.log(e.target[1].value)
    fetch('http://localhost:3000/toys',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            name: `${toy.name}`,
            image: `${toy.image}`,
            likes: `${toy.likes}`
        }) 
    })
    .then((response) => response.json())
    .then((obj) => {
      // get text 
    addSingleToy(obj) 
    addToyForm.reset() 
  })
  .catch((error) => { alert("whoopsie, try again"); 
  document.querySelector('body').append(error.message); 
  })  
})
  // Increase a Toy's Likes. When a user clicks on a toy's like button, two things should happen:1. A PATCH request should be sent to the server at http://localhost:3000/toys/:id, updating the number of likes that the specific toy has 2.If the patch is successful, the toy's like count should be updated in the DOM without reloading the page

  

   // If you click on the "Add a new toy!" button, you'll see that it exposes a form where the user can submit information for a new toy. To re-hide the form, click the button a second time.
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

 

}); // this is closing brackets for: `document.addEventListener("DOMContentLoaded", ...`

function addSingleToy(toy){ 
  let toyCard = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let btn = document.createElement('button')
  let toyId = toy.id

  h2.innerHTML = toy.name
  img.src = toy.image
  img.setAttribute('class','toy-avatar') 
  p.innerHTML= toy.likes
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', `${toyId}`)
  btn.innerHTML = "Like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.previousElementSibling.innerText)
    let toyId = e.target.id
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        likes: parseInt(e.target.previousElementSibling.innerText) +1
      })
      
      })
      .then((response) => response.json())
      .then((like) => {
        e.target.previousElementSibling.innerText = parseInt(e.target.previousElementSibling.innerText)+1
    })
  })
 
  toyCard.append(h2, img, p, btn)
  toyCollection.append(toyCard)
}