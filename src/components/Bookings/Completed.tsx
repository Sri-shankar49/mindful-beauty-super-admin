import { useEffect, useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png";
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
// import { PaymentDetailsPopup } from "./Completed/PaymentDetailsPopup";
// import { InvoicePopup } from "./Completed/InvoicePopup";
// import { SelectField } from "../../common/SelectField";
import { Pagination } from "../../common/Pagination";
import { InvoicePopup } from "./Completed/InvoicePopup";
import { PaymentDetailsPopup } from "./Completed/PaymentDetailsPopup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCompletedList, setCurrentPage, setLoading } from "../../redux/completedSlice";
import { NotifyError } from "../../common/Toast/ToastMessage";

// Define the type for each option
// interface StylistOption {
//   value: number;
//   text: string;
//   icon: string; // URL or path to the image
// }

export const Completed = () => {


  // const stylistData: StylistOption[] = [
  //   {
  //     value: 1,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   },
  //   {
  //     value: 2,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   },
  //   {
  //     value: 3,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   },
  //   {
  //     value: 4,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   }
  // ];


  // State declaration for Stylist Popup
  const [showStylistPopup, setShowStylistPopup] = useState(false);


  // const openStylistPopup = () => {
  //   setShowStylistPopup(true);
  // }

  const closeStylistPopup = () => {
    setShowStylistPopup(false);
  }
  // const [selectedStylistOption, setSelectedStylistOption] = useState<SingleValue<StylistOption>>(null);


  // handle onChange event of the dropdown
  // const handleStylistOption = (option: SingleValue<StylistOption>) => {
  //   setSelectedStylistOption(option);

  //   // Open Stylist Popup
  //   setShowStylistPopup(true);
  // };

  // State Declaration for Payment Details Popup
  const [showPaymentDetailsPopup, setShowPaymentDetailsPopup] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const openPaymentDetailsPopup = () => {
    setShowPaymentDetailsPopup(!showPaymentDetailsPopup)
  }

  console.log(openPaymentDetailsPopup, "just logging");

  const closePaymentDetailsPopup = () => {
    setShowPaymentDetailsPopup(false)
  }

  // State Declaration for Invoice Popup
  const [showInvoicePopup, setShowInvoicePopup] = useState(false);

  const openInvoicePopup = () => {
    setShowInvoicePopup(!showInvoicePopup)
  }

  const closeInvoicePopup = () => {
    setShowInvoicePopup(false)
  }



  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { completedListData, loading, searchQuery, currentPage, totalItems } = useSelector((state: RootState) => state.completed);

  // Fetch completed list on mount and when dependencies change
  useEffect(() => {
    dispatch(setLoading(true)); // Ensure UI updates before fetching
    dispatch(fetchCompletedList({ status: 3, searchQuery, currentPage })).catch((error) => {
      // dispatch(setError(error.message));
      NotifyError(error.message || "Failed to fetch completed list. Please try again."); // ✅ Show error via toast
    });
  }, [dispatch, searchQuery, currentPage]);



  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return (
    <div>

      {/* Sub Heading */}
      <div>
        <h5 className="text-3xl font-semibold py-5">Completed</h5>
      </div>

      <div>
        <table className="w-full">
          <thead className="bg-mindfulLightgrey">
            <tr className="">
              <th className="text-start px-2 py-3">#</th>
              <th className="text-start px-2 py-3">Date</th>
              <th className="text-start px-2 py-3">Booking Time</th>
              <th className="text-start px-2 py-3">Salon</th>
              <th className="text-start px-2 py-3">Branch</th>
              <th className="text-start px-2 py-3">Customer Name</th>
              <th className="text-start px-2 py-3">Customer Mobile</th>
              <th className="text-start px-2 py-3">Service</th>
              <th className="text-start px-2 py-3">Amount</th>
              <th className="text-start px-2 py-3">Payment Status</th>
              <th className="text-start px-2 py-3">Invoice</th>
            </tr>
          </thead>

          <tbody>
            {/* Content */}
            {loading ? (
              <tr>
                <td colSpan={10} className="text-center px-2 py-5">
                  Loading...
                </td>
              </tr>
              // ) : error ? (
              //   /* Error State */
              //   <tr>
              //     <td colSpan={10} className="text-center text-red-600 py-5">
              //       Error: {error}
              //     </td>
              //   </tr>
            ) : (
              completedListData.length > 0 ? (
                completedListData.map((completed) => (
                  <tr className="border-b-2 border-mindfulGreyTypeTwo">
                    <td className="text-start px-2 py-5">{completed.id}</td>
                    <td className="text-start px-2 py-5">{completed.date}</td>
                    <td className="text-start px-2 py-5">{completed.time}</td>
                    <td className="text-start px-2 py-5">{completed.provider_name}</td>
                    <td className="text-start px-2 py-5">{completed.location || null}</td>
                    <td className="text-start px-2 py-5">{completed.name}</td>
                    <td className="text-start px-2 py-5">{completed.phone}</td>

                    <td className="text-start px-2 py-5">
                      <ul>
                        {completed.services.map((service) => (
                          <li key={service.service_id}>{service.name}</li>
                        ))}
                      </ul>
                    </td>

                    <td className="text-start px-2 py-5">{completed.amount}</td>
                    <td className="text-start px-2 py-5">{completed.payment_status}</td>

                    {/* <td>
                      <SelectField
                        label={''}
                        name="status"
                        id="status"
                        options={[
                          { value: "paid", label: "Paid" },
                          { value: "partlypaid", label: "Partly Paid" },
                          { value: "notpaid", label: "Not Paid" },
                        ]}
                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                        onChange={openPaymentDetailsPopup}
                      />
                    </td> */}

                    <td className="text-start px-2 py-5">

                      <div className="flex items-center space-x-2">
                        {/* Eye Button */}
                        <div
                          onClick={openInvoicePopup}
                          className="border-[1px] border-mindfulBlack rounded-sm px-2 py-1.5 cursor-pointer">
                          <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack" />
                        </div>

                        {/* Download Button */}
                        <div className="border-[1px] border-mindfulGreen rounded-sm px-2 py-1.5 cursor-pointer">
                          <FiDownload className="text-[18px] text-mindfulGreen" />
                        </div>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-5">
                    No Completed Booking data available.
                  </td>
                </tr>
              )
            )}

          </tbody>
        </table>
      </div>

      {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />}

      {showPaymentDetailsPopup && <PaymentDetailsPopup closePopup={closePaymentDetailsPopup} />}

      {showInvoicePopup && <InvoicePopup closePopup={closeInvoicePopup} />}


      {/* Pagination */}
      <div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

    </div>
  )
}
