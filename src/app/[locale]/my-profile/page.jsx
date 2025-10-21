import { posts } from '@/firebase/firebaseAdminRefs';
import MyProfile from '@/components/ui/MyProfile';
import data from '@/components/clientFunciton';
import Comp from "../../../components/Comp"

export default async function AdminBlogPage({ params }) {
  const param = await params;
  const locale = param.locale || 'en';
  let blogs = [];
  const ids = []

  const allPost = await posts.get();

  if (allPost.docs.length > 0) {
    allPost.docs.forEach((rowData) => {
      blogs.push({ ...rowData.data(), id: rowData.id });
      ids.push(rowData.id)
    });
  }


  return (
    <>
      <MyProfile locale={locale} blogs={blogs} ids={ids} />
    </>
  );
}
