import React from 'react'
import { IoCloseCircle } from 'react-icons/io5'
import { InputField } from '../../common/InputField';

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
    return (
        <div>
            <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-50">
                <div className="container mx-auto">

                    <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5">


                        <div className="relative mb-10">
                            <h2 className="text-2xl text-mindfulBlack font-semibold">View Provider Details</h2>
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

                                        {/* Salon ID */}
                                        <div className="">
                                            <label
                                                htmlFor="salonID"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Salon ID
                                            </label>
                                            <InputField
                                                label={''}
                                                type="text"
                                                name="salonID"
                                                id="salonID"
                                                placeholder="Salon ID"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                value={String(providerData.salon_id)}
                                                readOnly
                                            />
                                        </div>

                                        {/* Salon Name */}
                                        <div className="">
                                            <label
                                                htmlFor="salonName"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Salon Name
                                            </label>
                                            <InputField
                                                label={''}
                                                type="text"
                                                name="salonName"
                                                id="salonName"
                                                placeholder="Salon Name"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                value={providerData.salon_name}
                                                readOnly
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="">
                                            <label
                                                htmlFor="email"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Salon Name
                                            </label>
                                            <InputField
                                                label={''}
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Salon Name"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                value={providerData.email}
                                                readOnly
                                            />
                                        </div>


                                        {/* Phone */}
                                        <div className="">
                                            <label
                                                htmlFor="phone"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Phone Number
                                            </label>
                                            <InputField
                                                label={''}
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                placeholder="Phone Number"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                value={providerData.mobile}
                                                readOnly
                                            />
                                        </div>

                                        {/* Owner */}
                                        <div className="">
                                            <label
                                                htmlFor="owner"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Owner
                                            </label>

                                            <InputField
                                                label={''}
                                                type="text"
                                                name="owner"
                                                id="owner"
                                                placeholder="Owner"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                value={providerData.owner_name || 'N/A'}
                                                readOnly
                                            />
                                        </div>


                                        {/* Location */}
                                        <div className="">
                                            <label
                                                htmlFor="location"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Location
                                            </label>

                                            <InputField
                                                label={''}
                                                type="text"
                                                name="location"
                                                id="location"
                                                placeholder="Location"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                value={providerData.location || 'N/A'}
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
        </div>
    )
}
