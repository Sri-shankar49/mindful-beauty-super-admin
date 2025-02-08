import { NavLink, Outlet } from 'react-router-dom';
import { InputField } from '../common/InputField';
import { MdSearch } from 'react-icons/md';
// import { Button } from '@/common/Button'
// import { InputField } from '@/common/InputField'
// import { MdSearch } from 'react-icons/md'
// import { MdFormatListBulletedAdd } from "react-icons/md";
// import { SelectField } from '@/common/SelectField';
// import "../components/ServiceListing/ServiceListing.css"
// import { Pagination } from '@/common/Pagination';

export const ServiceProvider = () => {

  return (
    <div>
      <div>
        {/* <Outlet /> */}
        <div className="bg-mindfulLightPink px-5 py-5" >

          <div className="bg-mindfulWhite px-5 py-5">

            <div className="flex items-center justify-between">
              <div>
                {/* <NavLink to="ServiceList"> */}
                <h5 className="text-3xl font-semibold pb-5">Salons and Freelancers</h5>
                {/* </NavLink> */}
              </div>

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
                    className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                  />
                  <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="border-b-2 border-b-mindfulgrey pb-3.5">
              <div className="flex items-center">
                {/* Sub Menus */}
                <ul className="flex items-center space-x-10">

                  <NavLink
                    to="ActiveUsers"
                    className={({ isActive }) =>
                      isActive ? "active-sub-nav active" : undefined
                    }
                    aria-current="page"
                  >
                    <li>Active Users</li>
                  </NavLink>

                  <NavLink
                    to="PendingRequests"
                    className={({ isActive }) =>
                      isActive ? "active-sub-nav active" : undefined
                    }
                    aria-current="page"
                  >
                    <li>Pending Request</li>
                  </NavLink>

                  <NavLink
                    to="InactiveUsers"
                    className={({ isActive }) =>
                      isActive ? "active-sub-nav active" : undefined
                    }
                    aria-current="page"
                  >
                    <li>Inactive Users</li>
                  </NavLink>

                </ul>
              </div>
            </div>

            <Outlet />

          </div>
        </div>
      </div>
    </div>
  )
}
