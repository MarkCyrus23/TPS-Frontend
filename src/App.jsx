import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import SignIn from "./SignIn/SignIn";
import Services from "./Services/Services";
import BookSession from "./BookSession/BookSession";
import DateTime from "./BookSession/DateTime";
import UserInfo from "./BookSession/UserInfo";
import ReviewAndPay from "./BookSession/ReviewAndPay";
import Approval from "./BookSession/Approval";
import Consent from "./BookSession/Consent";
import Confirmation from "./BookSession/Confirmation";
import MyAppointments from "./MyAppointments/MyAppointments";
import Contact from "./Contact/Contact";
import RequireAuth from "./components/RequireAuth";
import AdminDashboard from "./admin/admindashboard";
import AdminAppointment from "./admin/adminappointment";
import AdminPayment from "./admin/adminpay";
import AdminBackup from "./admin/adminbackup";
import AdminPaymentMethod from "./admin/adminpaymentmethod";
import AdminSchedule from "./admin/adminschedule";
import AffiliateDashboard from "./affiliate/affiliatedashboard";
import AffiliateAppointment from "./affiliate/affiliateappointment";
import AffiliateSchedule from "./affiliate/affiliateschedule";
import AffiliatePayment from "./affiliate/affiliatepayment";


const ClientArea = ({ children }) => <RequireAuth roles={["CLIENT", "ADMIN"]}>{children}</RequireAuth>;
const AdminOnly = ({ children }) => <RequireAuth roles={["ADMIN"]}>{children}</RequireAuth>;

const AffiliateOnly = ({ children }) => <RequireAuth roles={["AFFILIATE", "ADMIN"]}>{children}</RequireAuth>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Booking Flow + My appointments: kailangang naka-sign in (CLIENT; pwede rin ang ADMIN para sa preview) */}
      <Route path="/book" element={<ClientArea><BookSession /></ClientArea>} />
      <Route path="/book/date-time" element={<ClientArea><DateTime /></ClientArea>} />
      <Route path="/book/info" element={<ClientArea><UserInfo /></ClientArea>} />
      <Route path="/book/review" element={<ClientArea><ReviewAndPay /></ClientArea>} />
      <Route path="/book/approval" element={<ClientArea><Approval /></ClientArea>} />
      <Route path="/book/consent" element={<ClientArea><Consent /></ClientArea>} />
      <Route path="/book/confirmation" element={<ClientArea><Confirmation /></ClientArea>} />
      <Route path="/appointments" element={<ClientArea><MyAppointments /></ClientArea>} />

      {/* Contact page (para sa naka-sign in) */}
      <Route
        path="/contact"
        element={
          <RequireAuth>
            <Contact />
          </RequireAuth>
        }
      />
      <Route
        path="/Contact"
        element={
          <RequireAuth>
            <Contact />
          </RequireAuth>
        }
      />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminOnly><AdminDashboard /></AdminOnly>} />
      <Route path="/admin/appointment" element={<AdminOnly><AdminAppointment /></AdminOnly>} />
      <Route path="/admin/payment" element={<AdminOnly><AdminPayment /></AdminOnly>} />
      <Route path="/admin/backup" element={<AdminOnly><AdminBackup /></AdminOnly>} />
      <Route path="/admin/payment-method" element={<AdminOnly><AdminPaymentMethod /></AdminOnly>} />
      <Route path="/admin/schedule" element={<AdminOnly><AdminSchedule /></AdminOnly>} />

      {/* AFFILIATE */}
      <Route path="/affiliate" element={<AffiliateOnly><AffiliateDashboard /></AffiliateOnly>} />
      <Route path="/affiliate/appointment" element={<AffiliateOnly><AffiliateAppointment /></AffiliateOnly>} />
      <Route path="/affiliate/schedules" element={<AffiliateOnly><AffiliateSchedule /></AffiliateOnly>} />
      <Route path="/affiliate/payment" element={<AffiliateOnly><AffiliatePayment /></AffiliateOnly>} />
    </Routes>
  );
}