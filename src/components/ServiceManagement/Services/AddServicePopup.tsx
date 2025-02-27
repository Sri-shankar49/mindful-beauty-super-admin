import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { Button } from "../../../common/Button";
import { InputField } from "../../../common/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { addService, categories, subCategories } from "../../../api/apiConfig";

interface AddServicePopupProps {
    closePopup: () => void;
    refreshData: () => void;
}

interface categoriesDataProps {
    category_id?: string;
    category_name: string;
    status: string;
    image: string;
}

interface SubCategoriesDataProps {
    subcategory_id?: string;
    subcategory_name: string;
    category?: number;
    status: string;
}

const addServiceSchema = zod.object({
    category: zod.string().min(1, "Category is required"),
    subcategory: zod.string().min(1, "Subcategory is required"),
    services: zod.string().min(1, "Service name is required"),
    price: zod.string().min(1, "Price is required"),
    duration: zod.string().min(1, "Duration is required"),
});

type AddServiceFormData = zod.infer<typeof addServiceSchema>;

export const AddServicePopup: React.FC<AddServicePopupProps> = ({ closePopup, refreshData }) => {

    const [categoryList, setCategoryList] = useState<categoriesDataProps[]>([]);
    const [subcategoryList, setSubCategoryList] = useState<SubCategoriesDataProps[]>([]);

    const [selectedCategory, setSelectedCategory] = useState("");


    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [submitting, setSubmitting] = useState<boolean>(false); // For form submission

    // ✅ React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors }, reset, setValue, clearErrors } = useForm<AddServiceFormData>({
        resolver: zodResolver(addServiceSchema),
        defaultValues: {
            category: "",       // Ensures fields start empty
            subcategory: "",
            services: "",
            price: "",
            duration: "",
        },
    });


    // Fetch categories when the popup opens
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);

            try {
                const response = await categories();

                if (response.status === "success") {
                    setCategoryList(response.data); // Ensure we are setting only the category list
                    console.log("Categories List Data log:", response);

                } else {
                    console.error("Invalid category response structure");
                }
            } catch (error: any) {
                setError(error.message || "Unable to fetch Categories List. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);


    // Function to handle category change and fetch subcategories
    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryID = event.target.value; // Get the selected categoryId
        setSelectedCategory(selectedCategoryID); // Update state

        // Set value and trigger validation
        setValue("category", selectedCategoryID, { shouldValidate: true });

        // ✅ Explicitly clear the error
        clearErrors("category");

        try {
            const response = await subCategories(selectedCategoryID); // Pass categoryId to API

            setSubCategoryList(response.data); // Update subcategories

            console.log("Sub Category List data log:", response);

        } catch (error: any) {
            console.error("Error fetching subcategories:", error);
            setError(error.message || "Unable to fetch Sub Categories List. Please try again later.");
        } finally {
            setLoading(false);
        }
    }


    const onSubmit = async (data: AddServiceFormData) => {
        setSubmitting(true); // Show loading on submit button only

        console.log("Add Services Form Data log:", data);
        try {
            // Since our form doesn't include a description, we pass an empty string.
            const response = await addService(
                data.services,              // maps to service_name
                parseInt(data.category),    // convert string to number for category
                parseInt(data.subcategory), // convert string to number for subcategory
                data.price,
                "Services",                 // description (adjust this if you decide to add a description field)
                data.duration               // maps to service_time
            );

            console.log("Service added successfully:", response);

            if (response?.status === "success") {
                reset();            // Reset form after submission
                closePopup(); // Close the popup on success
                refreshData();
            }

        } catch (error: any) {
            console.error("Error adding service:", error);
            setError(error.message || "Unable to add Service. Please try again later.");

            // Optionally, handle the error (e.g., display an error message to the user)
        } finally {
            setSubmitting(false); // Stop button loading state
        }
    };

    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-0">
                    {/* <div className="container mx-auto"> */}
                        {/* <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5"> */}
                        <div className="relative bg-white rounded-[5px] w-7/12 mx-auto px-10 py-10 max-2xl:overflow-y-auto max-2xl:h-[80%]">
                            <div className="relative mb-10">
                                <h5 className="text-2xl text-mindfulBlack font-semibold">
                                    Add Service
                                </h5>
                                <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5"></div>
                            </div>

                            {/* Close Button */}
                            <div
                                onClick={closePopup}
                                className="absolute top-5 right-5 w-fit cursor-pointer"
                            >
                                <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                            </div>

                            {loading ? (
                                <div className="text-center">Loading...</div>
                            ) : (
                                <div className="">
                                    <form onSubmit={handleSubmit(onSubmit)} method="post">
                                        <div className="">
                                            {/* Add Staff Form */}

                                            <div className="flex items-start space-x-5 mb-5">

                                                {/* Category Field - 3/4 Width */}
                                                <div className="w-3/4">
                                                    <label
                                                        htmlFor="category"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Category
                                                    </label>

                                                    <select
                                                        id="category"
                                                        // name="category"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus:outline-none"
                                                        {...register("category")}
                                                        onChange={handleCategoryChange}
                                                        value={selectedCategory} // ✅ Ensures it's controlled
                                                    >

                                                        <option value="" disabled>Select Category</option>

                                                        {categoryList.map((category) => (
                                                            <option key={category.category_id} value={category.category_id} >
                                                                {category.category_name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                                                </div>

                                                {/* Subcategory Field - 2/4 Width */}
                                                <div className="w-2/4">
                                                    <label
                                                        htmlFor="subcategory"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Sub Category
                                                    </label>

                                                    <select
                                                        id="subcategory"
                                                        // name="subcategory"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("subcategory")}
                                                    >

                                                        <option value="" disabled>
                                                            {selectedCategory ? "Select Subcategory" : "Please select a category first"}
                                                        </option>

                                                        {subcategoryList.map((subcategory) => (
                                                            <option
                                                                key={subcategory.subcategory_id}
                                                                value={subcategory.subcategory_id}
                                                            >
                                                                {subcategory.subcategory_name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {errors.subcategory && <p className="text-sm text-red-500">{errors.subcategory.message}</p>}
                                                </div>
                                            </div>

                                            {/* Services Field */}
                                            <div className="mb-5">
                                                <label
                                                    htmlFor="services"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Services
                                                </label>

                                                <InputField
                                                    label=""
                                                    type="text"
                                                    // name="services"
                                                    id="services"
                                                    placeholder="Enter service name"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus:outline-none"
                                                    {...register("services")}
                                                />

                                                {errors.services && <p className="text-sm text-red-500">{errors.services.message}</p>}

                                            </div>

                                            <div className="flex items-start space-x-5">
                                                {/* Category Field - 3/4 Width */}
                                                <div className="w-3/4">
                                                    <label
                                                        htmlFor="category"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Price
                                                    </label>
                                                    <InputField
                                                        label=""
                                                        type="number"
                                                        id="price"
                                                        // name="price"
                                                        placeholder="Price"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("price")}
                                                    />

                                                    {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                                                </div>

                                                {/* Subcategory Field - 1/4 Width */}
                                                <div className="w-2/4">
                                                    <label
                                                        htmlFor="duration"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Duration
                                                    </label>
                                                    <InputField
                                                        label=""
                                                        type="text"
                                                        // name="duration"
                                                        id="duration"
                                                        placeholder="Duration"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("duration")}
                                                    />

                                                    {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Error response from the API */}
                                        {error && <p className="text-sm text-red-500">{error}</p>}

                                        {/* Buttons */}
                                        <div className="pt-10">
                                            <div className="flex items-center justify-center space-x-5">
                                                {/* Cancel Button */}
                                                <Button
                                                    onClick={closePopup}
                                                    buttonType="button"
                                                    buttonTitle="Cancel"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer"
                                                />

                                                {/* Submit Button */}
                                                <Button
                                                    buttonType="submit"
                                                    // buttonTitle="Save"
                                                    buttonTitle={submitting ? "Adding..." : "Add Service"}
                                                    // className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer"
                                                    className={`bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer ${submitting ? 'opacity-50' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
};
