import { useEffect } from 'react'
import { Button } from './Button'
import { IconTrashLg } from '../icons'

interface ConfirmModalProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({ title, message, onConfirm, onCancel }: ConfirmModalProps) {
  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onCancel])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <IconTrashLg className="w-6 h-6 text-red-600" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 id="modal-title" className="text-base font-semibold text-slate-800">
            {title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-1">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} className="flex-1">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
