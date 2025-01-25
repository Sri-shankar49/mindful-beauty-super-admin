import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Pagination } from "../../common/Pagination";

export const PendingRequests = () => {
  return (
    <div>
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
                  <tr className="border-b-2 border-mindfulGreyTypeTwo">
                    <td className="text-start px-2 py-5">SP001</td>
                    <td className="text-start px-2 py-5">Blossom Beauty Studio</td>
                    <td className="text-start px-2 py-5">blossomstudio@gmail.com</td>
                    <td className="text-start px-2 py-5">9876543210</td>
                    <td className="text-start px-2 py-5">Anjali Menon</td>
                    <td className="text-start px-2 py-5">Kochi, Ernakulam</td>

                    <td className="text-start px-2 py-5">
                      <div className="flex items-center space-x-2">
                        {/* Eye Button */}
                        <div
                          // onClick={openInvoicePopup}
                          className="border-2 border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer">
                          <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack" />
                        </div>

                        {/* Edit Button */}
                        <div className="border-2 border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer">
                          <BiEditAlt className="text-[20px] text-mindfulBlack" />
                        </div>

                        {/* Delete Button */}
                        <div className="border-2 border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer">
                          <RiDeleteBinLine className="text-[20px] text-mindfulBlack" />
                        </div>
                      </div>
                    </td>


                  </tr>

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
    </div>
  )
}
