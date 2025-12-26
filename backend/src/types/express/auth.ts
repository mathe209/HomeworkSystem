export interface UserPayload {
  id: number;
  name: string;
  email?: string;
  role: "teacher" | "student";
  grade?: string;
}