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
export const fetchProvidersList = async (status: string, searchQuery: string, pageNumber: number) => {
  try {
    const response = await apiAxios.get('/provider-api/providers_list/', {
      params: {
        status: status,  // Active, Pending, Inactive
        search: searchQuery,// Search query
        page: pageNumber
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






// Service Provider Page -- --> Active, Pending and Inactive
export const deleteProvider = async (providerID: number) => {
  try {
    // Using axios.delete is more semantically correct for deletion,
    // but if your backend expects a GET request for deletion, you can change it accordingly.
    const response = await apiAxios.delete('/provider-api/delete-service-provider/', {
      params: {
        provider_id: providerID,
      },
    });

    console.log("Delete Provider Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to delete the provider");
    }

    return response.data; // Expected to be: { "status": "success", "message": "Category deleted successfully" }

  } catch (error: any) {
    console.error("Error deleting the provider:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error deleting provider");
  }
};





// Service Provider Page --> Pending Requests
export const pendingAction = async (providerID: number, action: string) => {
  try {
    const response = await apiAxios.post(`/provider-api/accept-provider-status/`,
      {
        provider_id: providerID,
        status: action,
      },
    );
    console.log("Pending Action response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Login API");
    }

    return response.data;
  }
  catch (error: any) {
    console.error("Error fetching Login API:", error.response.data.message || error);
    throw new Error(error.response.data.message || "Unable to fetch Login API. Please try again later.");
  }
}




// Service Provider Page -- > Active, Pending and Inactive
export const fetchDashboardList = async () => {
  try {
    const response = await apiAxios.get('/provider-api/getbookings/', {
      // params: {
      //   status: status,  // Active, Pending, Inactive
      // },
    });

    console.log("Dashboard Booking List Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch bashboard booking list");
    }

    // Accessing the correct data path
    return response.data; // Correct path to the data

  } catch (error: any) {
    console.error("Error fetching bashboard booking list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error fetching bashboard booking list");
  }
};





// Service Management Page -- --> Categories Tab
// GET Method from the API
export const fetchCategoriesList = async (pageNumber: number) => {
  try {
    const response = await apiAxios.get("/provider-api/category/", {
      params: {
        page: pageNumber,
      }
    });

    console.log("Category List Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch categories list");
    }

    return response.data; // Extracting the category data

  } catch (error: any) {
    console.error("Error fetching categories list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error fetching categories list");
  }
};


// Service Management Page -- --> Categories Tab
export const addCategory = async (CategoryName: string, imageFile: any) => {
  try {
    const response = await apiAxios.post('/provider-api/category/add/',
      {
        category_name: CategoryName,
        image: imageFile
      }
    );

    console.log("Add Category List Response:", response.data);

    if (!response.data || response.status !== 201) {
      throw new Error("Failed to Add Category");
    }

    return response.data; // Extracting the category data

  } catch (error: any) {
    console.error("Error adding category:", error.response?.data.message || error);
    throw new Error(error.response?.data.message || "Error adding category list");
  }
};


// Service Management Page -- --> Categories Tab
export const editCategory = async (CategoryID: number, CategoryName: string, imageFile: any) => {
  try {
    const response = await apiAxios.put('/provider-api/category/edit/', {
      // params: {
      category_id: CategoryID,
      category_name: CategoryName,
      image: imageFile
      // },
    });

    console.log("Edit Category List Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to edit Category");
    }

    return response.data; // Extracting the category data

  } catch (error: any) {
    console.error("Error Editing category:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error Editing category list");
  }
}





// Service Management Page -- --> Categories Tab
export const deleteCategory = async (categoryID: number) => {
  try {
    // Using axios.delete is more semantically correct for deletion,
    // but if your backend expects a GET request for deletion, you can change it accordingly.
    const response = await apiAxios.delete('/provider-api/category/delete/', {
      params: {
        category_id: categoryID,
      },
    });

    console.log("Delete Category Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to delete category");
    }

    return response.data; // Expected to be: { "status": "success", "message": "Category deleted successfully" }

  } catch (error: any) {
    console.error("Error deleting category:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error deleting category");
  }
};





// Service Management Page -- --> Sub Categories Tab
export const fetchSubcategoriesList = async () => {
  try {
    const response = await apiAxios.get('/provider-api/subcategory/');

    console.log("Subcategory List Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch subcategories list");
    }

    return response.data; // Extracting the subcategory data

  } catch (error: any) {
    console.error("Error fetching subcategories list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error fetching subcategories list");
  }
};




// Service Management Page -- --> Sub Categories Tab
export const deleteSubcategory = async (subcategoryID: number) => {
  try {
    // Using axios.delete is more semantically correct for deletion,
    // but if your backend expects a GET request for deletion, you can change it accordingly.
    const response = await apiAxios.delete('/provider-api/subcategory/delete/', {
      params: {
        subcategory_id: subcategoryID,
      },
    });

    console.log("Delete Sub Category Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to delete Sub category");
    }

    return response.data; // Expected to be: { "status": "success", "message": "Category deleted successfully" }

  } catch (error: any) {
    console.error("Error deleting Sub category:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error Sub deleting category");
  }
};





// Service Management Page -- --> Services Tab
export const fetchServicesList = async (pageNumber: number, category: number, subcategory: number) => {
  try {
    const response = await apiAxios.get('/provider-api/get_services/', {
      params: {
        page: pageNumber,
        category: category,
        subcategory: subcategory,
      }
    });

    console.log("Services List Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch services list");
    }

    return response.data; // Extracting the services data array

  } catch (error: any) {
    console.error("Error fetching services list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error fetching services list");
  }
};


// Service Listing Page -> Category List -- --> Services Tab
export const categories = async () => {
  try {
    const response = await apiAxios.get('/provider-api/categories/');
    console.log("Category List response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Category list");
    }

    return response.data; // Adjust based on the actual response structure

  } catch (error: any) {
    console.error("Error fetching Category list:", error.message || error);
    throw new Error("Unable to fetch Category list. Please try again later.");
  }
};




// Service Listing Page -> Sub Category List -- --> Services Tab
export const subCategories = async (categoryID: string) => {

  try {
    const response = await apiAxios.get('/provider-api/subcategories/', {
      params: {
        category_id: categoryID, // Replace with the actual category ID
      },
    });
    console.log("Sub category List response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Sub category list");
    }

    return response.data; // Adjust based on the actual response structure

  } catch (error: any) {
    console.error("Error fetching Sub Category list:", error.message || error);
    throw new Error("Unable to fetch Sub Category list. Please try again later.");
  }
};



// Service Listing Page -> Sub Category List -- --> Services Tab
export const addService = async (
  serviceName: string,
  category: number,
  subcategory: number,
  price: string,
  description: string,
  serviceTime: string,
) => {
  try {
    const response = await apiAxios.post('/provider-api/add_service/', {
      service_name: serviceName,
      category: category,
      subcategory: subcategory,
      price: price,
      description: description,
      service_time: serviceTime,
    });

    console.log("Add Service Response:", response.data);

    // Optionally check for a success status code (201 for creation)
    if (!response.data || response.status !== 201) {
      throw new Error("Failed to add service");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error adding service:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error adding service");
  }
};



// Service Management Page -- --> Services Tab
export const editService = async (
  serviceID: number,
  serviceName: string,
  category: number,
  subcategory: number,
  price: string,
  description: string,
  serviceTime: string
) => {
  try {
    const response = await apiAxios.put(`/provider-api/edit_service/`, {
      service_id: serviceID,
      service_name: serviceName,
      category: category,
      subcategory: subcategory,
      price: price,
      description: description,
      service_time: serviceTime,
    });

    console.log("Edit Service Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to edit service");
    }

    return response.data;

  } catch (error: any) {
    console.error("Error editing service:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error editing service");
  }
};




// Service Management Page -- --> Services Tab
export const deleteServices = async (serviceID: number) => {
  try {
    // Using axios.delete is more semantically correct for deletion,
    // but if your backend expects a GET request for deletion, you can change it accordingly.
    const response = await apiAxios.delete('/provider-api/delete_service/', {
      params: {
        service_id: serviceID,
      },
    });

    console.log("Delete Services Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to delete Services");
    }

    return response.data; // Expected to be: { "status": "success", "message": "Category deleted successfully" }

  } catch (error: any) {
    console.error("Error deleting Services:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error deleting Services");
  }
};






// Service Management Page -- --> All Booking List
// GET Method from the API
export const bookingsList = async (searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/getappointments/`, {
      params: {
        search: searchQuery,
        page: pageNumber,
      }
    });

    console.log("Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch booking list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching booking list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch booking list. Please try again later.");
  }
}





// Service Management Page -- --> Schedule List
// GET Method from the API
export const scheduleList = async (status: number, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/getappointments/`, {
      params: {
        status: status,
        search: searchQuery,
        page: pageNumber,
      }
    });

    console.log("Schedule Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch schedule booking list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching schedule booking list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch schedule booking list. Please try again later.");
  }
}


// Service Management Page -- --> Inprogress List
// GET Method from the API
export const inprogressList = async (status: number, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/getappointments/`, {
      params: {
        status: status,
        search: searchQuery,
        page: pageNumber,
      }
    });

    console.log("Inprogress Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch inprogress list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching inprogress booking list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch inprogress list. Please try again later.");
  }
}




// Service Management Page -- --> Completed List
// GET Method from the API
export const completedList = async (status: number, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/getappointments/`, {
      params: {
        status: status,
        search: searchQuery,
        page: pageNumber,
      }
    });

    console.log("Completed Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch completed booking list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching completed booking list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch completed booking list. Please try again later.");
  }
}




// Service Management Page -- --> Cancelled List
// GET Method from the API
export const cancelledList = async (status: number, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/getappointments/`, {
      params: {
        status: status,
        search: searchQuery,
        page: pageNumber,
      }
    });

    console.log("Cancelled Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch cancelled booking list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching cancelled booking list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch cancelled booking list. Please try again later.");
  }
}




// Sales & Transactions Page
// GET Method from the API
export const salesTransactionsList = async (pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/get-sales-transactions/`, {
      params: {
        //   provider_id: providerID,
        page: pageNumber,
      },
    });

    console.log("Sales & Transactions list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch sales & transactions list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching sales & transactions list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch sales & transactions list. Please try again later.");
  }
}




// Sales & Transactions Page - Sales & Transactions List includes Search Functionality
// GET Method from the API
export const fetchSalesTransactionsByFilters = async (
  payID: string,
  providerName: string,
  providerMobile: string,
  startDate: string,
  endDate: string,
) => {
  try {
    const response = await apiAxios.get(`/provider-api/get-sales-transactions/`, {
      params: {
        pay_id: payID,
        provider_name: providerName,
        mobile_number: providerMobile,
        start_date: startDate,
        end_date: endDate,
      },
    });

    console.log("Sales Transactions by Filters response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch sales transactions by filters");
    }

    return response.data;

  } catch (error: any) {
    console.error("Error fetching sales transactions by filters:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch sales transactions by filters. Please try again later.");
  }
};






// Ratings & Reviews Page
// GET Method from the API
export const reviewsList = async (searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/review-list/`, {
      params: {
        search: searchQuery,
        page: pageNumber,
      },
    });

    console.log("Reviews list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch reviews list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching reviews list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch reviews list. Please try again later.");
  }
}






// Coupon Page -- --> List Coupons Tab
// GET Method from the API
export const couponList = async (pageNumber: number, byStatus: number, byMonth: string) => {

  try {
    const response = await apiAxios.get(`/provider-api/get-coupons/`, {
      params: {
        page: pageNumber,
        status: byStatus,
        month: byMonth,
      },
    });

    console.log("Coupons list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Coupons list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching Coupons list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch Coupons list. Please try again later.");
  }
}





// Coupon Page -- --> Add Coupons Tab
export const addCoupon = async (statusID: number, validFrom: string, validUntil: string, couponCode: string, couponLimit: number, discountValue: number,) => {
  try {
    const response = await apiAxios.post('/provider-api/coupons/add/',
      {
        status: statusID,
        valid_from: validFrom,
        valid_until: validUntil,
        coupon_code: couponCode,
        coupon_limit: couponLimit,
        discount_value: discountValue,
      }
    );

    console.log("Add Coupon List Response:", response.data);

    if (!response.data || response.status !== 201) {
      throw new Error("Failed to Add Coupon");
    }

    return response.data; // Extracting the category data

  } catch (error: any) {
    console.error("Error adding coupon:", error.response?.data.message || error);
    throw new Error(error.response?.data.message || "Error adding coupon. Please try again later.");
  }
};




// Coupon Page -- --> List Coupons Tab
export const editCoupon = async (couponID: number, couponCode: string, couponLimit: number, validUntil: string, discountValue: string) => {
  try {
    const response = await apiAxios.put('/provider-api/coupons/edit/', {
      id: couponID,
      coupon_code: couponCode,
      coupon_limit: couponLimit,
      valid_until: validUntil,
      discount_value: discountValue,
    });

    console.log("Edit Coupon Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to edit Coupon");
    }

    return response.data; // Extracting the Coupon data

  } catch (error: any) {
    console.error("Error Editing coupon:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error Editing coupon list");
  }
}





// Coupon Page
export const deleteCoupon = async (couponID: number) => {
  try {
    // Using axios.delete is more semantically correct for deletion,
    // but if your backend expects a GET request for deletion, you can change it accordingly.
    const response = await apiAxios.delete('/provider-api/coupons/delete/', {
      params: {
        id: couponID,
      },
    });

    console.log("Delete Coupon Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to delete Coupon");
    }

    return response.data; // Expected to be: { "status": "success", "message": "Category deleted successfully" }

  } catch (error: any) {
    console.error("Error deleting Coupon:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error deleting Coupon");
  }
};




// Coupon Page -- --> List Coupons Tab
// GET Method from the API
export const expiredCouponList = async (pageNumber: number, byStatus: number, byMonth: string) => {

  try {
    const response = await apiAxios.get(`/provider-api/coupons/expired/`, {
      params: {
        page: pageNumber,
        status: byStatus,
        month: byMonth,
      },
    });

    console.log("Expired Coupons list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Expired Coupons list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching Expired Coupons list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch Expired Coupons list. Please try again later.");
  }
}
