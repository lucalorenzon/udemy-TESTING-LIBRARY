import { SummaryForm } from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

export const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });
  const hasToppings = orderDetails.toppings.size > 0;
  let toppingDisplay = null;
  if (hasToppings) {
    const toppingArray = Array.from(orderDetails.toppings.keys());
    const toppingList = toppingArray.map((key) => {
      return <li key={key}>{key}</li>;
    });
    toppingDisplay = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};
