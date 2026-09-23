import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  subtitle?: React.ReactNode
  icon?: React.ReactNode
  maxWidth?: string
  children: React.ReactNode
  className?: string
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  maxWidth = 'max-w-lg',
  children,
  className = ''
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={cn(
            'w-screen border-l border-white/10 bg-[#071220] shadow-2xl p-6 flex flex-col overflow-y-auto',
            maxWidth,
            className
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="rounded-xl bg-neutral-800 p-2 text-white border border-neutral-700">
                  {icon}
                </div>
              )}
              <div>
                {subtitle && (
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white">
                    {subtitle}
                  </div>
                )}
                {typeof title === 'string' ? (
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                ) : (
                  title
                )}
              </div>
            </div>
            <button onClick={onClose} className="btn-icon" aria-label="Close drawer">
              <X size={16} />
            </button>
          </div>
          <div className="mt-6 flex-1 flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  )
}
