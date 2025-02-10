import { NavLink } from 'react-router-dom';
// import { InputField } from '@/common/InputField'
import { MdSearch } from 'react-icons/md'
import { FaSort } from "react-icons/fa";
import { Pagination } from '../../common/Pagination';
import { InputField } from '../../common/InputField';
// import { Pagination } from '@/common/Pagination';

export const RatingReviewsTable = () => {
  return (
    <div>
      <div>
        <div className="bg-mindfulLightPink h-dvh px-5 py-5" >

          <div className="bg-mindfulWhite px-5 py-5">

            <div className="pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <NavLink to="ServiceList">
                    <h5 className="text-3xl font-semibold">Ratings & Reviews</h5>
                  </NavLink>
                </div>

                {/* Select, Add Service & Search */}
                <div className="">
                  {/* Search Field */}
                  <div className="flex items-center relative">
                    <InputField
                      label={''}
                      placeholder="Search"
                      className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                    />
                    <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" />
                  </div>
                </div>

              </div>
            </div>


            {/* Rating Table */}
            <div>
              <div>
                <table className="w-full">
                  <thead className="bg-mindfulLightgrey">
                    <tr className="">
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          #
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Date
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Order ID
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Customer
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Service
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Ratings
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Comments
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Content */}
                    <tr className="border-b-2">
                      <td className="text-start pl-8 ml-2 py-5">1</td>
                      <td className="text-start pl-8 py-5">11 August 2024</td>
                      <td className="text-start pl-8 py-5">MB94873</td>
                      <td className="text-start pl-8 py-5">Arshada</td>
                      <td className="text-start pl-8 py-5">Bridal Glow Facial</td>
                      <td className="text-start pl-8 py-5">4.8</td>
                      <td className="text-start pl-8 py-5">Excellent Service, Well-Trained professionals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* Pagination */}
      <div>
        <Pagination
          currentPage={0}
          totalItems={0}
          itemsPerPage={0}
          onPageChange={function (page: number): void {
            throw new Error("Function not implemented.");
          }} onItemsPerPageChange={function (items: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  )
}
