import { Link } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
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
