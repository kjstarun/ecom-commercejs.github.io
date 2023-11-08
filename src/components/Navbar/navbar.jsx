import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import logo from "../../assets/commerce.png";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ cartTotalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            color="inherit"
            component={Link}
            to="/">
            <img
              src={logo}
              alt="commerce"
              height={"25px"}
              className={classes.image}
            />
            E-SHOPPING
          </Typography>
          <div className={classes.grow} />

          <div className={classes.button} />
          {location.pathname === "/" && (
            <IconButton
              aria-label="Show cart items"
              color="inherit"
              component={Link}
              to="/cart">
              <Badge
                badgeContent={cartTotalItems}
                color="secondary"
                overlap="rectangular">
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
