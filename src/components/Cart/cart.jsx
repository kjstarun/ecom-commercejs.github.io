import { Button, Container, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/cartItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleEmptyCart,
  handleRemove,
  handleUpdateCartQuantity,
}) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in cart, start to add some..!
      <div>
        <Link to="/" className={classes.link}>
          Click here to add some items
        </Link>
      </div>
    </Typography>
  );

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart?.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem
                item={item}
                handleUpdateCartQuantity={handleUpdateCartQuantity}
                handleRemove={handleRemove}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleEmptyCart}>
              Empty Cart
            </Button>

            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
              component={Link}
              to="/checkout">
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };

  if (!cart.line_items) return <p>"Loading....!"</p>;

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart?.line_items?.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
