import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";
import Reviews from "./Reviews";
import LeaveReview from "./LeaveReview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/leave-review" element={<LeaveReview />} />
      </Routes>
    </BrowserRouter>
  );
}