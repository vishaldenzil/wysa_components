import React from 'react'

import InfoIcon from '../Assets/info_logo.svg';
import WarningIcon from "../Assets/toast-warning.svg";
import ErrorIcon from '../Assets/toast-error.svg';
import SuccessIcon from '../Assets/toast-success.svg';

import './index.css';

const ToasterComponent = ({
    toast,
    removeToast
}) => {
    let toastIcon;

    switch (toast.type) {
        case 'success':
            toastIcon = SuccessIcon;
            break;
        case 'info':
            toastIcon = InfoIcon;
            break;
        case 'error':
            toastIcon = ErrorIcon;
            break;
        case 'warning':
            toastIcon = WarningIcon;
            break;
        default:
            break;
    }
    return (
        <div
            key={toast.id}
            role="presentation"
            onClick={() => removeToast(toast.id)}
            className={`toast ${toast.type}_toast fade-in`}
        >
            <img className={`${toast.type}_icon`} src={toastIcon} alt={`${toast.type} icon`} />
            <div className={`${toast.type}_text`}>
                <strong>{toast.title}</strong>
                <br />
                {toast.message}
                {
                    toast.refresh
                        ? (
                            <>
                                <br />
                                <span
                                    role="presentation"
                                    className="refresh_toast"
                                    onClick={() => toast.refreshFunc()}
                                >
                                    Click here to refresh
                            </span>
                            </>
                        )
                        : null
                }
            </div>
        </div>
    );
};

export default ToasterComponent;