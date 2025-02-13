import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../common/Button';
import { IoCloseCircle } from 'react-icons/io5';
import { deleteServices } from '../../../api/apiConfig';

interface DeleteServicesPopupProps {
    serviceID: number; // Pass the selected Services ID
    closePopup: () => void;
}

export const DeleteServicesPopup: React.FC<DeleteServicesPopupProps> = ({ closePopup, serviceID }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleStaffDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await deleteServices((serviceID)); // Call API with staffID
            console.log("Services Data deleted successfully:", data);

            // Optionally show a success message or trigger a re-fetch
            // closePopup(); // Close popup after deletion
            if (data?.status === "success") {
                closePopup(); // Close popup after deletion
                navigate(0);
                // refreshData(); // Refresh data after deletion
            }

        } catch (error: any) {
            setError(error.message || "Failed to delete Services. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5">


                            <div className="relative mb-10">
                                <h2 className="text-2xl text-mindfulBlack font-semibold">Delete Services</h2>
                                <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                                </div>
                            </div>

                            {/* Close Button */}
                            <div
                                onClick={closePopup}
                                className="absolute top-5 right-5 w-fit cursor-pointer"
                            >
                                <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                            </div>

                            {/* Content */}
                            <div className="text-center">
                                <p className="text-lg text-mindfulBlack">Are you sure you want to delete this Services?</p>

                                {error && <p className="text-sm text-red-600">{error}</p>}

                                {/* Buttons */}
                                <div className="pt-5">
                                    <div className="flex items-center justify-center space-x-5">
                                        {/* Cancel Button */}
                                        <Button
                                            onClick={closePopup}
                                            buttonType="button"
                                            buttonTitle="Cancel"
                                            className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        />

                                        {/* Submit Button */}
                                        <Button
                                            onClick={handleStaffDelete}
                                            buttonType="submit"
                                            buttonTitle={loading ? "Deleting..." : "Delete"}
                                            disabled={loading}
                                            className="bg-mindfulRed text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
