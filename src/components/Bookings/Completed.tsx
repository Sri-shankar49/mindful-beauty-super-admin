import { useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import Select, { SingleValue } from 'react-select';
import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
// import { PaymentDetailsPopup } from "./Completed/PaymentDetailsPopup";
// import { InvoicePopup } from "./Completed/InvoicePopup";
import { SelectField } from "../../common/SelectField";
import { Pagination } from "../../common/Pagination";
import { InvoicePopup } from "./Completed/InvoicePopup";
import { PaymentDetailsPopup } from "./Completed/PaymentDetailsPopup";

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

  const openPaymentDetailsPopup = () => {
    setShowPaymentDetailsPopup(!showPaymentDetailsPopup)
  }

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
            <tr className="border-b-2 border-mindfulGreyTypeTwo">
              <td className="text-start px-2 py-5">1</td>
              <td className="text-start px-2 py-5">18 Aug 2024</td>
              <td className="text-start px-2 py-5">10.00 - 11.00</td>
              <td className="text-start px-2 py-5">Astamudi</td>
              <td className="text-start px-2 py-5">Shakthikulangara, Kollam</td>
              <td className="text-start px-2 py-5">Ramya</td>
              <td className="text-start px-2 py-5">97347196578</td>

              <td className="text-start px-2 py-5">
                <ul>
                  <li>Eyesbrows Threading</li>
                  <li>Forehead Threading</li>
                </ul>
              </td>

              <td className="text-start px-2 py-5">250</td>

              <td>
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
              </td>

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

          </tbody>
        </table>
      </div>

      {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />}
      {showPaymentDetailsPopup && <PaymentDetailsPopup closePopup={closePaymentDetailsPopup} />}
      {showInvoicePopup && <InvoicePopup closePopup={closeInvoicePopup} />}


      {/* Pagination */}
      <div>
        <Pagination />
      </div>

    </div>
  )
}
