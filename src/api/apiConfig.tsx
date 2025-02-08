import { apiAxios } from './apiUrl';


// export const apiConfig = () => {
//   return (
//     <div>apiConfig</div>
//   )
// }


export const fetchLogin = async (phoneNumber: number) => {
  try {
    const response = await apiAxios.post('/provider-api/superadmin/',
      {
        phone: phoneNumber
      }
    );

    console.log("Generate otp response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to generate otp");
    }

    return response.data;

  } catch (error: any) {
    console.error("Error fetching generate otp:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to generate otp. Please try again later.");
  }
}



// Root Page --> Verify OTP
export const verifyOTP = async (phoneNumber: string, otp: number) => {
  try {
    const response = await apiAxios.post("/provider-api/superadmin/verify-otp/",
      {
        phone: phoneNumber,
        otp: otp, // Convert the OTP array to a string
      },
    );
    console.log("OTP Verification response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("OTP verification failed");
    }

    return response.data;
  }
  catch (error: any) {
    console.error("Error verifying OTP:", error.response.data.message || error);
    throw new Error(error.response.data.message || "Unable to verify OTP. Please try again later.");
  }
}



// Service Provider Page -- > Active, Pending and Inactive
export const fetchProvidersList = async (status: string) => {
  try {
    const response = await apiAxios.get('provider-api/providers_list/', {
      params: {
        status: status,  // Active, Pending, Inactive
      },
    });

    console.log("Provider List Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch providers list");
    }

    // Accessing the correct data path
    return response.data; // Correct path to the data

  } catch (error: any) {
    console.error("Error fetching providers list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error fetching providers list");
  }
};

