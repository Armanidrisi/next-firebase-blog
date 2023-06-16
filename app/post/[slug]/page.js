import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const getPostBySlug = async (slug) => {
  const querySnapshot = await getDocs(
    query(collection(db, "blogs"), where("slug", "==", slug))
  );
  if (querySnapshot.empty) {
    return null;
  }

  const postDoc = querySnapshot.docs[0];
  const post = postDoc.data();
  return post;
};

export default async function Page({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  if (!post) return null;

  console.log(post?.date);

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="max-w-2xl mx-auto">
        <img src={post.image} alt="Blog Post Image" className="w-full" />
        <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
        <div
          className="mt-4 prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </div>
  );
}
