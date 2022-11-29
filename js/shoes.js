// Reusable Web components
// Header
class Header extends HTMLElement{
    connectedCallback(){
        this.innerHTML = 
    '<header id="header">'+
        '<nav id="nav_scroll" class="navbar navbar-expand-lg navbar-light bg-light sticky-top">'+
            '<div class="container">'+
            '<a class="brand" href="index.html">'+
                    '<img src="images/sneakers/Sdc.png" alt="" width="60" height="60" class="d-inline-block align-text-top">'+
                '</a>'+
                '<button class="navbar-toggler" type="button" data-bs-target="#offcanvasRight" data-bs-toggle="offcanvas" aria-controls="offcanvasRight">'+
                    '<span class="navbar-toggler-icon clear"></span>'+
                '</button>'+
            '<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">'+
                '<div class="offcanvas-header">'+
                    '<h5 class="offcanvas-title" id="offcanvasRightLabel">Menu</h5>'+
                    '<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>'+
                '</div>'+
            '<div class="offcanvas-body small">'+
                '<ul class="navbar-nav justify-content-end  flex-grow-1 pe-3">'+
                    '<li class="nav-item"><a class="nav-link active" href="index.html">Home</a></li>'+
                    '<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="#">Categories</a>'+
                        '<ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="offcanvasNavbarDropdown">'+
                            '<li><a class="dropdown-item low category" href="lowtops.html">Low-tops</li>'+
                            '<li><a class="dropdown-item mid category" href="midtops.html">Mid-tops</li>'+
                            '<li><a class="dropdown-item high category" href="hightops.html">High-tops</li>'+
                        '</ul>'+
                    '</li>'+
                    '<li class="nav-item faq"><a class="nav-link" href="faq.html">FAQ</a></li>'+
                    '<li class="nav-item"><a class="nav-link" href="cart.html"><i class="fa fa-shopping-cart cart-menu fa-2x" aria-hidden="true"><span class="cart-items">0</span></i></a></li>'+
                '</ul>'+
                '<img src="images/Spring.png" alt="" width="60" height="60" class="d-inline-block d-none  align-text-top pull-bottom">'
            '</div>'+
            '</div>'+
            '</div>'+
        '</nav>'+
        '</header>';
    }
}

// Filter Menu
class Filter extends HTMLElement{
    connectedCallback(){
        this.innerHTML = 
        '<div class="row container">'+
            '<div class="dropdown col-6">'+
               ' <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'+
               ' Filter'+
                '</button>'+
           ' <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'+
            //   Brand Options
                '<li>'+
                    '<label>Brand</label>'+
                    '<ul>'+
                        '<li><a href="javascript: void(0)" class="brand-opt dropdown-item"><input type="radio">Adidas</a></li>'+
                        '<li><a href="javascript: void(0)" class="brand-opt dropdown-item"><input type="radio">Nike</a></li>'+
                    '</ul>'+
                '</a></li>'+
            // Color options
                '<li>'+
                '<label>Color</label>'+
                '<ul>'+
                    '<li><a href="javascript: void(0)" class="brand-opt dropdown-item"><input type="radio">White</a></li>'+
                    '<li><a href="javascript: void(0)" class="brand-opt dropdown-item"><input type="radio">Black</a></li>'+
                    '<li><a href="javascript: void(0)" class="brand-opt dropdown-item"><input type="radio">Pink</a></li>'+
                '</ul>'+
            '</a></li>'+
            // Price range
            '<li>'+
            '<label>Price</label>'+
            '<ul>'+
                '<li><a href="javascript: void(0)" class="brand-opt dropdown-item"><input type="range"></a></li>'+
            '</ul>'+
        '</a></li>'+
            '</ul>'+
       ' </div>'+
        '<div class="col-6">'+
        '<form class="search-bar">'+
           '<div class="form">'+ 
                '<input type="text" name="" id="search" placeholder="search for a product">'+
                '<i class="search fa fa-search" aria-hidden="true"></i>'+
           '</div>'+
       ' </form>'+
       '</div>'+
       '</div>'
    }
}

// Main-content
// Products Cards
const template = document.createElement("template");
template.innerHTML = 
'<link rel="stylesheet" href="css/shoes.css">'+
'<link rel="stylesheet" href="css/bootstrap.min.css">'+
'<link rel="stylesheet" href="font-awesome-4.7.0/css/font-awesome.min.css">'+
'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"/>'+
// '<link rel="stylesheet" href="css/swiper-bundle.min.css">'+
// '<h3 class="para text-danger hidden">Product not Found!</h3>'+
           ' <div class="col-4 card" style="width: 25rem;">'+
                 '<img class="card-img-top loading">'+
                 '<div class="card-body">'+
                      '<h4 class="card-title brand loading"><slot name="brand" /></h4>'+
                      '<p class="card-text loading">&#8358;<span class="price"><slot name="cost" /></span></p>'+
                     '<div class="btn-cart loading"><a href="javascript: void(0)">Add to cart<i class="fa fa-shopping-cart" aria-hidden="true"></i></li></a></div>'+
                 '</div>'+
'</div>';

class Products extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    static get observedAttributes(){
        return ["brand", "brand-image", "price"];
    }
    attributeChangedCallback(name, oldval, newval){
        this.shadowRoot.querySelector(".card h4").innerText = this.getAttribute("brand");
        this.shadowRoot.querySelector(".card-img-top").src = this.getAttribute("brand-image");
        this.shadowRoot.querySelector(".card-img-top").alt = this.getAttribute("brand");
        this.shadowRoot.querySelector(".price").innerText = this.getAttribute("cost");
    }
    // Save carted items
    saveCart = () =>{
        let product_nums = localStorage.getItem('cartedItems');
        if (product_nums){
            document.querySelector(".cart-items").innerHTML = product_nums;
        }
    }
    // Add to cart
    addedtocart = (item) =>{
        let product_nums = parseInt(localStorage.getItem('cartedItems'));

        if (product_nums){
            localStorage.setItem('cartedItems', product_nums + 1);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Item added to cart',
                showConfirmButton: false,
                timer: 1500
            });
            document.querySelector(".cart-items").innerHTML = product_nums+1;
        }
        else{
            localStorage.setItem('cartedItems', 1);
            document.querySelector(".cart-items").innerHTML = 1;
        }
        this.setItems(item);
    }
    cartpage = (item) =>{
        console.log("The product price is", item[0].item_price);
        let price = parseFloat(item[0].item_price);
        let cartcost = localStorage.getItem("Totalcost");
        localStorage.setItem("Totalcost", price);

        if (cartcost != null) {
            cartcost = parseFloat(cartcost);
            localStorage.setItem("Totalcost", cartcost + price);
        } else {
            localStorage.setItem("Totalcost", price);
        }
        // let product =document.querySelector(".item-name").innerHTML;
        // let price = document.querySelector(".item-price").innerHTML;
        // let item = document.querySelector(".items-container");

        // let product_nums = localStorage.getItem('cartedItems');

        // if (product_nums && item){
        //     product = items.item_name;
        //     price = items.item_price;
        // }

    }
    setItems = (item) =>{
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        for (let i = 0; i < item.length; i++) {
            if(cartItems != null){
                if(cartItems[item[i].item_name] == undefined){
                    cartItems = {
                        ...cartItems,
                        [item[i].item_name]: item
                    }
                }
                item[i].incart += 1;
                cartItems = {
                    [item[i].item_name]: item
                }
            }
            else{
                item[i].incart = 1;
                cartItems = {
                    [item[i].item_name]: item
                }
            }
            
        }
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    }
    // CART PAGE
    lessItems = () =>{
        console.log("hey it works");
        // let minus =  document.querySelector(".fa-minus-circle");
        // let num =  Number(document.querySelector(".item-value").textContent);
        // if (num === 0) {
        //     minus.style.display = "none";
        // }
        // else{
        //     num - 1;
        // }
    }
    // SEARCH PRODUCTS
    searchItems = (items) =>{
        let searchInput = document.getElementById("search").value;
        let filterarr = [];
        let cards = this.shadowRoot.querySelector(".card");

        // for (let i = 0; i < items.length; i++) {
            filterarr = items.filter(function(a){
                if(a.item_name.includes(searchInput)){
                    return a.item_name;
                }
            });
            if(searchInput == ""){
                // console.log(cards);
                cards.style.display = "block";
            }
            else{
                if(filterarr == ""){
                    document.querySelector(".para").classList.remove("hidden");
                    cards.style.display = "none";
                }
                else{
                    items = filterarr;
                    // console.log(cards);
                    cards.style.display = "block";
                    document.querySelector(".para").classList.add("hidden");
                }
            }

    }

    lowToHigh = (items) =>{
        var temp;
        var a;
        let prices = [];
        let pris = [
            {
                name: "Joshua",
                age: 20,
            },

            {
                name: "David",
                age: 70,
            },

            {
                name: "Sandra",
                age: 22,
            }
        ]
        let cards = this.shadowRoot.querySelector(".card");
        let price =  this.shadowRoot.querySelectorAll(".price");
        // price.forEach(price => {
        //     prices.push(items[price].item_price);
        //     console.log(prices); 
        // });
        for(let i=0; i<items.length;i++){
            prices.push(items[i].item_price);
            temp = prices[i];
            console.log(prices[i]);
        }
        prices.push(temp);
        console.log(prices);
        // for(let i=0; i<cards.length; i++){
        //     a = items[i].item_price;
            // let b = items[i+1].item_price;
            // console.log(prices[i], i);
            // console.log("b is", b);
            // for(let j=0; j<prices.length; j++){
            //     let a = prices[j];
            //     let b = prices[j+1];
                // if(b<a){
                //     temp = a;
                //     a = b;
                //     b = temp;
                //     console.log(a);
                // }
        //     prices.push(a);
        // } 
            // console.log(pris);
    }
    connectedCallback(){
        // Skeleton Loading function
        setTimeout(() => {
            let textheaders = document.querySelectorAll(".loading-text");
            textheaders.forEach(textheader => {
                textheader.classList.remove('loading');
            });
            this.shadowRoot.querySelector(".card-title").classList.remove('loading');
            this.shadowRoot.querySelector(".card-text").classList.remove('loading');
            this.shadowRoot.querySelector(".card-img-top").classList.remove('loading');
            this.shadowRoot.querySelector(".btn-cart").classList.remove('loading');
        }, 10000)

        
        // Products cards
        var brand_name = this.shadowRoot.querySelector(".card h4").textContent;
        var brand_price = this.shadowRoot.querySelector(".price").textContent;
        let items = [
            {
                item_name: brand_name,
                item_price: brand_price,
                incart: 0
            }

        ];

        // Added to cart
        this.shadowRoot.querySelector(".btn-cart").addEventListener('click', () => {this.addedtocart(items); this.cartpage(items)});
        document.querySelector(".search").addEventListener('click', () => this.searchItems(items));
        document.querySelector(".lowToHigh").addEventListener('click', () => this.lowToHigh(items));
        document.querySelector(".highToLow").addEventListener("click", () => this.highToLow(items));
        
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector(".btn-cart").removeEventListener('click', () => {this.addedtocart(items); this.cartpage(items)});
        document.querySelector(".search").addEventListener('click', () => this.searchItems(items));
        document.querySelector(".lowToHigh").addEventListener('click', ()=>this.lowToHigh(items));
        document.querySelector(".highToLow").addEventListener("click", ()=>this.highToLow(items));
    }
}

// Footer
class Footer extends HTMLElement{
    connectedCallback(){
        this.innerHTML = 
        '<footer>'+
       '     <div class="container">'+
                '<div class="row">'+
                    '<h5>Sh<span class="ispan">o</span>p with us.</h5>'+
                    '<div class="col-md-6 contact">'+
                        '<h6>Contact Info</h6>'+
                        '<div>'+
                           ' <i class="fa fa-phone" aria-hidden="true"></i><span>+234-809-6169-948</span>'+
                        '</div>'+
                       ' <div>'+
                           ' <i class="fa fa-envelope" aria-hidden="true"></i><span>Johnsonp.Joshua@yahoo.com</span>'+
                        '</div>'+
                    '</div>'+
                '<hr class="d-block d-sm-none">'+
                   ' <div class="col-md-6 row social">'+
                        '<h6>Social Links</h6>'+
                       ' <div class="ig col-md-6 col-lg-2">'+
                            '<a href="https://www.instagram.com/leovihildo" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>'+
                        '</div>'+
                       ' <div class="fb col-md-6 col-lg-2">'+
                            '<a href="https://www.facebook.com/johnson.wizfacejoshua" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>'+
                        '</div>'+
                        '<div class="linkd col-md-6 col-lg-2">'+
                           ' <a href="https://www.linkedin.com/in/joshua-johnson-270382199" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a>'+
                        '</div>'+
                    '</div>'+
           ' </div>'+
        '</div>'+
            '<div id="copy">'+
                '<span>'+
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">'+
                        '<path fill-opacity="0.7" d="M0,160L20,144C40,128,80,96,120,90.7C160,85,200,107,240,138.7C280,171,320,213,360,202.7C400,192,440,128,480,128C520,128,560,192,600,197.3C640,203,680,149,720,144C760,139,800,181,840,192C880,203,920,181,960,144C1000,107,1040,53,1080,58.7C1120,64,1160,128,1200,170.7C1240,213,1280,235,1320,229.3C1360,224,1400,192,1420,176L1440,160L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z">'+
                        '</path>'+
                    '</svg>'+
                '</span>'+
            '<span>POW Tech Copyright&copy;</span>'+
            '</div>'+
        '</footer>';
    }
}


customElements.define('main-footer', Footer);
customElements.define('main-header', Header);
customElements.define('my-filter', Filter);
customElements.define('my-products', Products);

// Swiper Container
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
})

var cart = new Products();
// cart.saveCart();
cart.cartpage();
