import { useState } from "react";
import {
  addVoteAPI,
  deleteVoteAPI,
  fetchUserVoteAPI,
  fetchVotesAPI,
  updateVoteAPI,
} from "../utils/votesAPI";

interface UseVotesHookProps {
  like: number;
  dislike: number;
  userVote: userVote;
  fetchVotes: (recipeId: number) => Promise<void>;
  fetchUserVote: (recipeId: number, userId: number) => Promise<void>;
  addUserVote: (recipeId: number, userId: number, vote: "like" | "dislike") => Promise<void>;
  deleteUserVote: (recipeId: number, userId: number) => Promise<void>;
  updateUserVote: (recipeId: number, userId: number, vote: "like" | "dislike") => Promise<void>;
}

type userVote = "like" | "dislike" | null;

const useVotes = (): UseVotesHookProps => {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [userVote, setUserVote] = useState<userVote>(null);

  const fetchVotes = async (recipeId: number): Promise<void> => {
    try {
      const { like, dislike } = await fetchVotesAPI(recipeId);
      setLike(like);
      setDislike(dislike);
    } catch (error) {
      console.error("Failed to fetch votes:", error);
    }
  };

  const fetchUserVote = async (recipeId: number, userId: number): Promise<void> => {
    try {
      const { vote } = await fetchUserVoteAPI(userId, recipeId);
      setUserVote(vote);
    } catch (error) {
      console.error("Failed to fetch user vote:", error);
    }
  };

  const handleVoteChange = async (
    recipeId: number,
    userId: number,
    action: "add" | "update" | "delete",
    vote?: "like" | "dislike",
  ): Promise<void> => {
    try {
      // Optimistic updates
      if (action === "add" && vote) {
        setUserVote(vote);
      } else if (action === "update" && vote) {
        setUserVote(vote);
      } else if (action === "delete") {
        setUserVote(null);
      }

      // API calls
      if (action === "add" && vote) await addVoteAPI(recipeId, userId, vote);
      if (action === "update" && vote) await updateVoteAPI(recipeId, userId, vote);
      if (action === "delete") await deleteVoteAPI(recipeId, userId);

      // Fetch latest counts after action
      await fetchVotes(recipeId);
    } catch (error) {
      console.error(`Failed to ${action} user's vote:`, error);
      // Revert optimistic updates if error occurs
      await fetchUserVote(recipeId, userId);
      await fetchVotes(recipeId);
    }
  };

  const addUserVote = async (recipeId: number, userId: number, vote: "like" | "dislike") => {
    await handleVoteChange(recipeId, userId, "add", vote);
  };

  const updateUserVote = async (recipeId: number, userId: number, vote: "like" | "dislike") => {
    await handleVoteChange(recipeId, userId, "update", vote);
  };

  const deleteUserVote = async (recipeId: number, userId: number) => {
    await handleVoteChange(recipeId, userId, "delete");
  };

  return {
    like,
    dislike,
    userVote,
    fetchVotes,
    fetchUserVote,
    addUserVote,
    deleteUserVote,
    updateUserVote,
  };
};

export default useVotes;
