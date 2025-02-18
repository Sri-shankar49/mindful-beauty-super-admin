import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { InputField } from '../common/InputField';
// import { MdSearch } from 'react-icons/md';
// import { Button } from '@/common/Button'
// import { InputField } from '@/common/InputField'
// import { MdSearch } from 'react-icons/md'
// import { MdFormatListBulletedAdd } from "react-icons/md";
// import { SelectField } from '@/common/SelectField';
// import "../components/ServiceListing/ServiceListing.css"
// import { Pagination } from '@/common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setSearchQuery as setactiveUserSearchQuery } from '../redux/activeUserSlice';
import { setSearchQuery as setpendingRequestSearchQuery } from '../redux/pendingRequestSlice';
import { setSearchQuery as setInactiveUserSearchQuery } from '../redux/inactiveUserSlice';


export const ServiceProvider = () => {

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();


  // Determine current tab and fetch appropriate search state
  // Determine which tab is active
  const isActiveUsersTab = location.pathname.includes('ActiveUsers');
  const isPendingRequestTab = location.pathname.includes('PendingRequests');
  const isInactiveUsersTab = location.pathname.includes('InactiveUsers');

  // Get searchQuery from Redux state
  // const searchQuery = useSelector((state: RootState) => state.activeUser.searchQuery);
  // Get search query from Redux state
  const activeUsersSearchQuery = useSelector((state: RootState) => state.activeUser.searchQuery);
  const pendingRequestSearchQuery = useSelector((state: RootState) => state.pendingRequest.searchQuery);
  const inactiveUsersSearchQuery = useSelector((state: RootState) => state.inactiveUser.searchQuery);


  const searchQuery =
    isActiveUsersTab ? activeUsersSearchQuery :
      isPendingRequestTab ? pendingRequestSearchQuery :
        isInactiveUsersTab ? inactiveUsersSearchQuery :
          '';



  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (isActiveUsersTab) {
      dispatch(setactiveUserSearchQuery(value));
    } else if (isPendingRequestTab) {
      dispatch(setpendingRequestSearchQuery(value));
    } else if (isInactiveUsersTab) {
      dispatch(setInactiveUserSearchQuery(value));
    }
  };


  return (
    <div>
      <div>
        {/* <Outlet /> */}
        <div className="bg-mindfulLightPink px-5 py-5" >

          <div className="bg-mindfulWhite px-5 py-5">

            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-3xl font-semibold pb-5">Salons and Freelancers</h5>
              </div>

              <div>
                <div className="">
                  {/* <input
                                type="text"
                                name=""
                                id=""
                                className=''
                              /> */}
                  <InputField
                    label={''}
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                  />
                  {/* <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" /> */}
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
