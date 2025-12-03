import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // SAFE & EXISTS

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-full mb-3">
      {label && (
        <label className="text-[13px] text-slate-800 block mb-1">
          {label}
        </label>
      )}

      <div className="flex items-center justify-between gap-2 border rounded-lg px-3 py-2 bg-white">
        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-[15px]"
          value={value}
          onChange={onChange}
        />

        {type === "password" &&
          (showPassword ? (
            <FaEye
              size={22}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaEyeSlash
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
