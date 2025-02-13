import { useEffect, useState } from "react";
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
import { fetchServicesList } from "../../api/apiConfig";
import { DeleteServicesPopup } from "./Services/DeleteServicesPopup";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  // State declaration for Stylist Popup
  const [showStylistPopup, setShowStylistPopup] = useState(false);

  const [selectedServiceID, setSelectedServiceID] = useState<number | null>(null);
  const [showDeleteServicePopup, setShowDeleteServicepopup] = useState(false);




  // const openStylistPopup = () => {
  //   setShowStylistPopup(true);
  // }

  const closeStylistPopup = () => {
    setShowStylistPopup(false);
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


  useEffect(() => {
    const fetchServicesData = async () => {
      setLoading(true);

      try {
        const response = await fetchServicesList(currentPage);
        setServicesData(response.results.data);

        setTotalItems(response.count);

        console.log("Services List Data log:", response);

        console.log("Fetched Services List pagination count data log :", response.count);

      } catch (error: any) {
        setError(error.message || "Unable to fetch Services data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchServicesData();
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
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-5">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="text-center py-5">
                    Error: {error}
                  </td>
                </tr>
              ) : servicesData?.length > 0 ? ( // ✅ Added optional chaining (?.)
                servicesData.map((service) => (
                  <tr className="border-b-2 border-mindfulGreyTypeTwo">
                    <td className="text-start px-2 py-5">{service.service_id}</td>
                    <td className="text-start px-2 py-5">{service.service_name}</td>
                    <td className="text-start px-2 py-5">{service.category_name}</td>
                    <td className="text-start px-2 py-5">{service.subcategory_name}</td>
                    <td className="text-start px-2 py-5">{service.price}</td>
                    <td className="text-start px-2 py-5">{service.service_time}</td>
                    <td className="text-start px-2 py-5">{service.status}</td>
                    <td className="text-start px-2 py-5">
                      <div className="flex items-center space-x-2">

                        {/* Edit Button */}
                        <div className="border-[1px] border-mindfulGreyTypeTwo rounded-md px-2 py-1.5 cursor-pointer group hover:bg-[#e5ffec] transition-colors duration-200">
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
