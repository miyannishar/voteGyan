const step_1_how_to_vote = `## Step 1: Register to Vote
1. What to Do

    - **Check Eligibility:** Ensure you meet the basic requirements: you must be a U.S. citizen, at least 18 years old by Election Day, and meet your state’s residency requirements.
    - **Register:** You can register online, by mail, or in person at your local election office, DMV, or other designated locations. Each state has its own deadlines and procedures.
    - **Confirm Registration:** Once registered, confirm your registration status online to ensure your information is accurate.

2. Resources:
    - **Online Registration:** Visit vote.gov for links to your state's registration site.
    - **State-Specific Info:** Check your state’s election website for specific details.
`;

const step_2_how_to_vote = `## Step 2: Learn About the Candidates and Issues
1. What to Do:

    - **Research:** Look up information on the candidates and ballot measures. Use non-partisan sources to understand each candidate's positions and the pros and cons of each issue.
    - **Sample Ballot:** Obtain a sample ballot from your local election office or state website. This will help you familiarize yourself with what you'll be voting on.

2. Resources:
    - **Voter Guides:** Websites like Ballotpedia or the League of Women Voters provide detailed guides.
    - **Debates and News:** Watch debates and read news from multiple sources.
`;

const step_3_how_to_vote = `## Step 3: Cast Your Vote
1. What to Do:

    - **Choose a Method:** Decide if you’ll vote in person on Election Day, early in person, or by mail (absentee ballot). Check your state’s options and deadlines.
    - **In-Person Voting:** Find your polling place and check its hours. Bring necessary ID if your state requires it.
    - **Mail Voting:** Request your mail-in ballot early, follow the instructions carefully, and mail it back or drop it off at a designated location before the deadline.
2.Resources:
    - **Polling Place Locator:** Use the USA.gov polling place locator to find your polling location.
    - **Absentee Ballot Info:** Check your state’s election website for how to request and return an absentee ballot.
`;

export const voting101: LessonData[][] = [
  [
    {
      hero: require("../assets/lessons/hero/how-to-vote-0.png"),
      content: step_1_how_to_vote,
    },
    {
      hero: require("../assets/lessons/hero/how-to-vote-1.png"),
      content: step_2_how_to_vote,
    },
    {
      hero: require("../assets/lessons/hero/how-to-vote-2.png"),
      content: step_3_how_to_vote,
    },
  ],
];
