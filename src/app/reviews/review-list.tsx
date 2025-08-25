"use client";

import { useEffect, useState } from "react";

interface Review {
  id: string;
  content: string;
  rating: number;
  title: string;
  reviewer: string;
  product_title: string;
  created_at: string;
}

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Map<string, string>>(
    new Map(),
  );
  const [suggestionLoading, setSuggestionLoading] = useState<
    Map<string, boolean>
  >(new Map());

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const handleSuggest = async (reviewId: string) => {
    setSuggestionLoading(new Map(suggestionLoading.set(reviewId, true)));
    try {
      const response = await fetch(`/api/reviews/${reviewId}/suggest`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to get suggestion");
      }
      const data = await response.json();
      setSuggestions(new Map(suggestions.set(reviewId, data.suggestion)));
    } catch (err) {
      // Handle error specifically for suggestions if needed
      console.error(err);
    } finally {
      setSuggestionLoading(new Map(suggestionLoading.set(reviewId, false)));
    }
  };

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Customer Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-lg">{review.title}</h2>
                <span className="text-yellow-500 font-bold">
                  {review.rating}/5
                </span>
              </div>
              <p className="text-gray-700 mt-2">{review.content}</p>
              <div className="text-sm text-gray-500 mt-3">
                <span>by {review.reviewer}</span> |{" "}
                <span>{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleSuggest(review.id)}
                  disabled={suggestionLoading.get(review.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                >
                  {suggestionLoading.get(review.id)
                    ? "Generating..."
                    : "Suggest a response"}
                </button>
                {suggestions.has(review.id) && (
                  <div className="mt-4 p-3 bg-gray-100 rounded">
                    <p className="font-semibold">Suggested Response:</p>
                    <p>{suggestions.get(review.id)}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
