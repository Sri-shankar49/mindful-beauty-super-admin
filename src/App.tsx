// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from './pages/SignIn';
import ScrollToTop from './common/ScrollToTop';
import { LoginLayout } from './layout/LoginLayout';
import { Dashboard } from './pages/Dashboard';
import { ManageRole } from './pages/ManageRole';
import { ServiceListing } from './pages/ServiceListing';
import { ServiceManagement } from './pages/ServiceManagement';
import { Bookings } from './pages/Bookings';
import { SalesTransactions } from './pages/SalesTransactions';
import { RatingsReviews } from './pages/RatingsReviews';
import { Reports } from './pages/Reports';

import { DashBoardData } from './components/Dashboard/DashBoardData';
import { ProfileProgress } from './components/Dashboard/ProfileProgress';

import { RolesManagement } from './components/ManageRole/RolesManagement';
import { StaffManagement } from './components/ManageRole/StaffManagement';
// import { BranchManagement } from './components/ManageRole/BranchManagement';

import { AddServices } from './components/ServiceListing/AddServices';
import { ActiveUsers } from './components/ServiceListing/ActiveUsers';
import { PendingRequests } from './components/ServiceListing/PendingRequests';
import { InactiveUsers } from './components/ServiceListing/InactiveUsers';

import { ServicesCategories } from './components/ServiceManagement/ServicesCategories';
import { EditServices } from './components/ServiceManagement/EditServices';

import { Categories } from './components/ServiceManagement/Categories';
import { Subcategories } from './components/ServiceManagement/Subcategories';
import { Services } from './components/ServiceManagement/Services';

import { BookingStatus } from './components/Bookings/BookingStatus';
import { AllBooking } from './components/Bookings/AllBooking';
import { Schedule } from './components/Bookings/Schedule';
import { Inprogress } from './components/Bookings/Inprogress';
import { Completed } from './components/Bookings/Completed';
import { Cancelled } from './components/Bookings/Cancelled';


import { GeneralInfoForm } from './pages/GeneralInfoForm';
import { BankAccInfoForm } from './pages/BankAccInfoForm';
import { TaxInfoForm } from './pages/TaxInfoForm';

import { GeneralInfoFreelanceForm } from './pages/GeneralInfoFreelanceForm';
import { BankAccInfoFreelanceForm } from './pages/BankAccInfoFreelanceForm';
import { TaxInfoFreelanceForm } from './pages/TaxInfoFreelanceForm';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <BrowserRouter>
        {/* ScrollToTop component */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/GeneralInfoForm" element={<GeneralInfoForm />} />
          <Route path="/BankAccInfoForm" element={<BankAccInfoForm />} />
          <Route path="/TaxInfoForm" element={<TaxInfoForm />} />

          <Route path="/GeneralInfoFreelanceForm" element={<GeneralInfoFreelanceForm />} />
          <Route path="/BankAccInfoFreelanceForm" element={<BankAccInfoFreelanceForm />} />
          <Route path="/TaxInfoFreelanceForm" element={<TaxInfoFreelanceForm />} />


          {/* Login Layout Routes */}
          <Route path="/" element={<LoginLayout />}>
            <Route path="/Dashboard" element={<Dashboard />} >

              {/* Redirect to DashBoardData when /Dashboard is accessed */}
              <Route index element={<Navigate to="DashBoardData" replace />} />


              {/* Sub-routes */}
              <Route path="DashBoardData" element={<DashBoardData />} />
              <Route path="ProfileProgress" element={<ProfileProgress />} />
            </Route>

            <Route path="/ManageRole" element={<ManageRole />} >

              {/* Redirect to RolesManagement when /ManageRole is accessed */}
              <Route index element={<Navigate to="RolesManagement" replace />} />

              {/* Sub-routes */}
              <Route path="RolesManagement" element={<RolesManagement />} />
              <Route path="StaffManagement" element={<StaffManagement />} />
              {/* <Route path="BranchManagement" element={<BranchManagement />} /> */}
            </Route>

            <Route path="/ServiceListing" element={<ServiceListing />}>

              {/* Redirect to ServiceList when /ServiceListing is accessed */}
              <Route index element={<Navigate to="ActiveUsers" replace />} />

              {/* Sub-routes */}
              <Route path="ActiveUsers" element={<ActiveUsers />} />
              <Route path="PendingRequests" element={<PendingRequests />} />
              <Route path="InactiveUsers" element={<InactiveUsers />} />
              <Route path="AddServices" element={<AddServices />} />
            </Route>

            {/* <Route path="/ServiceListing" element={<ServiceListing />}>

              Redirect to ServiceList when /ServiceListing is accessed
              <Route index element={<Navigate to="ServiceList" replace />} />

              Sub-routes
              <Route path="/ServiceListing/ServiceList" element={<ServicesMotherComponent />}>
                Default child route
                <Route index element={<ServiceList service_name={''} category={''} subcategory={''} service_time={''} duration={''} status={''} sku_value={''} />} />
                Sub-route
                <Route path="AddServices" element={<AddServices />} />
              </Route>

              Sub-routes
              <Route path="/ServiceListing/PackagesList" element={<PackagesMotherComponent />}>
                Default child route
                <Route index element={<PackagesList />} />
                Sub-route
                <Route path="AddPackages" element={<AddPackages />} />
              </Route>

            </Route> */}

            <Route path="/ServiceManagement" element={<ServiceManagement />}>

              {/* Redirect to ServicesCategories when /ServiceManagement is accessed */}
              <Route index element={<Navigate to="ServicesCategories" replace />} />

              {/* ServicesCategories sub-routes */}
              <Route path="ServicesCategories" element={<ServicesCategories />}>

                {/* Redirect to AllBooking when /BookingStatus is accessed */}
                <Route index element={<Navigate to="Categories" replace />} />

                <Route path="Categories" element={<Categories />} />
                <Route path="Subcategories" element={<Subcategories />} />
                <Route path="Services" element={<Services />} />
              </Route>

              {/* EditServices route */}
              <Route path="EditServices" element={<EditServices />} />

            </Route>

            <Route path="/Bookings" element={<Bookings />}>


            </Route>

            <Route path="/Bookings" element={<Bookings />}>

              {/* Redirect to BookingStatus when /ServiceManagement is accessed */}
              <Route index element={<Navigate to="BookingStatus" replace />} />

              {/* BookingStatus sub-routes */}
              <Route path="BookingStatus" element={<BookingStatus />}>

                {/* Redirect to AllBooking when /BookingStatus is accessed */}
                <Route index element={<Navigate to="AllBooking" replace />} />

                <Route path="AllBooking" element={<AllBooking />} />
                <Route path="Schedule" element={<Schedule />} />
                <Route path="Inprogress" element={<Inprogress />} />
                <Route path="Completed" element={<Completed />} />
                <Route path="Cancelled" element={<Cancelled />} />
              </Route>

              {/* EditServices route */}
              <Route path="EditServices" element={<EditServices />} />

            </Route>


            <Route path="/SalesTransactions" element={<SalesTransactions />} />
            <Route path="/RatingsReviews" element={<RatingsReviews />} />
            <Route path="/Reports" element={<Reports />} />
          </Route>
        </Routes>

      </BrowserRouter >
    </>
  )
}

export default App
