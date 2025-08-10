'use client';

import { useState } from 'react';
import Modal from './Modal';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName: string;
  itemType: 'event' | 'user' | 'item' | 'restaurant';
  isDeleting?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  itemType,
  isDeleting = false,
}) => {
  const [confirmText, setConfirmText] = useState('');
  const expectedText = 'DELETE';
  const isConfirmValid = confirmText === expectedText;

  const handleConfirm = () => {
    if (isConfirmValid && !isDeleting) {
      onConfirm();
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      setConfirmText('');
      onClose();
    }
  };

  const getIcon = () => {
    switch (itemType) {
      case 'event':
        return '🎉';
      case 'user':
        return '👤';
      case 'restaurant':
        return '🏪';
      default:
        return '📄';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="" maxWidth="max-w-md">
      <div className="text-center py-4">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <div className="w-8 h-8 text-red-600 text-2xl flex items-center justify-center">
            ⚠️
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>

        {/* Item Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <span className="text-lg">{getIcon()}</span>
            <span className="font-medium truncate max-w-xs" title={itemName}>
              {itemName}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Confirmation Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type <span className="font-bold text-red-600">{expectedText}</span> to confirm:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            placeholder="Type DELETE here"
            disabled={isDeleting}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmValid || isDeleting}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isConfirmValid && !isDeleting
                ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isDeleting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Deleting...</span>
              </div>
            ) : (
              '🗑️ Delete Forever'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
