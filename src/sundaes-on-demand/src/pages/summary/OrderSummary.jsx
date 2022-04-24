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
  const toppingArray = Array.from(orderDetails.toppings.keys());
  const toppingList = toppingArray.map((key) => {
    return <li key={key}>{key}</li>;
  });

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};
