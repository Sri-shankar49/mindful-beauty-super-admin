import { useEffect, useState } from 'react';
import { InputField } from '../../common/InputField';
import { MdSearch } from 'react-icons/md';
import { Pagination } from '../../common/Pagination';
import { walletList } from '../../api/apiConfig';
import { AddCreditPopup } from './AddCreditPopup';
import { Button } from '../../common/Button';


// Proptypes from API
interface WalletManagementProps {
    count: number;
    next: string;
    previous: string;
    provider_id: number;
    provider_name: string;
    phone: string;
    total_credits: number;
    available_credits: number;
    used_credits: number;
    city: string;
    service_type_id: number;
    service_type_name: string;
}


export const WalletManagementTable = () => {

    const [walletData, setWalletData] = useState<WalletManagementProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const [totalItems, setTotalItems] = useState(0);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    const [selectedProviderWallet, setSelectedProviderWallet] = useState<any>(null);
    const [showAddCreditPopup, setShowAddCreditPopup] = useState(false);


    const openAddCreditPopup = (walletDetails: any) => {
        setSelectedProviderWallet(walletDetails);
        setShowAddCreditPopup(true);
        console.log("Adding credits to the provider", walletDetails);
    }

    const closeAddCreditPopup = () => {
        setShowAddCreditPopup(false);
    }


    // API call to fetch data
    useEffect(() => {

        const fetchWalletData = async () => {
            setLoading(true);

            try {
                const response = await walletList(currentPage, 0, "");

                setWalletData(response.results.data);
                setTotalItems(response.count);

                console.log("Wallet Data log:", response);

                console.log("Fetched Wallet Data List pagination count data log :", response.count);

            } catch (error: any) {
                setError(error.message || "Unable to fetch Wallet data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchWalletData();
    }, [currentPage, itemsPerPage]);




    // Filter the Wallet Data by Provider
    const [provider, setProvider] = useState<number>(0); // Default to ""

    const handleprovider = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvider = Number(event.target.value);
        setProvider(selectedProvider);
    };

    // Filter the Wallet Data by Search
    const [searchQuery, setSearchQuery] = useState<string>(""); // Default to ""

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
    };

    // Function after handling the Provider & Search
    useEffect(() => {
        const fetchFilteredData = async () => {
            setLoading(true);

            try {
                const response = await walletList(currentPage, Number(provider), searchQuery);

                setWalletData(response.results.data);
                setTotalItems(response.count);

                console.log("Wallet Data log:", response);

                console.log("Fetched Wallet Data List pagination count data log :", response.count);

            } catch (error: any) {
                setError(error.message || "Unable to fetch Wallet data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        // Fetch only if a provider is selected
        if (provider || searchQuery) {
            fetchFilteredData();
        }

    }, [provider, searchQuery, currentPage]);



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

                {/* Select & Search Fields */}
                <div className="flex items-start space-x-5 py-5">

                    {/* Salon & Freelancer Select field */}
                    <div>
                        <select
                            // name=""
                            id=""
                            className="w-80 rounded-[5px] border-2 border-mindfulgrey px-2 py-[0.36rem] focus-within:outline-none"
                            value={provider}
                            onChange={handleprovider} // Call on change
                        >
                            <option value="0" disabled>Select an Option</option>
                            <option value="1">Salon</option>
                            <option value="2">Freelancer</option>
                        </select>
                    </div>

                    {/* Search Field */}
                    <div className="relative">
                        <InputField
                            label={''}
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-80 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                        />
                        <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" />
                    </div>
                </div>


                <div className="">
                    <table className="w-full">
                        <thead className="bg-mindfulLightgrey">
                            <tr className="">
                                <th className="text-start px-2 py-3">SP Name</th>
                                <th className="text-start px-2 py-3">Contact</th>
                                <th className="text-start px-2 py-3">Location</th>
                                <th className="text-start px-2 py-3">Available Credits</th>
                                <th className="text-start px-2 py-3">Used Credits</th>
                                <th className="text-start px-2 py-3">Total Purchased</th>
                                <th className="text-start px-2 py-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-5">Loading...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={7} className="text-red-500 text-center py-5">Error: {error}</td>
                                </tr>
                            ) : walletData.length > 0 ? (
                                walletData.map((wallet) => (
                                    <tr key={wallet.provider_id} className="border-b-2 border-mindfulGreyTypeTwo">

                                        <td className="text-start px-2 py-5">{wallet.provider_name}</td>
                                        <td className="text-start px-2 py-5">{wallet.phone || "N/A"}</td>
                                        <td className="text-start px-2 py-5">{wallet.city || "N/A"}</td>
                                        <td className="text-start px-2 py-5">{wallet.available_credits}</td>
                                        <td className="text-start px-2 py-5">{wallet.used_credits}</td>
                                        <td className="text-start px-2 py-5">{wallet.total_credits}</td>
                                        <td className="text-start px-2 py-5">
                                            <div>
                                                <Button
                                                    onClick={() => openAddCreditPopup(wallet.provider_id)}
                                                    buttonType="button"
                                                    buttonTitle={'Add Credit'}
                                                    className="bg-mindfulWhite text-md text-mindfulBlack font-normal border-[1px] border-mindfulgrey rounded-md px-5 py-1"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-5">No Wallet Data Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


                {showAddCreditPopup && selectedProviderWallet && <AddCreditPopup closePopup={closeAddCreditPopup} providerData={selectedProviderWallet} />}

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
    )
}
