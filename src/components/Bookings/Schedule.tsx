import { useEffect, useState } from "react";
// import editButton from "../../assets/icons/editButton.png"
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import Select, { SingleValue } from 'react-select';
import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
// import { Link } from "react-router-dom";
// import { SelectField } from "../../common/SelectField";
import { Pagination } from "../../common/Pagination";
import { Button } from "../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchScheduleList, setCurrentPage, setError, setLoading } from "../../redux/scheduleSlice";

// Define the type for each option
// interface StylistOption {
//   value: number;
//   text: string;
//   icon: string; // URL or path to the image
// }

export const Schedule = () => {


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
  const { scheduleListData, loading, error, searchQuery, currentPage, totalItems } = useSelector((state: RootState) => state.schedule);

  // Fetch schedule list on mount and when dependencies change
  useEffect(() => {
    dispatch(setLoading(true)); // Ensure UI updates before fetching
    dispatch(fetchScheduleList({ status: 1, searchQuery, currentPage })).catch((error) => {
      console.error("Error fetching schedule list:", error);
      dispatch(setError(error.message))
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
        <h5 className="text-3xl font-semibold py-5">Schedule</h5>
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
              <th className="text-start px-2 py-3">Status</th>
              <th className="text-start px-2 py-3">Stylist</th>
            </tr>
          </thead>

          <tbody>
            {/* Content */}
            {loading ? (
              <tr>
                <td colSpan={12} className="text-center px-2 py-5">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              /* Error State */
              <tr>
                <td colSpan={12} className="text-center text-red-600 py-5">
                  Error: {error}
                </td>
              </tr>
            ) : (
              scheduleListData.length > 0 ? (
                scheduleListData.map((schedule) => (
                  <tr key={schedule.id} className="border-b-2 border-mindfulGreyTypeTwo">
                    <td className="text-start px-2 py-5">{schedule.id}</td>
                    <td className="text-start px-2 py-5">{schedule.date}</td>
                    <td className="text-start px-2 py-5">{schedule.time}</td>
                    <td className="text-start px-2 py-5">{schedule.provider_name}</td>
                    <td className="text-start px-2 py-5">{schedule.location || null}</td>
                    <td className="text-start px-2 py-5">{schedule.name}</td>
                    <td className="text-start px-2 py-5">{schedule.phone}</td>

                    <td className="text-start px-2 py-5">
                      <ul>
                        {schedule.services.map((service) => (
                          <li key={service.service_id}>{service.name}</li>
                        ))}
                      </ul>
                    </td>

                    <td className="text-start px-2 py-5">{schedule.amount}</td>

                    <td className="text-start px-2 py-5">
                      {schedule.status === "Completed" ? (
                        <div>
                          <Button
                            buttonType="button"
                            buttonTitle={"Completed"}
                            className="bg-[#e5ffec] text-md text-mindfulGreen font-semibold rounded-sm px-3 py-1"
                          />
                        </div>
                      ) : schedule.status === "Inprogress" ? (
                        <div>
                          <Button
                            buttonType="button"
                            buttonTitle={"Inprogress"}
                            className="bg-[#e6f2ff] text-md text-mindfulSecondaryBlue font-semibold rounded-sm px-3 py-1"
                          />
                        </div>
                      ) : schedule.status === "Schedule" ? (
                        <div>
                          <Button
                            buttonType="button"
                            buttonTitle={"Schedule"}
                            className="bg-[#fff8e5] text-md text-mindfulYellow font-semibold rounded-sm px-3 py-1"
                          />
                        </div>
                      ) : schedule.status === "Cancelled" ? (
                        <div>
                          <Button
                            buttonType="button"
                            buttonTitle={"Cancelled"}
                            className="bg-[#ffe1e1] text-md text-mindfulRed font-semibold rounded-sm px-3 py-1"
                          />
                        </div>

                      ) : "Not Available"}

                    </td>

                    <td className="text-start px-2 py-5">
                      <div className="flex items-center space-x-2">
                        <div>
                          <img src={stylist} alt="stylist-image" className="w-6 h-6 " />
                        </div>

                        <div key={schedule.stylist_id}>
                          {schedule.stylist || "N/A"}
                        </div>
                      </div>
                    </td>

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

                    {/* <td className="text-start px-2 py-5">
                     <Link
                       to="/ServiceManagement/EditServices"
                       aria-current="page"
                     >
                       <button
                         // onClick={openEditService}
                         type="button"
                         aria-label="Edit Services" // Accessibility improvement
                         className="edit-button"  // Optional: Add a class for better styling control
                       >
                         <img src={editButton} alt="editButton" />
                       </button>
                     </Link>
                   </td> */}


                  </tr>
                ))) : (
                <tr>
                  <td colSpan={11} className="text-center py-5">
                    No Schedule Booking data available.
                  </td>
                </tr>
              )
            )}


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
