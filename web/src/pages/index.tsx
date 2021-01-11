import React from "react";
import { Posts } from "../components/Posts";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <>
      <Posts />
    </>
  );
};
export default withApollo({ ssr: true })(Index);
