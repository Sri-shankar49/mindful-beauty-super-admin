import { useState, useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Pagination } from "../../common/Pagination";
import { fetchProvidersList } from "../../api/apiConfig";
// import { EditServicePopup } from "./AddServices/EditServicePopup";


// Proptypes frpm API
interface InactiveUsersProps {
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

export const InactiveUsers = () => {

  const [inActiveUsersData, setInactiveUsersData] = useState<InactiveUsersProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  // Fetching data from API
  useEffect(() => {
    const fetchInactiveUsersData = async () => {
      setLoading(true);

      try {
        const response = await fetchProvidersList("Inactive");
        setInactiveUsersData(response.results.data);

        console.log("Inactive Users Data log:", response);

      } catch (error: any) {
        setError(error.message || "Unable to fetch inactive users data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchInactiveUsersData();
  }, []);


  return (
    <div>
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
                ) : inActiveUsersData.length > 0 ? (
                  inActiveUsersData.map((inactiveData) => (
                    <tr key={inactiveData.salon_id} className="border-b-2 border-mindfulGreyTypeTwo">
                      <td className="text-start px-2 py-5">{inactiveData.salon_id}</td>
                      <td className="text-start px-2 py-5">{inactiveData.salon_name}</td>
                      <td className="text-start px-2 py-5">{inactiveData.email}</td>
                      <td className="text-start px-2 py-5">{inactiveData.mobile}</td>
                      <td className="text-start px-2 py-5">{inactiveData.owner_name}</td>
                      <td className="text-start px-2 py-5">{inactiveData.location}</td>

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
                            // onClick={openEditService}
                            className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200">
                            <RiDeleteBinLine className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))) : (
                  <tr>
                    <td colSpan={7} className="text-gray-500 text-center px-2 py-5">
                      No Inactive Users Data available
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
                        // onClick={openEditService}
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

          {/* {showEditServicePopup && <EditServicePopup closePopup={closeEditService} />} */}
          {/* Pagination */}
          <div>
            <Pagination />
          </div>
          {/* </div> */}

          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
