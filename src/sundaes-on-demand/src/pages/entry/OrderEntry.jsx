import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "./Options";

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const orderDisabled = orderDetails.totals.scoops === "$0.00";
  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
      <h2>Grand total: {orderDetails.totals["grandTotal"]}</h2>
      <Button onClick={() => setOrderPhase("review")} disabled={orderDisabled}>
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
