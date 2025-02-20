import React, { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5'
import { InputField } from '../../common/InputField';
import { SelectField } from '../../common/SelectField';
import { Button } from '../../common/Button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { addCredit } from '../../api/apiConfig';

interface AddCreditPopupProps {
    closePopup: () => void;
    providerData: {
        count: number;
        next: string;
        previous: string;
        provider_id: number;
        provider_name: string;
        phone: string;
        total_credits: number;
        available_credits: number;
        used_credits: number;
        city: string;
        service_type_id: number;
        service_type_name: string;
    }
}

// ✅ Zod Schema for Validation
const AddCreditPopupSchema = zod.object({
    amount: zod.number().min(1, "Amount must be greater than 0"),
    paymentDate: zod.string().min(1, "Payment Date is required"),
    paymentMode: zod.enum(["online", "cash"], {
        errorMap: () => ({ message: "Payment Mode is required" }),
    }),
});

type AddCreditFormData = zod.infer<typeof AddCreditPopupSchema>;


export const AddCreditPopup: React.FC<AddCreditPopupProps> = ({ closePopup, providerData }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [buttonState, setButtonState] = useState({ text: "Submit", success: false });


    // ✅ React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors, }, reset } = useForm<AddCreditFormData>({
        resolver: zodResolver(AddCreditPopupSchema),
    });

    // ✅ Form Submit Handler
    const onSubmit = async (data: AddCreditFormData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await addCredit(
                Number(providerData.provider_id),
                data.amount,
                data.paymentDate,
                data.paymentMode
            );
            console.log("Credits added successfully", response.data);

            if (response?.status === "success") {

                // Update button UI to success state
                setButtonState({ text: "Credits Added Successfully!", success: true });

                reset();        // Reset form after submission

                // Revert back to default state after 3 seconds
                setTimeout(() => {
                    setButtonState({ text: "Submit", success: false });
                }, 3000);

                closePopup();
            }

        } catch (error: any) {
            console.error("Failed to add credits:", error.message);
            setError(error.message || "Failed to add credits. Please try again later.");
            setButtonState({ text: "Submit", success: false });
        } finally {
            setLoading(false); // Reset loading state
        }
    };


    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-8/12 mx-auto px-5 py-5">


                            <div className="relative mb-10">
                                <h2 className="text-2xl text-mindfulBlack font-semibold">Add Credits</h2>
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



                            <form onSubmit={handleSubmit(onSubmit)} method="post">
                                <div>
                                    <div className="grid grid-cols-2 gap-5">

                                        <div className="space-y-5">
                                            {/* Available Credits */}
                                            <div>
                                                <h5 className="text-md text-mindfulBlack font-semibold">Available Credits</h5>
                                                <p className="text-2xl text-mindfulAsh">{providerData.available_credits}</p>
                                            </div>

                                            {/* Available Credits */}
                                            <div>
                                                <h5 className="text-md text-mindfulBlack font-semibold">Used Credits</h5>
                                                <p className="text-2xl text-mindfulAsh">{providerData.used_credits}</p>
                                            </div>

                                            {/* Payment Date */}
                                            <div>
                                                <label
                                                    htmlFor="paymentDate"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Payment Date
                                                </label>

                                                <InputField
                                                    label={''}
                                                    type="date"
                                                    // name="paymentDate"
                                                    id="paymentDate"
                                                    placeholder="Coupon Name"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    {...register("paymentDate")}
                                                />

                                                {errors.paymentDate && <p className="text-sm text-red-500">{errors.paymentDate.message}</p>}
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-between">
                                            {/* Requested Credit Value*/}
                                            <div>
                                                <label
                                                    htmlFor="reqCreditValue"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Requested Credit Value
                                                </label>

                                                <InputField
                                                    label={''}
                                                    type="number"
                                                    // name="reqCreditValue"
                                                    id="reqCreditValue"
                                                    placeholder="Enter the credit value"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-3 py-3 focus-within:outline-none"
                                                    {...register("amount", { valueAsNumber: true })} // Convert string input to number
                                                />

                                                <p className="text-sm text-main italic mt-2">Add credit value, 1 credit equals to Rs. 1</p>

                                                {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
                                            </div>

                                            {/* Payment Mode */}
                                            <div className="">
                                                <label
                                                    htmlFor="paymentMode"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Payment Mode
                                                </label>
                                                <SelectField
                                                    label={''}
                                                    // name="paymentMode"
                                                    id="paymentMode"
                                                    options={[
                                                        { value: "online", label: "Online" },
                                                        { value: "cash", label: "Cash" },
                                                    ]}
                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-2 focus-within:outline-none"
                                                    {...register("paymentMode")}
                                                />

                                                {errors.paymentMode && <p className="text-sm text-red-500">{errors.paymentMode.message}</p>}
                                            </div>

                                        </div>
                                    </div>

                                    {error && <p className="text-sm text-red-500">{error}</p>}

                                    <div className="pt-10 text-center">
                                        {/* Submit Button */}
                                        <Button
                                            buttonType="button"
                                            buttonTitle={loading ? "Submitting" : buttonState.text}
                                            // className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                            className={`bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer
                                                ${buttonState.success ? "bg-green-500" : ""}`}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
