'use client';

import { MouseEventHandler } from "react";

export default function Button(
  props: {
    progress: boolean, 
    text: string, 
    progressText?: string, 
    type?: "submit" | "reset" | "button" | undefined,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
    color?: "default" | "success" | "danger"
  }
) {
    const { progress, text, progressText, type, onClick, color } = props;

    const buttonColor = {
        default: "bg-green-500 hover:bg-green-700",
        success: "bg-green-500 hover:bg-green-700",
        danger: "bg-red-500 hover:bg-red-700"
    }
  
    return (
        <button
          type={type ? type: "submit"}
          className={buttonColor[color ?? "default"] + " text-white font-bold py-2 px-4 rounded w-full disabled:bg-gray-400 mt-4"}
          disabled={progress}
          onClick={onClick ? onClick : undefined}
        >
          {progress ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {progressText ?? text}
            </div>
          ) : (
            text
          )}
        </button>
    )
}