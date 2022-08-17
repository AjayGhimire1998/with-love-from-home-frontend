export const handleReadMore = () => {
  const hiddenParagraph = document.getElementById("hidden-paragraph");
  const readMore = document.querySelector(".read-more");
  hiddenParagraph.style.display = "block";
  readMore.style.display = "none";
};

export function calculateAverageRating(reviews) {
  let totalRating = 0;
  reviews?.forEach((review) => {
    totalRating += review.rating;
  });
  return Math.round(totalRating / reviews?.length);
}
