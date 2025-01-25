// import { Button } from '@/common/Button';
// import { SelectField } from '@/common/SelectField';
import React from 'react'
import { IoCloseCircle } from 'react-icons/io5';
import { Button } from '../../../common/Button';
import { SelectField } from '../../../common/SelectField';

interface DenialPopupProps {
    closePopup: () => void;
}

export const DenialPopup: React.FC<DenialPopupProps> = ({ closePopup }) => {
    return (
        <div>
            <div>
                <div>
                    <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                        <div className="container mx-auto">

                            <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-10 py-10">


                                <div className="relative mb-5">

                                    <div className="text-center">
                                        <h2 className="text-2xl text-mindfulBlack font-semibold">Provide Reason for Order Denial</h2>
                                    </div>
                                    {/* <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                                    </div> */}
                                </div>

                                {/* Close Button */}
                                <div
                                    onClick={closePopup}
                                    className="absolute top-5 right-5 w-fit cursor-pointer"
                                >
                                    <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                                </div>

                                {/* Branch Select Field */}
                                <div>
                                    <SelectField
                                        label=""
                                        name="reason"
                                        // required
                                        className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                        options={[
                                            { value: "staffNotAvailable", label: "Staff Not Available" },
                                            { value: "serviceUnavailableAtSelectedTime", label: "Service Unavailable At Selected Time" },
                                            { value: "appointmentOverbooked", label: "Appointment Overbooked" },
                                            { value: "technicalIssuesWithService", label: "Technical Issues With Service" },
                                        ]}
                                    // error="This field is required."
                                    />
                                </div>

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
                                            buttonType="submit"
                                            buttonTitle="Confirm"
                                            className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
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
