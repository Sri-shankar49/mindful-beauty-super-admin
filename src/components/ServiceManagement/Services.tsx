import { useEffect, useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png";
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
// import { SelectField } from "../../common/SelectField";
import { Pagination } from "../../common/Pagination";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Button } from "../../common/Button";
import { categories, fetchServicesList, subCategories } from "../../api/apiConfig";
import { AddServicePopup } from "./Services/AddServicePopup";
import { DeleteServicesPopup } from "./Services/DeleteServicesPopup";
import { EditServicePopup } from "./Services/EditServicePopup";
import { NotifyError } from "../../common/Toast/ToastMessage";
// import { SelectField } from "@/common/SelectField";
// import { Pagination } from "@/common/Pagination";

// Define the type for each option
// interface StylistOption {
//   value: number;
//   text: string;
//   icon: string; // URL or path to the image
// }



interface Services {
  count: number;
  next: string | null;
  previous: string | null;
  service_id: number;
  service_name: string;
  category: number;
  category_name: string;
  subcategory: number;
  subcategory_name: string;
  price: string;
  status: string;
  sku_value: string;
  description: string;
  service_time: string;
  is_deleted: boolean;
}

interface categoriesDataProps {
  category_id?: string;
  category_name: string;
  status: string;
  image: string;
}

interface SubCategoriesDataProps {
  subcategory_id?: string;
  subcategory_name: string;
  category?: number;
  status: string;
}


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


  const [servicesData, setServicesData] = useState<Services[]>([]);
  const [categoriesData, setcategoriesData] = useState<categoriesDataProps[]>([]);
  const [subCategoriesData, setSubCategoriesData] = useState<SubCategoriesDataProps[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");



  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);


  const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  // State declaration for Stylist Popup
  const [showStylistPopup, setShowStylistPopup] = useState(false);


  const [showAddServicePopup, setShowAddServicepopup] = useState(false);
  const [showEditServicePopup, setShowEditServicepopup] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);


  const [selectedServiceID, setSelectedServiceID] = useState<number | null>(null);
  const [showDeleteServicePopup, setShowDeleteServicepopup] = useState(false);




  // const openStylistPopup = () => {
  //   setShowStylistPopup(true);
  // }

  const closeStylistPopup = () => {
    setShowStylistPopup(false);
  }

  const openAddServicePopup = () => {
    setShowAddServicepopup(true);
  }

  const closeAddServicePopup = () => {
    setShowAddServicepopup(false);
  }

  const openEditServicePopup = (service: any) => {
    setShowEditServicepopup(true);
    setSelectedService(service);
    console.log("Edit the selected service with ID:", service);
  }

  const closeEditServicePopup = () => {
    setShowEditServicepopup(false);
  }



  const openDeleteServicePopup = (serviceID: number) => {
    setShowDeleteServicepopup(true);
    setSelectedServiceID(serviceID);
    console.log("Delete the selected service with ID:", serviceID);
  }

  const closeDeleteServicePopup = () => {
    setShowDeleteServicepopup(false);
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




  // Function call for loading the data initially
  useEffect(() => {
    const fetchServicesData = async () => {
      setLoading(true);

      try {
        const response = await fetchServicesList(currentPage, 0, 0);

        const loadCategoriesData = await categories();

        setServicesData(response.results.data);

        setTotalItems(response.count);

        setcategoriesData(loadCategoriesData.data);

        console.log("Services List Data log:", response);

        console.log("Fetched Services List pagination count data log :", response.count);

        console.log("Categories List Data log:", loadCategoriesData);

      } catch (error: any) {
        // setError(error.message || "Unable to fetch Services data. Please try again later.");
        NotifyError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchServicesData();
  }, [currentPage, itemsPerPage]);


  // Function to handle category change and fetch subcategories
  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryID = event.target.value; // Get the selected categoryID
    setSelectedCategory(selectedCategoryID); // Update state
    setSelectedSubCategory(""); // Reset subcategory when category changes

    try {
      const loadSubCategoriesData = await subCategories(selectedCategoryID); // Pass categoryId to API

      setSubCategoriesData(loadSubCategoriesData.data); // Update subcategories

      console.log("Sub Category List data log:", loadSubCategoriesData);

    } catch (error: any) {
      // setError(error.message);
      NotifyError(error.message);
    } finally {
      setLoading(false);
    }
  }


  const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(event.target.value);
  };



  // Function after handling the Category & Sub Category
  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);

      try {
        const response = await fetchServicesList(currentPage, Number(selectedCategory), Number(selectedSubCategory));

        const loadCategoriesData = await categories();

        setServicesData(response.results.data);

        setTotalItems(response.count);

        setcategoriesData(loadCategoriesData.data)

        console.log("Services List Data log:", response);

        console.log("Fetched Services List pagination count data log :", response.count);

        console.log("Categories List Data log:", loadCategoriesData);

      } catch (error: any) {
        // setError(error.message || "Unable to fetch Services data. Please try again later.");
        NotifyError(error.message || "Unable to fetch Services data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    // Fetch only if a category is selected
    if (selectedCategory || selectedSubCategory) {
      fetchFilteredData();
    }

    // }, [currentPage, itemsPerPage]);
  }, [selectedCategory, selectedSubCategory, currentPage]);


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
      const response = await fetchServicesList(currentPage, Number(selectedCategory), Number(selectedSubCategory));
      setServicesData(response.results.data);

      setTotalItems(response.count);

      console.log("Services List Data refreshed:", response);
    } catch (error: any) {
      console.error("Error refreshing services list data:", error.message);
    }
  }


  return (
    <div>

      {/* Sub Heading */}
      {/* <div>
        <h5 className="text-3xl font-semibold py-5">Inprogress</h5>
      </div> */}

      <div>

        <div className="flex items-center justify-end space-x-6 mt-5 max-2xl:flex-wrap max-2xl:gap-x-10 max-2xl:justify-between">

          {/* Main Category */}
          <div>
            {/* <SelectField
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
            /> */}

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

          {/* Sub Category */}
          <div>
            {/* <SelectField
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
            /> */}

            <select
              // name="subCategory"
              id="subCategory"
              className="w-72 rounded-[5px] border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
            >
              <option value="" disabled>
                {selectedCategory ? "Select Sub Category" : "Please select a category first"}
              </option>

              {subCategoriesData.map((subCategory) => (
                <option key={subCategory.subcategory_id} value={subCategory.subcategory_id}>
                  {subCategory.subcategory_name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Service */}
          <div
            onClick={openAddServicePopup}
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
        </div>

        <div className="py-5 max-2xl:overflow-x-auto">
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
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-5">
                    Loading...
                  </td>
                </tr>
                // ) : error ? (
                //   <tr>
                //     <td colSpan={8} className="text-center py-5">
                //       Error: {error}
                //     </td>
                //   </tr>
              ) : servicesData?.length > 0 ? ( // ✅ Added optional chaining (?.)
                servicesData.map((service) => (
                  <tr key={service.service_id} className="border-b-2 border-mindfulGreyTypeTwo">
                    <td className="text-start px-2 py-5">{service.sku_value}</td>
                    <td className="text-start px-2 py-5">{service.service_name}</td>
                    <td className="text-start px-2 py-5">{service.category_name}</td>
                    <td className="text-start px-2 py-5">{service.subcategory_name}</td>
                    <td className="text-start px-2 py-5">{service.price}</td>
                    <td className="text-start px-2 py-5">{service.service_time}</td>
                    <td className="text-start px-2 py-5">{service.status}</td>
                    <td className="text-start px-2 py-5">
                      <div className="flex items-center space-x-2">

                        {/* Edit Button */}
                        <div
                          onClick={() => openEditServicePopup(service)}
                          className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200"
                        >
                          <BiEditAlt className="text-[20px] text-mindfulBlack group-hover:text-mindfulGreen" />
                        </div>

                        {/* Delete Button */}
                        <div
                          onClick={() => openDeleteServicePopup(Number(service.service_id))}
                          className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#ffe1e1] transition-colors duration-200">
                          <RiDeleteBinLine className="text-[20px] text-mindfulBlack group-hover:text-mindfulRed" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-5">
                    No Services Data available
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* {showDenialPopup && <DenialPopup closePopup={closeDenialPopup} />} */}
      {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />}

      {showAddServicePopup && <AddServicePopup closePopup={closeAddServicePopup} refreshData={refreshedData} />}

      {showEditServicePopup && selectedService &&
        <EditServicePopup
          closePopup={closeEditServicePopup}
          editServiceData={selectedService}
          refreshData={refreshedData}
        />}

      {showDeleteServicePopup && <DeleteServicesPopup
        closePopup={closeDeleteServicePopup}
        serviceID={Number(selectedServiceID)}
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
    </div>
  )
}
