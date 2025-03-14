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





// Dashboard Page -- > 
export const fetchWalletCount = async () => {
  try {
    const response = await apiAxios.get('/provider-api/wallet-counts/', {

    });

    console.log("Wallet Count Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Wallet Count");
    }

    // Accessing the correct data path
    return response.data; // Correct path to the data

  } catch (error: any) {
    console.error("Error fetching Wallet Count:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error fetching Wallet Count");
  }
};





// Dashboard Page -- > 
export const fetchCouponCount = async () => {
  try {
    const response = await apiAxios.get('/provider-api/coupon_counts/', {

    });

    console.log("Coupon Count Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Coupon Count ");
    }

    // Accessing the correct data path
    return response.data; // Correct path to the data

  } catch (error: any) {
    console.error("Error fetching Coupon Count :", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Error fetching Coupon Count ");
  }
};





// Dashboard Page -- > 
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






// Manage Role Page -- --> Role Management
// GET Method from the API
export const roleList = async () => {

  try {
    const response = await apiAxios.get(`/provider-api/provider_roles/`);

    console.log("Role list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch role list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching role list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch role list. Please try again later.");
  }
}

// Function to get provider permissions
export const getProviderPermissions = async (providerId: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/provider_permissions/${providerId}/`);
    console.log("Provider Permissions Response:", response.data);

    if (response.status !== 200 || !response.data) {
      throw new Error("Failed to retrieve provider permissions");
    }

    return response.data.data; // Return the permissions data
  } catch (error: any) {
    console.error("Error fetching provider permissions:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch permissions. Please try again later.");
  }
};


// Manage Role Page -- --> Role Management
// add permission
export const addPermissions = async (
  role: number,
  provider: string,
  permissions: {
    dashboard: boolean,
    manage_role: boolean,
    roles_management: boolean,
    staff_management: boolean,
    branch_management: boolean,
    service_listing: boolean,
    service_management: boolean,
    all_booking: boolean,
    schedule: boolean,
    inprogress: boolean,
    completed: boolean,
    cancelled: boolean,
    sales_transactions: boolean,
    ratings_reviews: boolean,
    report_details: boolean,
  }
) => {
  try {
    const response = await apiAxios.post(`/provider-api/permissions/`, {
      role: role,
      provider: provider,
      ...permissions
    });

    console.log("Permissions API response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to add permissions");
    }

    return response.data; // Return the API response for further use

  } catch (error: any) {
    console.error("Error adding permissions:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to add permissions. Please try again later.");
  }
};





// Service Provider Page -- > Active, Pending and Inactive
export const fetchProvidersList = async (status: string, searchQuery: string, pageNumber: number, pageSize: number, serviceTypeID: number) => {
  try {
    const response = await apiAxios.get('/provider-api/providers_list/', {
      params: {
        status: status,  // Active, Pending, Inactive
        search: searchQuery,// Search query
        page: pageNumber,
        page_size: pageSize,
        service_type_id: serviceTypeID// Service type id
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





// Service Management Page -- --> Categories Tab
// GET Method from the API
export const fetchCategoriesList = async (pageNumber: number, pageSize: number) => {
  try {
    const response = await apiAxios.get("/provider-api/category/", {
      params: {
        page: pageNumber,
        page_size: pageSize,
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
export const fetchSubcategoriesList = async (categoryID: number, pageNumber: number, pageSize: number) => {
  try {
    const response = await apiAxios.get('/provider-api/subcategory/', {
      params: {
        // Add any query parameters you need here
        category_id: categoryID,
        page: pageNumber,
        page_size: pageSize,
      }
    });

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





// Service Management Page -- --> Categories Tab
export const addSubCategory = async (formData: FormData): Promise<any> => {
  try {
    const response = await apiAxios.post('/provider-api/subcategory/add/', formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },
    });

    console.log("Add Sub Category List Response:", response.data);

    if (!response.data || response.status !== 201) {
      throw new Error("Failed to Add Sub Category");
    }

    return response.data; // Extracting the category data

  } catch (error: any) {
    console.error("Error adding Sub category:", error.response?.data.message || error);
    throw new Error(error.response?.data.message || "Error adding Sub category list");
  }
};






// Service Management Page -- --> Categories Tab
export const editSubCategory = async (formData: FormData): Promise<any> => {
  try {
    const response = await apiAxios.put('/provider-api/subcategory/edit/', formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },
    });

    console.log("Edit Sub Category List Response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to Edit Sub Category");
    }

    return response.data; // Extracting the category data

  } catch (error: any) {
    console.error("Error editing Sub category:", error.response?.data.message || error);
    throw new Error(error.response?.data.message || "Error editing Sub category");
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
export const fetchServicesList = async (pageNumber: number, pageSize: number, category: number, subcategory: number) => {
  try {
    const response = await apiAxios.get('/provider-api/get_services/', {
      params: {
        page: pageNumber,
        page_size: pageSize,
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
export const bookingsList = async (searchQuery: string, pageNumber: number, pageSize: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/getappointments/`, {
      params: {
        search: searchQuery,
        page: pageNumber,
        page_size: pageSize,
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
export const scheduleList = async (status: number, searchQuery: string, pageNumber: number, pageSize: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/getappointments/`, {
      params: {
        status: status,
        search: searchQuery,
        page: pageNumber,
        page_size: pageSize,
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
export const inprogressList = async (status: number, searchQuery: string, pageNumber: number, pageSize: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/getappointments/`, {
      params: {
        status: status,
        search: searchQuery,
        page: pageNumber,
        page_size: pageSize,
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
export const completedList = async (status: number, searchQuery: string, pageNumber: number, pageSize: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/getappointments/`, {
      params: {
        status: status,
        search: searchQuery,
        page: pageNumber,
        page_size: pageSize,
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
export const cancelledList = async (status: number, searchQuery: string, pageNumber: number, pageSize: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/getappointments/`, {
      params: {
        status: status,
        search: searchQuery,
        page: pageNumber,
        page_size: pageSize,
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
export const salesTransactionsList = async (pageNumber: number, pageSize: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/get-sales-transactions/`, {
      params: {
        //   provider_id: providerID,
        page: pageNumber,
        page_size: pageSize,
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





// Service Management -- --> Completed --> InvoicePopup
// GET Method from the API
export const invoiceDetails = async (transactionID: number) => {
  try {
    const response = await apiAxios.get(`/provider-api/get-provider-transaction/?id=${transactionID}`);

    console.log("Sales & Transactions list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch sales & transactions list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching sales & transactions list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch sales & transactions list. Please try again later.");
  }
};




// Sales & Transactions Page
// GET Method from the API
export const salesTransactionsCSV = async () => {

  try {
    const response = await apiAxios.get(`/provider-api/download-provider-transactions/`, {
      responseType: 'blob', // Important for file downloads
    });

    console.log("Sales & Transactions CSV GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to download CSV");
    }

    return response.data;     // Returning the Blob response

  }
  catch (error: any) {
    console.error("Error downloading CSV:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to download CSV. Please try again later.");
  }
}





// Sales & Transactions Page
// GET Method from the API
export const salesTransactionsInvoice = async (transactionID: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/provider-invoice/`, {
      params: {
        id: transactionID,
      },
    });

    console.log("Sales & Transactions Invoice GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to download sales & transactions Invoice");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error downloading sales & transactions invoice:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to download sales & transactions invoice. Please try again later.");
  }
}






// Sales & Transactions Page
// GET Method from the API
export const salesTransactionsCompletedInvoice = async (appointmentID: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/generate-invoice-pdf/`, {
      params: { appointment_id: appointmentID }, // Ensure appointmentID is passed correctly
      responseType: 'blob', // Important for file downloads (PDF, CSV, etc.)
    });

    console.log("Sales & Transactions Invoice GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to download sales & transactions Invoice");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching sales & transactions invoice:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch sales & transactions invoice. Please try again later.");
  }
}


// Service Management -- --> Completed --> InvoicePopup
// GET Method from the API
export const invoiceDetailsCompleted = async (appointmentId: number) => {
  try {
    const response = await apiAxios.get(`/provider-api/invoice/?appointment_id=${appointmentId}`);

    console.log("Sales & Transactions list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch sales & transactions list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching sales & transactions list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch sales & transactions list. Please try again later.");
  }
};



// Ratings & Reviews Page
// GET Method from the API
export const reviewsList = async (searchQuery: string, pageNumber: number, pageSize: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/review-list/`, {
      params: {
        search: searchQuery,
        page: pageNumber,
        page_size: pageSize,
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
export const couponList = async (pageNumber: number, pageSize: number, byStatus: string | number, byMonth: string) => {

  try {
    const response = await apiAxios.get(`/provider-api/get-coupons/`, {
      params: {
        page: pageNumber,
        page_size: pageSize,
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
export const editCoupon = async (couponID: number, couponCode: string, couponLimit: number, validUntil: string, discountValue: string, couponStatus: number) => {
  try {
    const response = await apiAxios.put('/provider-api/coupons/edit/', {
      id: couponID,
      coupon_code: couponCode,
      coupon_limit: couponLimit,
      valid_until: validUntil,
      discount_value: discountValue,
      status: couponStatus,
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
export const expiredCouponList = async (pageNumber: number, pageSize: number, byStatus: number, byMonth: string) => {

  try {
    const response = await apiAxios.get(`/provider-api/coupons/expired/`, {
      params: {
        page: pageNumber,
        page_size: pageSize,
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





// Wallet Management Page -- -->
// GET Method from the API
export const walletList = async (pageNumber: number, pageSize: number, byProvider: number, searchQuery: string) => {

  try {
    const response = await apiAxios.get(`/provider-api/provider-wallet/`, {
      params: {
        page: pageNumber,
        page_size: pageSize,
        service_type_id: byProvider,
        search: searchQuery,
      },
    });

    console.log("Provider Wallet list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch provider wallet list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching provider wallet list:", error.response?.data?.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch provider wallet list. Please try again later.");
  }
}




// Wallet Management Page -- -->
// GET Method from the API
export const addCredit = async (providerID: number, amount: number, paymentDate: string, paymentMode: string) => {
  try {
    const response = await apiAxios.post('/provider-api/add-credits/',
      {
        provider_id: providerID,
        amount: amount,
        payment_date: paymentDate,
        payment_mode: paymentMode,
      }
    );

    console.log("Add Credit Response:", response.data);

    if (!response.data || response.status !== 201) {
      throw new Error("Failed to Add Credits.");
    }

    return response.data; // Extracting the category data

  } catch (error: any) {
    console.error("Error adding credits:", error.response?.data.message || error);
    throw new Error(error.response?.data.message || "Error adding credits. Please try again later.");
  }
};





// General Info Popup
export const viewProviderGeneralInfo = async (providerId: number) => {
  try {
    const response = await apiAxios.get(`/provider-api/general_info/`, {
      params: {
        provider_id: providerId, // Sending provider_id as query parameter
      },
    });

    console.log("Provider General Info GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch provider general information");
    }

    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching provider general information:",
      error.response?.data?.message || error
    );
    throw new Error(
      error.response?.data?.message ||
      "Unable to fetch provider general information. Please try again later."
    );
  }
};





export const viewBranchList = async (salonID: string | number) => {
  try {
    const response = await apiAxios.get(
      `/provider-api/branches-list/${salonID}`
    );
    console.log("Branch list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch branch list");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching branch list:", error.message || error);
    throw new Error(
      error.response?.data?.message ||
      "Unable to fetch branch list. Please try again later."
    );
  }
};