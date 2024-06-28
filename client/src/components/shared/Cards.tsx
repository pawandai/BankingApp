import { GET_TRANSACTIONS } from "@/graphql/queries/transaction.query";
import { useQuery } from "@apollo/client";
import TransactionFormSkeleton from "./FormSkeleton";
import Card from "./Card";
import { TransactionType } from "@/types";

const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);
  //   const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);

  //   const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
  //     variables: {
  //       userId: authUser?.authUser?._id,
  //     },
  //   });

  //   console.log("userAndTransactions:", userAndTransactions);

  console.log("cards:", data);

  if (loading) return <TransactionFormSkeleton />;

  // TODO => ADD RELATIONSHIPS
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data.transactions.map((transaction: TransactionType) => (
            <Card key={transaction._id} transaction={transaction} />
          ))}
      </div>
      {!loading && data?.transactions?.length === 0 && (
        <p className="text-2xl font-bold text-center w-full">
          No transaction history found.
        </p>
      )}
    </div>
  );
};
export default Cards;
