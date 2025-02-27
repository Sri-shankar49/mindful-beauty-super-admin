import { useEffect, useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
import { Pagination } from "../../common/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCancelledList, setCurrentPage, setLoading } from "../../redux/cancelledSlice";
import { NotifyError } from "../../common/Toast/ToastMessage";


// Define the type for each option
// interface StylistOption {
//   value: number;
//   text: string;
//   icon: string; // URL or path to the image
// }

export const Cancelled = () => {


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


  const [itemsPerPage, setItemsPerPage] = useState(10);


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

  // const [showEditServicePopup, setShowEditServicePopup] = useState(false);

  // const openEditService = () => {
  //   setShowEditServicePopup(!showEditServicePopup)
  // }

  // const closeEditService = () => {
  //   setShowEditServicePopup(false)
  // }



  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { cancelledListData, loading, searchQuery, currentPage, totalItems } = useSelector((state: RootState) => state.cancelled);

  // Fetch cancelled list on mount and when dependencies change
  useEffect(() => {
    dispatch(setLoading(true)); // Ensure UI updates before fetching
    dispatch(fetchCancelledList({ status: 4, searchQuery, currentPage })).catch((error) => {
      // dispatch(setError(error.message));
      NotifyError(error.message || "Failed to fetch cancelled list. Please try again."); // ✅ Show error via toast
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
        <h5 className="text-3xl font-semibold py-5">Cancelled</h5>
      </div>

      <div className="max-2xl:overflow-x-auto">
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
              <th className="text-start px-2 py-3">Reason</th>
            </tr>
          </thead>

          <tbody>
            {/* Content */}
            {loading ? (
              <tr>
                <td colSpan={11} className="text-center px-2 py-5">
                  Loading...
                </td>
              </tr>
              // ) : error ? (
              //   /* Error State */
              //   <tr>
              //     <td colSpan={11} className="text-center text-red-600 py-5">
              //       Error: {error}
              //     </td>
              //   </tr>
            ) : (
              cancelledListData.length > 0 ? (
                cancelledListData.map((cancelled) => (
                  <tr className="border-b-2 border-mindfulGreyTypeTwo">
                    <td className="text-start px-2 py-5">{cancelled.id}</td>
                    <td className="text-start px-2 py-5">{cancelled.date}</td>
                    <td className="text-start px-2 py-5">{cancelled.time}</td>
                    <td className="text-start px-2 py-5">{cancelled.provider_name}</td>
                    <td className="text-start px-2 py-5">{cancelled.location || null}</td>
                    <td className="text-start px-2 py-5">{cancelled.name}</td>
                    <td className="text-start px-2 py-5">{cancelled.phone}</td>

                    <td className="text-start px-2 py-5">
                      <ul>
                        {cancelled.services.map((service) => (
                          <li key={service.service_id}>{service.name}</li>
                        ))}
                      </ul>
                    </td>

                    <td className="text-start px-2 py-5">{cancelled.amount}</td>

                    {/* <td className="text-start px-2 py-5">
                <div>
                  <Button
                    buttonType="button"
                    buttonTitle={"Completed"}
                    className="bg-[#e5ffec] text-md text-mindfulGreen font-semibold rounded-sm px-3 py-1"
                  />
                </div>
              </td> */}

                    {/* <td>
                <SelectField
                  label={''}
                  name="status"
                  id="status"
                  options={[
                    { value: "scheduled", label: "Scheduled" },
                    { value: "inprogress", label: "Inprogress" },
                    { value: "completed", label: "Completed" },
                  ]}
                  className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                />
              </td> */}

                    <td className="text-start px-2 py-5">
                      {/* <ul>
                        <li>Unexpected Staff</li>
                        <li>Unavailability</li>
                      </ul> */}
                      {cancelled.cancellation_message}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-5">
                    No Cancelled Booking data available.
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>

      {/* {showDenialPopup && <DenialPopup closePopup={closeDenialPopup} />} */}
      {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />}


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
