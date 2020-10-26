import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>Hello buitc</div>

      {data ? (
        <div>
          {data?.posts.map((post) => {
            return <p key={post.id}>{post.title}</p>;
          })}
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
