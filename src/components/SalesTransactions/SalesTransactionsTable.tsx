import { useEffect, useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
// import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
// import { SelectField } from "@/common/SelectField";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
// import { PaymentDetailsPopup } from "./Completed/PaymentDetailsPopup";
// import { Button } from '@/common/Button';
// import { InputField } from '@/common/InputField';
import { BiCalendar } from "react-icons/bi";
import { InputField } from "../../common/InputField";
import { Button } from "../../common/Button";
import { Pagination } from "../../common/Pagination";
import { InvoicePopup } from "../Bookings/Completed/InvoicePopup";
import { fetchSalesTransactionsByFilters, salesTransactionsList } from "../../api/apiConfig";

// Proptypes from API
interface SalesTransactionProps {
    id: number;
    provider_id: number;
    date: string;
    amount: number;
    credits: number;
    type: string;
    payment_type: string;
    transaction_id: string;
    order_id: string;
    total_amount: number;
    status: string;
    pay_id: string;
    cgst: number;
    sgst: number;
    provider_name: string;
    owner_name: string;
    provider_phone: string;
    payment_mode: string;
    service_type: string;
}

export const SalesTransactionsTable = () => {

    const [salesTransactionsData, setSalesTransactionsData] = useState<SalesTransactionProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [totalItems, setTotalItems] = useState(0);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    // Add state variables to hold the input values
    const [orderID, setOrderID] = useState<string>("");
    const [providerName, setProviderName] = useState<string>("");
    const [providerMobile, setProviderMobile] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");


    // State Declaration for Invoice Popup
    const [showInvoicePopup, setShowInvoicePopup] = useState(false);

    const openInvoicePopup = () => {
        setShowInvoicePopup(!showInvoicePopup)
    }

    const closeInvoicePopup = () => {
        setShowInvoicePopup(false)
    }


    // Function Handler for loading data in initial Load
    useEffect(() => {
        // Fetch data from API
        const fetchSalesTransactionsListData = async () => {
            try {
                setLoading(true);
                const response = await salesTransactionsList(currentPage);

                setSalesTransactionsData(response.results || []);
                setTotalItems(response.count);

                console.log("Fetched Sales & Transactions List data log:", response);

                console.log("Fetched Sales & Transactions List pagination count data log :", response.count);

            } catch (error: any) {
                setError(error.message || "Failed to fetch Sales & Transactions list data.");
            } finally {
                setLoading(false);
            }
        };

        fetchSalesTransactionsListData();
    }, [currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (items: number) => {
        setItemsPerPage(items);
        setCurrentPage(1); // Reset to the first page when items per page changes
    };


    // Add the handleOnSubmit method
    const onSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetchSalesTransactionsByFilters(
                orderID,
                providerName,
                providerMobile,
                startDate,
                endDate,
            );
            console.log("Filtered Sales Transactions:", response);
            setSalesTransactionsData(response.results || []);
        } catch (error: any) {
            setError(error.message || "Failed to fetch filtered sales transactions.");
        } finally {
            setLoading(false);
        }
    }

    // Function Handler for clearing the search input fields
    const handleClearFields = async () => {
        setOrderID("");
        setProviderName("");
        setProviderMobile("");
        setStartDate("");
        setEndDate("");
        // Fetch default sales transactions without filters
        try {
            setLoading(true);
            const response = await salesTransactionsList(currentPage);
            setSalesTransactionsData(response.results || []);
        } catch (error: any) {
            setError(error.message || "Failed to fetch default sales transactions.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <div className="bg-mindfulLightPink h-dvh px-5 py-5" >

                <div className="bg-mindfulWhite px-5 py-5">

                    {/* Search Tab */}
                    <div>
                        <form action="" method="post">
                            <div>
                                <fieldset className="border-2 border-main rounded-[5px] px-5 py-5">
                                    <legend className="text-lg text-main font-semibold px-2">Search</legend>
                                    {/* <div className="border-2 border-main rounded-[5px] px-5 py-5"> */}
                                    <div className="flex items-end space-x-10">

                                        {/* Order ID */}
                                        <div>
                                            <label
                                                htmlFor="orderID"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                Order ID
                                            </label>

                                            <InputField
                                                label=""
                                                name="orderID"
                                                id="orderID"
                                                className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                                value={orderID}
                                                onChange={(e) => setOrderID(e.target.value)}
                                            />
                                        </div>

                                        {/* Salon / Freelancer Name */}
                                        <div>
                                            <label
                                                htmlFor="salonFreelancerName"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                Salon / Freelancer Name
                                            </label>

                                            <InputField
                                                label=""
                                                id="salonFreelancerName"
                                                name="salonFreelancerName"
                                                className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                                value={providerName}
                                                onChange={(e) => setProviderName(e.target.value)}
                                            />
                                        </div>

                                        {/* Mobile Number */}
                                        <div>
                                            <label
                                                htmlFor="providerMobile"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                Mobile Number
                                            </label>

                                            <InputField
                                                label=""
                                                id="providerMobile"
                                                name="providerMobile"
                                                className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                                value={providerMobile}
                                                onChange={(e) => setProviderMobile(e.target.value)}
                                            />
                                        </div>

                                        {/* Start Date */}
                                        <div>
                                            <label
                                                htmlFor="startDate"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                Start Date
                                            </label>

                                            {/* <div className="relative"> */}
                                            <InputField
                                                label=""
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                className="w-40 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                            {/* <BiCalendar className="text-[20px] text-mindfulBlack absolute top-2 right-1.5 cursor-pointer" /> */}
                                            {/* </div> */}
                                        </div>

                                        {/* End Date */}
                                        <div>
                                            <label
                                                htmlFor="endDate"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                End Date
                                            </label>

                                            {/* <div className="relative"> */}
                                            <InputField
                                                label=""
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                className="w-40 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                            {/* <BiCalendar className="text-[20px] text-mindfulBlack absolute top-2 right-1.5 cursor-pointer" /> */}

                                            {/* </div> */}
                                        </div>

                                        <div className="">
                                            <div className="flex items-center space-x-3">
                                                <Button
                                                    onClick={onSubmit}
                                                    buttonType="button"
                                                    buttonTitle="Show Orders"
                                                    className="bg-mindfulBlue text-mindfulWhite border-[1px] border-mindfulBlue rounded-[5px] px-5 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue hover:text-mindfulBlue"
                                                />
                                                <Button
                                                    onClick={handleClearFields}
                                                    buttonType="button"
                                                    buttonTitle="Clear"
                                                    className="bg-mindfulWhite text-mindfulBlack border-[1px] border-mindfulBlack rounded-[5px] px-5 py-1.5 cursor-pointer hover:bg-mindfulBlack hover:border-mindfulBlack hover:text-mindfulWhite"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </fieldset>
                            </div>
                        </form>
                    </div>

                    <div className="pb-5">
                        <div className="flex items-center justify-between">
                            {/* Sub Heading */}
                            <div>
                                <h5 className="text-3xl font-semibold py-5">Sales & Transactions</h5>
                            </div>

                            {/* Download CSV Button */}
                            <div>
                                <Button
                                    buttonType="button"
                                    buttonTitle="Download CSV"
                                    className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2"
                                />
                            </div>
                        </div>
                    </div>


                    <div>
                        <table className="w-full">
                            <thead className="bg-mindfulLightgrey">
                                <tr className="">
                                    <th className="text-start px-2 py-3">#</th>
                                    <th className="text-start px-2 py-3">Order ID</th>
                                    <th className="text-start px-2 py-3">Date</th>
                                    <th className="text-start px-2 py-3">Service Provider</th>
                                    <th className="text-start px-2 py-3">Owner</th>
                                    <th className="text-start px-2 py-3">Phone</th>
                                    <th className="text-start px-2 py-3">Credits</th>
                                    <th className="text-start px-2 py-3">Amount</th>
                                    <th className="text-start px-2 py-3">SGST</th>
                                    <th className="text-start px-2 py-3">CGST</th>
                                    <th className="text-start px-2 py-3">Total</th>
                                    <th className="text-start px-2 py-3">Pay Mode</th>
                                    <th className="text-start px-2 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Content */}
                                {loading ? (
                                    <tr>
                                        <td colSpan={14} className="text-center px-2 py-5">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : error ? (
                                    /* Error State */
                                    <tr>
                                        <td colSpan={14} className="text-center text-red-600 py-5">
                                            Error: {error}
                                        </td>
                                    </tr>
                                ) : salesTransactionsData.length > 0 ? (
                                    salesTransactionsData.map((transaction) => (
                                        <tr key={transaction.id} className="border-b-2 border-mindfulGreyTypeTwo">
                                            <td className="text-start px-2 py-5">{transaction.id}</td>
                                            <td className="text-start px-2 py-5">{transaction.pay_id}</td>
                                            <td className="text-start px-2 py-5">{transaction.date}</td>
                                            <td className="text-start px-2 py-5">{transaction.provider_name}</td>
                                            <td className="text-start px-2 py-5">{transaction.owner_name || "N/A"}</td>
                                            <td className="text-start px-2 py-5">{transaction.provider_phone}</td>
                                            <td className="text-start px-2 py-5">
                                                {/* <ul>
                                                    <li>Eyesbrows Threading</li>
                                                    <li>Forehead Threading</li>
                                                </ul> */}
                                                {transaction.credits}
                                            </td>
                                            <td className="text-start px-2 py-5">{transaction.amount}</td>
                                            <td className="text-start px-2 py-5">{transaction.sgst}</td>
                                            <td className="text-start px-2 py-5">{transaction.cgst}</td>
                                            <td className="text-start px-2 py-5">{transaction.total_amount}</td>
                                            <td className="text-start px-2 py-5">{transaction.payment_mode}</td>

                                            {/* <td className="text-start px-2 py-5">
                                        <div>
                                        <Button
                                            buttonType="button"
                                            buttonTitle={"Completed"}
                                            className="bg-[#e5ffec] text-md text-mindfulGreen font-semibold rounded-sm px-3 py-1"
                                        />
                                        </div>
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
                                        <td colSpan={14} className="text-center py-5">
                                            No transactions available.
                                        </td>
                                    </tr>
                                )
                                }

                            </tbody>
                        </table>
                    </div>

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
            </div>

            {showInvoicePopup && <InvoicePopup closePopup={closeInvoicePopup} />}

        </div>
    )
}
