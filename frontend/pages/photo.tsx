import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import SharedModal from "../components/SharedModal";

const Home: NextPage = () => {
  const router = useRouter();
  const { imageUrl } = router.query;
  function closeModal() {
    router.push("/", undefined, { shallow: true });
  }

  return (
    <>
      <Head>
        <title>2024 AaltoAI Hackthon Event Photos</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="fixed inset-0 flex items-center justify-center">
          <SharedModal
            currentPhoto={imageUrl as string}
            closeModal={closeModal}
            navigation={false}
          />
        </div>
      </main>
    </>
  );
};

export default Home;




