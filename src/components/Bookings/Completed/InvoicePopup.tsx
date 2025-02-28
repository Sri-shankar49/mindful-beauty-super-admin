import { IoCloseCircle } from 'react-icons/io5'
import { Button } from '../../../common/Button';
import { useEffect, useState } from 'react';
import { invoiceDetails, salesTransactionsInvoice } from '../../../api/apiConfig';
import { NotifyError } from '../../../common/Toast/ToastMessage';

interface InvoicePopupProps {
    closePopup: () => void;
    transactionData: {
        id: number;
        provider_id: number;
        date: string;
        amount: number;
        credits: number;
        type: string;
        payment_type: string;
        transaction_id: string;
        order_id: string;
        total_amount: number;
        status: string;
        pay_id: string;
        cgst: number;
        sgst: number;
        provider_name: string;
        owner_name: string;
        provider_phone: string;
        payment_mode: string;
        service_type: string;
    }
}

interface InvoiceData {
    provider: {
        name: string;
        owner_name: string;
        phone: number;
        address: string;
    };
    transaction: {
        date: string;
        amount: string;
        cgst: string;
        sgst: string;
        total_amount: string;
        payment_type: string;
        transaction_id: string;
        order_id: string;
        status: string;
        credits: string;
    };
}

const numberToWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    const convertLessThanThousand = (n: number): string => {
        if (n === 0) return '';

        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');

        return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convertLessThanThousand(n % 100) : '');
    };

    if (num === 0) return 'Zero';

    const thousands = Math.floor((num % 100000) / 1000);
    const hundreds = num % 1000;

    let words = '';
    if (thousands) words += convertLessThanThousand(thousands) + ' Thousand ';
    if (hundreds) words += convertLessThanThousand(hundreds);

    return words.trim() + ' Only';
};

export const InvoicePopup: React.FC<InvoicePopupProps> = ({ closePopup, transactionData }) => {


    const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            setLoading(true)
            try {
                const data = await invoiceDetails(transactionData.id);
                console.log("Invoice details data log:", data);
                if (data.status === "success") {
                    setInvoiceData(data.data);
                } else {
                    // setError("Failed to fetch invoice details");
                    NotifyError("Failed to fetch invoice details");
                }
            } catch (error: any) {
                // setError(error.message || "Error fetching invoice data");
                NotifyError(error.message || "Error fetching invoice data");
            } finally {
                setLoading(false);
            }
        };

        fetchInvoiceDetails();
    }, [transactionData.id]);



    // Function Handler for downloading the sales transactions invoice
    const handleDownloadInvoice = async (transactionID: number) => {

        try {
            // setLoading(true);
            const blob = await salesTransactionsInvoice(transactionID);

            // Create a link element and trigger download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `invoice_${transactionID}.pdf`); // Assuming it's a PDF
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.remove();
            window.URL.revokeObjectURL(url);

            console.log("Sales & transactions invoice downloaded successfully.");

        }
        catch (error: any) {
            // setError(error.message || "Failed to download sales & transactions Invoice.");
            NotifyError(error.message || "Failed to download sales & transactions Invoice.");
        }
        finally {
            setLoading(false);// Reset the loading state
        }
    }


    return (
        <div>
            <div className="fixed inset-0 bg-mindfulLightBlack flex justify-center items-center z-50">
                {/* <div className="container mx-auto"> */}

                <div className="relative bg-white rounded-[5px] w-6/12 mx-auto px-20 py-10 overflow-y-auto h-[95%]">


                    {/* <div className="relative mb-16">
                            <h2 className="text-2xl text-mindfulBlack font-semibold">Payment Details</h2>
                            <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                            </div>
                        </div> */}

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

                            {/* Invoice to & Payment Details */}
                            <div className="grid grid-cols-2 gap-x-5 items-center mb-10">

                                {/* Grid Column One */}
                                <div className="space-y-5">

                                    {/* Invoice to: */}
                                    <div className="">
                                        <h5
                                            className="text-md text-mindfulBlack font-semibold mb-5"
                                        >
                                            Invoice to:
                                        </h5>

                                        <p className="text-md text-mindfulBlack">
                                            {/* Priyanka | +91 9586589785 */}
                                            {invoiceData?.provider?.name} | {invoiceData?.provider?.phone}
                                        </p>

                                        <p className="text-md text-mindfulBlack">
                                            {/* No. 285, Second Street, Alwarpet, Chennai - 600028 */}
                                            {invoiceData?.provider?.address}
                                        </p>
                                    </div>

                                    {/* Invoice to: */}
                                    <div className="">
                                        <label
                                            htmlFor="price"
                                            className="text-md text-mindfulBlack font-semibold mb-1"
                                        >
                                            Invoice to:
                                        </label>
                                        {/* <InputField
                                             label={''}
                                             type="number"
                                             name="price"
                                             id="price"
                                             placeholder="1500"
                                             className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                         /> */}

                                        <p></p>
                                    </div>

                                </div>

                                {/* Grid Column two */}
                                <div className="space-y-5">
                                    {/* Payment Details: */}
                                    <div className="">
                                        <h5
                                            className="text-md text-mindfulBlack font-semibold mb-5"
                                        >
                                            Transaction Details:
                                        </h5>

                                        {/* <p className="text-md text-mindfulBlack">
                                             Priyanka | +91 9586589785
                                         </p>

                                         <p className="text-md text-mindfulBlack">
                                             No. 285, Second Street, Alwarpet, Chennai - 600028
                                         </p> */}

                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <td>Transaction ID:</td>
                                                    <td>
                                                        <span className="text-md text-mindfulBlack uppercase text-end"> {invoiceData?.transaction.transaction_id || "nil"} </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Order ID:</td>
                                                    <td>
                                                        <span className="text-md text-mindfulBlack uppercase text-end">{invoiceData?.transaction.order_id || "nil"}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Date:</td>
                                                    <td>
                                                        <span className="text-md text-mindfulBlack uppercase text-end">{invoiceData?.transaction.date}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Payment Mode:</td>
                                                    <td>
                                                        <span className="text-md text-mindfulBlack uppercase text-end">{invoiceData?.transaction.payment_type}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Payment Status:</td>
                                                    <td>
                                                        <span className="text-md text-mindfulBlack uppercase text-end">{invoiceData?.transaction.status}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                            {/* Description & Charges */}
                            <div>
                                <div className="w-3/4 mx-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-mindfulLightgrey">
                                                <th className="text-lg text-mindfulBlack font-normal text-start px-2 py-2">Description</th>
                                                <th className="text-lg text-mindfulBlack font-normal text-start px-2 py-2">Charges</th>
                                            </tr>
                                        </thead>

                                        <tbody className="border-b-2">
                                            <tr>
                                                <td className="font-semibold px-2 py-2">Wallet Recharge</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack font-semibold text-end px-2 py-2">{invoiceData?.transaction.amount}</span>
                                                </td>
                                            </tr>
                                            {/* <tr>
                                                <td className="font-semibold px-2 py-2">Bridal Glow Facial</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack font-semibold text-end px-2 py-2">Rs. 3500</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold px-2 py-2">Hair Spa</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack font-semibold text-end px-2 py-2">Rs. 1000</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold px-2 py-2">Gel Extension</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack font-semibold text-end px-2 py-2">Rs. 500</span>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                    </table>

                                    <div className="w-3/4 mx-auto">
                                        <table className="w-full">
                                            <tr className="border-b-2">
                                                <td className="text-lg text-mindfulBlack font-semibold px-2 py-2">Sub total:</td>
                                            </tr>

                                            <tbody className="border-b-2">
                                                <tr>
                                                    <td className=" px-2 py-3">SGST Tax:</td>
                                                    <td className=" px-2 py-3">{invoiceData?.transaction.sgst}</td>
                                                </tr>

                                                <tr>
                                                    <td className=" px-2 py-3">CGST Tax:</td>
                                                    <td className=" px-2 py-3">{invoiceData?.transaction.cgst}</td>
                                                </tr>
                                            </tbody>

                                            <tfoot>
                                                <tr>
                                                    <td className="text-md text-mindfulBlack font-semibold uppercase px-2 py-5">Total:</td>
                                                    <td className="text-md text-mindfulBlack font-semibold px-2 py-5">{invoiceData?.transaction.total_amount}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                    {/* Download Button */}
                                    <div className="text-center py-5">
                                        <Button
                                            onClick={() => handleDownloadInvoice(transactionData.id)}
                                            buttonType="button"
                                            buttonTitle="Download"
                                            className="bg-main text-lg text-mindfulWhite border-[1px] rounded-sm px-8 py-2 cursor-pointer hover:bg-mindfulWhite hover:text-main hover:border-main"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='pb-5'>
                                {/* Rupees in words */}
                                <div className="grid grid-cols-4">
                                    <p>Rupees in words:</p>
                                    <p className="col-span-3 text-md text-mindfulBlack font-semibold">
                                        {/* Five Thousand One Hundred Seventy Only */}
                                        {invoiceData?.transaction.total_amount ? numberToWords(Number(invoiceData.transaction.total_amount)) : 'ZERO'}
                                    </p>
                                </div>
                            </div>

                            {/* <div>
                                <p>1. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>3. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div> */}


                        </div>
                    )}
                </div>
            </div>
            {/* </div> */}
        </div >
    )
}
