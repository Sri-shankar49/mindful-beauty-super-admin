import { useState, useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Pagination } from "../../common/Pagination";
import { pendingAction } from "../../api/apiConfig";
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchInactiveUserList, setCurrentPage, setLoading } from "../../redux/inactiveUserSlice";
import { DeleteProviderPopup } from "./DeleteProviderPopup";
import { ViewProvider } from "./ViewProvider";
import { NotifyError } from "../../common/Toast/ToastMessage";
// import { EditServicePopup } from "./AddServices/EditServicePopup";


// Proptypes frpm API
// interface InactiveUsersProps {
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

export const InactiveUsers = () => {

  // const [inActiveUsersData, setInactiveUsersData] = useState<InactiveUsersProps[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);


  // const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showViewProviderPopup, setShowViewProviderPopup] = useState(false);


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


  // Fetching data from API
  // useEffect(() => {
  //   const fetchInactiveUsersData = async () => {
  //     setLoading(true);

  //     try {
  //       const response = await fetchProvidersList("Inactive", currentPage);
  //       setInactiveUsersData(response.results.data);
  //       setTotalItems(response.count);


  //       console.log("Inactive Users Data log:", response);

  //       console.log("Fetched Inactive Users List pagination count data log :", response.count);


  //     } catch (error: any) {
  //       setError(error.message || "Unable to fetch inactive users data. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchInactiveUsersData();
  // }, [currentPage, itemsPerPage]);



  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { inactiveUserData, loading, searchQuery, currentPage, totalItems, serviceTypeID } = useSelector((state: RootState) => state.inactiveUser);

  // Fetch active Users list on mount and when dependencies change
  useEffect(() => {
    dispatch(setLoading(true)); // Ensure UI updates before fetching
    dispatch(fetchInactiveUserList({ status: "Inactive", searchQuery, currentPage, serviceTypeID: Number(serviceTypeID) })).catch((error) => {
      console.error("Error fetching inactive users list:", error);
      // dispatch(setError(error.message));
      NotifyError(error.message || "Failed to fetch inactive users. Please try again."); // ✅ Show error via toast
    });
  }, [dispatch, searchQuery, currentPage, serviceTypeID]);



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
      console.log("Pending Action Data log based on Inactive Users:", data);

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
  //     const response = await fetchProvidersList("Inactive", currentPage);
  //     setInactiveUsersData(response.results.data);
  //     setTotalItems(response.count);

  //     console.log("Inactive users list data refreshed:", response);
  //   } catch (error: any) {
  //     console.error("Error refreshing inactive users data:", error.message);
  //   }
  // }


  // Refresh function call according to Redux state
  const refreshedData = async () => {
    try {
      dispatch(setLoading(true)); // ✅ Show loading state before fetching

      await dispatch(fetchInactiveUserList({ status: "Inactive", searchQuery, currentPage, serviceTypeID: Number(serviceTypeID) }));

      console.log("Inactive Users list data refreshed.");
    } catch (error: any) {
      console.error("Error refreshing inactive users data:", error.message);
      // dispatch(setError(error.message)); // ✅ Handle errors correctly
      NotifyError(error.message || "Failed to fetch inactive users. Please try again."); // ✅ Show error via toast
    }
  };


  return (
    <div>
      <div>
        <div>
          {/* <div className="bg-mindfulLightPink h-dvh px-5 py-5"> */}

          {/* <div className="bg-mindfulWhite px-5 py-5"> */}


          <div className="py-5">
            <table className="w-full">
              <thead className="bg-mindfulLightgrey">
                <tr className="">
                  <th className="text-start px-2 py-3">Salon ID</th>
                  <th className="text-start px-2 py-3">Salon Name</th>
                  <th className="text-start px-2 py-3">Email</th>
                  <th className="text-start px-2 py-3">Mobile</th>
                  <th className="text-start px-2 py-3">Owner</th>
                  <th className="text-start px-2 py-3">Location</th>
                  <th className="text-start px-2 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {/* Content */}
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-5">
                      Loading...
                    </td>
                  </tr>
                  // ) : error ? (
                  //   <tr>
                  //     <td colSpan={7} className="text-center py-5">
                  //       Error: {error}
                  //     </td>
                  //   </tr>
                ) : inactiveUserData.length > 0 ? (
                  inactiveUserData.map((inactiveData) => (
                    <tr key={inactiveData.salon_id} className="border-b-2 border-mindfulGreyTypeTwo">
                      <td className="text-start px-2 py-5">{inactiveData.salon_id}</td>
                      <td className="text-start px-2 py-5">{inactiveData.salon_name}</td>
                      <td className="text-start px-2 py-5">{inactiveData.email}</td>
                      <td className="text-start px-2 py-5">{inactiveData.mobile}</td>
                      <td className="text-start px-2 py-5">{inactiveData.owner_name}</td>
                      <td className="text-start px-2 py-5">{inactiveData.location}</td>

                      <td className="text-start px-2 py-5">
                        <div className="flex items-center space-x-2">
                          {/* Eye Button */}
                          <div
                            title="View Provider Details"
                            onClick={() => openViewProviderPopup(inactiveData)}
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
                            onClick={() => openDeleteProviderPopup(inactiveData)}
                            className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200">
                            <RiDeleteBinLine className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />
                          </div>

                          {/* Check Button */}
                          <div
                            title="Activate Salon"
                            onClick={() => handleActionSubmit(inactiveData.salon_id, "Active")}
                            className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200"
                          >
                            <FaCheck className="text-[20px] text-mindfulBlack group-hover:text-mindfulGreen" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))) : (
                  <tr>
                    <td colSpan={7} className="text-gray-500 text-center px-2 py-5">
                      No Inactive Users Data available
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
  )
}
