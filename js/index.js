const loadData = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools.slice(0, 6)))
}

const showMore = () =>{

  const url = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(url)
  .then(res => res.json())
  .then(data => displayData(data.data.tools))

}

const displayData = (tools) =>{
    
    const cardContainer = document.getElementById('card-container');

    cardContainer.innerHTML = "";

    tools.forEach(tool =>{
        // console.log(tool)
     

        const colDiv = document.createElement('div');
        colDiv.classList.add('col');
      
      

        colDiv.innerHTML =`
        
        <div class="card h-100">
        <img src="${tool.image}" class="card-img-top" alt="imgCard">
        <div class="card-body">
          <h4 class="card-title">Features</h4>
         <div class ="list-container">
          <ol>

            <li>${tool.features[0]}</li>
            <li>${tool.features[1]}</li>
            <li>${tool.features[2] ? tool.features[2] : "No More Features"}</li>
            <li>${tool.features[3] ? tool.features[3] : "No More Features"}</li>
          
          </ol>
         </div>
        
          
        </div>
        <div class="card-footer">
         <div class="d-flex justify-content-between">
        <div>
        <h4>${tool.name}</h4>           
        <p>${tool.published_in}</p>
        </div>
           <button class="btn"> <i class="fa-solid fa-arrow-right text-primary fs-2" onclick="loadDetails('${tool.id}')"></i></button>
         </div>
        
         
        </div>
      </div>

        `;
    
        cardContainer.appendChild(colDiv);


    })
}


const loadDetails = (id) =>{
  const URL =`https://openapi.programming-hero.com/api/ai/tool/${id}`

  console.log(URL)
  fetch(URL)
  .then(res => res.json())
  .then(data => displayDetails(data.data))
}


const displayDetails = (details) =>{
  console.log(details)

}



loadData();