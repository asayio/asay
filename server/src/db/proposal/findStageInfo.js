const R = require('ramda');

// UNCOMMENTED STUFF UNTIL WE CAN HANDLE MULTIPLE STAGES!
function findStageInfo(stage) {
  const voteStage = function(typeid) {
    return stage => {
      return stage.typeid === typeid;
    };
  };
  // voting stages for "beslutningsforslag"
  const bOnlyVote = R.find(voteStage(87))(stage); // first and only vote
  const bFinalVote = R.find(voteStage(7))(stage); // 2nd and final vote
  const bFirstVote = R.find(voteStage(23))(stage); // first vote

  // voting stages for "lovforslag"
  const lFinalVote = R.find(voteStage(17))(stage); // 3rd and final vote
  const lFirstVote = R.find(voteStage(12))(stage); // first vote

  // get current stage
  const current = bOnlyVote
    ? bOnlyVote
    : bFinalVote ? bFinalVote : bFirstVote ? bFirstVote : lFinalVote ? lFinalVote : lFirstVote;

  // determine stage
  const hasFinal = bFinalVote || lFinalVote || bOnlyVote ? true : false;
  if (!hasFinal) {
    return {
      deadline: 'Ikke fastlagt',
      distanceToDeadline: 99999999998, // show second to last in list ordered by deadline
      status: 'Til afstemning'
    };
  } else {
    const today = new Date().getTime(); // for comparing w deadlines
    const deadline = new Date(current.dato);
    const distanceToDeadline = deadline - today;
    const countdown = Math.floor(distanceToDeadline / (1000 * 60 * 60 * 24)) - 1; // "-1" because we need the results the day before
    const isOpen = countdown > 0 ? true : false;

    const deadlineLabel = countdown === 0 ? 'I dag' : countdown === 1 ? 'I morgen' : countdown + ' dage';

    if (hasFinal && isOpen) {
      return {
        deadline: deadlineLabel,
        distanceToDeadline: distanceToDeadline,
        status: 'Til afstemning'
      };
    } else if (hasFinal && !isOpen && current.Afstemning[0]) {
      const findNumbers = /\d+/g; // will find all natural numbers and list them in an array
      const resultString = current.Afstemning[0].konklusion;
      const resultArray = resultString.match(findNumbers);
      const actualResults = {
        for: Number(resultArray[0]),
        against: Number(resultArray[1]),
        blank: Number(resultArray[2]),
        partyDistribution: resultString // make some nice regex on this some day
      };
      return {
        deadline: 'Afsluttet',
        distanceToDeadline: 99999999999, // show last in list ordered by deadline
        status: 'Afsluttet',
        actualResults
      };
    } else if (hasFinal && !isOpen) {
      return {
        deadline: 'Afsluttet',
        distanceToDeadline: 99999999999, // show last in list ordered by deadline
        status: 'Afsluttet'
      };
    }
  }
}

module.exports = findStageInfo;
