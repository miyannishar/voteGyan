import { addAccessory, subtractUserPoints } from "../lib/firebase/firestore";

/**
 *
 * @param userId
 * @param accessory
 * @returns
 */
export async function redeemAccessoryForPoints(
  userId: string,
  accessory: Accessory
) {
  try {
    await subtractUserPoints(userId, accessory.cost);
    await addAccessory(userId, accessory);
    return true;
  } catch (e) {
    console.error(e);
  } finally {
    return false;
  }
}
