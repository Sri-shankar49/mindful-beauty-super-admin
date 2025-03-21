import { NavLink, Outlet } from 'react-router-dom'
import { InputField } from '../../common/InputField'
// import { MdSearch } from 'react-icons/md'

export const ServicesCategories = () => {

    // Add this to check if we're on the Service Management page
    const showSearch = location.pathname.includes('ServiceManagement');

    return (
        <div>
            <div className="bg-mindfulLightPink px-5 py-5" >

                <div className="bg-mindfulWhite px-5 py-5">

                    <div>
                        <h5 className="text-3xl font-semibold pb-5">Services</h5>
                    </div>

                    <div className="border-b-2 border-b-mindfulgrey pb-2">
                        <div className="flex items-center justify-between">
                            {/* Sub Menus */}
                            <ul className="flex items-center space-x-10">
                                <NavLink
                                    to="Categories"
                                    className="active-sub-nav"
                                    aria-current="page"
                                >
                                    <li>Categories</li>
                                </NavLink>

                                <NavLink
                                    to="Subcategories"
                                    className="active-sub-nav"
                                    aria-current="page"

                                >
                                    <li>Sub Categories</li>
                                </NavLink>

                                <NavLink
                                    to="Services"
                                    className="active-sub-nav"
                                    aria-current="page"
                                >
                                    <li>Services</li>
                                </NavLink>
                            </ul>

                            <div>
                                <div className="relative">
                                    {/* <input
                                            type="text"
                                            name=""
                                            id=""
                                            className=''
                                        /> */}

                                    <InputField
                                        label={''}
                                        placeholder="Search"
                                        className={`${showSearch ? "invisible" : ""} w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none`}
                                    />
                                    {/* <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" /> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Outlet />

                </div>


            </div>
        </div>
    )
}
