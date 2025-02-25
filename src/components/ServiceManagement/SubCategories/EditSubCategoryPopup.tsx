import React, { useEffect, useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5';
import { InputField } from '../../../common/InputField';
import { Button } from '../../../common/Button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { categories, editSubCategory } from '../../../api/apiConfig';
import { SelectField } from '../../../common/SelectField';

interface EditSubCategoryPopupProps {
    closePopup: () => void;
    subCategoryData: {
        subcategory_id: number;
        subcategory_name: string;
        category_id: number;
        category_name: string;
        status: string;
        is_deleted: string;
        image: File | null;  // ✅ Ensure image is either a URL string, File, or null
    }                           // Pass the selected Category ID
    refreshData: () => void;
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
const editubCategorySchema = zod.object({
    subcategory_id: zod.number().min(1, "Invalid Subcategory ID"),
    categoryID: zod.string().min(1, "Category is required"),
    subCategoryName: zod.string()
        .min(2, "Sub Category name must be at least 2 characters")
        .max(50, "Sub Category name must be under 50 characters"),
    imageFile: zod
        .union([
            zod.instanceof(File).refine(
                (file) => ["image/jpeg", "image/png"].includes(file.type),
                "Only JPG and PNG images are allowed"
            ),
            zod.string().url().or(zod.null()), // Allow existing image URLs
        ])
        .optional(),
});

type EditSubCategoryFormData = zod.infer<typeof editubCategorySchema>;

export const EditSubCategoryPopup: React.FC<EditSubCategoryPopupProps> = ({ closePopup, subCategoryData, refreshData }) => {

    const [categoriesData, setCategoriesData] = useState<Category[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>(subCategoryData.image ? subCategoryData.image.name || "" : "");

    // Preload existing image (File or URL)
    const [existingImage, setExistingImage] = useState<string | null>(
        typeof subCategoryData.image === "string" ? subCategoryData.image : null
    );


    // useEffect(() => {
    //     if (subCategoryData.image) {
    //         if (typeof subCategoryData.image === "string") {
    //             setExistingImage(subCategoryData.image); // Set existing URL
    //             setFileName(subCategoryData.image.split("/").pop() || "Existing Image"); // Extract file name
    //         } else if (subCategoryData.image instanceof File) {
    //             setSelectedFile(subCategoryData.image);
    //             setFileName(subCategoryData.image.name);
    //         }
    //     }
    // }, [subCategoryData.image]);


    const isString = (value: unknown): value is string => typeof value === "string";

    useEffect(() => {
        if (subCategoryData.image) {
            if (isString(subCategoryData.image)) {
                setExistingImage(subCategoryData.image);
                setFileName(subCategoryData.image.split("/").pop() ?? "Existing Image");
            } else if (subCategoryData.image instanceof File) {
                setSelectedFile(subCategoryData.image);
                setFileName(subCategoryData.image.name);
            }
        }
    }, [subCategoryData.image]);




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


    // ✅ React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors, }, reset } = useForm<EditSubCategoryFormData>({
        resolver: zodResolver(editubCategorySchema),
        defaultValues: {
            categoryID: String(subCategoryData.category_id) || '', // Preload with existing category
            subcategory_id: subCategoryData.subcategory_id,
            subCategoryName: subCategoryData.subcategory_name || '',
            imageFile: subCategoryData.image || null,
        },
    });


    useEffect(() => {
        const fetchCategoriesData = async () => {
            setLoading(true);
            try {
                const response = await categories();
                setCategoriesData(response.data);
            } catch (error: any) {
                setError("Unable to fetch categories. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategoriesData();
    }, []);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (["image/jpeg", "image/png"].includes(file.type)) {
            setSelectedFile(file);
            setFileName(file.name);
        } else {
            alert("Only JPG and PNG files are allowed!");
            event.target.value = "";
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setFileName("");
        setExistingImage(null); // Clear existing image on removal
    };


    // ✅ Form Submit Handler
    const onSubmit = async (data: EditSubCategoryFormData) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("subcategory_id", String(data.subcategory_id));
            formData.append("category_id", data.categoryID);
            formData.append("subcategory_name", data.subCategoryName);

            // if (selectedFile) {
            //     formData.append("image", selectedFile);
            // }

            if (selectedFile) {
                formData.append("image", selectedFile); // Upload new file
            } else if (existingImage) {
                formData.append("image", existingImage); // Keep existing image URL
            }

            const response = await editSubCategory(formData);
            if (response?.status === "success") {
                reset();
                closePopup();
                refreshData();
            }
        } catch (error: any) {
            setError(error.message || "Failed to update sub-category. Please try again.");
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
                                <h2 className="text-2xl text-mindfulBlack font-semibold">Edit Sub Category</h2>
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

                                                    {/* <select
                                                        id="category"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("categoryID")}
                                                        defaultValue={String(subCategoryData.category_id)} // ✅ Set default value dynamically
                                                    >
                                                        {categoriesData.length > 0 ? (
                                                            categoriesData.map((category) => (
                                                                <option
                                                                    key={category.category_id}
                                                                    value={category.category_id?.toString() || ''}
                                                                    selected={category.category_id === subCategoryData.category_id} // ✅ Ensure pre-selection
                                                                >
                                                                    {category.category_name}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option value="" disabled>Loading categories...</option>
                                                        )}
                                                    </select> */}

                                                    <SelectField
                                                        label={''}
                                                        // name="category"
                                                        id="category"
                                                        options={categoriesData.map((category) => ({
                                                            value: category.category_id?.toString() || '', // Ensure value is a string
                                                            label: category.category_name,
                                                        }))}
                                                        // defaultValue={editStaffData.role_name} // Set the default value to the role name
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        {...register("categoryID")}
                                                    />

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
                                                            {!fileName && !existingImage ? (
                                                                <>
                                                                    <p className="text-mindfulBlack font-semibold">
                                                                        Drag & Drop Image or <span className="text-mindfulBlue underline">Browse</span>
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">Supported formats: JPG, PNG</p>
                                                                </>
                                                            ) : (
                                                                <div className="flex justify-center items-center">
                                                                    <p className="text-gray-700 font-medium">
                                                                        {fileName || (existingImage ? "Existing Image" : "")}
                                                                    </p>
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
