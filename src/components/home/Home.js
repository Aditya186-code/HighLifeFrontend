import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Banner from "../banner/banner2";
import Categories from "../Categories";
import Product from "../product/Product";
import axois, { headers } from "../../utils/axois";
import SearchArea from "../SearchArea";

const useStyles = makeStyles((theme) => ({
  productContainer: {
    paddingLeft: "5%",
    paddingRight: "5%",
    background: "#F7F8F9",
    paddingTop: "10px",
    paddingBottom: "15px",
    borderBottom: "2px solid whitesmoke",
  },
}));

const Home = ({ product, setProduct, isLogged, setIsLogged }) => {
 
  const [categories, setCategories] = useState([]);
  const [uid, setUid] = useState("");
  console.log(product)

  useEffect(() => {
    axois
      .get("/category/all")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  }, []);

  useEffect(() => {
    axois
      .get("/product/showall")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response?.data?.message);
      });
  }, []);

  useEffect(() => {
    axois
      .get("buyer/profileByToken", {
        headers: headers,
      })
      .then((res) => {
        setUid(res?.data?._id);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  }, []);

  const classes = useStyles();
  return (
    <div>
      <SearchArea
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setProduct={setProduct}
      />
      <Banner />
      <h1 style = {{textAlign : 'center'}}>Products:</h1>
      <Categories
        categories={categories}
        product={product}
        setProduct={setProduct}
      />
      {product.length === 0 && (
        <Typography align="center" style={{ color: "red", fontWeight: "bold" }}>
          Product Not found
        </Typography>
      )}
      <div className={classes.productContainer}>
        <Grid container>
          {product.map((product) => {
            return (
              <Grid key={product._id} item lg={3} md={4} sm={6} xs={12}>
                <Product id = {product._id} category = {product.ProductCategory} setProduct={setProduct} product={product} uid={uid} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
