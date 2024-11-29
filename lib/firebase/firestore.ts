/**
 * Helper Firestore APIs
 */
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  orderBy,
  Query,
  setDoc,
  deleteDoc,
  getDoc,
  Timestamp,
  increment,
} from "firebase/firestore";

import { FIRESTORE_DB as db } from "./firebase";

/**
 * Helper for Sign-in flow
 */

/**
 * Creates user to Firestore DB
 * @param userId
 * @param name
 * @param email
 */
export async function createUser(userId: string, name: string, email: string) {
  if (!userId || !name || !email) throw "error";

  try {
    const userDocRef = doc(db, "users", userId);

    const user: User = {
      user_id: userId,
      name: name,
      email: email,
      points: 0,
      accessories: [],
      num_daily_streak: 0,
      lessonsCompleted: [],
    };

    await setDoc(userDocRef, user);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Gets users from Firestore DB
 * @param userID
 * @returns
 */
export async function getUser(userId: string): Promise<User | null> {
  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);
    const userData = docSnap.data() as User;
    return userData;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Add accessory to user
 * @param userId
 * @param accessory
 */
export async function rewardUserPoints(
  userId: string,
  pointsToReward: number = 0
) {
  if (!userId) {
    throw "Needs a userId";
  }
  const userDocRef = doc(db, "users", userId);

  // Atomically add a new comment to the "comments" array field.
  await updateDoc(userDocRef, {
    points: increment(pointsToReward),
  });
}

/**
 * Add accessory to user
 * @param userId
 * @param accessory
 */
export async function subtractUserPoints(
  userId: string,
  pointsToSubtract: number = 0
) {
  if (!userId) {
    throw "Needs a userId";
  }
  const userDocRef = doc(db, "users", userId);

  // Atomically add a new comment to the "comments" array field.
  await updateDoc(userDocRef, {
    points: increment(-1 * pointsToSubtract),
  });
}

/**
 * Add accessory to user
 * @param userId
 * @param accessory
 */
export async function incrementDailyStreak(userId: string) {
  if (!userId) {
    throw "Needs a userId";
  }
  const userDocRef = doc(db, "users", userId);

  // Atomically add a new comment to the "comments" array field.
  await updateDoc(userDocRef, {
    num_daily_streak: increment(1),
  });
}

/**
 * Add accessory to user
 * @param userId
 * @param accessory
 */
export async function resetDailyStreak(userId: string) {
  if (!userId) {
    throw "Needs a userId";
  }
  const userDocRef = doc(db, "users", userId);

  // Atomically add a new comment to the "comments" array field.
  await updateDoc(userDocRef, {
    num_daily_streak: 0,
  });
}

/**
 * Add accessory to user
 * @param userId
 * @param accessory
 */
export async function addLastCompletedChallengeDate(userId: string) {
  if (!userId) {
    throw "Needs a userId";
  }
  const userDocRef = doc(db, "users", userId);

  const today = new Date();

  // Atomically add a new comment to the "comments" array field.
  await updateDoc(userDocRef, {
    last_completed_challenge_date: today,
  });
}

/**
 * Add accessory to user
 * @param userId
 * @param accessory
 */
export async function addAccessory(userId: string, accessory: Accessory) {
  if (!userId) {
    throw "Needs a userId";
  }
  if (!accessory) {
    throw "Needs accessory";
  }
  const userDocRef = doc(db, "users", userId);

  // Atomically add a new comment to the "comments" array field.
  await updateDoc(userDocRef, {
    accessories: arrayUnion(accessory),
  });
}

/**
 * Add completed lesson
 * @param userId
 * @param accessory
 */
export async function addCompletedLesson(userId: string, lesson_id: number) {
  if (!userId) {
    throw "Needs a userId";
  }
  if (lesson_id === 0 ? false : !lesson_id) {
    throw "Needs lesson id";
  }
  const userDocRef = doc(db, "users", userId);

  // Atomically add a new comment to the "comments" array field.
  await updateDoc(userDocRef, {
    lessonsCompleted: arrayUnion(lesson_id),
  });
}
