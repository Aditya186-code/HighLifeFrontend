import { Badge, makeStyles, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import LockOpen from "@material-ui/icons/Https";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import axoisInstance from "../utils/axois";
import { ShoppingBasket } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    height: "auto",
    padding: "10px",
    paddingLeft: "11%",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "5%",
      paddingRight: "5%",
    },
    alignItems: "center",
    borderBottom: "2px solid whitesmoke",
    backgroundColor : "#f5fafd"
  },

  search: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  input: {
    height: "12px",
    padding: "10px",
    border: "1.5px solid #3A8040",
    borderRadius: "2px",
    width: "93%",
  },
  searchIcon: {
    padding: "5.5px",
    height: "23px !important",
    color: "white !important",
    backgroundColor: "#3A8040",
    "&:hover": {
      cursor: "pointer",
    },
  },
  cart: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: "2%",
  },
  icons: {
    color: "#3A8040",
    cursor: "pointer",
  },
}));
const SearchArea = ({ setIsLogged, setProduct }) => {
  const [query, setQuery] = useState("");
  const quantity = useSelector(state => state.cart.quantity)

  const searchProducts = () => {
    if (!query) {
      return;
    }
    axoisInstance.get(`/product/search/${query}`).then((res) => {
      setProduct(res.data);
      setQuery("");
    });
  };

  const classes = useStyles();
  return (
    <div className={classes.searchContainer}>
      <div className={classes.search}>
        <input
          type="text"
          className={classes.input}
          placeholder="Search Products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon className={classes.searchIcon} onClick={searchProducts} />
      </div>

      <div className={classes.cart}>
        <div>
          <Link to ='/cart'>
          <Tooltip title="Cart">
            <Badge badgeContent={quantity} className={classes.icons}>
              <ShoppingBasket />
            </Badge>
          </Tooltip>
          </Link>
        </div>

        {localStorage.getItem("JWTUSER") === undefined ||
        !localStorage.getItem("JWTUSER") ? (
          <div style={{ marginLeft: "15%" }}>
            <Tooltip title="Login">
              <Link to="/login">
                <LockOpen className={classes.icons} />
              </Link>
            </Tooltip>
          </div>
        ) : (
          <div style={{ marginLeft: "15%" }}>
            <Tooltip title="Logout">
              <ExitToAppIcon
                className={classes.icons}
                onClick={() => {
                  setIsLogged(false);
                  localStorage.removeItem("JWTUSER");
                  window.location.reload();
                }}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchArea;
