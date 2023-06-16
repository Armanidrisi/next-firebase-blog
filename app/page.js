import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import PostCard from "@/components/PostCard";

const getPosts = async () => {
  const allposts = [];
  const querySnapshot = await getDocs(collection(db, "blogs"));

  querySnapshot.forEach((doc) => {
    allposts.push(doc.data());
  });

  return allposts;
};

export default async function Home() {
  const posts = await getPosts();
  //console.log(posts);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {posts.map((post, index) => (
              <PostCard index={index} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
