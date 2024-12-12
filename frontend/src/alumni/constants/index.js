import feed from "../../assets/feed.png";
import inbox from "../../assets/inbox.png";
import post from "../../assets/post.png";
import friends from "../../assets/friends.png";

/**
 *  Navigation Links
 *
 * @author Giovanni Leo
 */
export const navLinks = [
  {
    path: "/home",
    icon: feed,
  },
  {
    path: "users",
    icon: friends,
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

/**
 * Event Categories
 *
 * @author Giovanni Leo
 */
export const eventCategories = ["reunion", "mass", "thanksgiving", "seminar", "webinar", "conference", "workshop", "others"];
