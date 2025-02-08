import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Pagination } from "../../common/Pagination";
import { EditServicePopup } from "./AddServices/EditServicePopup";
import { fetchProvidersList } from "../../api/apiConfig";

// Proptypes frpm API
interface ActiveUsersProps {
    count: number;
    next: string | null;
    previous: string | null;
    salon_id: number;
    salon_name: string;
    email: string;
    mobile: string;
    owner_name: string | null;
    location: string | null;
}

export const ActiveUsers = () => {

    const [activeUsersData, setActiveUsersData] = useState<ActiveUsersProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [showEditServicePopup, setShowEditServicePopup] = useState(false);

    const openEditService = () => {
        setShowEditServicePopup(!showEditServicePopup)
    }

    const closeEditService = () => {
        setShowEditServicePopup(false)
    }

    // Fetching data from API
    useEffect(() => {
        const fetchActiveUsersData = async () => {
            setLoading(true);

            try {
                const response = await fetchProvidersList("Active");
                setActiveUsersData(response.results.data);

                console.log("Active Users Data log:", response);

            } catch (error: any) {
                setError(error.message || "Unable to fetch active users data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchActiveUsersData();
    }, []);



    return (
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
                            ) : error ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-5">
                                        Error: {error}
                                    </td>
                                </tr>
                            ) : activeUsersData.length > 0 ? (
                                activeUsersData.map((activeData) => (

                                    <tr key={activeData.salon_id} className="border-b-2 border-mindfulGreyTypeTwo">
                                        <td className="text-start px-2 py-5">{activeData.salon_id}</td>
                                        <td className="text-start px-2 py-5">{activeData.salon_name}</td>
                                        <td className="text-start px-2 py-5">{activeData.email}</td>
                                        <td className="text-start px-2 py-5">{activeData.mobile}</td>
                                        <td className="text-start px-2 py-5">{activeData.owner_name}</td>
                                        <td className="text-start px-2 py-5">{activeData.location}</td>

                                        <td className="text-start px-2 py-5">
                                            <div className="flex items-center space-x-2">
                                                {/* Eye Button */}
                                                <div
                                                    className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e6f2ff] transition-colors duration-200">
                                                    <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack group-hover:text-mindfulSecondaryBlue" />
                                                </div>

                                                {/* Edit Button */}
                                                <div className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200">
                                                    <BiEditAlt className="text-[20px] text-mindfulBlack group-hover:text-mindfulGreen" />
                                                </div>

                                                {/* Delete Button */}
                                                <div
                                                    onClick={openEditService}
                                                    className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200">
                                                    <RiDeleteBinLine className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan={7} className="text-gray-500 text-center px-2 py-5">
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

                {showEditServicePopup && <EditServicePopup closePopup={closeEditService} />}
                {/* Pagination */}
                <div>
                    <Pagination />
                </div>
                {/* </div> */}

                {/* </div> */}
            </div>
        </div>
    )
}
