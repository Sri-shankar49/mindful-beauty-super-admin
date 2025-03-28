import React, { useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5';
import { InputField } from '../../common/InputField';
import { Button } from '../../common/Button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { editCoupon } from '../../api/apiConfig';
// import { SelectField } from '../../common/SelectField';

// Proptypes from API
interface EditCouponProps {
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
        status_id: number;
        status: string;
        created_datetime: string;
        provider: number | null;
    };
    refreshData: () => void;
}

// ✅ Zod Schema for Validation
const EditCouponSchema = zod.object({
    coupon_code: zod.string().min(2, "Coupon Code must be at least 2 characters"),
    discount_type: zod.string().min(2, "Discount Type must be at least 2 characters"),
    coupon_limit: zod.coerce.number().min(1, "Coupon Limit is required"), // ✅ Convert string to number
    discount_value: zod.string().min(1, "Discount Value is required"),
    // valid_from: zod.string().min(1, "Start Date is required"),
    valid_from: zod.string().min(1, "Start Date is required").refine((date) => date !== "", {
        message: "Start Date is required",
    }),

    // valid_until: zod.string().min(1, "End Date is required"),
    valid_until: zod.string().min(1, "End Date is required").refine((date) => date !== "", {
        message: "End Date is required",
    }),
    status: zod.string().min(1, "Status is required"),
});

type EditCouponFormData = zod.infer<typeof EditCouponSchema>;

export const EditCoupon: React.FC<EditCouponProps> = ({ closePopup, couponData, refreshData }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    // const formatDateForInput = (dateString: string) => {
    //     const parsedDate = new Date(dateString);
    //     if (isNaN(parsedDate.getTime())) return ""; // Return empty if invalid date
    //     return parsedDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
    // };

    // Function Handler for changing the DATE fromat
    const formatDateForInput = (dateString: string) => {
        if (!dateString) return ""; // Handle empty date

        const months: { [key: string]: string } = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
        };

        const parts = dateString.split(" ");
        if (parts.length !== 3) return ""; // Ensure format is correct

        const day = parts[0].padStart(2, "0"); // Ensure two-digit day
        const month = months[parts[1]]; // Convert month abbreviation to number
        const year = parts[2];

        return `${year}-${month}-${day}`; // Format YYYY-MM-DD
    };


    // ✅ React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors, } } = useForm<EditCouponFormData>({
        resolver: zodResolver(EditCouponSchema),
        defaultValues: {
            coupon_code: couponData.coupon_code,
            discount_type: couponData.discount_type,
            coupon_limit: Number(couponData.coupon_limit) || 0,    // ✅ Keep as number
            discount_value: couponData.discount_value.replace(/[^\d.]/g, ''), // ✅ Remove ₹ or %,
            // valid_from: couponData.valid_from,
            // valid_until: couponData.valid_until,
            valid_from: formatDateForInput(couponData.valid_from),
            valid_until: formatDateForInput(couponData.valid_until),
            status: String(couponData.status_id),
        }, // ✅ Set correct default values
    });


    // ✅ Form Submit Handler
    const onSubmit = async (data: EditCouponFormData) => {
        setLoading(true);
        setError(null);

        // ✅ Clean the discount value
        const sanitizedDiscountValue = data.discount_value.replace(/[^\d.]/g, '');


        try {
            const response = await editCoupon(
                couponData.id,
                data.coupon_code,
                data.coupon_limit,
                data.valid_until,
                // data.discount_value
                sanitizedDiscountValue,
                Number(data.status)
            );
            console.log("Coupon edited successfully", response);

            if (response?.status === "success") {
                closePopup();       // Close the popup
                refreshData();      // Refresh the data
            }

        } catch (error: any) {
            console.error("Failed to edit coupon:", error.message);
            setError(error.message || "Failed to edit coupon. Please try again later.")
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-50">
                    {/* <div className="container mx-auto"> */}

                        <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5 max-2xl:overflow-y-auto max-2xl:h-[90%]">


                            <div className="relative mb-10">
                                <h2 className="text-2xl text-mindfulBlack font-semibold">Edit Coupon</h2>
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

                            {loading ? (
                                <div className="text-center">Loading...</div>
                            ) : (
                                <div className="">
                                    <form onSubmit={handleSubmit(onSubmit)} action="" method="post">
                                        <div className="">

                                            {/* Edit Coupon Form */}
                                            <div className="space-y-5">

                                                {/* Coupon Name */}
                                                <div className="">
                                                    <label
                                                        htmlFor="couponName"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Coupon Name
                                                    </label>
                                                    <InputField
                                                        label={''}
                                                        type="text"
                                                        // name="couponName"
                                                        id="couponName"
                                                        placeholder="Coupon Name"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("coupon_code")}

                                                    />
                                                    {errors.coupon_code && <p className="text-sm text-red-500">{errors.coupon_code.message}</p>}
                                                </div>

                                                {/*	Discount Type */}
                                                {/* <div className="">
                                                    <label
                                                        htmlFor="discountType"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Discount Type
                                                    </label>
                                                    <InputField
                                                        label={''}
                                                        type="text"
                                                        // name="discountType"
                                                        id="discountType"
                                                        placeholder="Salon Name"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none cursor-not-allowed"
                                                        {...register("discount_type")}
                                                        title='You cannot edit this field'
                                                        readOnly
                                                    />
                                                    {errors.discount_type && <p className="text-sm text-red-500">{errors.discount_type.message}</p>}
                                                </div> */}


                                                {/*	Coupon Limit */}
                                                <div className="">
                                                    <label
                                                        htmlFor="couponLimit"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Coupon Limit
                                                    </label>
                                                    <InputField
                                                        label={''}
                                                        type="number"
                                                        // name="couponLimit"
                                                        id="couponLimit"
                                                        placeholder="Coupon Limit"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("coupon_limit")}
                                                    />
                                                    {errors.coupon_limit && <p className="text-sm text-red-500">{errors.coupon_limit.message}</p>}
                                                </div>

                                                {/*	Value */}
                                                <div className="">
                                                    <label
                                                        htmlFor="value"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Value <span className="text-xs text-mindfulAsh">(Amount in Rupees)</span>
                                                    </label>
                                                    <InputField
                                                        label={''}
                                                        type="text"
                                                        // name="value"
                                                        id="value"
                                                        placeholder="Value"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        // {...register("discount_value")}
                                                        {...register("discount_value", {
                                                            onChange: (e) => {
                                                                e.target.value = e.target.value.replace(/[^\d.]/g, ''); // ✅ Live filtering
                                                            }
                                                        })}
                                                    />
                                                    {errors.discount_value && <p className="text-sm text-red-500">{errors.discount_value.message}</p>}
                                                </div>


                                                {/* Start Date */}
                                                <div className="">
                                                    <label
                                                        htmlFor="startDate"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Start Date
                                                    </label>
                                                    <InputField
                                                        label={''}
                                                        type="date"
                                                        // name="startDate"
                                                        id="startDate"
                                                        placeholder="Start Date"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("valid_from")}
                                                    />
                                                    {errors.valid_from && <p className="text-sm text-red-500">{errors.valid_from.message}</p>}
                                                </div>

                                                {/* End Date */}
                                                <div className="">
                                                    <label
                                                        htmlFor="endDate"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        End Date
                                                    </label>

                                                    <InputField
                                                        label={''}
                                                        type="date"
                                                        // name="endDate"
                                                        id="endDate"
                                                        placeholder="End Date"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("valid_until")}
                                                    />
                                                    {errors.valid_until && <p className="text-sm text-red-500">{errors.valid_until.message}</p>}
                                                </div>


                                                {/* Status */}
                                                <div className="">
                                                    <label
                                                        htmlFor="status"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Status
                                                    </label>

                                                    {/* <InputField
                                                        label={''}
                                                        type="text"
                                                        // name="status"
                                                        id="status"
                                                        placeholder="Status"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none cursor-not-allowed"
                                                        {...register("status")}
                                                        title='You cannot edit this field'
                                                        readOnly
                                                    /> */}



                                                    <select
                                                        // name=""
                                                        id=""
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        // value={status}
                                                        // onChange={handleStatus} // Call on change
                                                        {...register("status")}
                                                    >
                                                        <option value="1">Active</option>
                                                        <option value="2">Inactive</option>
                                                        {/* <option value="expired">Expired</option> */}
                                                    </select>

                                                    {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}

                                                </div>


                                                {/* Error Response from the API */}
                                                {error && <p className="text-sm text-red-500">{error}</p>}

                                            </div>


                                        </div>


                                        {/* Buttons */}
                                        <div className="pt-10">
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
                                                    buttonType="submit"
                                                    buttonTitle={loading ? "Submitting" : "Submit"}
                                                    className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            {/* </div > */}
        </div >
    )
}
