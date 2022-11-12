// CART PAGE
// Reduce items function
let minus =  document.querySelector(".fa-minus-circle");
let num =  Number(document.querySelector(".item-val").textContent);
    document.querySelector(".minus").addEventListener('click', () => {
        if (num === 0) {
            minus.style.display = "hidden";
        }
        else{
            num-=1;
            document.querySelector(".item-val").innerHTML = num; 
        }      
});

// Increase Items function
document.querySelector(".plus").addEventListener('click', () => {
    minus.style.display = "visible";
    num+=1;
    document.querySelector(".item-val").innerHTML = num; 
});