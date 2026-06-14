/*
  Warnings:

  - You are about to drop the column `sibilingsMaritalStatus` on the `user_profiles` table. All the data in the column will be lost.
  - Added the required column `siblingsMaritalStatus` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "sibilingsMaritalStatus",
ADD COLUMN     "siblingsMaritalStatus" "MaritalStatus" NOT NULL;
