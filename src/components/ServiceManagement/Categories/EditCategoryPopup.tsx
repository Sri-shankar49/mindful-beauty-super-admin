import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5';
import { InputField } from '../../../common/InputField';
import { Button } from '../../../common/Button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { editCategory } from '../../../api/apiConfig';

interface EditCategoryPopupProps {
  closePopup: () => void;
  editCategoryData: {
    count: number;
    next: string | null;
    previous: string | null;
    category_id: number;
    category_name: string;
    status: string;
    image: string;
    is_deleted: string;
  }
}

// ✅ Zod Schema for Validation
const editCategorySchema = zod.object({
  category: zod.string().min(2, "Category name must be at least 2 characters").max(50, "Category name must be under 50 characters"),
});

type EditCategoryFormData = zod.infer<typeof editCategorySchema>;

export const EditCategoryPopup: React.FC<EditCategoryPopupProps> = ({ closePopup, editCategoryData }) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ React Hook Form setup with Zod validation
  const { register, handleSubmit, formState: { errors, }, reset, } = useForm<EditCategoryFormData>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      category: editCategoryData.category_name
    }, // ✅ Set default value
  });


  // ✅ Form Submit Handler
  const onSubmit = async (data: EditCategoryFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await editCategory(editCategoryData.category_id, data.category, editCategoryData.image);
      console.log("Category edited successfully", response.data);

      if (response?.status === "success") {
        reset();            // Reset form after submission
        closePopup();       // Close the popup
        navigate(0);
      }

    } catch (error: any) {
      console.error("Failed to edit category:", error.message);
      setError(error.message || "Failed to edit category. Please try again later.")
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <div>
        <div className="fixed inset-0 bg-mindfulLightBlack bg-opacity-50 flex justify-center items-center z-50">
          <div className="container mx-auto">

            <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5">

              <div className="relative mb-10">
                <h2 className="text-2xl text-mindfulBlack font-semibold">Edit Category</h2>
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
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                  <div className="">


                    {/* Add Staff Form */}
                    <div className="space-y-5">

                      {/* City */}
                      <div className="">
                        <label
                          htmlFor="name"
                          className="text-md text-mindfulBlack font-semibold mb-1"
                        >
                          Category
                        </label>
                        <InputField
                          label={''}
                          type="text"
                          // name="category"
                          id="category"
                          placeholder="Edit Category"
                          className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                          {...register("category")}
                        />

                        {errors.category && (
                          <p className="text-sm text-red-500">{errors.category.message}</p>
                        )}

                        {/* Error response from the API */}
                        {error && <p className="text-sm text-red-500">{error}</p>}
                      </div>
                    </div>

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
                        buttonTitle={loading ? "Submitting" : "Submit"}
                        className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
