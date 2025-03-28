import { NavLink, Outlet } from 'react-router-dom';
import { InputField } from '../common/InputField';

export const Coupons = () => {
    return (
        <div className="bg-mindfulLightPink px-5 py-5" >

            <div className="bg-mindfulWhite px-5 py-5">

                <div>
                    <h5 className="text-3xl font-semibold pb-5">Coupons</h5>
                </div>

                <div className="border-b-2 border-b-mindfulgrey pb-2">

                    <div className="flex items-center justify-between">
                        {/* Sub Menus */}
                        <ul className="flex items-center space-x-10">
                            <NavLink
                                to="ListCoupons"
                                className={({ isActive }) =>
                                    isActive ? "active-sub-nav  active" : undefined
                                }
                                aria-current="page"
                            >
                                <li>List Coupons</li>
                            </NavLink>

                            <NavLink
                                to="AddCoupon"
                                className={({ isActive }) =>
                                    isActive ? "active-sub-nav active" : undefined
                                }
                                aria-current="page"
                            >
                                <li>Add Coupons</li>
                            </NavLink>

                            <NavLink
                                to="ExpiredCoupons"
                                className={({ isActive }) =>
                                    isActive ? "active-sub-nav active" : undefined
                                }
                                aria-current="page"
                            >
                                <li>Expired Coupons</li>
                            </NavLink>

                        </ul>

                        <div>
                            <div className="">
                                <InputField
                                    label={''}
                                    placeholder="Search"
                                    className={`invisible w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none`}
                                // value={searchQuery}
                                // onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <Outlet />

            </div>


        </div>
    )
}
