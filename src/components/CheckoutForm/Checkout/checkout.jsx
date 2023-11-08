import { Paper, StepLabel, Stepper, Step, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import useStyles from './styles';
import AddressForm from '../addressForm';
import PaymentForm from '../paymentForm';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping address', 'Payment Details'];
const Checkout = ({ cart, handleCaptureCheckout, order, errorMessage }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: 'cart',
      });
      setCheckoutToken(token);
    } catch (error) {}
  };

  useEffect(() => {
    generateToken();
  }, [cart]);
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        handleCaptureCheckout={handleCaptureCheckout}
      />
    );
  
  const nextStep = () => setActiveStep((prev) => prev + 1);

  const backStep = () => setActiveStep((prev) => prev - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  
  const Confirmation = () => <h2>Confirmation</h2>;

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => {
              return (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
