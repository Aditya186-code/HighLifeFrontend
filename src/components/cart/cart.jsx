import React from 'react'
import './cart.css'
import {Add, NavigateNextTwoTone, Remove} from '@material-ui/icons'
import { useSelector } from 'react-redux'
import axoisInstance, { API_URL, headers } from "../../utils/axois";
import { Tooltip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Shop from '@material-ui/icons/Shop';
import {useHistory} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import {resetProduct} from '../../redux/cartRedux.js'
import { useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    minWidth: 250,
    marginLeft: "7%",
    marginTop: "2%",
    marginBottom: "2%",
    borderRadius: "10px",
    transition : "all 0.5s ease-in-out",
    cursor : 'pointer',
    "&:hover": {
      boxShadow: "0 4px 8px 0 rgba(39, 91, 235, 0.2),0 6px 20px 0 #3A8040",
      transform : "scale(1.05)"

    },
  },

  media: {
    height: 250,
    objectFit : "cover",
    marginBottom : "10px",
    
    "&:hover": {
      opacity: "0.8"
      
    },
  },
  VisitListButton: {
    color: "white",
    backgroundColor: "#3A8040",
    textTransform: "none",
    borderRadius: "6px",
    paddingRight: "20px",
    paddingLeft: "20px",
    "&:hover": {
      backgroundColor: "#f2f2f2",
      boxShadow:
        "0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
      color: "black",
    },
  },
  placeReview: {
    display: "flex",
    alignItems: "center",
    borderRight: "2px solid #3A8040",
    height: "40px",
    paddingRight: "5px",
  },
  placeDistance: {
    borderRight: "2px solid #3A8040",
    height: "40px",
  },
}));
const Cart = ({setProduct}) => {
  const cart = useSelector((state) => state.cart);
  const stripe_key = "pk_test_51KU68wLRge6iNIRmPd85Zoi2slvHCf1tyXo21D3lq9ndIDrMODXfnUeoZPB47nfa8y8LVdQXFBhW69XUrkUftByy00FH3tv7Cy"
const history = useHistory();
  const buyProduct = (id) => {
    const obj = {
      id: id,
      ProductSold: 1,
    };
    axoisInstance
      .put("product/sell", obj)
      .then((res) => {
        setTimeout(() => {
          axoisInstance.get("/product/showall").then((res) => {
            setProduct(res.data);
          });
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const classes = useStyles();
  console.log(cart)

  const dispatch = useDispatch();

  const onToken = () => {
    dispatch(resetProduct());
    history.push('/')
    cart.products.map(c => {
      buyProduct(c._id)
    })

  }
  
  return (
    <div className = "cartWrapper">
        <h1 className="cartTitle">YOUR BAG</h1>
        <div className="cartTop">
            <button style = {{border : '1px solid black',color : 'black', backgroundColor : 'transparent'}} className = "topButton">CONTINUE SHOPPING</button>
        
        <div className="cartTopTexts">
            <span className="cartTopText">Shopping Bag(2)</span>
            <span className="cartTopText">Your Wishlist (0)</span>
        </div>


        <StripeCheckout
              name="Buy Sell "
              image="https://ml8mzf2qdhvl.i.optimole.com/QtrEnA8-7AY3OSJ1/w:474/h:355/q:mauto/rt:fill/g:sm/https://www.buildupnepal.com/wp-content/uploads/2020/06/cseb-machine.jpg"
              billingAddress
              shippingAddress
              description={`Your total is Rs${cart.total}`}
              amount={cart.total * 100}
              stripeKey={stripe_key}
              token = {onToken}
            >
        
             <button className = "topButton" style = {{color : 'white', backgroundColor : 'black'}}>CHECKOUT NOW</button>
              
             </StripeCheckout>
           
       
               
        
        </div>
        <div className="cartBottom">
            <div className="cartInfo">
              {cart.products.map(c => {
               return <div className="cartProduct">
                <div className="cartProductDetail">
                <img className = "cartProductImg" src={`${API_URL}/image/${c.ProductImage}`} />
                
                <div className="cartDetails">
                    <span className = "cartProductName">  <b>Product:</b>{c.ProductName} </span>
                    <span>
              <b>ID:</b> {c._id}
              </span>
              <div className = "cartProductColor"/>
              <div className = "cartProductSize">
                <b>Size:</b> 37.5
              </div>
              </div>
                </div>
                <div className = "cartPriceDetail">
            <div className = "cartProductAmountContainer">
              
              <div className = "cartProductAmount">Amount : 1</div>
              
            </div>
            <div className = "cartProductPrice">Price : Rs. {c.ProductPrice}</div>
                <Tooltip
          title={
            c.ProductSold === 1
              ? "Cannot buy already sold"
              : "Buy Product"
          }
        >
           
       
          
          <Button
          style = {{display : 'none'}}
            disabled={
              c.ProductSold === 1 ||
              localStorage.getItem("JWTUSER") === undefined ||
              !localStorage.getItem("JWTUSER")
            }
            className={classes.VisitListButton}
            // onClick={() => buyProduct(c._id)}
          >
            <Shop />
            {c.ProductSold === 1 ? "Sold" : "Purchase"}
          </Button>
          
        </Tooltip>
            </div>

            </div>

              })}
                <hr className = "cartHr"/>

                
                
            </div>
            {/* <div className = "cartSummary">
            <h1 className = "cartSummaryTitle">ORDER SUMMARY</h1>
            <div className = "cartSummaryItem">
              <span className = "cartSummaryText">Subtotal</span>
              <span className = "cartSummaryPrice">$ {cart?.total}</span>
            </div>
            <div className = "cartSummaryItem">
              <span className = "cartSummaryText">Estimated Shipping</span>
              <span className = "cartSummaryPrice">$ 5.90</span>
            </div>
            <div className = "cartSummaryItem">
              <span className = "cartSummaryText">Shipping Discount</span>
              <span className = "cartSummaryPrice">$ -5.90</span>
            </div>
            <div className = "cartSummeryItem" >
              <span  className = "cartSummaryText" style = {{fontWeight : 500, fontSize : "24px"}}>Total</span>
              <span className = "cartSummaryPrice" style = {{fontWeight : 500, fontSize : "24px"}}>$ {cart?.total}</span>
            </div>
            <button className = "cartSummaryButton">CHECKOUT NOW</button>
          </div> */}
        </div>
    </div>
  )
}

export default Cart