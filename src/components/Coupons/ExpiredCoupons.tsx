import { useEffect, useState } from 'react'
// import resetPasswordButton from "../../assets/icons/resetPasswordButton.png"
// import { Button } from '@/common/Button'
import { ViewCoupon } from './ViewCoupon'
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';
// import { SelectField } from '../../common/SelectField';
import { Pagination } from '../../common/Pagination';
import { expiredCouponList } from '../../api/apiConfig';
import { DeleteCouponPopup } from './DeleteCouponPopup';
import { EditCoupon } from './EditCoupon';

// Proptypes from API
interface ExpiredCouponsProps {
    count: number;
    next: string;
    previous: string;
    id: number;
    coupon_code: string;
    coupon_limit: number;
    valid_from: string;
    valid_until: string;
    discount_type: string;
    discount_value: string;
    status: string;
    status_id: number;
    created_datetime: string;
    provider: number | null;
}

export const ExpiredCoupons = () => {

    const [expiredCouponData, setExpiredCouponData] = useState<ExpiredCouponsProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [totalItems, setTotalItems] = useState(0);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [showViewCouponPopup, setShowViewCouponPopup] = useState(false);
    const [showEditCouponPopup, setShowEditCouponPopup] = useState(false);


    const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
    const [showDeleteCouponPopup, setShowDeleteCouponPopup] = useState(false);

    const openViewCouponPopup = (couponDetails: any) => {
        setSelectedCoupon(couponDetails);
        setShowViewCouponPopup(true);
        console.log("Viewing the coupon", couponDetails);

    }

    const closeViewCouponPopup = () => {
        setShowViewCouponPopup(false);
    }

    const openEditCouponPopup = (couponDetails: any) => {
        setSelectedCoupon(couponDetails);
        setShowEditCouponPopup(true);
        console.log("Editing the coupon", couponDetails);
    }

    const closeEditCouponPopup = () => {
        setShowEditCouponPopup(false);
    }


    const openDeleteCouponPopup = (couponDetails: any) => {
        setSelectedCoupon(couponDetails);
        setShowDeleteCouponPopup(true);
        console.log("Deleting the coupon", couponDetails);
    }

    const closeDeleteCouponPopup = () => {
        setShowDeleteCouponPopup(false);
    }


    useEffect(() => {

        const fetchExpiredCouponsData = async () => {
            setLoading(true);

            try {
                const response = await expiredCouponList(currentPage, 0, "");

                setExpiredCouponData(response.results.data);
                setTotalItems(response.count);

                console.log("Expired Coupons Data log:", response);

                console.log("Fetched Expired Coupons Data List pagination count data log :", response.count);

            } catch (error: any) {
                setError(error.message || "Unable to fetch expired coupons data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchExpiredCouponsData();
    }, [currentPage, itemsPerPage]);


    // Filter the Coupon Data by Status
    const [status, setStatus] = useState<number>(0); // Default to "Active"

    const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = Number(event.target.value); // Convert to number
        setStatus(selectedStatus);
    };

    // Filter the Coupon Data by Month
    const [month, setMonth] = useState<string>(""); // Default to "Active"

    const handleMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMonth = event.target.value;
        setMonth(selectedMonth);
    };



    // Function after handling the Status & Month
    useEffect(() => {
        const fetchFilteredData = async () => {
            setLoading(true);

            try {
                const response = await expiredCouponList(currentPage, status, month);

                setExpiredCouponData(response.results.data);
                setTotalItems(response.count);

                console.log("Expired Coupon Data log:", response);

                console.log("Fetched Expired Coupons Data List pagination count data log :", response.count);

            } catch (error: any) {
                setError(error.message || "Unable to fetch expired coupons data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        // Fetch only if a status is selected
        if (status || month) {
            fetchFilteredData();
        }

    }, [status, month, currentPage]);



    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (items: number) => {
        setItemsPerPage(items);
        setCurrentPage(1); // Reset to the first page when items per page changes
    };


    // Refreshing the data on handleActionSubmit
    const refreshedData = async () => {
        try {
            const response = await expiredCouponList(currentPage, status, month);
            setExpiredCouponData(response.results.data);
            setTotalItems(response.count);

            console.log("Expired Coupon list data refreshed:", response);
        } catch (error: any) {
            console.error("Error refreshing Expired Coupon list data:", error.message);
        }
    }


    return (
        <div>

            <div className="flex items-center justify-end space-x-6 mt-5">

                {/* Main Category */}
                <div>
                    {/* <SelectField
                        // onChange={openStylistPopup}
                        label=""
                        name="status"
                        // required
                        className="w-40 rounded-[5px] border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
                        options={[
                            { value: "byStatus", label: "By Status" },
                            { value: "1", label: "Active" },
                            { value: "2", label: "Inactive" },
                        ]}
                        onChange={handleStatus} // Handle status change
                    // error="This field is required."
                    /> */}

                    <select
                        // name=""
                        id=""
                        className="w-40 rounded-[5px] border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
                        value={status}
                        onChange={handleStatus} // Call on change
                    >
                        <option value="0" disabled>By Status</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                        {/* <option value="expired">Expired</option> */}
                    </select>
                </div>

                {/* Sub Category */}
                <div>
                    {/* <SelectField
                        // onChange={openStylistPopup}
                        label=""
                        name="month"
                        // required
                        className="w-40 rounded-[5px] border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
                        options={[
                            { value: "byMonth", label: "By Month" },
                            { value: "jan", label: "Jan" },
                            { value: "feb", label: "Feb" },
                            { value: "mar", label: "Mar" },
                            { value: "apr", label: "Apr" },
                            { value: "may", label: "May" },
                            { value: "jun", label: "Jun" },
                            { value: "jul", label: "Jul" },
                            { value: "aug", label: "Aug" },
                            { value: "sep", label: "Sep" },
                            { value: "oct", label: "Oct" },
                            { value: "nov", label: "Nov" },
                            { value: "dec", label: "Dec" },
                        ]}
                    // error="This field is required."
                    /> */}

                    <select
                        // name="subCategory"
                        id="subCategory"
                        className="w-40 rounded-[5px] border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
                        value={month}
                        onChange={handleMonth}
                    >
                        <option value="" disabled>By Month</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                    </select>
                </div>


            </div>


            <div className="pt-5">
                <table className="w-full">
                    <thead className="bg-mindfulLightgrey">
                        <tr className="">

                            <th className="text-start px-2 py-3">Coupon Name</th>
                            <th className="text-start px-2 py-3">Discount Type</th>
                            <th className="text-start px-2 py-3">Coupon Limit</th>
                            <th className="text-start px-2 py-3">Value</th>
                            <th className="text-start px-2 py-3">Start Date</th>
                            <th className="text-start px-2 py-3">End Date</th>
                            <th className="text-start px-2 py-3">Status</th>
                            <th className="text-start px-2 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Heading */}
                        {/* <tr>
                            <th colSpan={4} className="bg-mindfulLightgrey text-start px-2 py-4">Heading 1</th>
                        </tr> */}

                        {/* Content & Checkbox */}
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="text-center py-5">Loading...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={8} className="text-red-500 text-center py-5">Error: {error}</td>
                            </tr>
                        ) : (
                            expiredCouponData.length > 0 ? (
                                expiredCouponData.map((coupon) => (
                                    <tr key={coupon.id} className="border-b-2 border-mindfulGreyTypeTwo">

                                        <td className="text-start px-2 py-5">{coupon.coupon_code}</td>
                                        <td className="text-start px-2 py-5">{coupon.discount_type}</td>
                                        <td className="text-start px-2 py-5">{coupon.coupon_limit}</td>
                                        <td className="text-start px-2 py-5">{coupon.discount_value}</td>
                                        <td className="text-start px-2 py-5">{coupon.valid_from}</td>
                                        <td className="text-start px-2 py-5">{coupon.valid_until}</td>
                                        <td className="text-start px-2 py-5">
                                            {coupon.status}
                                            {/* {coupon.status_id === 1 ? "Active" : "Inactive"} */}
                                        </td>

                                        <td className="px-2 py-5">
                                            <div className="flex items-center space-x-2">
                                                {/* Eye Button */}
                                                <div
                                                    title="View Coupon Details"
                                                    onClick={() => openViewCouponPopup(coupon)}
                                                    // onClick={() => openViewProviderPopup(activeData)}
                                                    className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e6f2ff] transition-colors duration-200">
                                                    <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack group-hover:text-mindfulSecondaryBlue" />
                                                </div>

                                                {/* Edit Button */}
                                                <div
                                                    onClick={() => openEditCouponPopup(coupon)}
                                                    className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200"
                                                >
                                                    <BiEditAlt className="text-[20px] text-mindfulBlack group-hover:text-mindfulGreen" />
                                                </div>

                                                {/* Delete Button */}
                                                <div
                                                    title="Delete Coupon"
                                                    onClick={() => openDeleteCouponPopup(coupon)}
                                                    className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200">
                                                    <RiDeleteBinLine className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />
                                                </div>

                                            </div>
                                        </td>


                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-5">No Expired Coupons Data Found</td>
                                </tr>

                            ))}

                    </tbody>
                </table>
            </div>

            {showViewCouponPopup && selectedCoupon && <ViewCoupon closePopup={closeViewCouponPopup} couponData={selectedCoupon} />}

            {showEditCouponPopup && selectedCoupon && <EditCoupon closePopup={closeEditCouponPopup} couponData={selectedCoupon} refreshData={refreshedData} />}

            {showDeleteCouponPopup && selectedCoupon && <DeleteCouponPopup closePopup={closeDeleteCouponPopup} couponData={selectedCoupon} refreshData={refreshedData} />}


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
