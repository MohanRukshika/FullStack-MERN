export function getCart(){
    const cartString = localStorage.getItem("cart");
    if(cartString == null){
        localStorage.setItem("cart","[]")
        return []
    }else{
        const cart = JSON.parse(cartString);
        return cart;
    }
}

export function addToCart(product,quantity){
    const cart = getCart();
    const existingProductIndex = cart.findIndex(
        (item)=>{
            return item.product.productId==product.productId
        }
    )
    if(existingProductIndex==-1){
        if(quantity>0){

            if(quantity>product.stock){
                console.log("Not enough stock");
                return;
            }

            cart.push({
                product:{
                    productId:product.productId,
                    name:product.name,
                    image:product.image[0],
                    labelPrice:product.labelPrice,
                    stock:product.stock,
                    price:product.price
                },
                quantity:quantity
            })
        }
    }else{
        const newQuantity = cart[existingProductIndex].quantity+quantity;

        if(newQuantity<=0){
            cart.splice(existingProductIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            return;
        }
        if (newQuantity > product.stock){
            console.log(`Only ${product.stock} items are available`);
            return;
        }

        cart[existingProductIndex].quantity = newQuantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartTotal(cart){
    let total=0;

    for(let i=0;i<cart.length;i++){
        total+=cart[i].product.price*cart[i].quantity
    }

    return total;
}