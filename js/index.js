

let sortData = [];

const loadData = () =>{
  document.getElementById('spinner').classList.remove('d-none');
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      
      document.getElementById('spinner').classList.add('d-none');
      sortData = data.data.tools;
      displayData(data.data.tools.slice(0, 6))
    })
}



const showMore = () =>{

  const url = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(url)
  .then(res => res.json())
  .then(data => displayData(data.data.tools))

}



const displayData = (tools) =>{
  
    console.log(tools)
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
          <ol id="features">

            <li class="${tool.features[0] === undefined ? 'd-none' : ''}">${tool.features[0]}</li>
            <li class="${tool.features[1] === undefined ? 'd-none' : ''}">${tool.features[1]}</li>
            <li class="${tool.features[2] === undefined ? 'd-none' : ''}">${tool.features[2]}</li>
            <li class="${tool.features[3] === undefined ? 'd-none' : ''}">${tool.features[3]}</li>
          
          </ol>
         </div>
        
          
        </div>
        <div class="card-footer">
         <div class="d-flex justify-content-between">
        <div>
        <h4>${tool.name}</h4>           
        <p><i class="fa-solid fa-calendar-days"></i> ${tool.published_in}</p>
        </div>
           <button onclick="loadDetails('${tool.id}')" class="btn" data-bs-toggle="modal" data-bs-target="#detailsModal"> <i class="fa-solid fa-arrow-right text-primary fs-2"></i></button>
         </div>
        
         
        </div>
      </div>

        `;
    
        cardContainer.appendChild(colDiv);



    })
}


const loadDetails = (id) =>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
  .then(res=> res.json())
  .then(details => {
   
    displayDetails(details.data)
  })
}

const displayDetails = (details)=>{
    console.log(details)

   const modalTitle = document.getElementById('detailsModalLabel')
   modalTitle.innerText = details.description;

   const pricingDiv = document.getElementById('pricing')
   pricingDiv.innerHTML = "";
   pricingDiv.classList.add('d-flex','my-3', 'gap-3', 'justify-content-center');

   if(details.pricing != null){
      details.pricing.forEach(price =>{
        
    
         const h5 = document.createElement('h5');
   
      
        h5.innerText = price.price + " " + price.plan;
        
        pricingDiv.appendChild(h5);
      })}
      else{
        const h4 = document.createElement('h4')
        h4.innerText = "Free Of Cost";
        
        pricingDiv.appendChild(h4);
      }
    
   
   

 

   document.getElementById('list-1').innerText = details.features[1].feature_name ? details.features[1].feature_name : 'No Data Found';
   document.getElementById('list-2').innerText = details.features[2].feature_name ? details.features[2].feature_name : 'No Data Found';
   document.getElementById('list-3').innerText = details.features[3].feature_name ? details.features[3].feature_name : 'No Data Found';

   
  const secondList = document.getElementById("integration");
  secondList.innerHTML = "";

  if(details.integrations !== null){
    details.integrations.forEach((integration) => {
      const li = document.createElement("li");
      li.innerHTML = integration
      secondList.appendChild(li);
    })
  }
  else{
    const li = document.createElement("li");
    li.innerText = 'No Data Found'
    secondList.appendChild(li)
  }


   const secondPart = document.getElementById('second-card');
   secondPart.innerHTML = "";

   const image = document.createElement('img');
   image.src = details.image_link[0];
   image.classList.add('img-fluid', 'mb-5');
   const span = document.createElement('span');
   span.classList.add('badge', 'position-absolute','top-0', 'end-0','bg-danger', 'px-3', 'py-2');
   if(details.accuracy.score === null){
    span.classList.add('d-none')
   }

   {
    span.innerHTML = (details.accuracy.score * 100) + '%' + 'Accuracy'  
   }

   const h3 = document.createElement('h3');
   h3.innerHTML = details.input_output_examples[0] ? details.input_output_examples[0].input : details.input_output_examples[1].input;

   const p = document.createElement('p');
   p.innerHTML = details.input_output_examples[0] ? details.input_output_examples[0].output : details.input_output_examples[1].output;

  
   secondPart.appendChild(span)
   secondPart.appendChild(image);
   secondPart.appendChild(h3);
   secondPart.appendChild(p);

}

document.getElementById('show-more').addEventListener('click', function(e){
    e.target.style.display = 'none';
})

const sortBy =() =>{
  const final = sortData.sort(function(a,b){
    return new Date(a.published_in) - new Date(b.published_in);
  })

  displayData(sortData, final)
}

loadDetails()
loadData();