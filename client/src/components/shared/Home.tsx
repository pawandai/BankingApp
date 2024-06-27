"use client";

import Image from "next/image";
import Cards from "./Cards";
import TransactionForm from "./TransactionForm";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { client } from "@/app/page";
import toast from "react-hot-toast";
import { LOGOUT } from "@/graphql/mutations/user.mutation";

const Home = () => {
  const router = useRouter();
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const { data: authUserData, error } = useQuery(GET_AUTHENTICATED_USER);

  const handleLogout = async () => {
    try {
      await logout();
      // Clear the Apollo Client cache FROM THE DOCS
      // https://www.apollographql.com/docs/react/caching/advanced-topics/#:~:text=Resetting%20the%20cache,any%20of%20your%20active%20queries
      client.resetStore();
      router.push("/signup");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Could not log out. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4">
            Spend wisely, track wisely
          </p>
          <Image
            src={
              authUserData?.profilePicture ||
              "https://avatar.iran.liara.run/public/boy?username=pawandai"
            }
            width={40}
            height={40}
            className="rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {/* {data?.categoryStatistics.length > 0 && (
                  <div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
                      <Doughnut data={chartData} />
                  </div>
              )} */}

          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};

export default Home;
