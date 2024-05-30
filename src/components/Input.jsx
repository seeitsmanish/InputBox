import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { cn } from '../lib/utils';
import Icon from './Icon';

/**
 * A custom input component with dynamic styling based on focus, error, and disabled states.
 *
 * @param {object} props - The component props.
 * @param {number | string | undefined} [props.height] - The height of the input in pixels.
 * @param {number | string | undefined} [props.width] - The width of the input in pixels.
 * @param {string | undefined} [props.placeholder] - The placeholder text for the input.
 * @param {string | undefined} [props.className] - Additional tailwindcss classes for custom styling.
 * @param {string | undefined} [props.outlineColor] - The color of the outline when the input is focused.
 * @param {string | undefined} [props.borderColor] - The color of the border when the input is not focused.
 * @param {boolean | undefined} [props.disabled] - Whether the input is disabled.
 * @param {function | undefined} [props.onFocus] - Callback function to handle focus event.
 * @param {function | undefined} [props.onBlur] - Callback function to handle blur event.
 * @param {boolean} [props.error] - Whether the input is in an error state.
 * @param {string | undefined} [props.errorColor] - The color of the border when the input is in an error state.
 * @param {string | undefined} [props.iconClassName] - Additional tailwindcss classes for custom styling of the icon.
 * @param {string | undefined} [props.iconColor] - The color of the icon.
 * @param {boolean | undefined} [props.icon] - Whether to show an icon inside the input.
 * @param {string | undefined} [props.type] - The type of the input (e.g., 'text', 'password', 'email').
 * @param {object} [props.errorFunctions] - An object where keys are event names ('onBlur', 'onFocus', 'onChange') and values are functions returning error messages or false.
 * @param {object | undefined} [props.rest] - Additional props to be passed to the input element.
 *
 * @returns {JSX.Element} The rendered input component.
 *
 * @example
 * // Example usage:
 * // Simple email input with error handling on blur
 * <Input
 *   type="email"
 *   placeholder="Enter your email"
 *   errorFunctions={{
 *     onBlur: (value) => {
 *       if (!value.includes('@')) {
 *         return 'Invalid email address';
 *       }
 *       return false;
 *     },
 *   }}
 * />
 *
 * @example
 * // Password input with toggle visibility and custom styling
 * <Input
 *   type="password"
 *   placeholder="Enter your password"
 *   icon={true}
 *   outlineColor="blue"
 *   borderColor="gray"
 *   errorFunctions={{
 *     onBlur: (value) => {
 *       if (value.length < 6) {
 *         return 'Password must be at least 6 characters long';
 *       }
 *       return false;
 *     },
 *   }}
 * />
 * 
 * 
 * @example 
 *  <Input
 *    ref={inputRef}
 *    type="email"
 *    placeholder="Enter your email"
 *    errorFunctions={{
 *      onBlur: (value) => {
 *        if (!value.includes('@')) {
 *           return 'Invalid email address';
 *         }
 *         return false;
 *      },
 *    }}
 *  />
 *  
 *  You access error message by using inputRef.current.getErrorMessage()
 *  You can set error message by using inputRef.current.setErrorMessage()
 * 
 */
const Input = forwardRef(({
    height,
    width,
    placeholder,
    className,
    outlineColor = 'black',
    borderColor,
    disabled,
    onFocus,
    onBlur,
    error,
    errorColor,
    icon,
    type,
    iconClassName,
    iconColor,
    errorFunctions = {},
    ...rest
}, ref) => {
    const [focus, setFocus] = useState(false);
    const [show, setShow] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Gets the appropriate border or outline color based on the input state.
     *
     * @returns {string} The CSS style for the border or outline.
     */
    const getBoundaryColors = (type) => {
        if (error || errorMessage) {
            return `2px solid ${errorColor || 'red'}`;
        }
        switch (type) {
            case 'border': {
                return `2px solid ${borderColor}`
            }
            case 'outline': {
                return `2px solid ${outlineColor}`
            }
            default: {
                return 'none'
            }
        }
    };

    /**
     * Handles the event and triggers the appropriate error function if defined.
     *
     * @param {Event} event - The event object.
     * @param {string} eventType - The type of event ('onFocus', 'onBlur', 'onChange').
     */
    const handleEvent = (event, eventType) => {
        const errorFunction = errorFunctions[eventType];
        if (errorFunction) {
            const errorResult = errorFunction(event.target.value);
            setErrorMessage(errorResult || '');
        }
    };

    /**
     * Toggles the input type between 'password' and 'text'.
     */
    const toggleTypeForPassword = () => {
        setShow((prevShow) => !prevShow);
        setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };


    /**
     * Imperative Handler to set/get Error Messsage to parent
     */
    useImperativeHandle(ref, () => ({
        getErrorMessage: () => errorMessage,
        setErrorMessage,
    }));

    return (

        <div
            style={{
                height: `${height}px`,
                width: `${width}px`,
                outline: focus ? getBoundaryColors('outline') : 'none',
                border: !focus ? getBoundaryColors('border') : 'none',
            }}
            tabIndex={0}
            className={cn('bg-white p-2 rounded-lg flex gap-2', {
                'opacity-50 cursor-not-allowed': disabled,
                'flex-row-reverse': type === 'password',
            }, className)}
        >
            {icon && (
                <div onClick={type === 'password' ? toggleTypeForPassword : null}>
                    <Icon type={type} className={iconClassName} color={iconColor} show={show} />
                </div>
            )}
            <input
                className={cn('bg-transparent h-full w-full outline-none', {
                    'opacity-50 cursor-not-allowed': disabled,
                })}
                placeholder={placeholder || 'Type something...'}
                onFocus={(e) => {
                    setFocus(true);
                    handleEvent(e, 'onFocus');
                    if (onFocus) onFocus(e);
                }}
                onBlur={(e) => {
                    setFocus(false);
                    handleEvent(e, 'onBlur');
                    if (onBlur) onBlur(e);
                }}
                onChange={(e) => handleEvent(e, 'onChange')}
                disabled={disabled}
                type={inputType}
                {...rest}
            />
        </div>

    );
});

export default Input;
