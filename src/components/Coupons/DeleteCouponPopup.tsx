import React, { useState } from 'react';
import { Button } from '../../common/Button';
import { IoCloseCircle } from 'react-icons/io5';
import { deleteCoupon } from '../../api/apiConfig';

interface DeleteCouponPopupProps {
    closePopup: () => void;
    couponData: {
        count: number;
        next: string;
        previous: string;
        id: number;
        coupon_code: string;
        coupon_limit: number;
        valid_from: string;
        valid_until: string;
        discount_type: string;
        discount_value: string;
        status: string;
        created_datetime: string;
        provider: number | null;
    };
    refreshData: () => void;
}

export const DeleteCouponPopup: React.FC<DeleteCouponPopupProps> = ({ closePopup, couponData, refreshData }) => {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCouponDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await deleteCoupon((couponData.id)); // Call API with staffID
            console.log("Coupon Data deleted successfully:", data);

            // Optionally show a success message or trigger a re-fetch
            // closePopup(); // Close popup after deletion
            if (data?.status === "success") {
                closePopup(); // Close popup after deletion
                refreshData(); // Refresh data after deletion
            }

        } catch (error: any) {
            setError(error.message || "Failed to delete Coupon. Please try again.");
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
                                <h2 className="text-2xl text-mindfulBlack font-semibold">Delete Coupon</h2>
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
                                <p className="text-lg text-mindfulBlack">Are you sure you want to delete this Coupon?</p>

                                {error && <p className="text-sm text-red-600">{error}</p>}

                                {/* Buttons */}
                                <div className="pt-5">
                                    <div className="flex items-center justify-center space-x-5">
                                        {/* Cancel Button */}
                                        <Button
                                            onClick={closePopup}
                                            buttonType="button"
                                            buttonTitle="Cancel"
                                            className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer"
                                        />

                                        {/* Submit Button */}
                                        <Button
                                            onClick={handleCouponDelete}
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
