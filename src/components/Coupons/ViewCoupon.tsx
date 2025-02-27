import React from 'react'
import { IoCloseCircle } from 'react-icons/io5';
import { InputField } from '../../common/InputField';

interface ViewCouponProps {
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
}

export const ViewCoupon: React.FC<ViewCouponProps> = ({ closePopup, couponData }) => {
    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-50">
                    {/* <div className="container mx-auto"> */}

                        <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5 max-2xl:overflow-y-auto max-2xl:h-[85%]">


                            <div className="relative mb-10">
                                <h2 className="text-2xl text-mindfulBlack font-semibold">View Coupon Details</h2>
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

                            <div className="">
                                <form action="" method="post">
                                    <div className="">

                                        {/* Add Staff Form */}
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
                                                    name="couponName"
                                                    id="couponName"
                                                    placeholder="Coupon Name"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    value={couponData.coupon_code}
                                                    readOnly
                                                />
                                            </div>

                                            {/*	Discount Type */}
                                            <div className="">
                                                <label
                                                    htmlFor="discountType"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Discount Type
                                                </label>
                                                <InputField
                                                    label={''}
                                                    type="text"
                                                    name="discountType"
                                                    id="discountType"
                                                    placeholder="Salon Name"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    value={couponData.discount_type}
                                                    readOnly
                                                />
                                            </div>

                                            {/*	Value */}
                                            <div className="">
                                                <label
                                                    htmlFor="value"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Value
                                                </label>
                                                <InputField
                                                    label={''}
                                                    type="text"
                                                    name="value"
                                                    id="value"
                                                    placeholder="Value"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    value={couponData.discount_value}
                                                    readOnly
                                                />
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
                                                    type="text"
                                                    name="startDate"
                                                    id="startDate"
                                                    placeholder="Start Date"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    value={couponData.valid_from}
                                                    readOnly
                                                />
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
                                                    type="text"
                                                    name="endDate"
                                                    id="endDate"
                                                    placeholder="	End Date"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    value={couponData.valid_until}
                                                    readOnly
                                                />
                                            </div>


                                            {/* Status */}
                                            <div className="">
                                                <label
                                                    htmlFor="status"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Status
                                                </label>

                                                <InputField
                                                    label={''}
                                                    type="text"
                                                    name="status"
                                                    id="status"
                                                    placeholder="Status"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    value={couponData.status}
                                                    readOnly
                                                />
                                            </div>


                                            {/* Error Response from the API */}
                                            {/* {error && <p className="text-sm text-red-600">{error}</p>} */}

                                        </div>


                                    </div>


                                    {/* Buttons */}
                                    {/* <div className="pt-10">
                                                <div className="flex items-center justify-center space-x-5">
                                                    Cancel Button
                                                    <Button
                                                        onClick={closePopup}
                                                        buttonType="button"
                                                        buttonTitle="Cancel"
                                                        className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                                    />
            
                                                    Submit Button
                                                    <Button
                                                        buttonType="submit"
                                                        buttonTitle="Submit"
                                                        className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                                    />
                                                </div>
                                            </div> */}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}
