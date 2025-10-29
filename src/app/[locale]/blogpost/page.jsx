import BlogPage from '@/components/ui/Blogpage';
import React from 'react';

const page = async ({ params }) => {
  return <BlogPage params={params} />;
};

export default page;
