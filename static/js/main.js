

let shop = document.getElementById('shop');

let itemsData = [{
    id:'AAA',
    name: 'Standard Shirt with tie',
    price: 2000,
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, quod?',
    img : "static/images/benjamin-rascoe-WdhmRPvMn7A-unsplash.jpg"
},
{
    id:'BBB',
    name: 'Standard T-shirt',
    price: 999,
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, quod?',
    img : 'static/images/faith-yarn-Wr0TpKqf26s-unsplash.jpg'
},
{id:'CCC',
name: 'Standard Watch',
price: 2500,
desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, quod?',
img : "static/images/john-torcasio-TJrkkhdB39E-unsplash.jpg"},
{id:'DDD',
name: 'Standard Ts2',
price: 1200,
desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, quod?',
img : "static/images/keagan-henman-xPJYL0l5Ii8-unsplash.jpg"
}];

let basket = JSON.parse(localStorage.getItem("data")) || []

let gernerateShop=()=>{
    return shop.innerHTML = itemsData.map((x)=>{
        let {id,name,price,desc,img} = x;
        let search = basket.find((x)=>x.id === id) || [];
        return `
        <div id="productId ${id}" class="items">
                <img width="220" height="250" src= ${img} alt="">
                <div class="product_details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price_quantity">
                        <h4>${price} tk</h4>
                        <div class="buttons">
                            <button onclick ="decrease(${id})" class="removebtn" id="minussign" >Remove</button>
                            
                            <div id= ${id} class="qunatity"> 
                                ${search.item === undefined? 0 : search.item }
                            </div>
                            <button onclick ="increase(${id})" class="addbtn" id="plussign" >Add to cart</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join("")
};
gernerateShop();

// increase, decrease, update

let increase =(id)=>{
    let selectItem = id ;
    let search = basket.find((x)=>x.id === selectItem.id);
    if(search === undefined){
        basket.push({
            id: selectItem.id,
            item: 1
        })
        
    }else{
        search.item +=1 ;
    }
  //  console.log(basket);
  localStorage.setItem("data",JSON.stringify(basket))
    update(selectItem.id);
   
};

let decrease =(id)=>{
    let selectItem = id ;
    let search = basket.find((x)=>x.id === selectItem.id);
    if (search === undefined) return;               // error handling for empty 
    else if(search.item === 0) return
    else{
        search.item -=1 ;
    }
  // console.log(basket);
    update(selectItem.id);
    basket = basket.filter((x)=> x.item !==0)
    localStorage.setItem("data",JSON.stringify(basket));
};

let update=(id)=>{
    let search = basket.find((x)=> x.id === id);
   // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    
    calculator() ;          // only calculate for updation
};


let calculator =()=>{
    let cartSum = document.getElementById('cartAmount');
    cartSum.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y);
};

calculator();


