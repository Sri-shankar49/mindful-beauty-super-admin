import { WalletManagementTable } from '../components/WalletManagement/WalletManagementTable'

export const WalletManagement = () => {
    return (
        <div className="bg-mindfulLightPink px-5 py-5" >

            <div className="bg-mindfulWhite px-5 py-5">

                <div className="border-b-2 border-b-mindfulgrey">
                    <h5 className="text-3xl font-semibold pb-5 max-lg:text-xl">Wallet Management</h5>
                </div>

                <div>
                    <WalletManagementTable />
                </div>
            </div>
        </div>
    )
}
