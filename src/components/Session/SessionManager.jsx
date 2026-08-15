import React from 'react';
import { useInactivityTracker } from '@/Hooks/useInactivityTracker';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import { UI_TEXT } from '@/constant';

const SessionManager = () => {
    const {
        isWarningOpen,
        remainingTime,
        keepAlive,
        handleLogout
    } = useInactivityTracker();

    return (
        <ConfirmationDialog
            open={isWarningOpen}
            onClose={handleLogout}
            onConfirm={keepAlive}
            title={UI_TEXT.SESSION.TITLE}
            content={
                <span>
                    {UI_TEXT.SESSION.CONTENT_PREFIX}
                    <span className="font-semibold text-gray-900">
                        {remainingTime}{UI_TEXT.SESSION.CONTENT_SUFFIX}
                    </span>
                </span>
            }
            cancelBtn={UI_TEXT.SESSION.BTN_LOGOUT}
            confirmBtn={UI_TEXT.SESSION.BTN_CONTINUE}
            type="warning"
            closeOnOutsideClick={false}
        />
    );
};

export default SessionManager;
