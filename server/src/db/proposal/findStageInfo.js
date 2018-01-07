const R = require('ramda')

// UNCOMMENTED STUFF UNTIL WE CAN HANDLE MULTIPLE STAGES!
function findStageInfo(stage) {
  // voting stages for "beslutningsforslag"
  const succesfulStatusIdList = [28, 103, 110, 41, 84, 125, 274]
  const voteWasSuccesful = function (typeid) {
    return stage => {
      return stage.typeid === typeid && succesfulStatusIdList.includes(stage.statusid)
    }
  }
  const bOnlyVote = R.find(voteWasSuccesful(87))(stage); // first and only vote
  const bFinalVote = R.find(voteWasSuccesful(7))(stage); // 2nd and final vote
  const bFirstVote = R.find(voteWasSuccesful(23))(stage); // first vote

  // voting stages for "lovforslag"
  const lFinalVote = R.find(voteWasSuccesful(17))(stage); // 3rd and final vote
  const lFirstVote = R.find(voteWasSuccesful(12))(stage); // first vote

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
      const findNumbers = /\d+/g // will find all natural numbers and list them in an array
      const resultString = current.Afstemning[0].konklusion
      const resultArray = resultString.match(findNumbers)
      const actualResults = {
        for: Number(resultArray[0]),
        against: Number(resultArray[1]),
        blank: Number(resultArray[2]),
      }
      return {
        deadline: "Afsluttet",
        distanceToDeadline: 99999999999, // show last in list ordered by deadline
        status: "Afsluttet",
        actualResults
      }; // refine with result
    } /* else if (hasPreliminary && isOpen) {
      return {deadline: countdown, status: "Til vejledende afstemning"}
    } else if (hasPreliminary && !isOpen) {
      return {deadline: "Ikke fastlagt", status: "I behandling"}
    } */
  }
}

module.exports = findStageInfo
