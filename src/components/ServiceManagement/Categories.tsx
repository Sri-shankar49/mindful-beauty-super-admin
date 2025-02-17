import { useEffect, useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png";
// import rectangleBlack from "../../assets/images/rectangleBlack.png";
// import { Button } from "@/common/Button";
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png";
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
import { Button } from "../../common/Button";
import { Pagination } from "../../common/Pagination";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { fetchCategoriesList } from "../../api/apiConfig";
import { DeleteCategoryPopup } from "./Categories/DeleteCategoryPopup";
import { AddCategoryPopup } from "./Categories/AddCategoryPopup";
import { EditCategoryPopup } from "./Categories/EditCategoryPopup";

// Define the type for each option
// interface StylistOption {
//   value: number;
//   text: string;
//   icon: string; // URL or path to the image
// }

// Proptypes for API
interface Category {
  count: number;
  next: string | null;
  previous: string | null;
  category_id: number;
  category_name: string;
  status: string;
  image: string;
  is_deleted: string;
}

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


  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCatID, setSelectedCatID] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // State declaration for Stylist Popup
  const [showStylistPopup, setShowStylistPopup] = useState(false);
  const [showDeleteCategoryPopup, setShowDeleteCategorypopup] = useState(false);


  const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // const openStylistPopup = () => {
  //   setShowStylistPopup(true);
  // }

  const closeStylistPopup = () => {
    setShowStylistPopup(false);
  }

  const openDeleteCategoryPopup = (catID: number) => {
    setShowDeleteCategorypopup(true);
    setSelectedCatID(catID);
    console.log("Delete the selected category with ID:", catID);
  }

  const closeDeleteCategoryPopup = () => {
    setShowDeleteCategorypopup(false);
  }
  // const [selectedStylistOption, setSelectedStylistOption] = useState<SingleValue<StylistOption>>(null);


  // handle onChange event of the dropdown
  // const handleStylistOption = (option: SingleValue<StylistOption>) => {
  //   setSelectedStylistOption(option);

  //   // Open Stylist Popup
  //   setShowStylistPopup(true);
  // };

  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [showEditCategoryPopup, setShowEditCategoryPopup] = useState(false);


  const openAddCategoryPopup = () => {
    setShowAddCategoryPopup(true);
  }

  const closeAddCategoryPopup = () => {
    setShowAddCategoryPopup(false)
  }

  const openEditCategoryPopup = (category: any) => {
    setShowEditCategoryPopup(true);
    setSelectedCategory(category);
  }

  const closeEditCategoryPopup = () => {
    setShowEditCategoryPopup(false)
  }

  useEffect(() => {
    const fetchCategoriesData = async () => {
      setLoading(true);

      try {
        const response = await fetchCategoriesList(currentPage);
        setCategoriesData(response.results.data);

        setTotalItems(response.count);

        console.log("Categories Data log:", response);

        console.log("Fetched Categories List pagination count data log :", response.count);

      } catch (error: any) {
        setError(error.message || "Unable to fetch categories users data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchCategoriesData();
  }, [currentPage, itemsPerPage]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };


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
              onClick={openAddCategoryPopup}
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
              {loading ? (
                <tr>
                  <td colSpan={2} className="text-center py-5">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={2} className="text-center py-5">
                    Error: {error}
                  </td>
                </tr>
              ) : categoriesData?.length > 0 ? ( // ✅ Added optional chaining (?.)
                categoriesData.map((category) => (
                  <tr key={category.category_id} className="border-b-2 border-mindfulGreyTypeTwo">
                    <td className="text-start px-2 py-5">{category.category_name}</td>
                    <td className="text-start px-2 py-5">
                      <div className="flex items-center space-x-2">

                        {/* Edit Button */}
                        <div
                          onClick={() => openEditCategoryPopup(category)}
                          className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200"
                        >
                          <BiEditAlt className="text-[20px] text-mindfulBlack group-hover:text-mindfulGreen" />
                        </div>

                        {/* Delete Button */}
                        <div
                          onClick={() => openDeleteCategoryPopup(Number(category.category_id))}
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
                    No Categories Data available
                  </td>
                </tr>
              )}

              {/* Content */}
              {/* <tr className="border-b-2 border-mindfulGreyTypeTwo" >
                <td className="text-start px-2 py-5">Skin</td>
                <td className="text-start px-2 py-5">
                  <div className="flex items-center space-x-2">

                    Edit Button
                    <div className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200">
                      <BiEditAlt className="text-[20px] text-mindfulBlack group-hover:text-mindfulGreen" />
                    </div>

                    Delete Button
                    <div
                      onClick={openEditService}
                      className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200">
                      <RiDeleteBinLine className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />
                    </div>
                  </div>
                </td>
              </tr> */}

            </tbody>
          </table>
        </div>


      </div>


      {/* {showDenialPopup && <DenialPopup closePopup={closeDenialPopup} />} */}
      {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />}

      {showAddCategoryPopup && <AddCategoryPopup closePopup={closeAddCategoryPopup} />}

      {showEditCategoryPopup && selectedCategory && (
        <EditCategoryPopup closePopup={closeEditCategoryPopup} editCategoryData={selectedCategory} />
      )}

      {showDeleteCategoryPopup && selectedCatID && <DeleteCategoryPopup
        closePopup={closeDeleteCategoryPopup}
        catID={Number(selectedCatID)}
      />}


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
    </div >
  )
}
