import React from 'react'

interface AddServicePopupProps {
    closePopup: () => void;
}
export const AddServicePopup: React.FC<AddServicePopupProps> = ({ closePopup }) => {
    return (
        <div>
            <div onClick={closePopup}>
                AddServicePopup
            </div>
        </div>
    )
}
