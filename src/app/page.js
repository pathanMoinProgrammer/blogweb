import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';

const HomePage = async () => {
    redirect('/en');
    return <div>...|||...|||...|||...</div>;
};

export default HomePage;
