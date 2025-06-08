import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        'px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50',
        className
      )}
    />
  )
}
