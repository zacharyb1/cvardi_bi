import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../components/Modal";
import CameraModal from "../components/CameraModal";
import { useImages } from '../data/images';
import { useState } from "react";
import { uploadUserPhoto } from "../service/api";

const Home: NextPage = () => {
  const router = useRouter();
  const { photoId } = router.query;
  const { images } = useImages();
  const [ isUploading, setUploading] = useState(false);

  const handleGetUserPhotos = () => {
    // get a image from camera
    setUploading(true);
  }

  const handleConfirmUploadPhoto = async(userPhoto: File) => {
    try {
      // send image to server
      await uploadUserPhoto(userPhoto)
    } catch (error) {
      console.error('Failed to upload photo', error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Head>
        <title>2024 AaltoAI Hackthon Event Photos</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
            }}
          />
        )}
        {isUploading && <CameraModal 
          handleSubmit={handleConfirmUploadPhoto}
          handleClose={() => {
            setUploading(false)
          } }
        /> }
         <div className="mb-5 flex flex-col items-center justify-end overflow-hidden rounded-lg bg-white/10 px-6 py-8 text-center text-white shadow-highlight ">
            <h1 className="mb-4 text-base font-bold  tracking-widest">
              2024 AaltoAI Hackthon Event Photos
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              24h AI Product Hack!
            </p>
            <button
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              onClick={handleGetUserPhotos}
            >
              Find your moments
            </button>
          </div>
          <div className="columns-1 gap-2 sm:columns-2 xl:columns-3 2xl:columns-4">
          {images.map((image: string) => (
            <Link
              key={image}
              href={`/photo?imageUrl=${encodeURIComponent(image)}`}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={image}
                src={image}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
      {/* <footer className="p-6 text-center text-white/80 sm:p-12">
        Pictures are all from{" "}
        <a
          href="https://eu.junctionplatform.com/events/aaltoai-hackathon"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          AaltoAI Hackathon
        </a>
      </footer> */}
    </>
  );
};

export default Home;
