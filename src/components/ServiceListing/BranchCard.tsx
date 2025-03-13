import profileThumbnail from "../../assets/images/profileThumbail.webp"
import userAdmin from "../../assets/icons/userAdmin.svg"

interface BranchCardProps {
    branchID: string;
    branchName: string;
    phone: string;
    location: string;
    logo: string;
    userName: string;
    userPhone: string;
    userRole: string;
    BranchStatus: number;
}

export const BranchCard: React.FC<BranchCardProps> = ({ branchID, branchName, location, logo, userName, userPhone, userRole, BranchStatus }) => {
    // Determine status text and styling
    const statusText = BranchStatus === 1 ? "Active" : "Inactive";
    const statusClass =
        BranchStatus === 1
            ? "bg-mindfulGreen text-mindfulWhite"
            : "bg-mindfulAsh text-mindfulWhite";
    return (
        <div key={branchID} className="w-full shadow-lg px-5 py-5">

            {/* Branch Name */}
            <div className="flex items-center space-x-2 mb-5">
                <div>
                    <img src={userAdmin} alt="" />
                </div>

                {/* <h5 className="text-lg text-mindfulBlack font-semibold">Ashtamudi Wellness</h5> */}
                <h5 className="text-lg text-mindfulBlack font-semibold">{branchName}</h5>
            </div>

            {/* Manager Image & Details */}
            <div className="flex items-center space-x-5 mb-5">
                {/* Manager Image */}
                <div>
                    <img
                        src={logo || profileThumbnail}
                        alt="manager image"
                        className="w-12 h-12 rounded-full"
                    />
                </div>

                <div>
                    {/* <h5 className="text-sm text-mindfulBlack font-semibold">Paul Williams</h5> */}
                    {/* <p>Manager</p> */}
                    {/* <p>+91 98847 19615</p> */}
                    {/* <p>{phone}</p> */}
                    <p>{userPhone}</p>
                </div>
            </div>

            {/* Location & Status */}
            <div className="flex items-center justify-between mb-5">
                {/* Location */}
                <div>
                    <p className="text-sm text-mindfulAsh">Location</p>
                    {/* <p>Kochi</p> */}
                    <p>{location}</p>
                </div>

                {/* Status */}
                {/* <div>
                    <p className="text-sm text-mindfulAsh">Status</p>
                    <p className="bg-mindfulGreen text-sm text-mindfulWhite rounded-full px-3 py-0.5">Active</p>
                </div> */}
                <div>
                    <p className="text-sm text-mindfulAsh">Status</p>
                    <p className={`text-sm rounded-full px-3 py-0.5 ${statusClass}`}>
                        {statusText}
                    </p>
                </div>
            </div>

            {/* Members */}
            <div>
                {/* <p className="text-sm text-mindfulAsh">Members</p> */}

                <div className="flex items-center justify-between">


                    <div>
                        <p className="text-md text-mindfulBlack capitalize">{userName}</p>
                        <p className="text-sm text-mindfulAsh">{userRole}</p>
                        {/* <p className="text-sm text-mindfulBlack">{userPhone}</p> */}
                    </div>



                </div>

            </div>




        </div>
    );
};
