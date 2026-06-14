-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "FamilyType" AS ENUM ('JOINT', 'NUCLEAR', 'NOT_SPECIFIED');

-- CreateEnum
CREATE TYPE "FamilyValues" AS ENUM ('ORTHODOX', 'TRADITIONAL', 'MODERATE', 'LIBERAL');

-- CreateEnum
CREATE TYPE "DietType" AS ENUM ('VEGETARIAN', 'NON_VEGETARIAN', 'EGGITARIAN', 'VEGAN');

-- CreateEnum
CREATE TYPE "LifestyleHabit" AS ENUM ('YES', 'NO', 'OCCASIONALLY');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('HINDU', 'MUSLIM', 'SIKH', 'CHRISTIAN', 'OTHERS');

-- CreateEnum
CREATE TYPE "IncomeRange" AS ENUM ('UNDER_3L', 'THREE_TO_SIX_L', 'SIX_TO_TEN_L', 'TEN_TO_FIFTEEN_L', 'ABOVE_FIFTEEN_L');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('UNMARRIED', 'SEPARATED', 'DIVORCED');

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "familyType" "FamilyType" NOT NULL,
    "about_me" TEXT NOT NULL,
    "work_location" TEXT,
    "MaritalStatus" "MaritalStatus" NOT NULL,
    "religion" "Religion" NOT NULL,
    "caste" TEXT,
    "mother_tongue" TEXT NOT NULL DEFAULT 'Bengali',
    "highest_education" TEXT NOT NULL,
    "collegeUniversity" TEXT,
    "occupation" TEXT NOT NULL,
    "organization" TEXT,
    "annual_income" "IncomeRange" NOT NULL,
    "family_values" "FamilyValues",
    "fathers_occupation" TEXT,
    "mothers_occupation" TEXT,
    "siblings" INTEGER,
    "sibilingsMaritalStatus" "MaritalStatus" NOT NULL,
    "diet" "DietType",
    "smoking" "LifestyleHabit",
    "drinking" "LifestyleHabit",
    "interests" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_profiles_gender_religion_caste_idx" ON "user_profiles"("gender", "religion", "caste");

-- CreateIndex
CREATE INDEX "user_profiles_work_location_idx" ON "user_profiles"("work_location");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
