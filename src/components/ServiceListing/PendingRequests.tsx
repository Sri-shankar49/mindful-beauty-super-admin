import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Pagination } from "../../common/Pagination";
import { FaCheck } from "react-icons/fa6";
import { pendingAction } from "../../api/apiConfig";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchPendingRequestList, setCurrentPage, setLoading } from "../../redux/pendingRequestSlice";
import { DeleteProviderPopup } from "./DeleteProviderPopup";
import { ViewProvider } from "./ViewProvider";
import { NotifyError } from "../../common/Toast/ToastMessage";
import { Button } from "../../common/Button";
import { ViewBranchPopup } from "./ViewBranchPopup";

// Proptypes frpm API
// interface PendingRequestsProps {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   salon_id: number;
//   salon_name: string;
//   email: string;
//   mobile: string;
//   owner_name: string | null;
//   location: string | null;
// }

export const PendingRequests = () => {

  // const [pendingRequestsData, setPendingRequestsData] = useState<PendingRequestsProps[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  // const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showViewProviderPopup, setShowViewProviderPopup] = useState(false);

  const [showViewBranchPopup, setShowViewBranchPopup] = useState(false);

  const [showDeleteProviderPopup, setShowDeleteProviderPopup] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);


  const openViewProviderPopup = (providerDetails: any) => {
    setSelectedProvider(providerDetails);
    setShowViewProviderPopup(true);
    console.log("Viewing the Provider Details", providerDetails);

  }

  const closeViewProviderPopup = () => {
    setShowViewProviderPopup(false);
  }


  const openDeleteProviderPopup = (providerDetails: any) => {
    setSelectedProvider(providerDetails);
    setShowDeleteProviderPopup(true);
    console.log("Deleting the Provider Details", providerDetails);

  }

  const closeDeleteProviderPopup = () => {
    setShowDeleteProviderPopup(false);
  }


  const openViewBranchPopup = (providerDetails: any) => {
    setSelectedProvider(providerDetails);
    setShowViewBranchPopup(true);
    console.log("Viewing Branch the Provider Details", providerDetails);

  }

  const closeViewBranchPopup = () => {
    setShowViewBranchPopup(false);
  }

  // Fetching data from API
  // useEffect(() => {
  //   const fetchPendingRequestsData = async () => {
  //     setLoading(true);

  //     try {
  //       const response = await fetchProvidersList("Pending", currentPage);
  //       setPendingRequestsData(response.results.data);

  //       setTotalItems(response.count);

  //       console.log("Pending Requests Data log:", response);

  //       console.log("Fetched Pending Request List pagination count data log :", response.count);


  //     } catch (error: any) {
  //       setError(error.message || "Unable to fetch pending requests data. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchPendingRequestsData();
  // }, [currentPage, itemsPerPage]);



  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { pendingRequestData, loading, searchQuery, currentPage, totalItems, serviceTypeID } = useSelector((state: RootState) => state.pendingRequest);

  // Fetch pending request list on mount and when dependencies change
  useEffect(() => {
    dispatch(setLoading(true)); // Ensure UI updates before fetching
    dispatch(fetchPendingRequestList({ status: "Pending", searchQuery, currentPage, pageSize: itemsPerPage, serviceTypeID: Number(serviceTypeID) })).catch((error) => {
      console.error("Error fetching pending request list:", error);
      // dispatch(setError(error.message));
      NotifyError(error.message || "Failed to fetch Pending Request. Please try again."); // ✅ Show error via toast
    });
  }, [dispatch, searchQuery, currentPage, itemsPerPage, serviceTypeID]);



  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  // Function for handling the pending requests
  const handleActionSubmit = async (providerID: number, action: string) => {
    setLoading(true);
    // setError(null);
    try {
      const data = await pendingAction(providerID, action);
      console.log("Pending Action Data log based on Pending Requests:", data);

      if (data?.status === "success") {
        refreshedData();
      }
    } catch (error: any) {
      // setError(error.message || 'An error occurred while processing your request.');
      NotifyError(error.message || 'An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  }


  // Refreshing the data on handleActionSubmit
  // const refreshedData = async () => {
  //   try {
  //     const response = await fetchProvidersList("Pending", currentPage);
  //     setPendingRequestsData(response.results.data);
  //     setTotalItems(response.count);

  //     console.log("Pending requests list data refreshed:", response);
  //   } catch (error: any) {
  //     console.error("Error refreshing pending request data:", error.message);
  //   }
  // }


  // Refresh function call according to Redux state
  const refreshedData = async () => {
    try {
      dispatch(setLoading(true)); // ✅ Show loading state before fetching

      await dispatch(fetchPendingRequestList({ status: "Pending", searchQuery, currentPage, pageSize: itemsPerPage, serviceTypeID: Number(serviceTypeID) }));

      console.log("Pending Request list data refreshed.");
    } catch (error: any) {
      console.error("Error refreshing Pending Request data:", error.message);
      // dispatch(setError(error.message)); // ✅ Handle errors correctly
      NotifyError(error.message || "Failed to fetch Pending Request. Please try again."); // ✅ Show error via toast

    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            {/* <div className="bg-mindfulLightPink h-dvh px-5 py-5"> */}

            {/* <div className="bg-mindfulWhite px-5 py-5"> */}


            <div className="py-5 max-2xl:overflow-x-auto">
              <table className="w-full">
                <thead className="bg-mindfulLightgrey">
                  <tr className="">
                    <th className="text-start px-2 py-3">Salon ID</th>
                    <th className="text-start px-2 py-3">Salon Name</th>
                    <th className="text-start px-2 py-3">Salon / Freelancer</th>
                    <th className="text-start px-2 py-3">Email</th>
                    <th className="text-start px-2 py-3">Mobile</th>
                    <th className="text-start px-2 py-3">Owner</th>
                    <th className="text-start px-2 py-3">Location</th>
                    <th className="text-start px-2 py-3">Action</th>
                    <th className="w-40 text-start px-2 py-3">View Branch</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Content */}
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="text-center py-5">
                        Loading...
                      </td>
                    </tr>
                    // ) : error ? (
                    //   <tr>
                    //     <td colSpan={9} className="text-center py-5">
                    //       Error: {error}
                    //     </td>
                    //   </tr>
                  ) : pendingRequestData.length > 0 ? (
                    pendingRequestData.map((pendingData) => (
                      <tr key={pendingData.salon_id} className="border-b-2 border-mindfulGreyTypeTwo">
                        <td className="text-start px-2 py-5">{pendingData.salon_id}</td>
                        <td className="text-start px-2 py-5">{pendingData.salon_name}</td>
                        <td className="text-start px-2 py-5">{pendingData.service_type_name}</td>
                        <td className="text-start px-2 py-5">{pendingData.email}</td>
                        <td className="text-start px-2 py-5">{pendingData.mobile}</td>
                        <td className="text-start px-2 py-5">{pendingData.owner_name}</td>
                        <td className="text-start px-2 py-5">{pendingData.location}</td>

                        <td className="text-start px-2 py-5">
                          <div className="flex items-center space-x-2">
                            {/* Eye Button */}
                            <div
                              title="View Provider Details"
                              onClick={() => openViewProviderPopup(pendingData)}
                              className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e6f2ff] transition-colors duration-200">
                              <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack group-hover:text-mindfulSecondaryBlue" />
                            </div>

                            {/* Edit Button */}
                            {/* <div className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200">
                              <BiEditAlt className="text-[20px] text-mindfulBlack group-hover:text-mindfulGreen" />
                            </div> */}

                            {/* Delete Button */}
                            <div
                              // onClick={openEditService}
                              title="Delete Provider"
                              onClick={() => openDeleteProviderPopup(pendingData)}
                              className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200">
                              <RiDeleteBinLine className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />
                            </div>

                            {/* Check Button */}
                            <div
                              title="Activate Salon"
                              onClick={() => handleActionSubmit(pendingData.salon_id, "Active")}
                              className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200"
                            >
                              <FaCheck className="text-[20px] text-mindfulBlack group-hover:text-mindfulGreen" />
                            </div>

                            {/* Close Button */}
                            {/* <div
                              title="Deactivate Salon"
                              onClick={() => handleActionSubmit(pendingData.salon_id, "Inactive")}
                              className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200"
                            >
                              <IoClose className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />

                            </div> */}


                          </div>
                        </td>
                        <td className="text-start px-2 py-5">
                          <div>
                            <Button
                              onClick={() => openViewBranchPopup(pendingData)}
                              buttonType="button"
                              buttonTitle={'View Branch'}
                              className="bg-mindfulWhite text-md text-mindfulBlack font-normal border-[1px] border-mindfulgrey rounded-md px-5 py-1 transition-all duration-200 cursor-pointer hover:bg-main hover:text-mindfulWhite hover:border-main"
                            />
                          </div>
                        </td>
                      </tr>
                    ))) : (
                    <tr>
                      <td colSpan={9} className="text-gray-500 text-center px-2 py-5">
                        No Pending Requests Data available
                      </td>
                    </tr>
                  )}



                  {/* <tr className="border-b-2 border-mindfulGreyTypeTwo">
                    <td className="text-start px-2 py-5">SP001</td>
                    <td className="text-start px-2 py-5">Blossom Beauty Studio</td>
                    <td className="text-start px-2 py-5">blossomstudio@gmail.com</td>
                    <td className="text-start px-2 py-5">9876543210</td>
                    <td className="text-start px-2 py-5">Anjali Menon</td>
                    <td className="text-start px-2 py-5">Kochi, Ernakulam</td>

                    <td className="text-start px-2 py-5">
                      <div className="flex items-center space-x-2">
                        Eye Button
                        <div
                          className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e6f2ff] transition-colors duration-200">
                          <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack group-hover:text-mindfulSecondaryBlue" />
                        </div>

                        Edit Button
                        <div className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200">
                          <BiEditAlt className="text-[20px] text-mindfulBlack group-hover:text-mindfulGreen" />
                        </div>

                        Delete Button
                        <div
                          // onClick={openEditService}
                          className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200">
                          <RiDeleteBinLine className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />
                        </div>
                      </div>
                    </td>
                  </tr> */}

                  {/* Content */}

                </tbody>
              </table>
            </div>

            {/* {showEditServicePopup && <EditServicePopup closePopup={closeEditService} />} */}

            {showViewProviderPopup && selectedProvider &&
              <ViewProvider
                closePopup={closeViewProviderPopup}
                providerData={selectedProvider}
              />
            }


            {showDeleteProviderPopup && selectedProvider &&
              <DeleteProviderPopup
                closePopup={closeDeleteProviderPopup}
                providerData={selectedProvider}
                refreshData={refreshedData}
              />}


            {showViewBranchPopup && selectedProvider &&
              <ViewBranchPopup
                closePopup={closeViewBranchPopup}
                providerData={selectedProvider}
                branch_id={0}
                branch_name={""}
                phone={""}
                location={""}
                logo={""}
                service_status={0}
              />
            }


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
            {/* </div> */}

            {/* </div> */}
          </div>
        </div>
      </div>
    </div >
  )
}
