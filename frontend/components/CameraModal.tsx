import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from "@headlessui/react";
import {
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photoImageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setUploading] = useState(false);
  
  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }});
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        }
      }
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
            console.log(file);
            setImageFile(file);
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleConfirm = async() => {
    // send image to server
    if (photoImageFile) {
      try {
        setUploading(true);
        await handleSubmit(photoImageFile);
      } catch (error) {
        console.error('Failed to upload photo', error);
      } finally {
        setUploading(false);
      }
    }
  }

  const handleRetake = () => {
    setImageFile(null);
    startCamera();
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
          <input type="file" accept="image/*;capture=camera"  onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImageFile(e.target.files[0]);
            }
          }} 
          />
          { photoImageFile ? (
            <img src={URL.createObjectURL(photoImageFile)} className='w-full' />
          ) : (
            <video ref={videoRef} autoPlay={true} className='w-full'></video>
          ) }
          <div className='flex justify-center flex-col mt-4'>
            {
              photoImageFile && (
                <button 
                  onClick={handleConfirm}
                  className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
                  >{isUploading ? <LoadingDots color="black" style="large" /> : 'Confirm'}</button>
              ) 
            }
            {
              photoImageFile ? (
                <button 
                  disabled={isUploading}
                  onClick={handleRetake}
                  className="pointer z-10 mt-6 rounded-lg border border-white bg-black px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-white md:mt-4"
                  >Retake</button>
              ) :
            <button 
              disabled={isUploading}
              onClick={takePhoto}
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              >Take Photo</button>
            }
          </div>
          <canvas className={'hidden'} ref={canvasRef} width="640" height="480"></canvas>
        </div>
      </Dialog.Overlay>
    </Dialog>
  )
}
export default CameraDialog;