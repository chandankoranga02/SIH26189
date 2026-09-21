import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  icon?: React.ReactNode
  headerActions?: React.ReactNode
  maxWidth?: string
  children: React.ReactNode
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  headerActions,
  maxWidth = 'max-w-4xl',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className={cn('intel-panel w-full flex flex-col bg-[#071220] border-white/20 shadow-2xl', maxWidth, className)}>
        {(title || headerActions) && (
          <div className="intel-header no-print">
            <div className="flex items-center gap-2">
              {icon}
              {typeof title === 'string' ? (
                <span className="text-sm font-bold text-white">{title}</span>
              ) : (
                title
              )}
            </div>
            <div className="flex items-center gap-2">
              {headerActions}
              <button onClick={onClose} className="btn-icon" aria-label="Close modal">
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
