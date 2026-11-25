import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_recipes_dietary_tags" ADD VALUE 'non-vegetarian' BEFORE 'dairy-free';
  ALTER TYPE "public"."enum_recipes_dietary_tags" ADD VALUE 'vegan' BEFORE 'dairy-free';
  ALTER TYPE "public"."enum_recipes_dietary_tags" ADD VALUE 'pescatarian' BEFORE 'dairy-free';
  ALTER TYPE "public"."enum_recipes_dietary_tags" ADD VALUE 'gluten-free';
  ALTER TYPE "public"."enum_recipes_meal_type" ADD VALUE 'breakfast' BEFORE 'lunch';
  ALTER TYPE "public"."enum_recipes_meal_type" ADD VALUE 'brunch' BEFORE 'lunch';
  ALTER TYPE "public"."enum_recipes_meal_type" ADD VALUE 'snack';
  ALTER TYPE "public"."enum__recipes_v_version_dietary_tags" ADD VALUE 'non-vegetarian' BEFORE 'dairy-free';
  ALTER TYPE "public"."enum__recipes_v_version_dietary_tags" ADD VALUE 'vegan' BEFORE 'dairy-free';
  ALTER TYPE "public"."enum__recipes_v_version_dietary_tags" ADD VALUE 'pescatarian' BEFORE 'dairy-free';
  ALTER TYPE "public"."enum__recipes_v_version_dietary_tags" ADD VALUE 'gluten-free';
  ALTER TYPE "public"."enum__recipes_v_version_meal_type" ADD VALUE 'breakfast' BEFORE 'lunch';
  ALTER TYPE "public"."enum__recipes_v_version_meal_type" ADD VALUE 'brunch' BEFORE 'lunch';
  ALTER TYPE "public"."enum__recipes_v_version_meal_type" ADD VALUE 'snack';
  ALTER TABLE "home_page" ADD COLUMN "recommendations_non_vegetarian_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "recommendations_vegan_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "recommendations_pescatarian_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "recommendations_gluten_free_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meal_filters_breakfast_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meal_filters_brunch_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meal_filters_snack_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_recommendations_non_vegetarian_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_recommendations_vegan_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_recommendations_pescatarian_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_recommendations_gluten_free_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_meal_filters_breakfast_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_meal_filters_brunch_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_meal_filters_snack_label" varchar;
  ALTER TABLE "recipe_page" ADD COLUMN "metadata_breakfast_label" varchar;
  ALTER TABLE "recipe_page" ADD COLUMN "metadata_brunch_label" varchar;
  ALTER TABLE "recipe_page" ADD COLUMN "metadata_snack_label" varchar;
  ALTER TABLE "_recipe_page_v" ADD COLUMN "version_metadata_breakfast_label" varchar;
  ALTER TABLE "_recipe_page_v" ADD COLUMN "version_metadata_brunch_label" varchar;
  ALTER TABLE "_recipe_page_v" ADD COLUMN "version_metadata_snack_label" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "recipes_dietary_tags" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_recipes_dietary_tags";
  CREATE TYPE "public"."enum_recipes_dietary_tags" AS ENUM('vegetarian', 'dairy-free');
  ALTER TABLE "recipes_dietary_tags" ALTER COLUMN "value" SET DATA TYPE "public"."enum_recipes_dietary_tags" USING "value"::"public"."enum_recipes_dietary_tags";
  ALTER TABLE "recipes" ALTER COLUMN "meal_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_recipes_meal_type";
  CREATE TYPE "public"."enum_recipes_meal_type" AS ENUM('lunch', 'dinner');
  ALTER TABLE "recipes" ALTER COLUMN "meal_type" SET DATA TYPE "public"."enum_recipes_meal_type" USING "meal_type"::"public"."enum_recipes_meal_type";
  ALTER TABLE "_recipes_v_version_dietary_tags" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__recipes_v_version_dietary_tags";
  CREATE TYPE "public"."enum__recipes_v_version_dietary_tags" AS ENUM('vegetarian', 'dairy-free');
  ALTER TABLE "_recipes_v_version_dietary_tags" ALTER COLUMN "value" SET DATA TYPE "public"."enum__recipes_v_version_dietary_tags" USING "value"::"public"."enum__recipes_v_version_dietary_tags";
  ALTER TABLE "_recipes_v" ALTER COLUMN "version_meal_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__recipes_v_version_meal_type";
  CREATE TYPE "public"."enum__recipes_v_version_meal_type" AS ENUM('lunch', 'dinner');
  ALTER TABLE "_recipes_v" ALTER COLUMN "version_meal_type" SET DATA TYPE "public"."enum__recipes_v_version_meal_type" USING "version_meal_type"::"public"."enum__recipes_v_version_meal_type";
  ALTER TABLE "home_page" DROP COLUMN "recommendations_non_vegetarian_label";
  ALTER TABLE "home_page" DROP COLUMN "recommendations_vegan_label";
  ALTER TABLE "home_page" DROP COLUMN "recommendations_pescatarian_label";
  ALTER TABLE "home_page" DROP COLUMN "recommendations_gluten_free_label";
  ALTER TABLE "home_page" DROP COLUMN "meal_filters_breakfast_label";
  ALTER TABLE "home_page" DROP COLUMN "meal_filters_brunch_label";
  ALTER TABLE "home_page" DROP COLUMN "meal_filters_snack_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recommendations_non_vegetarian_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recommendations_vegan_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recommendations_pescatarian_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recommendations_gluten_free_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_meal_filters_breakfast_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_meal_filters_brunch_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_meal_filters_snack_label";
  ALTER TABLE "recipe_page" DROP COLUMN "metadata_breakfast_label";
  ALTER TABLE "recipe_page" DROP COLUMN "metadata_brunch_label";
  ALTER TABLE "recipe_page" DROP COLUMN "metadata_snack_label";
  ALTER TABLE "_recipe_page_v" DROP COLUMN "version_metadata_breakfast_label";
  ALTER TABLE "_recipe_page_v" DROP COLUMN "version_metadata_brunch_label";
  ALTER TABLE "_recipe_page_v" DROP COLUMN "version_metadata_snack_label";`)
}
