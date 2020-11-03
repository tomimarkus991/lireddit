import { Link } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href="create-post">
        <Link>Create post</Link>
      </NextLink>
      {data ? (
        <div>
          {data?.posts.map((post) => {
            return (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>loading</div>
      )}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
