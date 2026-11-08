export function saveReview(review) {
  const reviews = JSON.parse(
    localStorage.getItem("reviews") || "[]"
  );

  reviews.push(review);

  localStorage.setItem("reviews", JSON.stringify(reviews));
}