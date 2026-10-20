import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import SignIn from "./SignIn/SignIn";
import Services from "./Services/Services";
import BookSession from "./BookSession/BookSession";
import DateTime from "./BookSession/DateTime";
import UserInfo from "./BookSession/UserInfo";
import ReviewAndPay from "./BookSession/ReviewAndPay";
import Confirmation from "./BookSession/Confirmation";
import MyAppointments from "./MyAppointments/MyAppointments";
import Contact from "./Contact/Contact";
import AdminDashboard from "./admin/admindashboard";
import AdminSchedule from "./admin/adminschedule";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Booking Flow */}
      <Route path="/book" element={<BookSession />} />
      <Route path="/book/date-time" element={<DateTime />} />
      <Route path="/book/info" element={<UserInfo />} />
      <Route path="/book/review" element={<ReviewAndPay />} />
      <Route path="/book/confirmation" element={<Confirmation />} />


      {/* Dashboard & Messages */}
      <Route path="/appointments" element={<MyAppointments />} />
      <Route path="/Contact" element={<Contact />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/schedule" element={<AdminSchedule />} />
      <Route path="/admin/schedules" element={<AdminSchedule />} />
    </Routes>
  );
}