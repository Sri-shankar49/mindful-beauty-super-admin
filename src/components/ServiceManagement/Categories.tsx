import { useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import { Button } from "@/common/Button";
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
import { Button } from "../../common/Button";
import { Pagination } from "../../common/Pagination";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
// import { SelectField } from "@/common/SelectField";
// import { Pagination } from "@/common/Pagination";

// Define the type for each option
// interface StylistOption {
//   value: number;
//   text: string;
//   icon: string; // URL or path to the image
// }

export const Categories = () => {


  // const stylistData: StylistOption[] = [
  //   {
  //     value: 1,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   },
  //   {
  //     value: 2,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   },
  //   {
  //     value: 3,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   },
  //   {
  //     value: 4,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   }
  // ];


  // State declaration for Stylist Popup
  const [showStylistPopup, setShowStylistPopup] = useState(false);


  // const openStylistPopup = () => {
  //   setShowStylistPopup(true);
  // }

  const closeStylistPopup = () => {
    setShowStylistPopup(false);
  }
  // const [selectedStylistOption, setSelectedStylistOption] = useState<SingleValue<StylistOption>>(null);


  // handle onChange event of the dropdown
  // const handleStylistOption = (option: SingleValue<StylistOption>) => {
  //   setSelectedStylistOption(option);

  //   // Open Stylist Popup
  //   setShowStylistPopup(true);
  // };

  // const [showEditServicePopup, setShowEditServicePopup] = useState(false);

  // const openEditService = () => {
  //   setShowEditServicePopup(!showEditServicePopup)
  // }

  // const closeEditService = () => {
  //   setShowEditServicePopup(false)
  // }

  return (
    <div>

      {/* Sub Heading */}
      {/* <div>
        <h5 className="text-3xl font-semibold py-5">Booking List</h5>
      </div> */}

      <div>

        <div className="flex items-center justify-end">
          {/* Add Service */}
          {/* <Link to="/ServiceListing/PackagesList/AddPackages"> */}
          <div
            // onClick={openBranchPopup}
            className="w-fit flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer mt-5 hover:bg-mindfulWhite hover:border-mindfulBlue group"
          >
            <div>
              <MdFormatListBulletedAdd className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
            </div>

            <Button
              buttonType="button"
              buttonTitle="Add Category"
              className="bg-mindfulBlue text-mindfulWhite pl-2 cursor-pointer group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
            />
          </div>
          {/* </Link> */}
        </div>



        <div className="py-5">

          <table className="w-full">
            <thead className="bg-mindfulLightgrey">
              <tr className="">
                <th className="w-5/6 text-start px-2 py-3">Category</th>
                <th className="w-1/6 text-start px-2 py-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {/* Content */}
              <tr className="border-b-2 border-mindfulGreyTypeTwo">
                <td className="text-start px-2 py-5">Hair</td>
                <td className="text-start px-2 py-5">
                  <div className="flex items-center space-x-2">

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

              {/* Content */}
              <tr className="border-b-2 border-mindfulGreyTypeTwo">
                <td className="text-start px-2 py-5">Skin</td>
                <td className="text-start px-2 py-5">
                  <div className="flex items-center space-x-2">

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

            </tbody>
          </table>
        </div>


      </div>


      {/* {showDenialPopup && <DenialPopup closePopup={closeDenialPopup} />} */}
      {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />}


      {/* Pagination */}
      <div>
        <Pagination />
      </div>
    </div>
  )
}
