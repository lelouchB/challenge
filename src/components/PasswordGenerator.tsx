"use client";
import React, { useState } from "react";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSpecial: boolean;
}

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecial: true,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleOptionChange = (
    key: keyof PasswordOptions,
    value: boolean | number
  ) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (options.includeUppercase) chars += uppercase;
    if (options.includeLowercase) chars += lowercase;
    if (options.includeNumbers) chars += numbers;
    if (options.includeSpecial) chars += special;

    if (chars === "") {
      chars = lowercase;
    }

    let result = "";
    for (let i = 0; i < options.length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  const optionsArr = [
    { key: "includeUppercase" as const, label: "Include Uppercase" },
    { key: "includeLowercase" as const, label: "Include Lowercase" },
    { key: "includeNumbers" as const, label: "Include Numbers" },
    {
      key: "includeSpecial" as const,
      label: "Include Special Characters",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Password Generator
        </h2>
        <p className="text-gray-600">Generate a secure password</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="password-length-range"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password Length: {options.length}
          </label>

          <input
            id="password-length-range"
            type="range"
            min="8"
            max="32"
            value={options.length}
            onChange={(e) =>
              handleOptionChange("length", parseInt(e.target.value))
            }
            className="range-input"
          />
        </div>

        <div className="space-y-3">
          {optionsArr.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <button
                onClick={() => handleOptionChange(key, !options[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                  options[key] ? "bg-orange-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    options[key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                className="w-full px-4 py-2 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                placeholder="Generated password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 rounded-lg w-11 h-11 flex items-center justify-center"
            >
              <Copy size={18} />
            </button>
          </div>

          <button
            onClick={generatePassword}
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>Generate Password</span>
          </button>
        </div>

        {copied ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg mt-4">
            Password copied to clipboard!
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PasswordGenerator;
