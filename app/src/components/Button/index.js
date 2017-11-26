// Import
import React from 'react'
import { Link } from 'react-router-dom'

// Component
const Button = ({ onClick, to, href, label, target, dark, type, disabled }) => {
  let className = 'button'

  // Example of how to style by property
  if (dark) {
    className = `${className} dark`
  }

  return disabled ? (
    <div className={className}>{label}</div>
  ) : onClick ? (
    <a href="/" onClick={onClick} className={className}>
      {label}
    </a>
  ) : to ? (
    <Link to={to} className={className}>
      {label}
    </Link>
  ) : href ? (
    <a href={href} target={target || '_self'} className={className}>
      {label}
    </a>
  ) : type ? (
    <button type={type} className={className}>
      {label}
    </button>
  ) : (
    <div className={className}>{label}</div>
  )
}

// Export
export default Button
