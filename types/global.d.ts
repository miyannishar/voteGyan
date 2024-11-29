import { Timestamp } from "firebase/firestore";

export {};

declare global {
  /**
   * User information
   */
  interface User {
    user_id: string;
    name: string;
    email: string;
    points: number;
    accessories: Accessory[];
    num_daily_streak: number;
    last_completed_challenge_date?: Timestamp;
    lessonsCompleted: number[]; // id of the lessons
  }

  /**
   *
   */
  interface LessonData {
    hero: any;
    content: string; // Markdown
  }

  /**
   * Lesson information
   */
  interface Lesson {
    lesson_id: number;
    steps: LessonData[];
    color: string;
    title: string;
    imagePath?: any;
  }

  /**
   * Accessory information
   */
  type AccessoryType =
    | "Headwear"
    | "Body"
    | "Pants"
    | "Lefthand"
    | "Righthand"
    | "Face"
    | "Bag"
    | "Headpin";

  interface Accessory {
    accessory_id: string;
    accessory_name: string;
    cost: number;
    type: AccessoryType;
    previewUrl: any;
    overlayUrl: any;
  }

  /**
   * Questions
   */
  type MultipleChoices = "A" | "B" | "C" | "D";

  interface Question {
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    explanation: string;
    correct_answer: MultipleChoices;
  }

  interface ImageCarouselItem {
    id: number;
    uri: string;
    title: string;
    onPress?: any;
  }

  interface InsightCarouselItem {
    id: number;
    steps: number;
    color: string;
    title: string;
    onPress?: any;
  }
}
