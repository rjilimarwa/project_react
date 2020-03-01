import React ,{Component} from 'react';

import {storeProducts,detailProduct} from './data';
const ProductContext=React.createContext();
 class ProductProvider extends Component{
     state={
         products:[],
         detailProduct:detailProduct,
         cart:storeProducts,
         openModal:false,
         modalProdact:detailProduct,
         cartSubTotal:0,
         cartTax:0,
         cartTotal:0


     };
     handleDetail=(id)=>{
      const product=this.getItem(id);
     this.setState(()=>{
       return { detailProduct:product}
     })
      };
      addToCart=id=>{

    let tempProducts = [...this.state.products];
       const index = tempProducts.indexOf(this.getItem(id));
       const product = tempProducts[index];
         product.inCart = true;
         product.count = 1;
         const price = product.price;
          product.total = price;
       this.setState(()=>{
           return {products:tempProducts,cart:[...this.state.cart,product]};
       },()=>{this.addTotals();}

       );

      };
     componentDidMount(){
       this.setProducts();
      };

     getItem=(id)=>{
        const product=this.state.products.find(item=>item.id===id);
        return product;
      };
     setProducts=()=>{
      let tempProducts=[];
      storeProducts.forEach(item=>{
          const singleItem={...item};
    tempProducts=[...tempProducts ,singleItem];
      });
    this.setState(()=>{
        return { products:tempProducts};
    });
     };
      openModal=id=>{
        const product =this.getItem(id);
         this.setState(()=>{
             return {modalProdact:product,modalOpen:true};
         });
      };
      closeModal=()=>{
      this.setState(()=>{ return {modalOpen:false};}
       )
      };
      increment=(id)=>{
        let tempCart=[...this.state.cart];
         const selectedProducted = tempCart.find(item=>item.id ===id);
         const index = tempCart.indexOf(selectedProducted);
         const product = product.count + 1;
         product.total = product.count * product.price;
         this.setState(()=>{return{cart:[...this.state.tempCart]};},()=>{this.addTotals()})
      };
decrement=id=>{
    let tempCart=[...this.state.cart];
    const selectedProducted=tempCart.find(item=>item.id ===id);
    const index = tempCart.indexOf(selectedProducted);
    const product=product.count-1;
    if(product.count ===0){
        this.removeItem(id);
    }else{
        product.total=product.count*product.price;
        this.setState(()=>{return{cart:[...this.state.tempCart]};},()=>{this.addTotals()})
    }

      };
      removeItem= id =>{
       let tempProducts = [...this.state.products];
       let tempCart = [...this.state.cart];
       tempCart  = tempCart.filter(item=>item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removeProduct = tempProducts[index];
      removeProduct.inCart = false;
      removeProduct.count = 0;
      removeProduct.total = 0;
    this.setState(()=>{
        return{
            cart: [...tempCart],
            tempProducts : [...tempProducts]

        };
        },()=>{this.addTotals();});

      };
      clearCart=()=>{
         this.setState(()=>{return{cart:[]};},()=>{this.setProducts();this. addTotals ();})
      };
      addTotals =()=>{
        let subTotal = 0;
         this.state.cart.map(item => { subTotal += item.total});
         const tempTax = subTotal * 0.1;
         const tax = parseFloat(tempTax.toFixed(2));
         const total = subTotal + tax;
         this.setState(()=>{
             return{
                 cartSubTotal: subTotal,
                 cartTax: tax,
                 cartTotal: total
             };
         });
      };
     render(){
         return(<ProductContext.Provider value={{...this.state,handleDetail:this.handleDetail,addToCart:this.addToCart,openModal:this.openModal,closeModal:this.closeModal,
                 increment:this.increment,
                 decrement:this.decrement,
                 removeItem:this.removeItem,
                 clearCart:this.clearCart

         }}>

               {this.props.children}
                </ProductContext.Provider>
     );
     }
 }
 const ProductConsumer=ProductContext.Consumer;
export {ProductProvider,ProductConsumer};