'use client';
import React from 'react';
import Modal from '@/components/ui/modal';
// import Gallery from "./gallery";
// import Info from "./Info";
import usePreviewModal from '@/hooks/use-preview-modal';

type Props = {};

const PreviewModal = (props: Props) => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) return null;

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid grid-cols-1 w-full items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          {/* <Gallery images={product.images} /> */}
          Gallery
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          {/* <Info product={product} /> */}
          {product.title}
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
