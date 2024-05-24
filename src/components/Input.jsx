import React, { useState } from 'react'
import { cn } from '../lib/utils';


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
 * @param {object | undefined} [props.rest] - Additional props to be passed to the input element.
 *
 * @returns {JSX.Element} The rendered input component.
 */
export default function Input({ height, width, placeholder, className, outlineColor = "black", borderColor, disabled, onFocus, onBlur, error, errorColor, ...rest }) {

    const [focus, setFocus] = useState(false);
    function getBoundaryColors(type) {
        if (error) {
            return `2px solid ${errorColor || 'red'}`
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
    }

    return (
        <div
            style={{
                height: `${height}px`,
                width: `${width}px`,
                outline: focus ? getBoundaryColors('outline') : 'none',
                border: !focus ? getBoundaryColors('border') : 'none',
            }}
            className={cn('bg-white p-2 rounded-lg', {
                'opacity-50 cursor-not-allowed': disabled
            }, className)}
        >
            <input
                className={cn('bg-transparent h-full w-full outline-none', {
                    'opacity-50 cursor-not-allowed': disabled
                })}
                placeholder={placeholder || 'Type something...'}
                onFocus={() => {
                    setFocus(true)
                    if (onFocus) onFocus();
                }}
                onBlur={() => {
                    setFocus(false)
                    if (onBlur) onBlur()
                }}
                disabled={disabled}
                {...rest}
            />
        </div>
    )
}
