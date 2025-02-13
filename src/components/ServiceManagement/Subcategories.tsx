import { useEffect, useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
// import { SelectField } from "@/common/SelectField";
// import { Pagination } from "../../common/Pagination";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Button } from "../../common/Button";
import { fetchSubcategoriesList } from "../../api/apiConfig";
// import { Pagination } from "@/common/Pagination";

// Define the type for each option
// interface StylistOption {
//   value: number;
//   text: string;
//   icon: string; // URL or path to the image
// }

// Proptypes for API
interface Category {
  category_id: number;
  category_name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  subcategory_id: number;
  subcategory_name: number;
  status: number;
  is_deleted: number;
}

export const Subcategories = () => {


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



  const [subcategoriesData, setSubcategoriesData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


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


  useEffect(() => {
    const fetchSubcategoriesData = async () => {
      setLoading(true);

      try {
        const response = await fetchSubcategoriesList();
        setSubcategoriesData(response.data);

        console.log("Sub categories Data log:", response);

      } catch (error: any) {
        setError(error.message || "Unable to fetch Sub categories users data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchSubcategoriesData();
  }, []);


  return (
    <div>

      {/* Sub Heading */}
      {/* <div>
        <h5 className="text-3xl font-semibold py-5">Schedule</h5>
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
              buttonTitle="Add Sub Category"
              className="bg-mindfulBlue text-mindfulWhite pl-2 cursor-pointer group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
            />
          </div>
          {/* </Link> */}
        </div>

        <div className="py-5">
          <table className="w-full">
            <thead className="bg-mindfulLightgrey">
              <tr className="">
                <th className="text-start px-2 py-3">Category</th>
                <th className="text-start px-2 py-3">Sub Category</th>
                <th className="text-start px-2 py-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {/* Content */}
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-5">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={3} className="text-center py-5">
                    Error: {error}
                  </td>
                </tr>
              ) : (
                subcategoriesData.length > 0 ? (
                  subcategoriesData.map((subCategory) => (
                    <tr key={subCategory.category_id} className="border-b-2 border-mindfulGreyTypeTwo">
                      <td className="text-start px-2 py-5">{subCategory.category_name}</td>

                      <td className="text-start px-2 py-5">

                        <div>
                          <div className="grid grid-cols-4">
                            {/* <div>Sub Category 1</div>
                            <div>Sub Category 2</div>
                            <div>Sub Category 3</div>
                            <div>Sub Category 4</div> */}
                            {subCategory.subcategories.map((sub) => (
                              <div key={sub.subcategory_id}>{sub.subcategory_name}</div>
                            ))}
                          </div>
                        </div>

                      </td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center py-5">
                      No Sub categories Data available
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>

      {/* {showDenialPopup && <DenialPopup closePopup={closeDenialPopup} />} */}
      {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />}


      {/* Pagination */}
      <div>
        {/* <Pagination /> */}
      </div>
    </div>
  )
}
