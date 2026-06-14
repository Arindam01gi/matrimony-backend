-- CreateTable
CREATE TABLE "partner_preferences" (
    "id" TEXT NOT NULL,
    "min_age" INTEGER,
    "max_age" INTEGER,
    "min_height" DOUBLE PRECISION,
    "max_height" DOUBLE PRECISION,
    "gender" "Gender",
    "marital_status" "MaritalStatus"[],
    "religion" "Religion"[],
    "caste" TEXT[],
    "mother_tongue" TEXT[],
    "highest_education" TEXT[],
    "occupation" TEXT[],
    "annual_income" "IncomeRange"[],
    "family_type" "FamilyType"[],
    "family_values" "FamilyValues"[],
    "district" TEXT[],
    "state" TEXT[],
    "country" TEXT[],
    "diet" "DietType"[],
    "smoking" "LifestyleHabit"[],
    "drinking" "LifestyleHabit"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "partner_preferences_gender_idx" ON "partner_preferences"("gender");

-- AddForeignKey
ALTER TABLE "partner_preferences" ADD CONSTRAINT "partner_preferences_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
