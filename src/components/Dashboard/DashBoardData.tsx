// import { useState } from "react"
// import { SelectField } from "@/common/SelectField"
// import { Button } from "@/common/Button"
// import { AreaChart } from "@/components/Dashboard/DashBoardData/AreaChart"
// import { BarChart } from "@/components/Dashboard/DashBoardData/BarChart"
// import { RangeChart } from "@/components/Dashboard/DashBoardData/RangeChart"
// import { DenialPopup } from "@/components/Dashboard/DashBoardData/DenialPopup"
// import { StylistPopup } from "@/components/Dashboard/DashBoardData/StylistPopup"
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
import { useEffect, useState } from "react";
// import { SelectField } from "../../common/SelectField";
import { fetchDashboardList } from "../../api/apiConfig";
import { NavLink } from "react-router-dom";
// import { Button } from "../../common/Button";
// import { DenialPopup } from "./DashBoardData/DenialPopup";
// import { StylistPopup } from "./DashBoardData/StylistPopup";


// Define the type for each option
// interface StylistOption {
//     value: number;
//     text: string;
//     icon: string; // URL or path to the image
// }

// Proptypes frpm API
interface DashBoardDataProps {
    appointment_id: number;
    appointment_date: string;
    appointment_time: string;
    branch: number;
    user_name: string;
    user_phone: string;
    service_names: Services[];
    branch_city: string;
    stylist_name: string;
    stylist_id: string;
}

interface Services {
    service_name: string;
    price: number;
}

export const DashBoardData: React.FC<DashBoardDataProps> = () => {

    // const stylistData: StylistOption[] = [
    //     {
    //         value: 1,
    //         text: 'Swetha',
    //         icon: `${stylist}`
    //     },
    //     {
    //         value: 2,
    //         text: 'Swetha',
    //         icon: `${stylist}`
    //     },
    //     {
    //         value: 3,
    //         text: 'Swetha',
    //         icon: `${stylist}`
    //     },
    //     {
    //         value: 4,
    //         text: 'Swetha',
    //         icon: `${stylist}`
    //     }
    // ];


    // const [selectedStylistOption, setSelectedStylistOption] = useState<SingleValue<StylistOption>>(null);


    // handle onChange event of the dropdown
    // const handleStylistOption = (option: SingleValue<StylistOption>) => {
    //     setSelectedStylistOption(option);

    //     // Open Stylist Popup
    //     setShowStylistPopup(true);
    // };


    // State declaration for Denial Popup
    // const [showDenialPopup, setShowDenialPopup] = useState(false);

    // State declaration for Stylist Popup
    // const [showStylistPopup, setShowStylistPopup] = useState(false);

    // const openDenialPopup = () => {
    //     setShowDenialPopup(true);
    // }

    // const closeDenialPopup = () => {
    //     setShowDenialPopup(false);
    // }

    // const openStylistPopup = () => {
    //   setShowStylistPopup(true);
    // }

    // const closeStylistPopup = () => {
    //     setShowStylistPopup(false);
    // }


    const [dashboardData, setDashboardData] = useState<DashBoardDataProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);

            try {
                const response = await fetchDashboardList();
                setDashboardData(response.bookings);

                console.log("Dashboard Bookings Data log:", response);

            } catch (error: any) {
                setError(error.message || "Unable to fetch dashboard bookings data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardData();
    }, [])


    return (
        <div>
            {/* Heading & Sort */}
            <div className="pb-5">
                <div className="w-full flex items-center justify-between">
                    <div>
                        <h5 className="text-3xl font-semibold">Dashboard</h5>
                    </div>

                    <div>
                        {/* Sort */}
                        <div>
                            {/* <label
                                htmlFor="sort"
                                className="text-md text-mindfulBlack font-semibold mb-1"
                            >
                                Sort
                            </label>
                            <SelectField
                                label={''}
                                name="sort"
                                id="sort"
                                options={[
                                    { value: "a-z", label: "A-Z" },
                                    { value: "z-a", label: "Z-A" },
                                ]}
                                className="w-72 rounded-sm border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                            /> */}
                        </div>
                    </div>
                </div>
            </div>



            {/* Charts & Booking Table */}
            <div className="grid grid-cols-1 gap-5">

                {/* Grid Column One -- --> Charts  */}
                {/* <div>
                    <div>
                        <h5 className="text-lg font-semibold py-5">Overview</h5>
                    </div>


                    <div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="border-[1px] border-mindfulgrey rounded-md px-2 py-2">
                                <AreaChart />
                            </div>

                            <div className="border-[1px] border-mindfulgrey rounded-md px-2 py-2">
                                <BarChart />
                            </div>

                            <div className="border-[1px] border-mindfulgrey rounded-md px-2 py-2">
                                <RangeChart />
                            </div>

                            <div className="border-[1px] border-mindfulgrey rounded-md px-2 py-2">
                                <BarChart />
                            </div>
                        </div>
                    </div>
                </div> */}


                {/* Grid Column Two -- --> Booking Table  */}
                <div className="col-span-2">

                    <div className="flex items-center justify-between">
                        <div>
                            <h5 className="text-lg text-mindfulBlack font-semibold py-5">Bookings</h5>
                        </div>

                        <div>
                            <NavLink to="/Bookings/BookingStatus/AllBooking">
                                <p className="text-lg text-main font-semibold underline hover:no-underline">View All Booking</p>
                            </NavLink>
                        </div>
                    </div>

                    <div>
                        <table className="w-full border-[1px] border-mindfulGreyTypeTwo rounded-lg px-2 py-2">
                            <thead className="bg-mindfulLightgrey border-b-[1px] border-mindfulGreyTypeTwo">
                                <tr className="">
                                    <th className="w- text-start px-2 py-3">Booking ID</th>
                                    <th className="w- px-2 py-3">Date</th>
                                    <th className="w- px-2 py-3">Time</th>
                                    <th className="w- px-2 py-3">Branch</th>
                                    <th className="w- text-start px-2 py-3">Cust. Name</th>
                                    <th className="w- text-start px-2 py-3">Cust. Mobile</th>
                                    <th className="w- text-start px-2 py-3">Service</th>
                                    <th className="w- text-start px-2 py-3">Assign Stylist</th>
                                    {/* <th className="w- text-start px-2 py-3">Action</th> */}
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
                                ) : dashboardData.length > 0 ? (
                                    dashboardData.map((data) => (
                                        <tr key={data.appointment_id} className="border-b-2 border-mindfulGreyTypeTwo pb-2">
                                            <td className="px-2 py-5">{data.appointment_id}</td>
                                            <td className="text-start px-2 py-5">{data.appointment_date}</td>
                                            <td className="text-start px-2 py-5">{data.appointment_time}</td>
                                            <td className="text-start px-2 py-5">{data.branch_city}</td>
                                            <td className="text-start px-2 py-5">{data.user_name}</td>
                                            <td className="text-start px-2 py-5">{data.user_phone}</td>
                                            <td className="text-start px-2 py-5">
                                                <ul >
                                                    {data.service_names.map((service, index) => (
                                                        <li key={index}>{service.service_name}</li>
                                                    ))}
                                                </ul>
                                            </td>

                                            <td className="text-start px-2 py-5">
                                                {data.stylist_name || "N/A"}
                                            </td>

                                            {/* <td className="text-center px-2 py-5">
                                    <div className="space-y-3">

                                        <div>
                                            <Button
                                                buttonType="button"
                                                buttonTitle="Accept"
                                                className="w-20 text-md text-mindfulGreen font-semibold border-[1px] border-mindfulGreen rounded-[5px] px-3 py-1"
                                            />
                                        </div>

                                        <div>
                                            <Button
                                                onClick={openDenialPopup}
                                                buttonType="button"
                                                buttonTitle="Deny"
                                                className="w-20 text-md text-mindfulBlue font-semibold border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1"
                                            />
                                        </div>

                                        <div>
                                            <Button
                                                onClick={openDenialPopup}
                                                buttonType="button"
                                                buttonTitle="Decline"
                                                className="w-20 text-md text-mindfulRed font-semibold border-[1px] border-mindfulRed rounded-[5px] px-3 py-1"
                                            />
                                        </div>
                                    </div>
                                </td> */}


                                        </tr>
                                    ))) : (
                                    <tr>
                                        <td colSpan={7} className="text-gray-500 text-center px-2 py-5">
                                            No Active Users Data available
                                        </td>
                                    </tr>
                                )
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* {showDenialPopup && <DenialPopup closePopup={closeDenialPopup} />}
            {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />} */}

        </div >


    )
}
