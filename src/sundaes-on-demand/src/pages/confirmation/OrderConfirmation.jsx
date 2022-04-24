import axios from "axios";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";

export const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        resetOrder({});
        setOrderNumber(response.data.orderNumber);
      })
      .catch((e) => {
        // TODO: handle error
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setOrderPhase("inProgress");
  };

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and condition, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
