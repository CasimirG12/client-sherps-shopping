import React, { useEffect } from "react";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import useVotes from "../hooks/useVotes";
import { useAuthContext } from "../context/authContext";

interface LikeCounterProps {
  recipeId: number;
}

const LikeCounter: React.FC<LikeCounterProps> = ({ recipeId }) => {
  const { user } = useAuthContext();
  const {
    like,
    dislike,
    fetchVotes,
    userVote,
    fetchUserVote,
    addUserVote,
    deleteUserVote,
    updateUserVote,
  } = useVotes();

  useEffect(() => {
    fetchVotes(recipeId);
    if (user) {
      fetchUserVote(recipeId, user.id);
    }
  }, [recipeId, user]);

  const handleVote = async (newVote: "like" | "dislike") => {
    if (!user) return;

    try {
      if (userVote === newVote) {
        // Remove vote
        await deleteUserVote(recipeId, user.id);
      } else if (userVote) {
        // Update vote
        await updateUserVote(recipeId, user.id, newVote);
      } else {
        // Add new vote
        await addUserVote(recipeId, user.id, newVote);
      }

      // Optimistically update the state
      await fetchVotes(recipeId);
    } catch (error) {
      console.error("Failed to handle vote:", error);
    }
  };

  return (
    <div className="flex flex-row border border-white rounded-full px-2 py-1 items-center text-white w-fit text-sm">
      <button className="border-r px-1" onClick={() => handleVote("like")}>
        {userVote === "like" ? <FaThumbsUp /> : <FaRegThumbsUp />}
      </button>
      <span className="px-1">{like}</span>
      <button className="border-r px-1" onClick={() => handleVote("dislike")}>
        {userVote === "dislike" ? <FaThumbsDown /> : <FaRegThumbsDown />}
      </button>
      <span className="px-1">{dislike}</span>
    </div>
  );
};

export default LikeCounter;
