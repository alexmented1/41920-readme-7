/*
  Warnings:

  - You are about to drop the column `original_post_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `original_user_id` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "original_post_id",
DROP COLUMN "original_user_id";
