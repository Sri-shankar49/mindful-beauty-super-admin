import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Pagination } from "../../common/Pagination";
// import { EditServicePopup } from "./AddServices/EditServicePopup";
import { pendingAction } from "../../api/apiConfig";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchActiveUserList, setCurrentPage, setLoading } from "../../redux/activeUserSlice";
import { DeleteProviderPopup } from "./DeleteProviderPopup";
import { ViewProvider } from "./ViewProvider";
import { NotifyError } from "../../common/Toast/ToastMessage";
import { Button } from "../../common/Button";
import { ViewBranchPopup } from "./ViewBranchPopup";

// Proptypes frpm API
// interface ActiveUsersProps {
//     count: number;
//     next: string | null;
//     previous: string | null;
//     salon_id: number;
//     salon_name: string;
//     email: string;
//     mobile: string;
//     owner_name: string | null;
//     location: string | null;
// }

export const ActiveUsers = () => {

    // const [activeUsersData, setActiveUsersData] = useState<ActiveUsersProps[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    // const [totalItems, setTotalItems] = useState(0);

    // Pagination state
    // const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // const [showEditServicePopup, setShowEditServicePopup] = useState(false);

    const [showViewProviderPopup, setShowViewProviderPopup] = useState(false);

    const [showViewBranchPopup, setShowViewBranchPopup] = useState(false);

    const [showDeleteProviderPopup, setShowDeleteProviderPopup] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<any>(null);

    // const openEditService = () => {
    //     setShowEditServicePopup(!showEditServicePopup)
    // }

    // const closeEditService = () => {
    //     setShowEditServicePopup(false)
    // }

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
    //     const fetchActiveUsersData = async () => {
    //         setLoading(true);

    //         try {
    //             const response = await fetchProvidersList("Active", currentPage);

    //             setActiveUsersData(response.results.data);
    //             setTotalItems(response.count);

    //             console.log("Active Users Data log:", response);

    //             console.log("Fetched Active Users List pagination count data log :", response.count);

    //         } catch (error: any) {
    //             setError(error.message || "Unable to fetch active users data. Please try again later.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchActiveUsersData();
    // }, [currentPage, itemsPerPage]);



    const dispatch = useDispatch<AppDispatch>();

    // ✅ Get provider from Redux
    // const provider = useSelector((state: RootState) => state.activeUser.serviceTypeID);

    // Redux state
    const { activeUserData, loading, searchQuery, currentPage, totalItems, serviceTypeID } = useSelector((state: RootState) => state.activeUser);

    // Fetch active Users list on mount and when dependencies change
    useEffect(() => {
        dispatch(setLoading(true)); // Ensure UI updates before fetching
        dispatch(fetchActiveUserList({ status: "Active", searchQuery, currentPage, pageSize: itemsPerPage, serviceTypeID: Number(serviceTypeID) })).catch((error) => {
            console.error("Error fetching active users list:", error);
            // dispatch(setError(error.message));
            NotifyError(error.message || "Failed to fetch active users. Please try again."); // ✅ Show error via toast
        });
    }, [dispatch, searchQuery, currentPage, itemsPerPage, serviceTypeID]);  // ✅ Added provider as dependency


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
            console.log("Pending Action Data log based on Active Users:", data);

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
    //     try {
    //         const response = await fetchProvidersList("Active", currentPage);
    //         setActiveUsersData(response.results.data);
    //         setTotalItems(response.count);

    //         console.log("Active Users list data refreshed:", response);
    //     } catch (error: any) {
    //         console.error("Error refreshing active users data:", error.message);
    //     }
    // }

    // Refresh function call according to Redux state
    const refreshedData = async () => {
        try {
            dispatch(setLoading(true)); // ✅ Show loading state before fetching

            await dispatch(fetchActiveUserList({ status: "Active", searchQuery, currentPage, pageSize: itemsPerPage, serviceTypeID: Number(serviceTypeID) }));

            console.log("Active Users list data refreshed.");
        } catch (error: any) {
            console.error("Error refreshing active users data:", error.message);
            // dispatch(setError(error.message)); // ✅ Handle errors correctly
            NotifyError("Failed to refresh data. Please try again."); // ✅ Show error via toast
        }
    };




    return (
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
                                <th className="w-96 text-start px-2 py-3">Location</th>
                                <th className="text-start px-2 py-3">Action</th>
                                <th className="text-start px-2 py-3">View Branch</th>
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
                                //     <tr>
                                //         <td colSpan={9} className="text-center py-5">
                                //             Error: {error}
                                //         </td>
                                //     </tr>
                            ) : activeUserData.length > 0 ? (
                                activeUserData.map((activeData) => (

                                    <tr key={activeData.salon_id} className="border-b-2 border-mindfulGreyTypeTwo">
                                        <td className="text-start px-2 py-5">{activeData.salon_id}</td>
                                        <td className="text-start px-2 py-5">{activeData.salon_name}</td>
                                        <td className="text-start px-2 py-5">{activeData.service_type_name}</td>
                                        <td className="text-start px-2 py-5">{activeData.email}</td>
                                        <td className="text-start px-2 py-5">{activeData.mobile}</td>
                                        <td className="text-start px-2 py-5">{activeData.owner_name}</td>
                                        <td className="text-start px-2 py-5">{activeData.location}</td>

                                        <td className="text-start px-2 py-5">
                                            <div className="flex items-center space-x-2">
                                                {/* Eye Button */}
                                                <div
                                                    title="View Provider Details"
                                                    onClick={() => openViewProviderPopup(activeData)}
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
                                                    onClick={() => openDeleteProviderPopup(activeData)}
                                                    className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200">
                                                    <RiDeleteBinLine className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />
                                                </div>

                                                {/* Close Button */}
                                                <div
                                                    title="Deactivate Salon"
                                                    onClick={() => handleActionSubmit(activeData.salon_id, "Inactive")}
                                                    className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200"
                                                >
                                                    <IoClose className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />

                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-start px-2 py-5">
                                            <div>
                                                <Button
                                                    onClick={() => openViewBranchPopup(activeData)}
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
                                        No Active Users Data available
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
                                            onClick={openEditService}
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
    )
}
