import { InputField } from '../../common/InputField';
import { SelectField } from '../../common/SelectField';
import { Button } from '../../common/Button';

export const AddCoupons = () => {
    return (
        <div>
            <div>
                <div className="bg-mindfulLightgrey px-5 py-5 mt-5">
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
                                                    <InputField type="radio" id="active" name="radio" label={''} />
                                                    <label htmlFor="active" className="ml-2 cursor-pointer">Active</label>
                                                </div>

                                                <div className="flex items-center">
                                                    <InputField type="radio" id="inActive" name="radio" label={''} />
                                                    <label htmlFor="inActive" className="ml-2 cursor-pointer">In Active</label>
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
                                                        name="startDate"
                                                        id="startDate"
                                                        placeholder="Start Date"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />
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
                                                        name="endDate"
                                                        id="endDate"
                                                        placeholder="End Date"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />
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
                                            <form action="" method="post">
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
                                                                name="couponCode"
                                                                id="couponCode"
                                                                placeholder="Enter Code"
                                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                            />
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
                                                                name="discountValue"
                                                                id="discountValue"
                                                                placeholder="Enter the discount value"
                                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                            />
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
                                                                name="couponLimit"
                                                                id="couponLimit"
                                                                placeholder="Enter the coupon limit"
                                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* Update Button */}
                                                <div className="pt-8 pb-3" >
                                                    <Button
                                                        type="submit"
                                                        buttonTitle={'Create Coupon'}
                                                        className={`bg-main text-lg text-mindfulWhite rounded-sm px-5 py-2 cursor-pointer`}                                                      // onClick={onUpdateActivePackages}
                                                    //                                 // buttonTitle={updatePackagesloading ? "Updating..." : updateButtonState.text}
                                                    //                                 className={`text-lg text-mindfulWhite rounded-sm px-8 py-2
                                                    // ${updateButtonState.success ? "bg-green-500" : "bg-main"}`}
                                                    // disabled={updatePackagesloading} // Optional: disable while loading
                                                    />
                                                </div>
                                            </form>
                                        </div>
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
