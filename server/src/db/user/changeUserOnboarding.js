// Import
const db = require('../db');
const updateUserOnboarding = db.sql('./user/sql/updateUserOnboarding.sql');
const updateUserOnboardingProposals = db.sql('./user/sql/updateUserOnboardingProposals.sql');
const updateUserOnboardingCandidates = db.sql('./user/sql/updateUserOnboardingCandidates.sql');
const updateUserOnboardingProjects = db.sql('./user/sql/updateUserOnboardingProjects.sql');
const updateUserOnboardingInsights = db.sql('./user/sql/updateUserOnboardingInsights.sql');

// Functions
async function changeUserOnboarding(userId, type) {
  const query =
    type === 'user'
      ? updateUserOnboarding
      : type === 'proposals'
        ? updateUserOnboardingProposals
        : type === 'candidates'
          ? updateUserOnboardingCandidates
          : type === 'projects' ? updateUserOnboardingProjects : updateUserOnboardingInsights;
  await db.cx.query(query, {
    user: userId
  });
}

// Export
module.exports = changeUserOnboarding;
