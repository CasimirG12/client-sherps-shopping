export const fetchPopIngredientsAPI = async (): Promise<string[]> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  try {
    const response = await fetch(`${API_BASE_URL}/api/ingredients/popular`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Ensure proper type conversion
    if (Array.isArray(data)) {
      return data.map((item) => item.name) as string[];
    } else {
      console.warn("Unexpected API response format:", data);
      return [];
    }
  } catch (error) {
    console.error("Failed to get popular items:", error instanceof Error ? error.message : error);
    return [];
  }
};
