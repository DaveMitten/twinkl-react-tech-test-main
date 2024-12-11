"use client";
import Posts from "@/components/Posts";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-400 md:bg-white">
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Layout>
      <Posts />
    </Layout>
  );
};

export default App;
