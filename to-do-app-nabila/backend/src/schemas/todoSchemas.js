import { z } from "zod";

const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Todo title is required")
    .max(100, "Todo title cannot exceed 100 characters"),
});

const updateTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Todo title is required")
    .max(100, "Todo title cannot exceed 100 characters"),

  completed: z.boolean(),
});

export {
  createTodoSchema,
  updateTodoSchema,
};