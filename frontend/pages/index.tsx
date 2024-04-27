import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../components/Modal";
import CameraModal from "../components/CameraModal";
import { useEffect, useState } from "react";
import { fetchImages, uploadUserPhoto } from "../service/api";
import LoadingDots from "../components/Loading";
import { toast, Toaster } from 'sonner';

const CVARDI_BI_USER_KEY = 'cvaradi-bi:user_id';
const Home: NextPage = () => {
  const router = useRouter();
  const { photoId } = router.query;
  const [images, setImages] = useState([]);
  const [userImages, setUserImages] = useState([]);

  const [ isUserImageUploading, setUserImageLoading] = useState(false);
  const [ isAllImageLoading, setAllImageLoading] = useState(false);
  const [isOpenCameraModal, setOpenCameraModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState('all');
  const [userId, setUserId] = useState(null);

  const handleGetUserPhotos = () => {
    // get a image from camera
    setUserImages([]);
    localStorage.removeItem(CVARDI_BI_USER_KEY);
    setUserId(null);
    setOpenCameraModal(true);
  }

  useEffect(() => {
    // get all images
    getImages();
    // get user images
    const savedUserId = localStorage.getItem(CVARDI_BI_USER_KEY);
    if (savedUserId) {
      setUserId(savedUserId);
      getUserImages(savedUserId);
    }
  }, []);

  const getUserImages = async (id: string) => {
    try {
      setUserImageLoading(true);
      const res = await fetchImages(id);
      setUserImages(res.data.imageUrls);
      setUserImageLoading(false);
      setSelectedTab('user');
    } catch (error) {
      console.error('Failed to fetch your images', error);
      toast.error('Failed to fetch your images');
    } finally {
      setUserImageLoading(false);
    }
  }

  const getImages = async () => {
    try {
      setAllImageLoading(true);
      const res = await fetchImages();
      setImages(res.data.imageUrls);
    } catch (error) {
      console.error('Failed to fetch images', error);
      toast.error('Failed to fetch images');
    } finally {
      setAllImageLoading(false);
    }
  }

  const handleConfirmUploadPhoto = async(userPhoto: File) => {
    try {
      // send image to server
      const {id} = await uploadUserPhoto(userPhoto)
      setUserId(id);
      localStorage.setItem(CVARDI_BI_USER_KEY, id);
      await getUserImages(id);
      setOpenCameraModal(false);
    } catch (error) {
      console.error('Failed to upload photo', error);
    }
  }

  const ImageList = ({type}: 
    { type: 'user' | 'all'
    }
  ) => {
    const imageList = type === 'user' ? userImages : images;
    const isLoading = type === 'user' ? isUserImageUploading : isAllImageLoading;
    return (
      <>
        {imageList.length === 0 && !isLoading && (
          <div className="text-center text-white/75 mt-2">
            {(selectedTab === 'user' && !userId) ? 'Please click the button above to upload your selfie' : 'No photos yet'}
          </div>
          )}
        {isLoading ? <div className="flex justify-center w-full">
        <LoadingDots color="#fff" />
        </div>
        : imageList.map((image: string) => (
          <Link
            key={image}
            href={`/photo?imageUrl=${encodeURIComponent(image)}`}
            shallow
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <img
              alt="event photo"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              placeholder="blur"
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
      </>
    )
  }

  const TabItem = ({text, isSelected, id}) => {
    if (isSelected) {
      return (
        <li className="flex-1" onClick={() => setSelectedTab(id)}>
          <a
            href="#"
            className="relative flex items-center justify-center gap-2 px-1 py-3 text-blue-400 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-400 hover:text-blue-400"
          >
           {text}
          </a>
        </li>
      )
    }
    return (
      <li className="flex-1" onClick={() => setSelectedTab(id)}>
        <a href="#" className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-400">
          {text}</a>
      </li>
    )
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
        {isOpenCameraModal && <CameraModal 
          handleSubmit={handleConfirmUploadPhoto}
          handleClose={() => {
            setOpenCameraModal(false)
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
          <div className="text-white">
              <div className="border-b border-b-gray-200">
                <ul className="-mb-px flex items-center gap-4 text-sm font-medium">
                    <TabItem text="All Photos" isSelected={selectedTab === 'all'} id="all"/>
                    <TabItem text="Your Photos" isSelected={selectedTab === 'user'} id="user" />
                  </ul>
                </div>
              </div>
            <div className="columns-1 gap-2 sm:columns-2 xl:columns-3 2xl:columns-4 mt-2">
              {selectedTab === 'user' ? <ImageList type="user"/> : <ImageList type={"all"}/>}
            </div>
        <Toaster position="top-center" />
      </main>
    </>
  );
};

export default Home;
