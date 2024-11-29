import { Timestamp } from "firebase/firestore";
import { voting101 } from "./lessons";

/**
 * Checks if the given Firestore Timestamp represents today's date.
 *
 * @param {firebase.firestore.Timestamp} timestamp - The Firestore Timestamp object to check.
 * @returns {boolean} Returns true if the Timestamp represents today's date, false otherwise.
 */
export function isToday(timestamp: Timestamp | null): boolean {
  if (!timestamp) {
    return false;
  }

  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const todayEnd = new Date(todayStart.getTime() + 86400000); // Add 24 hours in milliseconds

  const timestampDate = timestamp.toDate();

  return timestampDate >= todayStart && timestampDate < todayEnd;
}

const colorMap = {
  blue: "#2BB1F3",
  yellow: "#FECA03",
  green: "#59CC01",
  red: "#FA4A4E",
  darkBlue: "#5482F5",
  orange: "#EE805F",
  lightGreen: "#8AC959",
};

const votingLesson = [1, 2, 3];

export const insights: Lesson[] = [
  {
    lesson_id: 0,
    color: colorMap.blue,
    title: "How to Vote",
    steps: voting101[0],
    imagePath: require("../assets/lessons/0-how-to-vote.png"),
  },
  {
    lesson_id: 1,
    color: colorMap.red,
    title: "History of Voting Rights",
    steps: voting101[0],
    imagePath: require("../assets/lessons/1-history-of-voting.png"),
  },
  {
    lesson_id: 2,
    color: colorMap.darkBlue,
    title: "The Impact of Voting",
    steps: voting101[0],
    imagePath: require("../assets/lessons/2-impact-of-voting.png"),
  },
];

export const insights2: Lesson[] = [
  {
    lesson_id: 5,
    color: colorMap.yellow,
    title: "Intro to U.S Politics",
    steps: voting101[0],
    imagePath: require("../assets/lessons/5.png"),
  },
  {
    lesson_id: 6,
    color: colorMap.blue,
    title: "The Legislative Branch",
    steps: voting101[0],
    imagePath: require("../assets/lessons/6.png"),
  },
  {
    lesson_id: 7,
    color: colorMap.orange,
    title: "The Executive Branch",
    steps: voting101[0],
    imagePath: require("../assets/lessons/7.png"),
  },
  {
    lesson_id: 8,
    color: colorMap.darkBlue,
    title: "POTUS",
    steps: voting101[0],
  },
];

export const insights3: Lesson[] = [
  {
    lesson_id: 10,
    color: colorMap.orange,
    title: "How to Vote",
    steps: voting101[0],
  },
  {
    lesson_id: 11,
    color: colorMap.green,
    title: "Electoral College",
    steps: voting101[0],
  },
  {
    lesson_id: 12,
    color: colorMap.red,
    title: "The Senate",
    steps: voting101[0],
  },
  {
    lesson_id: 13,
    color: colorMap.darkBlue,
    title: "POTUS",
    steps: voting101[0],
  },
];

export const allLessons = [...insights, ...insights2, ...insights3];
