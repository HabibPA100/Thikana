import React from "react";
import { useParams } from "react-router-dom";
import UpgradePost from "./UpgradePost";

const UpgradePostWrapper = () => {
  const { postId } = useParams(); // URL থেকে postId নিয়ে আসবে
  return <UpgradePost postId={postId} />;
};

export default UpgradePostWrapper;