import { InputField } from '../../common/InputField';
import { SelectField } from '../../common/SelectField';
import { Button } from '../../common/Button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState } from 'react';
import { addCoupon } from '../../api/apiConfig';

// ✅ Zod Schema for Validation
const addCouponSchema = zod.object({
    coupon_code: zod.string()
        .min(3, "Coupon code must be at least 3 characters")
        .max(20, "Coupon code cannot exceed 20 characters"),
    valid_from: zod.string().min(10, "Start date is required"),
    valid_until: zod.string().min(10, "End date is required"),
    coupon_limit: zod.coerce.number().min(1, "Coupon Limit is required"), // ✅ Convert string to number
    // coupon_limit: zod.preprocess(
    //     (val) => (val === "" ? undefined : Number(val)),
    //     zod.number().positive("Coupon limit must be greater than 0").optional()
    // ),
    discount_value: zod.string().min(1, "Discount Value is required"),
    // discount_value: zod.preprocess(
    //     (val) => (val === "" ? undefined : Number(val)),
    //     zod.number().positive("Discount must be a positive number").optional()
    // ),
    // status: zod.preprocess(
    //     (val) => Number(val),
    //     zod.number().int("Invalid status").positive("Invalid status")
    // ),
});

type AddCouponFormData = zod.infer<typeof addCouponSchema>;

export const AddCoupon = () => {

    const [activeStatus, setActiveStatus] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [buttonState, setButtonState] = useState({ text: "Create Coupon", success: false });


    // ✅ React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors, }, reset, } = useForm<AddCouponFormData>({
        resolver: zodResolver(addCouponSchema),
    });


    // ✅ Form Submit Handler
    const onSubmit = async (data: AddCouponFormData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await addCoupon(
                // data.status,
                activeStatus,
                data.valid_from,
                data.valid_until,
                data.coupon_code,
                data.coupon_limit || 0, // Convert empty to 0
                Number(data.discount_value) || 0, // Convert empty to 0
            );
            console.log("Coupon added successfully", response.data);

            if (response?.status === "success") {

                // Update button UI to success state
                setButtonState({ text: "Coupon Added Successfully!", success: true });

                reset();        // Reset form after submission

                // Revert back to default state after 3 seconds
                setTimeout(() => {
                    setButtonState({ text: "Create Coupon", success: false });
                }, 3000);
            }

        } catch (error: any) {
            console.error("Failed to add coupon:", error.message);
            setError(error.message || "Failed to add coupon. Please try again later.");
            setButtonState({ text: "Create Coupon", success: false });
        } finally {
            setLoading(false); // Reset loading state
        }
    };


    return (
        <div>
            <div>
                <div className="bg-mindfulLightgrey px-5 py-5 mt-5">

                    <form onSubmit={handleSubmit(onSubmit)} method="post">

                        <div className="grid grid-cols-2 gap-5">

                            {/* Coupons Status & Date Schedule */}
                            <div>

                                <div className="space-y-5">

                                    {/* Coupons Status */}
                                    <div>
                                        <div className="bg-mindfulWhite border-[1px] border-mindfulGreyTypeTwo rounded-lg">
                                            <div className="border-b-2 border-mindfulGreyTypeTwo px-5 py-3">
                                                <h5 className="text-lg text-mindfulBlack font-semibold">Coupons Status</h5>
                                            </div>

                                            <div className="px-5 py-3">
                                                <div className="flex items-center space-x-10">
                                                    <div className="flex items-center">
                                                        <InputField
                                                            label={''}
                                                            type="radio"
                                                            name="radio"
                                                            id="active"
                                                            defaultChecked
                                                            onChange={() => setActiveStatus(1)}
                                                        />
                                                        <label
                                                            htmlFor="active"
                                                            className="ml-2 cursor-pointer"
                                                            onChange={() => setActiveStatus(1)}
                                                        >
                                                            Active
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <InputField
                                                            label={''}
                                                            type="radio"
                                                            name="radio"
                                                            id="inActive"
                                                            onChange={() => setActiveStatus(2)}
                                                        />
                                                        <label
                                                            htmlFor="inActive"
                                                            className="ml-2 cursor-pointer"
                                                            onChange={() => setActiveStatus(2)}
                                                        >
                                                            In Active
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date Schedule */}
                                    <div>
                                        <div className="bg-mindfulWhite border-[1px] border-mindfulGreyTypeTwo rounded-lg">
                                            <div className="border-b-2 border-mindfulGreyTypeTwo px-5 py-3">
                                                <h5 className="text-lg text-mindfulBlack font-semibold">Date Schedule</h5>
                                            </div>

                                            <div className="px-5 py-3">
                                                <div className="space-y-5">

                                                    {/* Start Date */}
                                                    <div>
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
                                                    <div>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* Coupon Information */}
                            <div>
                                <div>
                                    <div className="bg-mindfulWhite border-[1px] border-mindfulGreyTypeTwo rounded-lg">
                                        <div className="border-b-2 border-mindfulGreyTypeTwo px-5 py-3">
                                            <h5 className="text-lg text-mindfulBlack font-semibold">Coupon Information</h5>
                                        </div>

                                        <div className="px-5 py-3">
                                            <div>
                                                {/* <form action="" method="post"> */}
                                                <div className="grid grid-cols-2 gap-x-5">

                                                    <div className="space-y-5">
                                                        {/* Coupon Code */}
                                                        <div>
                                                            <label
                                                                htmlFor="couponCode"
                                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                                            >
                                                                Coupon Code
                                                            </label>

                                                            <InputField
                                                                label={''}
                                                                type="text"
                                                                // name="couponCode"
                                                                id="couponCode"
                                                                placeholder="Enter Code"
                                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                                {...register("coupon_code")}

                                                            />
                                                            {errors.coupon_code && <p className="text-sm text-red-500">{errors.coupon_code.message}</p>}

                                                        </div>

                                                        {/* Discount Area */}
                                                        <div>
                                                            <label
                                                                htmlFor="discountArea"
                                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                                            >
                                                                Discount Area
                                                            </label>

                                                            <SelectField
                                                                // onChange={openStylistPopup}
                                                                label=""
                                                                name="status"
                                                                // required
                                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
                                                                options={[
                                                                    { value: "allArea", label: "All Area" },
                                                                    { value: "1", label: "Option 1" },
                                                                    { value: "2", label: "Option 2" },
                                                                ]}
                                                            // error="This field is required."
                                                            />
                                                        </div>

                                                        {/* Discount Value */}
                                                        <div>
                                                            <label
                                                                htmlFor="discountValue"
                                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                                            >
                                                                Discount Value
                                                            </label>

                                                            <InputField
                                                                label={''}
                                                                type="number"
                                                                // name="discountValue"
                                                                id="discountValue"
                                                                placeholder="Enter the discount value"
                                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                                {...register("discount_value")}
                                                            />

                                                            {errors.discount_value && <p className="text-sm text-red-500">{errors.discount_value.message}</p>}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-5">


                                                        {/* Discounts ON */}
                                                        <div>
                                                            <label
                                                                htmlFor="discountArea"
                                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                                            >
                                                                Discounts On
                                                            </label>

                                                            <SelectField
                                                                // onChange={openStylistPopup}
                                                                label=""
                                                                name="status"
                                                                // required
                                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
                                                                options={[
                                                                    { value: "chooseaCategory", label: "Choose a Category" },
                                                                    { value: "1", label: "Option 1" },
                                                                    { value: "2", label: "Option 2" },
                                                                    { value: "3", label: "Option 3" },
                                                                ]}
                                                            // error="This field is required."
                                                            />
                                                        </div>

                                                        {/* Coupon Limit */}
                                                        <div>
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
                                                                placeholder="Enter the coupon limit"
                                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                                {...register("coupon_limit")}
                                                            />

                                                            {errors.coupon_limit && <p className="text-sm text-red-500">{errors.coupon_limit.message}</p>}
                                                        </div>
                                                    </div>
                                                </div>

                                                {error && <p className="text-sm text-red-500">{error}</p>}

                                                {/* Update Button */}
                                                <div className="pt-8 pb-3" >
                                                    <Button
                                                        type="submit"
                                                        // buttonTitle={'Create Coupon'}
                                                        // className={`bg-main text-lg text-mindfulWhite rounded-sm px-5 py-2 cursor-pointer`}                                                      // onClick={onUpdateActivePackages}
                                                        buttonTitle={loading ? "Creating..." : buttonState.text}
                                                        className={`text-lg text-mindfulWhite rounded-sm px-5 py-2
                                                                         ${buttonState.success ? "bg-green-500" : "bg-main"} 
                                                                          ${loading ? "bg-mindfulgrey" : ""}
                                                                         cursor-pointer`}
                                                        disabled={loading} // Optional: disable while loading
                                                    />
                                                </div>
                                                {/* </form> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
