import React, { useEffect, useState } from 'react';

// Import a default icon or placeholder if necessary

const InputWithIcon = ({ type, className, ...options }) => {
    const [Icon, setIcon] = useState(null);

    useEffect(() => {
        const importIcon = async () => {
            let iconModule;
            switch (type) {
                case 'email':
                    iconModule = await import('../assets/icons/EmailIcon');
                    break;
                case 'password':
                    iconModule = await import('../assets/icons/PasswordIcon');
                    break;
                case 'tel':
                    iconModule = await import('../assets/icons/TelephoneIcon');
                    break;
            }
            setIcon(() => iconModule.default);
        };

        importIcon();
    }, [type]);

    return (
        <div>
            {Icon && <Icon className={className} {...options} />}
        </div>
    );
};

export default InputWithIcon;
