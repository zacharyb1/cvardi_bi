import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import SharedModal from "../components/SharedModal";
import { useImages } from "../data/images";

const Home: NextPage = () => {
  const router = useRouter();
  const { imageUrl } = router.query;
  const { images } = useImages();
  const index = images.indexOf(imageUrl as string);
  
  function closeModal() {
    router.push("/", undefined, { shallow: true });
  }

  function changePhotoId(newVal: number) {
    return newVal;
  }

  return (
    <>
      <Head>
        <title>2024 AaltoAI Hackthon Event Photos</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="fixed inset-0 flex items-center justify-center">
          <SharedModal
            index={index}
            currentPhoto={imageUrl as string}
            changePhotoId={changePhotoId}
            closeModal={closeModal}
            navigation={false}
            images={images}
          />
        </div>
      </main>
    </>
  );
};

export default Home;




