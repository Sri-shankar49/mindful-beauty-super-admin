import React, { useEffect, useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { Button } from "../../../common/Button";
import { InputField } from "../../../common/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { categories, editService, subCategories } from '../../../api/apiConfig';

interface EditServicePopupProps {
    closePopup: () => void;
    editServiceData: {
        count: number;
        next: string | null;
        previous: string | null;
        service_id: number;
        service_name: string;
        category: number;
        category_name: string;
        subcategory: number;
        subcategory_name: string;
        price: string;
        status: string;
        sku_value: string;
        description: string;
        service_time: string;
        is_deleted: boolean;
    }
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

const editServiceSchema = zod.object({
    category: zod.string().min(1, "Category is required"),
    subcategory: zod.string().min(1, "Subcategory is required"),
    services: zod.string().min(1, "Service name is required"),
    price: zod.string().min(1, "Price is required"),
    duration: zod.string().min(1, "Duration is required"),
    description: zod.string().min(1, "Description is required"),
});

type EditServiceFormData = zod.infer<typeof editServiceSchema>;

export const EditServicePopup: React.FC<EditServicePopupProps> = ({ closePopup, editServiceData, refreshData }) => {

    const [categoryList, setCategoryList] = useState<categoriesDataProps[]>([]);
    const [subcategoryList, setSubCategoryList] = useState<SubCategoriesDataProps[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(editServiceData.category);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors } } = useForm<EditServiceFormData>({
        resolver: zodResolver(editServiceSchema),
        defaultValues: {
            category: String(editServiceData.category),
            subcategory: String(editServiceData.subcategory),
            services: editServiceData.service_name,
            price: editServiceData.price,
            duration: editServiceData.service_time,
            description: editServiceData.description,
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


    // Funtion handler for loading the Sub Categories on initial Load
    useEffect(() => {
        if (selectedCategory) {
            const fetchSubcategories = async () => {
                try {
                    const response = await subCategories(String(selectedCategory));
                    if (response.status === "success") {
                        setSubCategoryList(response.data);
                    } else {
                        setError("Failed to fetch subcategories.");
                    }
                } catch (error: any) {
                    setError(error.message || "Unable to fetch subcategories.");
                }
            };

            fetchSubcategories();
        }
    }, [selectedCategory]);

    const onSubmit = async (data: EditServiceFormData) => {
        setLoading(true); // Show loading on submit button only

        try {
            const response = await editService(
                editServiceData.service_id, // Pass the service_id
                data.services,              // Pass the updated service name
                Number(data.category),      // Pass the updated category
                Number(data.subcategory),   // Pass the updated subcategory
                data.price,                 // Pass the updated price
                data.services,              // Pass the updated description
                data.duration               // Pass the updated service time
            );

            console.log("Service updated successfully:", response);

            if (response?.status === "success") {
                closePopup(); // Close the popup after successful update
                refreshData(); // Refresh the data
            }
            // Call fetchservices to refresh the service list after the update
        } catch (error: any) {
            console.error("Error updating service:", error);
            setError(error.message || "Unable to update Service. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-0">
                    {/* <div className="container mx-auto"> */}
                        {/* <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5"> */}
                        <div className="relative bg-white rounded-[5px] w-7/12 mx-auto px-10 py-10 max-2xl:overflow-y-auto max-2xl:h-[85%]">
                            <div className="relative mb-10">
                                <h5 className="text-2xl text-mindfulBlack font-semibold">
                                    Edit Service
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
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus:outline-none cursor-not-allowed"
                                                        {...register("category")}
                                                        onChange={(e) => setSelectedCategory(Number(e.target.value))}
                                                        disabled
                                                    // onChange={handleCategoryChange}
                                                    // value={selectedCategory} // ✅ Ensures it's controlled
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
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none cursor-not-allowed"
                                                        {...register("subcategory")}
                                                        disabled
                                                    >

                                                        <option value="" disabled>
                                                            {/* {selectedCategory ? "Select Subcategory" : "Please select a category first"} */}
                                                            Select Subcategory
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

                                            <div className="flex items-start space-x-5 mb-5">
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

                                            {/* Services Field */}
                                            <div className="mb-5">
                                                <label
                                                    htmlFor="services"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Description
                                                </label>

                                                <InputField
                                                    label=""
                                                    type="text"
                                                    // name="services"
                                                    id="description"
                                                    placeholder="Enter service name"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus:outline-none"
                                                    {...register("description")}
                                                />

                                                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

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
                                                    buttonTitle={loading ? "Saving..." : "Save"}
                                                    // className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer"
                                                    className={`bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer ${loading ? 'opacity-50' : ''}`}
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
    )
}
