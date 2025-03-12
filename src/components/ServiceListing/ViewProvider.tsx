import React, { useEffect, useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5'
// import { InputField } from '../../common/InputField';
import { viewProviderGeneralInfo } from '../../api/apiConfig';
import { MdFileDownload } from 'react-icons/md';

interface ViewProviderProps {
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
    }
}

export const ViewProvider: React.FC<ViewProviderProps> = ({ closePopup, providerData }) => {

    const [viewProviderData, setViewProviderData] = useState<any>(null); // To store fetched provider details
    const [loading, setLoading] = useState(false);

    // Fetch provider details on component mount
    useEffect(() => {
        const fetchProviderDetails = async () => {
            try {
                const data = await viewProviderGeneralInfo(providerData.salon_id);
                setViewProviderData(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch provider details:", error);
                setLoading(false);
            }
        };

        fetchProviderDetails();
    }, [providerData.salon_id]);


    const handleProviderImage = () => {
        const imageUrl = viewProviderData?.data?.image_url;
        if (imageUrl == null || imageUrl == "" || imageUrl == undefined) {
            alert("No Image found");
        }
        else {
            window.open(imageUrl, "_blank"); // Open image in a new tab
        }
    };


    const handleTaxFile = () => {
        const Taxfile = viewProviderData?.data?.tax_details[0]?.tax_file;
        if (Taxfile == null || Taxfile == "" || Taxfile == undefined) {
            alert("No Image found");
        }
        else {
            window.open(Taxfile, "_blank"); // Open image in a new tab
        }
    };

    const handleGstFile = () => {
        const Gstfile = viewProviderData?.data?.tax_details[0]?.gst_file;
        if (Gstfile == null || Gstfile == "" || Gstfile == undefined) {
            alert("No Image found");
        }
        else {
            window.open(Gstfile, "_blank"); // Open image in a new tab
        }
    };

    const handleIdentityFile = () => {
        const Identityfile = viewProviderData?.data?.tax_details[0]?.identity_file;
        if (Identityfile == null || Identityfile == "" || Identityfile == undefined) {
            alert("No Image found");
        }
        else {
            window.open(Identityfile, "_blank"); // Open image in a new tab
        }
    };

    const handleAddressFile = () => {
        const Addressfile = viewProviderData?.data?.tax_details[0]?.address_file;
        if (Addressfile == null || Addressfile == "" || Addressfile == undefined) {
            alert("No Image found");
        }
        else {
            window.open(Addressfile, "_blank"); // Open image in a new tab
        }
    };

    return (
        <div>
            <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-50">
                {/* <div className="container mx-auto"> */}

                <div className="relative bg-white rounded-[5px] w-11/12 h-[90%] mx-auto px-5 py-5 max-2xl:overflow-y-auto max-2xl:h-[90%]">
                    <div className="relative mb-10">
                        <h2 className="text-2xl text-mindfulBlack font-semibold">
                            View Provider Details
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
                        <div>
                            <h5 className="text-xl font-semibold py-5">
                                General Information
                            </h5>

                            {loading ? (
                                <div className="text-center py-4">loading...</div>
                            ) : (
                                <div className="grid grid-cols-4 gap-5 border-b-2 border-b-mindfulgrey pb-10">
                                    {/* Owner's Name */}
                                    <div>
                                        <label
                                            htmlFor="ownersName"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Owner's Name
                                        </label>
                                        <input
                                            value={viewProviderData?.data?.owner_name || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>
                                    {/* Salon Name */}
                                    <div>
                                        <label
                                            htmlFor="salonName"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Salon Name
                                        </label>
                                        <input
                                            value={viewProviderData?.data?.name || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>
                                    {/* Contact Number */}
                                    <div>
                                        <label
                                            htmlFor="contactNumber"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Contact Number
                                        </label>
                                        <input
                                            value={viewProviderData?.data?.phone || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>
                                    {/* Email Address */}
                                    <div>
                                        <label
                                            htmlFor="emailAddress"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            // {...register("emailAddress")}
                                            value={viewProviderData?.data?.email || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>
                                    {/* Salon Location */}
                                    <div className="relative">
                                        <label
                                            htmlFor="salonLocation"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Salon Location
                                        </label>

                                        <input
                                            value={viewProviderData?.data?.branch || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>

                                    {/* Established On */}
                                    <div>
                                        <label
                                            htmlFor="establishedOn"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Established On
                                        </label>

                                        <input
                                            value={viewProviderData?.data?.established_on || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>

                                    {/* Salon Address */}
                                    <div>
                                        <label
                                            htmlFor="salonAddress"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Salon Address
                                        </label>

                                        <textarea
                                            rows={3}
                                            value={viewProviderData?.data?.address || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        ></textarea>
                                    </div>

                                    {/* Services Offered */}
                                    <div>
                                        <label
                                            htmlFor="servicesOffered"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Services Offered
                                        </label>

                                        <textarea
                                            rows={3}
                                            value={viewProviderData?.data?.services_offered || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        ></textarea>
                                    </div>

                                    {/* Business Hours */}
                                    <div>
                                        <label
                                            htmlFor="businessHours"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Business Hours
                                        </label>

                                        <textarea
                                            rows={3}
                                            // {...register("businessHours")}
                                            value={viewProviderData?.data?.business_summary || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        ></textarea>
                                    </div>

                                    {/* Salon Facilities */}
                                    <div>
                                        <label
                                            htmlFor="servicesOffered"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Salon Facilities
                                        </label>

                                        <textarea
                                            rows={3}
                                            // {...register("salonFacilities")}
                                            value={viewProviderData?.data?.salon_facilities || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        ></textarea>
                                    </div>

                                    {/* Cancellation Policy */}
                                    <div>
                                        <label
                                            htmlFor="cancellationPolicy"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Cancellation Policy
                                        </label>

                                        <textarea
                                            rows={3}
                                            // {...register("cancellationPolicy")}
                                            value={viewProviderData?.data?.cancellation_policy || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        ></textarea>
                                    </div>

                                    {/* Staff Information */}
                                    <div>
                                        <label
                                            htmlFor="staffInformation"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Staff Information
                                        </label>

                                        <textarea
                                            rows={3}
                                            // {...register("staffInformation")}
                                            value={viewProviderData?.data?.staff_information || "N/A"}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        ></textarea>
                                    </div>

                                    {/* File Upload Area */}
                                    <div>
                                        <label
                                            htmlFor="providerImage"
                                            className="text-lg text-mindfulBlack"
                                            onClick={handleProviderImage}
                                        >
                                            Provider Image
                                        </label>

                                        <div className="flex items-center space-x-5">
                                            <div>
                                                <button
                                                    onClick={handleProviderImage}
                                                    className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                >
                                                    <MdFileDownload className="text-[18px] text-mindfulWhite mr-2" />
                                                    Provider Logo
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <div>
                                <h5 className="text-xl font-semibold py-5">
                                    Bank Account Information
                                </h5>
                            </div>

                            {loading ? (
                                <div className="text-center py-4">loading...</div>
                            ) : (
                                <div className="grid grid-cols-4 gap-5 border-b-2 border-b-mindfulgrey pb-10">
                                    {/* Bank Account Holder Name */}
                                    <div>
                                        <label
                                            htmlFor="accHolderName"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Bank Account Holder Name
                                        </label>
                                        <input
                                            // {...register("accHolderName")}
                                            value={
                                                viewProviderData?.data?.bank_details[0]
                                                    ?.account_holder_name || "N/A"
                                            }
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>

                                    {/* Bank Name */}
                                    <div>
                                        <label
                                            htmlFor="bankName"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Bank Name
                                        </label>
                                        <input
                                            value={
                                                viewProviderData?.data?.bank_details[0]?.bank_name || "N/A"
                                            }
                                            // {...register("bankName")}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>

                                    {/* Bank Account Number */}
                                    <div>
                                        <label
                                            htmlFor="bankNumber"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Bank Account Number
                                        </label>
                                        <input
                                            // {...register("bankNumber")}
                                            value={
                                                viewProviderData?.data?.bank_details[0]
                                                    ?.bank_account_number || "N/A"
                                            }
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                        {/* {errors.bankNumber && (
                    <p className="text-sm text-red-600">
                      {errors.bankNumber.message}
                    </p>
                  )} */}
                                    </div>

                                    {/* Account Type */}
                                    <div>
                                        <label
                                            htmlFor="accountType"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Account Type
                                        </label>
                                        <input
                                            // {...register("accountType")}
                                            value={
                                                viewProviderData?.data?.bank_details[0]?.account_type || "N/A"
                                            }
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>

                                    {/* Bank Branch */}
                                    <div>
                                        <label
                                            htmlFor="bankBranch"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Bank Branch
                                        </label>
                                        <input
                                            value={
                                                viewProviderData?.data?.bank_details[0]?.bank_branch || "N/A"
                                            }
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>

                                    {/* IFSC Code or equivalent */}
                                    <div>
                                        <label
                                            htmlFor="ifscCode"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            IFSC Code or equivalent
                                        </label>
                                        <input
                                            value={
                                                viewProviderData?.data?.bank_details[0]?.ifsc_code || "N/A"
                                            }
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <div>
                                <h5 className="text-xl font-semibold py-5">
                                    Tax Information / GST Number
                                </h5>
                            </div>

                            {loading ? (
                                <div className="text-center py-4">loading</div>
                            ) : (
                                <div className="grid grid-cols-2 gap-5 pb-10">
                                    {/* Tax Identification Number */}
                                    <div>
                                        <label
                                            htmlFor="taxIdentificationNumber"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Tax Identification Number
                                        </label>
                                        <input
                                            value={
                                                viewProviderData?.data?.tax_details[0]
                                                    ?.tax_identification_number || "N/A"
                                            }
                                            // {...register("taxIdentificationNumber")}
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>

                                    {/* GST Number */}
                                    <div>
                                        <label
                                            htmlFor="gstNumber"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            GST Number
                                        </label>
                                        <input
                                            // {...register("gstNumber")}
                                            value={
                                                viewProviderData?.data?.tax_details[0]?.gst_number || "N/A"
                                            }
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                    </div>

                                    {/* File Upload Area One */}
                                    <div>
                                        <div className="flex items-center space-x-5">

                                            {viewProviderData?.data?.tax_details[0]?.tax_file != null &&
                                                <div>

                                                    <label
                                                        htmlFor="taxFile"
                                                        className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                        onClick={handleTaxFile}
                                                    >
                                                        <MdFileDownload
                                                            onClick={handleTaxFile}
                                                            className="text-[18px] text-mindfulWhite mr-2" />
                                                        Tax file
                                                    </label>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    {/* File Upload Area Two */}
                                    <div>
                                        <div className="flex items-center space-x-5">

                                            {viewProviderData?.data?.tax_details[0]?.gst_file != null &&
                                                <div>
                                                    <label
                                                        htmlFor="gstFile"
                                                        className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                        onClick={handleGstFile}
                                                    >
                                                        <MdFileDownload
                                                            onClick={handleGstFile}
                                                            className="text-[18px] text-mindfulWhite mr-2" />
                                                        Gst File
                                                    </label>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    {/* Type of ID */}
                                    <div>
                                        <div className="py-2">
                                            <h5 className="text-lg text-mindfulBlack font-semibold py-2">
                                                Proof of Identity
                                            </h5>
                                        </div>

                                        {/*  Type of ID */}
                                        <div>
                                            <label
                                                htmlFor="typeOfId"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Type of ID
                                            </label>
                                            {/* <SelectField
                        label={""}
                        // name="typeOfId"
                        id="typeOfId"
                        options={[
                          { value: "id1", label: "ID 1" },
                          { value: "id2", label: "ID 2" },
                          { value: "id3", label: "ID 3" },
                          { value: "id4", label: "ID 4" },
                        ]}
                        value={viewProviderData?.data?.tax_details[0]?.proof_of_identity_type || "N/A"}

                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                        disabled
                      /> */}
                                            <input
                                                // {...register("idNumber")}
                                                value={
                                                    viewProviderData?.data?.tax_details[0]
                                                        ?.proof_of_identity_type || "N/A"
                                                }
                                                className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                disabled
                                            />
                                            {/* <SelectField
                                    {...register("typeOfId")}
                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                /> */}
                                        </div>
                                    </div>

                                    {/* Proof of Address */}

                                    <div>
                                        <div className="py-2">
                                            <h5 className="text-lg text-mindfulBlack font-semibold py-2">
                                                Proof of Address
                                            </h5>
                                        </div>

                                        {/*  Proof of Address */}
                                        <div>
                                            <label
                                                htmlFor="proofOfAddress"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Type of Document
                                            </label>
                                            {/* <SelectField
                        label={""}
                        // name="proofOfAddress"
                        id="proofOfAddress"
                        options={[
                          { value: "doctype1", label: "Document type 1" },
                          { value: "doctype2", label: "Document type 2" },
                          { value: "doctype3", label: "Document type 3" },
                          { value: "doctype4", label: "Document type 4" },
                        ]}
                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                        value={viewProviderData?.data?.tax_details[0]?.proof_of_address_type || "N/A"}
                        disabled
                      /> */}
                                            <input
                                                // {...register("idNumber")}
                                                value={
                                                    viewProviderData?.data?.tax_details[0]
                                                        ?.proof_of_address_type || "N/A"
                                                }
                                                className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    {/* ID Number */}
                                    <div>
                                        <label
                                            htmlFor="idNumber"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            ID Number
                                        </label>
                                        <input
                                            // {...register("idNumber")}
                                            value={
                                                viewProviderData?.data?.tax_details[0]
                                                    ?.proof_of_identity_number || "N/A"
                                            }
                                            className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                            disabled
                                        />
                                        {/* {errors.idNumber && (
                    <p className="text-sm text-red-600">
                      {errors.idNumber.message} */}
                                        {/* </p>
                  )} */}
                                    </div>

                                    {/* File Upload Area Three */}
                                    <div>
                                        <label
                                            htmlFor="idNumber"
                                            className="text-lg text-mindfulBlack"
                                        >
                                            Upload a clear scan ot photo of the document
                                        </label>
                                        <div className="flex items-center space-x-5">

                                            {viewProviderData?.data?.tax_details[0]?.address_file != null &&
                                                <div>
                                                    <label
                                                        htmlFor="addressFile"
                                                        className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                        onClick={handleAddressFile}
                                                    >
                                                        <MdFileDownload
                                                            onClick={handleAddressFile}
                                                            className="text-[18px] text-mindfulWhite mr-2" />
                                                        Address File
                                                    </label>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    {/* File Upload Area Four */}
                                    <div>
                                        <div className="flex items-center space-x-5">

                                            {viewProviderData?.data?.tax_details[0]?.identity_file != null &&
                                                <div>
                                                    <label
                                                        htmlFor="identityFile"
                                                        className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                        onClick={handleIdentityFile}
                                                    >
                                                        <MdFileDownload
                                                            onClick={handleIdentityFile}
                                                            className="text-[18px] text-mindfulWhite mr-2" />
                                                        Identity File
                                                    </label>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}
