import { useState } from "react";
import { FaBell } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import mindfulBeautyLogoSmall from "../assets/icons/mindfulBeautyLogoSmall.png";
// import ashtamudiLogo from "../assets/icons/ashtamudiLogo.png";
import { Link, NavLink } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";

export const Header = () => {

    const [profileHover, setProfileHover] = useState(false);
    const [moreHover, setMoreHover] = useState(false);


    const handleMouseEnter = () => {
        setProfileHover(true);
    };

    const handleMouseLeave = () => {
        setProfileHover(false);
    }

    const handleMoreMouseEnter = () => {
        setMoreHover(true);
    };

    const handleMoreMouseLeave = () => {
        setMoreHover(false);
    };

    return (
        <header>

            <div className="backdrop-blur-lg bg-opacity-100 shadow-md px-10 py-5">
                <div className="flex justify-between items-center">
                    {/* Admin Logo */}
                    <div className="flex justify-center items-center space-x-3">
                        {/* Mindful Beauty Logo */}
                        <Link to="/Dashboard">
                            <div>
                                <img src={mindfulBeautyLogoSmall} alt="mindful beauty logo" />
                            </div>
                        </Link>

                        {/* Vertical line
                        <div className="bg-mindfulgrey w-[1px] h-10"></div>

                        Astamudi Wellness Logo
                        <div>
                            <img src={ashtamudiLogo} alt="ashtamudi logo" />
                        </div> */}
                    </div>

                    {/* Navbar Menu */}
                    <div>
                        <nav className="">
                            <ul className="flex items-center space-x-10">

                                {/* Dashboard */}
                                <NavLink
                                    to="/Dashboard"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Dashboard</li>
                                </NavLink>

                                {/* Manage Role */}
                                <NavLink
                                    to="/ManageRole"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Manage Role</li>
                                </NavLink>

                                {/* Service Listing */}
                                <NavLink
                                    to="/ServiceProvider"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Service Provider</li>
                                </NavLink>

                                {/* Service Management */}
                                <NavLink
                                    to="/ServiceManagement"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Service Management</li>
                                </NavLink>

                                {/* Bookings */}
                                <NavLink
                                    to="/Bookings"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Bookings</li>
                                </NavLink>

                                {/* Sales & Transactions */}
                                <NavLink
                                    to="/SalesTransactions"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Sales & Transactions</li>
                                </NavLink>

                                {/* Ratings & Reviews */}
                                <NavLink
                                    to="/RatingsReviews"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Ratings & Reviews</li>
                                </NavLink>

                                {/* Reports */}
                                <NavLink
                                    to="/Reports"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Reports</li>
                                </NavLink>

                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-5">

                        {/* Notification Bell Icon */}
                        <div className="group bg-mindfulBlue border-[1px] border-mindfulBlue rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-white transition-colors duration-200">
                            <FaBell className="text-[22px] text-mindfulWhite group-hover:text-mindfulBlue" />
                        </div>

                        {/* User Profile Icon */}
                        <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="cursor-pointer"
                        >
                            <div className="group bg-mindfulBlue border-[1px] border-mindfulBlue rounded-full w-12 h-12 flex items-center justify-center hover:bg-white transition-colors duration-200">
                                <FaUserLarge className="text-[22px] text-mindfulWhite group-hover:text-mindfulBlue" />

                                <div>
                                    {profileHover && (
                                        <div className="absolute bottom-[-7.7rem] right-10 mt-2 w-40 bg-mindfulWhite rounded-md shadow-lg py-1 z-20">
                                            <Link
                                                to="/MyAccount"
                                                aria-current="page"
                                            // className="active-nav"
                                            >
                                                <div className="px-4 py-3 text-mindfulBlack hover:bg-gray-100">
                                                    My Profile
                                                </div>
                                            </Link>

                                            {/* <Link to=""> */}
                                            <div className="px-4 py-3 text-mindfulBlack hover:bg-gray-100">
                                                Password Reset
                                            </div>
                                            {/* </Link> */}

                                            {/* <Link to=""> */}
                                            <div
                                                // onClick={handleLogout}
                                                className="px-4 py-3 text-mindfulBlack hover:bg-gray-100"
                                            >
                                                Sign Out
                                            </div>
                                            {/* </Link> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* More Details Icon */}
                        <div
                            onMouseEnter={handleMoreMouseEnter}
                            onMouseLeave={handleMoreMouseLeave}
                            className="cursor-pointer"
                        >
                            <div
                                className="group bg-mindfulBlue border-[1px] border-mindfulBlue rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-white transition-colors duration-200">
                                <FiMoreVertical className="text-[22px] text-mindfulWhite group-hover:text-mindfulBlue" />

                                <div>
                                    {moreHover && (
                                        <div className="absolute bottom-[-4.7rem] right-10 mt-2 w-48 bg-mindfulWhite rounded-md shadow-lg py-1 z-20">
                                            <Link
                                                to="/WalletManagement"
                                                aria-current="page"
                                            // className="active-nav"
                                            >
                                                <div className="px-4 py-3 text-mindfulBlack hover:bg-gray-100">
                                                    Wallet Management
                                                </div>
                                            </Link>

                                            <Link to="/Coupons">
                                                <div className="px-4 py-3 text-mindfulBlack hover:bg-gray-100">
                                                    Coupons
                                                </div>
                                            </Link>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </header>
    )
}
