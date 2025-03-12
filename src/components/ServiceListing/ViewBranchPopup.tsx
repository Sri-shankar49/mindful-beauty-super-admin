import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { viewBranchList } from "../../api/apiConfig";
import { BranchCard } from "./BranchCard";

// Define the Branch interface to type the branch object

interface ViewBranchPopupProps {
  closePopup: () => void;
  providerData: {
    count: number;
    next: string | null;
    previous: string | null;
    salon_id: number;
    salon_name: string;
    email: string;
    mobile: string;
    owner_name: string | null;
    location: string | null;
  };
  branch_id: number;
  branch_name: string;
  phone: string;
  location: string;
  logo: string;
  staff?: {
    name: string;
    phone: string;
    role: string;
  };
  service_status: number;
}

export const ViewBranchPopup: React.FC<ViewBranchPopupProps> = ({ closePopup, providerData }) => {

  const [viewProviderData, setViewProviderData] = useState<ViewBranchPopupProps | null>(null); // To store fetched provider details

  console.log("viewProviderData", viewProviderData);

  const [loading, setLoading] = useState(true);

  // Fetch provider details on component mount
  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const data = await viewBranchList(providerData.salon_id);
        setViewProviderData(data.data);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch provider details:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProviderDetails();
  }, []);

  return (
    <div>
      <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-50">
        {/* <div className="container mx-auto"> */}

        {/* <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5 max-2xl:overflow-y-auto max-2xl:h-[85%]"> */}
        <div className="relative bg-white rounded-[5px] w-11/12 h-[90%] mx-auto px-5 py-5 max-2xl:overflow-y-auto max-2xl:h-[90%]">
          <div className="relative mb-10">
            <h2 className="text-2xl text-mindfulBlack font-semibold">
              View Branch Details
            </h2>
            <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5"></div>
          </div>

          {/* Close Button */}
          <div
            onClick={closePopup}
            className="absolute top-5 right-5 w-fit cursor-pointer"
          >
            <IoCloseCircle className="text-mindfulGrey text-[32px]" />
          </div>

          <div className="overflow-y-auto max-h-[80vh]">
            <div className="grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
              {/* {/ Show loading shimmer when data is being fetched /} */}

              {/* Show branches if data is available */}
              {loading ? (
                <div className="text-gray-500 col-span-4 text-center py-5">
                  Loading...
                </div>
              ) : viewProviderData &&
                Array.isArray(viewProviderData) &&
                viewProviderData.length > 0 ? (
                viewProviderData.map((branch: ViewBranchPopupProps) => (
                  <BranchCard
                    key={branch.branch_id}
                    branchID={branch.branch_id.toString()} // Ensure it's a string for consistency
                    branchName={branch.branch_name}
                    phone={branch.phone}
                    location={branch.location}
                    logo={branch.logo || ""} // If logo is null, pass an empty string
                    userName={branch.staff?.name || "N/A"} // Provide default values if staff info is missing
                    userPhone={branch.staff?.phone || "N/A"}
                    userRole={branch.staff?.role || "N/A"}
                    BranchStatus={branch.service_status}
                  />
                ))
              ) : (

                <div className="text-gray-500 col-span-4 text-center py-5">
                  No branch Data available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
