import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { InputField } from '@/common/InputField'
import { MdSearch } from 'react-icons/md'
import { FaSort } from "react-icons/fa";
import { Pagination } from '../../common/Pagination';
import { InputField } from '../../common/InputField';
import { reviewsList } from '../../api/apiConfig';

// Proptypes frpm API
interface RatingReviewsTableProps {
  count: number;
  next: string | null;
  previous: string | null;
  review_id: number;
  created_at: string;
  order_id: string;
  user_id: string;
  customer_name: string;
  rating: string | null;
  comment: string | null;
  service_objects: Services[];
}

interface Services {
  service_id: number;
  service_name: string;
}

export const RatingReviewsTable = () => {

  const [reviewsListData, setReviewsListData] = useState<RatingReviewsTableProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  useEffect(() => {

    const fetchReviewsList = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await reviewsList(currentPage);

        setReviewsListData(data.results.data || []); // Fallback to an empty array if data is null
        setTotalItems(data.count);

        console.log("Reviews list data log:", data);
        console.log("Fetched Reviews List pagination count data log :", data.count);

      } catch (error: any) {
        setError(error.message || 'Failed to fetch Reviews list');
      } finally {
        setLoading(false); // Ensure loading is false after fetching
      }
    };

    fetchReviewsList();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

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
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="text-center px-2 py-5">
                          Loading...
                        </td>
                      </tr>
                    ) : error ? (
                      /* Error State */
                      <tr>
                        <td colSpan={8} className="text-center text-red-600 py-5">
                          Error: {error}
                        </td>
                      </tr>
                    ) : (
                      reviewsListData.length > 0 ? (
                        reviewsListData.map((review) => (
                          <tr key={review.review_id} className="border-b-2 border-mindfulGreyTypeTwo">
                            <td className="text-start pl-8 ml-2 py-5">{review.review_id}</td>
                            <td className="text-start pl-8 py-5">{review.created_at}</td>
                            <td className="text-start pl-8 py-5">{review.order_id}</td>
                            <td className="text-start pl-8 py-5">{review.customer_name}</td>
                            <td className="text-start pl-8 py-5">
                              <ul >
                                {review.service_objects.map((service) => (
                                  <li key={service.service_id}>{service.service_name}</li>
                                ))}
                              </ul>
                            </td>
                            <td className="text-start pl-8 py-5">{review.rating}</td>
                            <td className="text-start pl-8 py-5">{review.comment}</td>
                          </tr>
                        ))) : (
                        <tr>
                          <td colSpan={6} className="text-center py-5">
                            No ratings & reviews data available.
                          </td>
                        </tr>)
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div>
              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
