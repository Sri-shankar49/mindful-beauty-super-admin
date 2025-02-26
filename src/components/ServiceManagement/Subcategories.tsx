import { useEffect, useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
// import { SelectField } from "@/common/SelectField";
import { Pagination } from "../../common/Pagination";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Button } from "../../common/Button";
import { categories, fetchSubcategoriesList } from "../../api/apiConfig";
import { AddSubCategoryPopup } from "./SubCategories/AddSubCategoryPopup";
import { DeleteSubcategoryPopup } from "./SubCategories/DeleteSubcategoryPopup";
import { EditSubCategoryPopup } from "./SubCategories/EditSubCategoryPopup";
import { NotifyError } from "../../common/Toast/ToastMessage";

// Define the type for each option
// interface StylistOption {
//   value: number;
//   text: string;
//   icon: string; // URL or path to the image
// }

// Proptypes for API
interface Subcategory {
  subcategory_id: number;
  subcategory_name: number;
  category_id: number;
  category_name: string;
  status: string;
  is_deleted: string;
  image: File | null;
}

interface categoriesDataProps {
  category_id?: string;
  category_name: string;
  status: string;
  image: string;
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


  const [categoriesData, setcategoriesData] = useState<categoriesDataProps[]>([]);

  const [subcategoriesData, setSubcategoriesData] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);


  const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedCategory, setSelectedCategory] = useState("");

  // State declaration for Stylist Popup
  const [showStylistPopup, setShowStylistPopup] = useState(false);


  const [showAddSubCategoriesPopup, setShowAddSubCategoriespopup] = useState(false);

  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);

  const [showEditSubCategoryPopup, setShowEditSubCategorypopup] = useState(false);
  const [showDeleteSubCategoryPopup, setShowDeleteSubCategorypopup] = useState(false);




  // const openStylistPopup = () => {
  //   setShowStylistPopup(true);
  // }

  const closeStylistPopup = () => {
    setShowStylistPopup(false);
  }



  const openAddSubCategoriesPopup = () => {
    setShowAddSubCategoriespopup(true);
  }

  const closeAddSubCategoriesPopup = () => {
    setShowAddSubCategoriespopup(false);
  }


  const openEditSubCategoryPopup = (subCategory: any) => {
    setSelectedSubcategory(subCategory);
    setShowEditSubCategorypopup(true);
    console.log("Edit the selected sub category with ID:", subCategory);
  }

  const closeEditSubCategoryPopup = () => {
    setShowEditSubCategorypopup(false);
  }

  const openDeleteSubCategoryPopup = (subCategory: any) => {
    setSelectedSubcategory(subCategory);
    setShowDeleteSubCategorypopup(true);
    console.log("Delete the selected sub category with ID:", subCategory);
  }

  const closeDeleteSubCategoryPopup = () => {
    setShowDeleteSubCategorypopup(false);
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
        const response = await fetchSubcategoriesList(0, currentPage);

        const loadCategoriesData = await categories();

        setSubcategoriesData(response.results.data);

        setTotalItems(response.count);

        setcategoriesData(loadCategoriesData.data);

        console.log("Sub categories Data log:", response);

        console.log("Fetched Sub Categories List pagination count data log :", response.count);

        console.log("Categories List Data log:", loadCategoriesData);


      } catch (error: any) {
        // setError(error.message || "Unable to fetch Sub categories users data. Please try again later.");
        NotifyError(error.message || "Unable to fetch Sub categories users data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchSubcategoriesData();
  }, [currentPage, itemsPerPage]);


  // Function to handle category change 
  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryID = event.target.value; // Get the selected categoryID
    setSelectedCategory(selectedCategoryID); // Update state
    // setSelectedSubCategory(""); // Reset subcategory when category changes

    try {
      const response = await fetchSubcategoriesList(Number(selectedCategoryID), currentPage); // Pass categoryId to API

      setSubcategoriesData(response.results.data)      // Update subcategories

      setTotalItems(response.count);

      console.log("Sub Category List data log:", response);
      console.log("Fetched Sub Categories List pagination count data log :", response.count);

    } catch (error: any) {
      // setError(error.message);
      NotifyError(error.message);
    } finally {
      setLoading(false);
    }
  }


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  // Refreshing the data on handleActionSubmit
  const refreshedData = async () => {
    try {
      const response = await fetchSubcategoriesList(0, currentPage);
      setSubcategoriesData(response.results.data);

      setTotalItems(response.count);

      console.log("Sub Category List data refreshed:", response);
    } catch (error: any) {
      console.error("Error refreshing Sub Category List data:", error.message);
    }
  }


  return (
    <div>

      {/* Sub Heading */}
      {/* <div>
        <h5 className="text-3xl font-semibold py-5">Schedule</h5>
      </div> */}

      <div>

        <div className="flex items-center justify-end space-x-6 mt-5">

          <div>
            <select
              // name=""
              id=""
              className="w-60 rounded-[5px] border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
              value={selectedCategory}
              onChange={handleCategoryChange} // Call on change

            >
              <option value="" disabled>Main Category</option>

              {categoriesData.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Service */}
          <div
            onClick={openAddSubCategoriesPopup}
            className="w-fit flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group"
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
                // ) : error ? (
                //   <tr>
                //     <td colSpan={3} className="text-center py-5">
                //       Error: {error}
                //     </td>
                //   </tr>
              ) : (
                subcategoriesData.length > 0 ? (
                  subcategoriesData.map((subCategory) => (
                    <tr key={subCategory.subcategory_id} className="border-b-2 border-mindfulGreyTypeTwo">
                      <td className="text-start px-2 py-5">{subCategory.category_name}</td>

                      <td className="text-start px-2 py-5">
                        {subCategory.subcategory_name}
                        {/* {subCategory.subcategories.map((sub) => (
                            <div key={sub.subcategory_id}>{sub.subcategory_name}</div>
                          ))} */}

                        {/* <div>
                          <div className="grid grid-cols-4">
                            <div>Sub Category 1</div>
                            <div>Sub Category 2</div>
                            <div>Sub Category 3</div>
                            <div>Sub Category 4</div>
                            {subCategory.subcategories.map((sub) => (
                              <div key={sub.subcategory_id}>{sub.subcategory_name}</div>
                            ))}
                          </div>
                        </div> */}

                      </td>
                      <td className="text-start px-2 py-5">
                        <div className="flex items-center space-x-2">

                          {/* Edit Button */}
                          <div
                            onClick={() => openEditSubCategoryPopup(subCategory)}
                            className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200"
                          >
                            <BiEditAlt className="text-[20px] text-mindfulBlack group-hover:text-mindfulGreen" />
                          </div>

                          {/* Delete Button */}
                          <div
                            onClick={() => openDeleteSubCategoryPopup(subCategory)}
                            className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200">
                            <RiDeleteBinLine className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-5">
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

      {showAddSubCategoriesPopup && <AddSubCategoryPopup closePopup={closeAddSubCategoriesPopup} />}

      {showEditSubCategoryPopup && selectedSubcategory && <EditSubCategoryPopup closePopup={closeEditSubCategoryPopup} subCategoryData={selectedSubcategory} refreshData={refreshedData} />}

      {showDeleteSubCategoryPopup && selectedSubcategory && <DeleteSubcategoryPopup closePopup={closeDeleteSubCategoryPopup} subCategoryData={selectedSubcategory} refreshData={refreshedData} />}


      {/* Pagination */}
      <div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  )
}
