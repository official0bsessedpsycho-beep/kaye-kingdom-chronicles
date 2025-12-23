import { z } from 'zod';

/**
 * Validation schemas for user-generated content.
 * These ensure proper input validation before database operations.
 */

export const PostContentSchema = z.object({
  content: z.string()
    .min(1, 'Content cannot be empty')
    .max(5000, 'Content is too long (max 5000 characters)'),
  audience: z.enum(['family', 'inner_circle', 'friends', 'everyone']),
});

export const CommentSchema = z.object({
  content: z.string()
    .min(1, 'Comment cannot be empty')
    .max(1000, 'Comment is too long (max 1000 characters)'),
});

export const DisplayNameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name is too long (max 50 characters)')
  .regex(/^[a-zA-Z0-9\s'-]+$/, 'Name contains invalid characters');

export const InviteCodeSchema = z.string()
  .min(4, 'Invite code is too short')
  .max(50, 'Invite code is too long')
  .transform(val => val.trim().toUpperCase());

export const EmailSchema = z.string()
  .email('Please enter a valid email address')
  .max(255, 'Email is too long');

export const PasswordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long');

export type PostContentInput = z.infer<typeof PostContentSchema>;
export type CommentInput = z.infer<typeof CommentSchema>;
