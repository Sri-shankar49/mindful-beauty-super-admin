import React from 'react';
import { IoCloseCircle } from 'react-icons/io5'
import { InputField } from '../../../common/InputField';
import { SelectField } from '../../../common/SelectField';
import { Button } from '../../../common/Button';

interface PaymentDetailsPopupProps {
    closePopup: () => void;
}

export const PaymentDetailsPopup: React.FC<PaymentDetailsPopupProps> = ({ closePopup }) => {
    return (
        <div>
            <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                {/* <div className="container mx-auto"> */}

                    <div className="relative bg-white rounded-[5px] w-7/12 mx-auto px-10 py-10 max-2xl:overflow-y-auto max-2xl:h-[85%]">


                        <div className="relative mb-16">
                            <h2 className="text-2xl text-mindfulBlack font-semibold">Payment Details</h2>
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
                                <div className="grid grid-cols-2 gap-x-5 items-center">

                                    {/* Grid Column One */}
                                    <div className="space-y-5">

                                        {/* Services */}
                                        <div className="">
                                            <label
                                                htmlFor="services"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Services
                                            </label>

                                            <p className="text-md text-mindfulBlack">Bridal Glow, Facial, Hair Spa, Gel Extension</p>
                                        </div>

                                        {/* Payment */}
                                        <div className="">
                                            <label
                                                htmlFor="price"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Payment
                                            </label>
                                            <InputField
                                                label={''}
                                                type="number"
                                                name="price"
                                                id="price"
                                                placeholder="1500"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                            />

                                            <p></p>
                                        </div>

                                    </div>

                                    {/* Grid Column two */}
                                    <div className="space-y-5">
                                        {/* Total Price */}
                                        <div className="">
                                            <label
                                                htmlFor="branch"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Total Price
                                            </label>

                                            <p className="text-md text-mindfulgrey">Rs. 5170</p>

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
                                                name="paymentMode"
                                                id="paymentMode"
                                                options={[
                                                    { value: "online", label: "Online" },
                                                    { value: "cash", label: "Cash" },
                                                ]}
                                                className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                            />
                                        </div>

                                    </div>
                                </div>


                                {/* Buttons */}
                                <div className="pt-10">
                                    <div className="flex items-center justify-center space-x-5">
                                        {/* Cancel Button */}
                                        {/* <Button
                                            onClick={closePopup}
                                            buttonType="button"
                                            buttonTitle="Cancel"
                                            className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        /> */}

                                        {/* Submit Button */}
                                        <Button
                                            buttonType="submit"
                                            buttonTitle="Submit"
                                            className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        />
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}
