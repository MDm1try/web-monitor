const getColorRank = (prevRank) => {
  if (prevRank === 0 || prevRank === "new" || prevRank === "-") {
    return "warning";
  }
  return prevRank > 0 ? "success" : "error";
};

export default getColorRank;
