import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from "@headlessui/react";
import {
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import LoadingDots from './Loading';

function CameraDialog({
  handleSubmit,
  handleClose
}: {
  handleSubmit: (file: File) => Promise<void>;
  handleClose: () => void;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = async() => {
    // send image to server
    if (imageFile) {
      try {
        setUploading(true);
        await handleSubmit(imageFile);
      } catch (error) {
        console.error('Failed to upload photo', error);
      } finally {
        setUploading(false);
      }
    }
  }
 
  return (
    <Dialog 
      static
      open={true} 
      onClose={handleClose}
      className="fixed inset-0 z-10 flex items-center justify-center"
      >
      <Dialog.Overlay
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
      >
        <div className='text-white py-12 px-12 '>
          <div>
            <button onClick={handleClose} className='absolute top-4 right-4'>
              <XMarkIcon className='w-6 h-6' />
            </button>
          </div>
          <h3 className='mb-12 font-bold text-xl'>Please Take a photo</h3>
          <input 
            ref={fileInputRef}
            type="file" accept="image/*;capture=camera"  
            style={{ display: 'none' }}
            onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImageFile(e.target.files[0]);
            }
          }} 
          />
          <div className='flex justify-center'>
            { imageFile ? (
              <img src={URL.createObjectURL(imageFile)} className='object-cover w-64 h-64' />
            ) : (
              <UserCircleIcon className='w-64 h-64' color={'##fffff'}/>
            ) }
          </div>
          
          <div className='flex justify-center flex-col mt-4'>
            {
              imageFile && (
                <button 
                  onClick={handleConfirm}
                  className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
                  >{isUploading ? <LoadingDots color="black" style="large" /> : 'Confirm'}</button>
              ) 
            }
            <button 
              disabled={isUploading}
              onClick={() => fileInputRef?.current?.click?.()}
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              >Upload a selfie
              </button>
          </div>
          {/* <canvas className={'hidden'} ref={canvasRef} width="640" height="480"></canvas> */}
        </div>
      </Dialog.Overlay>
    </Dialog>
  )
}
export default CameraDialog;