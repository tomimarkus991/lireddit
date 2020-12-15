import { withUrqlClient } from "next-urql";
import React from "react";
import { Posts } from "../components/Posts";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  return (
    <>
      <Posts />
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
