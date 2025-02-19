import { NavLink, Outlet } from 'react-router-dom';

export const Coupons = () => {
    return (
        <div className="bg-mindfulLightPink h-dvh px-5 py-5" >

            <div className="bg-mindfulWhite px-5 py-5">

                <div>
                    <h5 className="text-3xl font-semibold pb-5">Coupons</h5>
                </div>

                <div className="border-b-2 border-b-mindfulgrey pb-2">

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

                </div>

                <Outlet />

            </div>


        </div>
    )
}
