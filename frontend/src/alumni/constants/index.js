import explore from "../../assets/explore.png";
import feed from "../../assets/feed.png";
import inbox from "../../assets/inbox.png";
import post from "../../assets/post.png";

export const navLinks = [
  {
    path: "/",
    icon: feed,
  },
  {
    path: "search",
    icon: explore,
  },
  {
    path: "post",
    icon: post,
  },
  {
    path: "inbox",
    icon: inbox,
    otherStye: "w-[22.5px] h-[22.5px]",
  },
];
