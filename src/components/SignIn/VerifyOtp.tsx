import { useRef } from "react";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Button } from "../../common/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store"; // Adjust the path to your store
import { verifyOTPThunk } from "../../redux/loginSlice"; // Adjust the path
interface VerifyOtpProps {
    onVerifyOtp: () => void;
}

// Zod validation schema for the form
const verifyOtpSchema = zod.object({
    otp: zod.array(zod.string().min(1, "Required").regex(/^[0-9]$/, "Must be a digit")).length(4, "Must be 4 digits"),
});

type VerifyOtpFormData = zod.infer<typeof verifyOtpSchema>;

export const VerifyOtp: React.FC<VerifyOtpProps> = ({ onVerifyOtp }) => {

    const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
    const navigate = useNavigate();
    const { phoneNumber, loading, error } = useSelector((state: RootState) => state.login); // Get Redux state
    console.log(phoneNumber, loading, error, "Value from Redux");


    const { register, handleSubmit, formState: { errors }, setValue } = useForm<VerifyOtpFormData>({
        resolver: zodResolver(verifyOtpSchema),
    });

    const otpRefs = useRef<(HTMLInputElement | null)[]>([]); // Create refs for OTP inputs

    // Handle OTP submission
    const onSubmit = async (data: VerifyOtpFormData) => {
        const userOtp = data.otp.join(""); // Convert OTP array to string

        if (!phoneNumber) {
            console.error("Phone number is missing");
            return;
        }

        try {
            const resultAction = await dispatch(verifyOTPThunk({ phoneNumber: phoneNumber, otp: Number(userOtp) }));
            if (verifyOTPThunk.fulfilled.match(resultAction)) {
                navigate("/Dashboard"); // Redirect on success
            }
        } catch (error: any) {
            console.error("OTP Verification Failed:", error);
        }
    };
    return (
        <div>
            <div>
                <h5 className="text-[20px] text-mindfulWhite font-semibold pt-5 pb-1.5">OTP Verification</h5>
                <p className="text-lg text-mindfulWhite pb-1.5 flex">Enter the OTP sent to
                    <span className="font-semibold flex items-center ml-1">
                        {phoneNumber ? `+91 ${phoneNumber}` : "No Phone Number"}
                        <MdModeEdit
                            onClick={onVerifyOtp}
                            className="text-[18px] text-mindfulWhite ml-1 cursor-pointer"
                        />
                    </span>
                </p>
            </div>

            {/* Input Password Fields */}
            {/* <div className="space-x-5 pt-2 pb-3">
                <input
                    type="text"
                    maxLength={1}
                    name=""
                    className="bg-mindfulWhite w-10 h-10 border-none rounded-sm px-3 py-3 text-center focus:outline-none"
                />
                <input
                    type="text"
                    maxLength={1}
                    name=""
                    className="bg-mindfulWhite w-10 h-10 border-none rounded-sm px-3 py-3 text-center focus:outline-none"
                />
                <input
                    type="text"
                    maxLength={1}
                    name=""
                    className="bg-mindfulWhite w-10 h-10 border-none rounded-sm px-3 py-3 text-center focus:outline-none"
                />
                <input
                    type="text"
                    maxLength={1}
                    name=""
                    className="bg-mindfulWhite w-10 h-10 border-none rounded-sm px-3 py-3 text-center focus:outline-none"
                />
            </div> */}



            <form onSubmit={handleSubmit(onSubmit)} method="post">
                <div className="space-x-5 pt-2 pb-3 flex">
                    {[0, 1, 2, 3].map((index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            {...register(`otp.${index}` as const)}
                            className="bg-mindfulWhite w-10 h-10 border-none rounded-sm px-3 py-3 text-center focus:outline-none"
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, "");
                                setValue(`otp.${index}`, value);

                                // Move focus
                                if (value && index < 3) {
                                    otpRefs.current[index + 1]?.focus();
                                } else if (!value && index > 0) {
                                    otpRefs.current[index - 1]?.focus();
                                }
                            }}
                            ref={(el) => (otpRefs.current[index] = el)} // Store refs
                        />
                    ))}
                </div>

                {/* Show validation error */}
                {errors.otp && (
                    <p className="text-red-500">{errors.otp.message}</p>
                )}

                {/* Display API error if OTP verification fails */}
                {error && <p className="text-red-500">{error}</p>}


                {/* Din't receive OTP */}
                <div className="pb-5">
                    <p className="text-lg text-mindfulWhite">Din't receive OTP? {" "}
                        <span className="underline">Resend</span>
                    </p>
                </div>

                <div>
                    {/* <Link to="/Dashboard"> */}
                    <Button
                        buttonType="submit"
                        buttonTitle={loading ? "Verifying..." : "Verify & Continue"}
                        className="w-3/4 bg-mindfulgrey border-[1px] border-mindfulgrey text-mindfulWhite rounded-[5px] font-semibold px-2 py-2 focus-within:outline-none cursor-pointer hover:bg-main hover:border-[1px] hover:border-mindfulWhite"
                        disabled={loading}
                    />
                    {/* </Link> */}
                </div>
            </form>
        </div>
    )
}
