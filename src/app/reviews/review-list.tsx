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
  response?: string;
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
  const [editingSuggestionId, setEditingSuggestionId] = useState<string | null>(
    null,
  );
  const [editedSuggestionContent, setEditedSuggestionContent] =
    useState<string>("");

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

  const handlePublish = async (reviewId: string, responseContent: string) => {
    const contentToPublish =
      editingSuggestionId === reviewId
        ? editedSuggestionContent
        : responseContent;
    try {
      const res = await fetch(`/api/reviews/${reviewId}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ response: contentToPublish }),
      });

      if (!res.ok) {
        throw new Error("Failed to publish response");
      }

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId
            ? { ...review, response: contentToPublish }
            : review,
        ),
      );
      setEditingSuggestionId(null);
      setEditedSuggestionContent("");
    } catch (error) {
      console.error("Error publishing review:", error);
      alert("Failed to publish response.");
    }
  };

  const handleEditClick = (reviewId: string, currentContent: string) => {
    setEditingSuggestionId(reviewId);
    setEditedSuggestionContent(currentContent);
  };

  const handleSaveEdit = (reviewId: string) => {
    setSuggestions(new Map(suggestions.set(reviewId, editedSuggestionContent)));
    setEditingSuggestionId(null);
    setEditedSuggestionContent("");
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
              {review.response && (
                <div className="mt-2 p-3 bg-blue-50 rounded">
                  <p className="font-semibold text-blue-800">
                    Published Response:
                  </p>
                  <p className="text-blue-700">{review.response}</p>
                </div>
              )}
              <div className="text-sm text-gray-500 mt-3">
                <span>by {review.reviewer}</span> |{" "}
                <span>{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleSuggest(review.id)}
                  disabled={
                    suggestionLoading.get(review.id) || !!review.response
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                >
                  {suggestionLoading.get(review.id)
                    ? "Generating..."
                    : "Suggest a response"}
                </button>
                {suggestions.has(review.id) && (
                  <div className="mt-4 p-3 bg-gray-100 rounded">
                    <p className="font-semibold">Suggested Response:</p>
                    {editingSuggestionId === review.id ? (
                      <textarea
                        className="w-full p-2 border rounded"
                        value={editedSuggestionContent}
                        onChange={(e) =>
                          setEditedSuggestionContent(e.target.value)
                        }
                        rows={5}
                      />
                    ) : (
                      <p
                        onClick={() =>
                          handleEditClick(
                            review.id,
                            suggestions.get(review.id)!,
                          )
                        }
                        className="cursor-pointer hover:underline"
                      >
                        {suggestions.get(review.id)}
                      </p>
                    )}
                    {!review.response && (
                      <>
                        {editingSuggestionId === review.id ? (
                          <button
                            onClick={() => handleSaveEdit(review.id)}
                            className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Save Edit
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handlePublish(
                                review.id,
                                suggestions.get(review.id)!,
                              )
                            }
                            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Publish
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
                {review.response && (
                  <p className="mt-2 text-green-600 font-semibold">
                    Published!
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
