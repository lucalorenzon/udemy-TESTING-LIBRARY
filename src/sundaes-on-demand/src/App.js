import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailProvider>
        <OrderEntry />
      </OrderDetailProvider>
    </Container>
  );
}

export default App;
