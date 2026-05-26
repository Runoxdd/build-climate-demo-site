"use client";
import { useTheme } from "@/lib/ThemeContext"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  try {
    const themeContext = useTheme()
    var theme = themeContext?.theme ?? "dark"
  } catch {
    var theme = "dark"
  }

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-slate-950 dark:group-[.toaster]:text-white",
          description: "group-[.toast]:text-gray-600 dark:group-[.toast]:text-gray-400",
          actionButton: "group-[.toast]:bg-black group-[.toast]:text-white dark:group-[.toast]:bg-white dark:group-[.toast]:text-black",
          cancelButton: "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-900 dark:group-[.toast]:bg-gray-800 dark:group-[.toast]:text-gray-100",
        },
      }}
      {...props} />
  );
}

export { Toaster }
