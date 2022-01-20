import React from 'react'
import './index.css';

const ToasterComponent = ({
    toast,
    removeToast
}) => {
    let toastIcon;
    return (
        <div
            key={toast.id}
            role="presentation"
            onClick={() => removeToast(toast.id)}
            className={`toast ${toast.type}_toast fade-in`}
        >
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