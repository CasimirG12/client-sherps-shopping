interface Votes {
  like: number;
  dislike: number;
}

export type Vote = {vote: "like" | "dislike" | null};

export const fetchVotesAPI = async (recipeId: number): Promise<Votes> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  try {
    const response = await fetch(`${API_BASE_URL}/api/votes/recipes/${recipeId}`,{
      method: "GET",
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data

  } catch (error) {
    console.error("Failed to fetch likes and dislikes:", error);
    return {like: 0, dislike: 0} as Votes;
  }
}

export const deleteVoteAPI = async (recipeId: number, userId: number): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/votes/recipes/${recipeId}/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    };
  } catch (error) {
    console.error("Failed to delete vote:", error);
  }
}

export const addVoteAPI = async (
  recipeId: number, 
  userId: number,
  vote: "like" | "dislike"
): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  try {
    const response = await fetch(`${API_BASE_URL}/api/votes/recipes/${recipeId}/users/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({vote: vote}),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch ( error ) {
    console.error("Failed to add vote:", error);
  };
};

export const updateVoteAPI = async (
  recipeId: number, 
  userId: number,
  vote: "like" | "dislike"
): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  try {
    const response = await fetch(`${API_BASE_URL}/api/votes/recipes/${recipeId}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({vote: vote}),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch ( error ) {
    console.error("Failed to add vote:", error);
  };
};

export const fetchUserVoteAPI = async (userId: number, recipeId: number): Promise<Vote> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  try {
    const response = await fetch(`${API_BASE_URL}/api/votes/recipes/${recipeId}/users/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    };

    const data = await response.json();
    return data;

  } catch ( error ) {
    console.error("Failed to fetch user vote:", error);
    return {vote: null} as Vote;
  }
}