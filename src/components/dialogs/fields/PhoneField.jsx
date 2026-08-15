import React, { useState, useEffect } from "react";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./FieldLabel";
import { getPhoneLength } from "@/constant/PhoneLengths";

/*
  Layout goal:
  ┌──────────────────────────────────────────┐
  │ 🇮🇳  +91  ▾ │  Enter phone number         │
  └──────────────────────────────────────────┘

  Key decisions:
  - No `international` prop → calling code never appears inside the text input
  - Hide library's .PhoneInputCountryCallingCode via CSS (it would duplicate our code)
  - Render calling code text ourselves inside .PhoneInputCountry using a CSS variable
    driven ::after pseudo-element, updated via JS on country change
*/

const CSS = `
  .uv-phone .PhoneInput {
    display: flex;
    align-items: stretch;
    height: 2.5rem;
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid hsl(var(--input));
    background: hsl(var(--background));
    font-size: 0.875rem;
    overflow: hidden;
    transition: border-color 0.15s;
  }
  .uv-phone .PhoneInput:focus-within {
    border-color: hsl(var(--input));
    box-shadow: none;
  }
  .uv-phone.uv-phone--error .PhoneInput { border-color: #ef4444; }
  .uv-phone.uv-phone--disabled .PhoneInput {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }

  /* country selector block (left side) */
  .uv-phone .PhoneInputCountry {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 8px 0 10px;
    background: hsl(var(--muted));
    border-right: 1px solid hsl(var(--input));
    flex-shrink: 0;
    cursor: pointer;
  }

  /* flag: order 1 */
  .uv-phone .PhoneInputCountryIcon {
    order: 1;
    width: 22px;
    height: 15px;
    display: flex;
    align-items: center;
    overflow: hidden;
    flex-shrink: 0;
  }
  .uv-phone .PhoneInputCountryIconImg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1px;
  }
  .uv-phone .PhoneInputCountryIcon--border { box-shadow: none; }

  /* Hide the library's own calling code — we render ours via ::after */
  .uv-phone .PhoneInputCountryCallingCode { display: none !important; }

  /* Calling code text: order 2 — sits between flag and arrow */
  .uv-phone .PhoneInputCountry[data-code]::after {
    content: attr(data-code);
    order: 2;
    font-size: 0.8125rem;
    font-weight: 500;
    color: hsl(var(--foreground));
    pointer-events: none;
    white-space: nowrap;
  }

  /* invisible <select> overlay — sits over the whole country block */
  .uv-phone .PhoneInputCountrySelect {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }

  /* Hide library's arrow element entirely — we draw our own */
  .uv-phone .PhoneInputCountrySelectArrow {
    display: none !important;
  }

  /* Our down-arrow via ::before on the country block, ordered last */
  .uv-phone .PhoneInputCountry::before {
    content: '';
    order: 3;
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid hsl(var(--muted-foreground));
    align-self: center;
    flex-shrink: 0;
    pointer-events: none;
  }

  /* number input */
  .uv-phone .PhoneInputInput {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    padding: 0 12px;
    font-size: 0.875rem;
    color: hsl(var(--foreground));
    min-width: 0;
  }
  .uv-phone .PhoneInputInput::placeholder { color: hsl(var(--muted-foreground)); }
`;

let injected = false;
function injectCss() {
  if (injected || typeof document === "undefined") return;
  const tag = document.createElement("style");
  tag.dataset.id = "uv-phone-field";
  tag.textContent = CSS;
  document.head.appendChild(tag);
  injected = true;
}

export const PhoneField = ({ field, value, onChange, error, viewMode }) => {
  const [country, setCountry] = useState("IN");
  const containerRef = React.useRef(null);

  useEffect(() => { injectCss(); }, []);

  // Stamp data-code on the country selector element whenever country changes
  useEffect(() => {
    if (!containerRef.current) return;
    const countryEl = containerRef.current.querySelector(".PhoneInputCountry");
    if (!countryEl) return;
    try {
      countryEl.setAttribute("data-code", `+${getCountryCallingCode(country)}`);
    } catch {
      countryEl.removeAttribute("data-code");
    }
  }, [country]);

  const handleChange = (natNumber) => {
    onChange(field.name, natNumber || "");
  };

  const handleCountryChange = (c) => {
    if (!c) return;
    setCountry(c);
  };

  const isDisabled = viewMode || field.disabled;

  return (
    <div className={cn("space-y-2", field.fullWidth && "col-span-full")}>
      <FieldLabel field={field} />
      <div
        ref={containerRef}
        className={cn(
          "uv-phone",
          error && "uv-phone--error",
          isDisabled && "uv-phone--disabled"
        )}
      >
        <PhoneInput
          defaultCountry="IN"
          value={value || ""}
          onChange={handleChange}
          onCountryChange={handleCountryChange}
          disabled={isDisabled}
          numberInputProps={{
            placeholder: field.placeholder || `Enter ${getPhoneLength(country)}-digit number`,
          }}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {field.helperText && !error && (
        <p className="text-sm text-muted-foreground">{field.helperText}</p>
      )}
    </div>
  );
};
