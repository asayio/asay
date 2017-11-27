import R from "ramda";

// UNCOMMENTED STUFF UNTIL WE CAN HANDLE MULTIPLE STAGES!
export default function findStageInfo(stage) {
  // voting stages for "beslutningsforslag"
  const bOnlyVote = R.find(R.propEq("typeid", 87))(stage); // first and only vote
  const bFinalVote = R.find(R.propEq("typeid", 7))(stage); // 2nd and final vote
  const bFirstVote = R.find(R.propEq("typeid", 23))(stage); // first vote

  // voting stages for "lovforslag"
  const lFinalVote = R.find(R.propEq("typeid", 17))(stage); // 3rd and final vote
  const lFirstVote = R.find(R.propEq("typeid", 12))(stage); // first vote

  // get current stage
  const current = bOnlyVote
    ? bOnlyVote
    : bFinalVote ? bFinalVote : bFirstVote ? bFirstVote : lFinalVote ? lFinalVote : lFirstVote;

  // determine stage
  const hasFinal = bFinalVote || lFinalVote || bOnlyVote ? true : false;
  /*const hasPreliminary = bFirstVote || lFirstVote ? true : false*/
  if (!hasFinal /*&& !hasPreliminary*/) {
    return {
      deadline: "Ikke fastlagt",
      distanceToDeadline: 99999999998, // show second to last in list ordered by deadline
      status: "Fremsat"
    };
  } else {
    const today = new Date().getTime(); // for comparing w deadlines
    const deadline = new Date(current.dato);
    const distanceToDeadline = deadline - today;
    const countdown = Math.floor(distanceToDeadline / (1000 * 60 * 60 * 24)) - 1; // "-1" because we need the results the day before
    const isOpen = countdown > 0 ? true : false;

    const deadlineLabel = countdown === 0 ? "I dag" : countdown === 1 ? "I morgen" : countdown + " dage";

    if (hasFinal && isOpen) {
      return {
        deadline: deadlineLabel,
        distanceToDeadline: distanceToDeadline,
        status: "Til endelig afstemning"
      };
    } else if (hasFinal && !isOpen) {
      return {
        deadline: "Afsluttet",
        distanceToDeadline: 99999999999, // show last in list ordered by deadline
        status: "Afsluttet"
      }; // refine with result
    } /* else if (hasPreliminary && isOpen) {
      return {deadline: countdown, status: "Til vejledende afstemning"}
    } else if (hasPreliminary && !isOpen) {
      return {deadline: "Ikke fastlagt", status: "I behandling"}
    } */
  }
}
