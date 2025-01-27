import { useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
import { SelectField } from "../../common/SelectField";
import { Pagination } from "../../common/Pagination";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Button } from "../../common/Button";
// import { SelectField } from "@/common/SelectField";
// import { Pagination } from "@/common/Pagination";

// Define the type for each option
// interface StylistOption {
//   value: number;
//   text: string;
//   icon: string; // URL or path to the image
// }

export const Services = () => {


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
        <h5 className="text-3xl font-semibold py-5">Inprogress</h5>
      </div> */}

      <div>

        <div className="flex items-center justify-end space-x-6 mt-5">

          {/* Main Category */}
          <div>
            <SelectField
              // onChange={openStylistPopup}
              label=""
              name="mainCategory"
              // required
              className="w-60 rounded-[5px] border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
              options={[
                { value: "maincategory", label: "Main Category" },
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]}
            // error="This field is required."
            />
          </div>
          
          {/* Sub Category */}
          <div>
            <SelectField
              // onChange={openStylistPopup}
              label=""
              name="subCategory"
              // required
              className="w-60 rounded-[5px] border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
              options={[
                { value: "subcategory", label: "Sub Category" },
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]}
            // error="This field is required."
            />
          </div>

          {/* Add Service */}
          {/* <Link to="/ServiceListing/PackagesList/AddPackages"> */}
          <div
            // onClick={openBranchPopup}
            className="w-fit flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group"
          >
            <div>
              <MdFormatListBulletedAdd className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
            </div>

            <Button
              buttonType="button"
              buttonTitle="Add Services"
              className="bg-mindfulBlue text-mindfulWhite pl-2 cursor-pointer group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
            />
          </div>
          {/* </Link> */}
        </div>

        <div className="py-5">
          <table className="w-full">
            <thead className="bg-mindfulLightgrey">
              <tr className="">
                <th className="text-start px-2 py-3">SKU ID</th>
                <th className="text-start px-2 py-3">Service</th>
                <th className="text-start px-2 py-3">Category</th>
                <th className="text-start px-2 py-3">Sub Category</th>
                <th className="text-start px-2 py-3">Pricing (Rs)</th>
                <th className="text-start px-2 py-3">Timing</th>
                <th className="text-start px-2 py-3">Status</th>
                <th className="text-start px-2 py-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {/* Content */}
              <tr className="border-b-2 border-mindfulGreyTypeTwo">
                <td className="text-start px-2 py-5">MB94873</td>
                <td className="text-start px-2 py-5">Acne Facial</td>
                <td className="text-start px-2 py-5">Skin</td>
                <td className="text-start px-2 py-5">Face</td>
                <td className="text-start px-2 py-5">250</td>
                <td className="text-start px-2 py-5">15 mins</td>
                <td className="text-start px-2 py-5">Active</td>
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
