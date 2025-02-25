import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5';
import { InputField } from '../../../common/InputField';
import { Button } from '../../../common/Button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { addSubCategory, fetchCategoriesList } from '../../../api/apiConfig';

interface AddSubCategoryPopupProps {
    closePopup: () => void;
}

// Proptypes for API
interface Category {
    count: number;
    next: string | null;
    previous: string | null;
    category_id: number;
    category_name: string;
    status: string;
    image: string;
    is_deleted: string;
}


// ✅ Zod Schema (Image Upload is Optional)
const addSubCategorySchema = zod.object({
    categoryID: zod.string().min(1, "Category is required"),
    subCategoryName: zod.string()
        .min(2, "Sub Category name must be at least 2 characters")
        .max(50, "Sub Category name must be under 50 characters"),
    // imageFile: zod.any().refine(file => {
    //     if (!file) return false;
    //     if (typeof file === 'string') return false; // Prevent string-based input
    //     return ['image/jpeg', 'image/png'].includes(file.type);
    // }, "Only JPG and PNG images are allowed"),
    imageFile: zod
        .union([
            zod.instanceof(File).refine(
                (file) => ["image/jpeg", "image/png"].includes(file.type),
                "Only JPG and PNG images are allowed"
            ),
            zod.null(), // ✅ Allows null for optional image
        ])
        .optional(),
});

type AddSubCategoryFormData = zod.infer<typeof addSubCategorySchema>;

export const AddSubCategoryPopup: React.FC<AddSubCategoryPopupProps> = ({ closePopup }) => {

    const navigate = useNavigate();

    const [categoriesData, setCategoriesData] = useState<Category[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");


    // ✅ Drag & Drop Handler
    // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    //     event.preventDefault();
    //     const file = event.dataTransfer.files?.[0];
    //     if (file && ["image/jpeg", "image/png"].includes(file.type)) {
    //         setSelectedFile(file);
    //         setFileName(file.name);
    //     } else {
    //         alert("Only JPG and PNG files are allowed!");
    //     }
    // };


    // ✅ Handle Category Selection (Clears error when user selects)
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue("categoryID", e.target.value);
        clearErrors("categoryID"); // ✅ Clears category selection error
    };

    // ✅ File Input Change Handler
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        // If user cancels file selection, don't trigger validation
        if (!file) return;

        if (["image/jpeg", "image/png"].includes(file.type)) {
            setSelectedFile(file);
            setFileName(file.name);
        } else {
            alert("Only JPG and PNG files are allowed!");
            event.target.value = "";  // ✅ Reset input value
        }
    };


    // ✅ Handle File Removal (Fixed)
    const handleRemoveFile = () => {
        setSelectedFile(null);
        setFileName("");

        // Reset file input value to allow re-selection of the same file
        const fileInput = document.getElementById("file-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";  // ✅ Reset input
    };


    // ✅ React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors, }, reset, setValue, clearErrors } = useForm<AddSubCategoryFormData>({
        resolver: zodResolver(addSubCategorySchema),
    });


    useEffect(() => {
        const fetchCategoriesData = async () => {
            setLoading(true);
            try {
                const response = await fetchCategoriesList(1);
                setCategoriesData(response.results.data);
            } catch (error: any) {
                setError("Unable to fetch categories. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategoriesData();
    }, []);


    // ✅ Form Submit Handler
    // const onSubmit = async (data: AddSubCategoryFormData) => {
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const response = await addSubCategory(Number(data.categoryID), data.subCategoryName, selectedFile); // Pass selectedFile
    //         console.log("Sub Category added successfully", response);

    //         if (response?.status === "success") {
    //             reset();        // Reset form
    //             closePopup();   // Close popup
    //             navigate(0);    // Refresh page
    //         }
    //     } catch (error: any) {
    //         console.error("Failed to add sub category:", error.message);
    //         setError(error.message || "Failed to add sub category. Please try again later.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const onSubmit = async (data: AddSubCategoryFormData) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("category", data.categoryID);
            formData.append("subcategory_name", data.subCategoryName);

            // Append file only if selected
            // if (selectedFile) {
            //     formData.append("image", selectedFile);
            // }
            // ✅ Append file only if selected, otherwise send null
            if (selectedFile) {
                formData.append("image", selectedFile);
            } else {
                formData.append("image", ""); // Sending empty string or null (depends on API handling)
            }

            const response = await addSubCategory(formData); // Ensure API expects FormData
            if (response?.status === "success") {
                reset();
                closePopup();
                navigate(0);
            }
        } catch (error: any) {
            console.error(error.message || "Failed to add sub-category. Please try again later.");

            setError(error.message || "Failed to add sub-category. Please try again later.");

            // ✅ Handle duplicate subcategory name error
            // if (error?.errors?.subcategory_name) {
            //     setError(error.errors.subcategory_name[0]); // ✅ Show API error message in UI
            // } else {
            //     setError(error.message || "Failed to add sub category. Please try again later.");
            // }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5">

                            <div className="relative mb-10">
                                <h2 className="text-2xl text-mindfulBlack font-semibold">Add Sub Category</h2>
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

                            {loading ? (
                                <div className="text-center py-5">Loading...</div>
                            ) : (
                                <div className="">
                                    <form onSubmit={handleSubmit(onSubmit)} method="post">
                                        <div className="">


                                            {/* Add Sub Category Form */}
                                            <div className="space-y-5">

                                                {/* Parent Category */}
                                                <div className="">
                                                    <label
                                                        htmlFor="name"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Category
                                                    </label>

                                                    <select
                                                        // name=""
                                                        id=""
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("categoryID")}
                                                        onChange={handleCategoryChange} // ✅ Handle category selection
                                                    >
                                                        <option value="" disabled>Select Category</option>

                                                        {categoriesData.map((category) => (
                                                            <option key={category.category_id} value={category.category_id}>
                                                                {category.category_name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {errors.categoryID && (<p className="text-sm text-red-500">{errors.categoryID.message}</p>)}

                                                </div>


                                                {/* Sub Category */}
                                                <div className="">
                                                    <label
                                                        htmlFor="name"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Sub Category
                                                    </label>
                                                    <InputField
                                                        label={''}
                                                        type="text"
                                                        // name="category"
                                                        id="category"
                                                        placeholder="Sub Category"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("subCategoryName")}
                                                    />

                                                    {errors.subCategoryName && (<p className="text-sm text-red-500">{errors.subCategoryName.message}</p>)}
                                                </div>

                                                {/* Sub Category Image */}
                                                <div>
                                                    <label className="text-md text-mindfulBlack font-semibold mb-1">Sub Category Image (Optional)</label>
                                                    <div className="border-[1px] border-mindfulgrey px-5 py-10 text-center relative">

                                                        <label htmlFor="file-upload" className="cursor-pointer">
                                                            {!fileName ? (
                                                                <>
                                                                    <p className="text-mindfulBlack font-semibold">
                                                                        Drag & Drop Image or <span className="text-mindfulBlue underline">Browse</span>
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">Supported formats: JPG, PNG</p>
                                                                </>
                                                            ) : (
                                                                <div className="flex justify-center items-center">
                                                                    <p className="text-gray-700 font-medium">{fileName}</p>
                                                                    <IoCloseCircle
                                                                        onClick={handleRemoveFile}
                                                                        className="w-5 h-5 text-gray-500 ml-3 cursor-pointer hover:text-red-500"
                                                                    />
                                                                </div>
                                                            )}
                                                        </label>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            accept="image/jpeg, image/png"
                                                            onChange={handleFileChange}
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        {/* Error response from the API */}
                                        {error && <p className="text-sm text-red-500 pt-5">{error}</p>}

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
                                                    buttonTitle={loading ? "Submitting" : "Submit"}
                                                    className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}
