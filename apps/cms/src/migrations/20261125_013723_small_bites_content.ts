import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_recipes_dietary_tags" AS ENUM('vegetarian', 'dairy-free');
  CREATE TYPE "public"."enum_recipes_meal_type" AS ENUM('lunch', 'dinner');
  CREATE TYPE "public"."enum_recipes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__recipes_v_version_dietary_tags" AS ENUM('vegetarian', 'dairy-free');
  CREATE TYPE "public"."enum__recipes_v_version_meal_type" AS ENUM('lunch', 'dinner');
  CREATE TYPE "public"."enum__recipes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_recipe_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__recipe_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "recipes_dietary_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_recipes_dietary_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "recipes_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"quantity" numeric,
  	"unit" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "recipes_instructions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"instruction" varchar
  );
  
  CREATE TABLE "recipes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"introduction" varchar,
  	"meal_type" "enum_recipes_meal_type",
  	"cooking_minutes" numeric,
  	"base_servings" numeric,
  	"why_recommended" varchar,
  	"tip" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_recipes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_recipes_v_version_dietary_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__recipes_v_version_dietary_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_recipes_v_version_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"quantity" numeric,
  	"unit" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recipes_v_version_instructions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"instruction" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recipes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_introduction" varchar,
  	"version_meal_type" "enum__recipes_v_version_meal_type",
  	"version_cooking_minutes" numeric,
  	"version_base_servings" numeric,
  	"version_why_recommended" varchar,
  	"version_tip" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__recipes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "site_settings_navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"branding_site_name" varchar,
  	"navigation_label" varchar,
  	"footer_tagline" varchar,
  	"footer_description" varchar,
  	"timestamps_created_label" varchar,
  	"timestamps_updated_label" varchar,
  	"timestamps_rendered_label" varchar,
  	"_status" "enum_site_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_settings_v_version_navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_branding_site_name" varchar,
  	"version_navigation_label" varchar,
  	"version_footer_tagline" varchar,
  	"version_footer_description" varchar,
  	"version_timestamps_created_label" varchar,
  	"version_timestamps_updated_label" varchar,
  	"version_timestamps_rendered_label" varchar,
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"search_label" varchar,
  	"search_placeholder" varchar,
  	"search_suggestions_label" varchar,
  	"search_loading_message" varchar,
  	"search_empty_message" varchar,
  	"search_error_message" varchar,
  	"recommendations_heading" varchar,
  	"recommendations_description" varchar,
  	"recommendations_preference_label" varchar,
  	"recommendations_everything_label" varchar,
  	"recommendations_vegetarian_label" varchar,
  	"recommendations_dairy_free_label" varchar,
  	"recommendations_read_recipe_label" varchar,
  	"recommendations_loading_message" varchar,
  	"recommendations_empty_message" varchar,
  	"recommendations_error_message" varchar,
  	"meal_filters_label" varchar,
  	"meal_filters_all_label" varchar,
  	"meal_filters_lunch_label" varchar,
  	"meal_filters_dinner_label" varchar,
  	"sorting_label" varchar,
  	"sorting_newest_label" varchar,
  	"sorting_oldest_label" varchar,
  	"sorting_quickest_label" varchar,
  	"sorting_title_label" varchar,
  	"recipe_listing_heading" varchar,
  	"recipe_listing_count_singular_template" varchar,
  	"recipe_listing_count_plural_template" varchar,
  	"recipe_listing_progress_template" varchar,
  	"recipe_listing_read_recipe_label" varchar,
  	"recipe_listing_load_more_label" varchar,
  	"recipe_listing_loading_message" varchar,
  	"recipe_listing_empty_message" varchar,
  	"recipe_listing_error_message" varchar,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar,
  	"version_hero_description" varchar,
  	"version_search_label" varchar,
  	"version_search_placeholder" varchar,
  	"version_search_suggestions_label" varchar,
  	"version_search_loading_message" varchar,
  	"version_search_empty_message" varchar,
  	"version_search_error_message" varchar,
  	"version_recommendations_heading" varchar,
  	"version_recommendations_description" varchar,
  	"version_recommendations_preference_label" varchar,
  	"version_recommendations_everything_label" varchar,
  	"version_recommendations_vegetarian_label" varchar,
  	"version_recommendations_dairy_free_label" varchar,
  	"version_recommendations_read_recipe_label" varchar,
  	"version_recommendations_loading_message" varchar,
  	"version_recommendations_empty_message" varchar,
  	"version_recommendations_error_message" varchar,
  	"version_meal_filters_label" varchar,
  	"version_meal_filters_all_label" varchar,
  	"version_meal_filters_lunch_label" varchar,
  	"version_meal_filters_dinner_label" varchar,
  	"version_sorting_label" varchar,
  	"version_sorting_newest_label" varchar,
  	"version_sorting_oldest_label" varchar,
  	"version_sorting_quickest_label" varchar,
  	"version_sorting_title_label" varchar,
  	"version_recipe_listing_heading" varchar,
  	"version_recipe_listing_count_singular_template" varchar,
  	"version_recipe_listing_count_plural_template" varchar,
  	"version_recipe_listing_progress_template" varchar,
  	"version_recipe_listing_read_recipe_label" varchar,
  	"version_recipe_listing_load_more_label" varchar,
  	"version_recipe_listing_loading_message" varchar,
  	"version_recipe_listing_empty_message" varchar,
  	"version_recipe_listing_error_message" varchar,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "recipe_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"navigation_back_label" varchar,
  	"metadata_lunch_label" varchar,
  	"metadata_dinner_label" varchar,
  	"metadata_cooking_time_template" varchar,
  	"metadata_servings_template" varchar,
  	"sections_why_recommended_heading" varchar,
  	"sections_ingredients_heading" varchar,
  	"sections_instructions_heading" varchar,
  	"sections_tip_heading" varchar,
  	"servings_label" varchar,
  	"servings_option_template" varchar,
  	"recommendations_heading" varchar,
  	"recommendations_read_recipe_label" varchar,
  	"recommendations_loading_message" varchar,
  	"recommendations_empty_message" varchar,
  	"recommendations_error_message" varchar,
  	"comments_heading" varchar,
  	"comments_count_singular_template" varchar,
  	"comments_count_plural_template" varchar,
  	"comments_loading_message" varchar,
  	"comments_empty_heading" varchar,
  	"comments_empty_message" varchar,
  	"comments_error_message" varchar,
  	"comment_form_heading" varchar,
  	"comment_form_description" varchar,
  	"comment_form_name_label" varchar,
  	"comment_form_name_placeholder" varchar,
  	"comment_form_email_label" varchar,
  	"comment_form_email_placeholder" varchar,
  	"comment_form_comment_label" varchar,
  	"comment_form_comment_placeholder" varchar,
  	"comment_form_submit_label" varchar,
  	"comment_form_submitting_label" varchar,
  	"comment_form_success_message" varchar,
  	"comment_form_error_message" varchar,
  	"comment_form_name_required_message" varchar,
  	"comment_form_email_required_message" varchar,
  	"comment_form_invalid_email_message" varchar,
  	"comment_form_comment_required_message" varchar,
  	"_status" "enum_recipe_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_recipe_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_navigation_back_label" varchar,
  	"version_metadata_lunch_label" varchar,
  	"version_metadata_dinner_label" varchar,
  	"version_metadata_cooking_time_template" varchar,
  	"version_metadata_servings_template" varchar,
  	"version_sections_why_recommended_heading" varchar,
  	"version_sections_ingredients_heading" varchar,
  	"version_sections_instructions_heading" varchar,
  	"version_sections_tip_heading" varchar,
  	"version_servings_label" varchar,
  	"version_servings_option_template" varchar,
  	"version_recommendations_heading" varchar,
  	"version_recommendations_read_recipe_label" varchar,
  	"version_recommendations_loading_message" varchar,
  	"version_recommendations_empty_message" varchar,
  	"version_recommendations_error_message" varchar,
  	"version_comments_heading" varchar,
  	"version_comments_count_singular_template" varchar,
  	"version_comments_count_plural_template" varchar,
  	"version_comments_loading_message" varchar,
  	"version_comments_empty_heading" varchar,
  	"version_comments_empty_message" varchar,
  	"version_comments_error_message" varchar,
  	"version_comment_form_heading" varchar,
  	"version_comment_form_description" varchar,
  	"version_comment_form_name_label" varchar,
  	"version_comment_form_name_placeholder" varchar,
  	"version_comment_form_email_label" varchar,
  	"version_comment_form_email_placeholder" varchar,
  	"version_comment_form_comment_label" varchar,
  	"version_comment_form_comment_placeholder" varchar,
  	"version_comment_form_submit_label" varchar,
  	"version_comment_form_submitting_label" varchar,
  	"version_comment_form_success_message" varchar,
  	"version_comment_form_error_message" varchar,
  	"version_comment_form_name_required_message" varchar,
  	"version_comment_form_email_required_message" varchar,
  	"version_comment_form_invalid_email_message" varchar,
  	"version_comment_form_comment_required_message" varchar,
  	"version__status" "enum__recipe_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "about_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"introduction_eyebrow" varchar,
  	"introduction_heading" varchar,
  	"introduction_description" varchar,
  	"back_link_label" varchar,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_page_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_introduction_eyebrow" varchar,
  	"version_introduction_heading" varchar,
  	"version_introduction_description" varchar,
  	"version_back_link_label" varchar,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"introduction_eyebrow" varchar,
  	"introduction_heading" varchar,
  	"introduction_description" varchar,
  	"form_name_label" varchar,
  	"form_name_placeholder" varchar,
  	"form_email_label" varchar,
  	"form_email_placeholder" varchar,
  	"form_message_label" varchar,
  	"form_message_placeholder" varchar,
  	"form_submit_label" varchar,
  	"form_submitting_label" varchar,
  	"form_error_message" varchar,
  	"form_name_required_message" varchar,
  	"form_email_required_message" varchar,
  	"form_invalid_email_message" varchar,
  	"form_message_required_message" varchar,
  	"privacy_copy" varchar,
  	"confirmation_introduction_eyebrow" varchar,
  	"confirmation_introduction_heading" varchar,
  	"confirmation_introduction_description" varchar,
  	"confirmation_back_link_label" varchar,
  	"_status" "enum_contact_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_introduction_eyebrow" varchar,
  	"version_introduction_heading" varchar,
  	"version_introduction_description" varchar,
  	"version_form_name_label" varchar,
  	"version_form_name_placeholder" varchar,
  	"version_form_email_label" varchar,
  	"version_form_email_placeholder" varchar,
  	"version_form_message_label" varchar,
  	"version_form_message_placeholder" varchar,
  	"version_form_submit_label" varchar,
  	"version_form_submitting_label" varchar,
  	"version_form_error_message" varchar,
  	"version_form_name_required_message" varchar,
  	"version_form_email_required_message" varchar,
  	"version_form_invalid_email_message" varchar,
  	"version_form_message_required_message" varchar,
  	"version_privacy_copy" varchar,
  	"version_confirmation_introduction_eyebrow" varchar,
  	"version_confirmation_introduction_heading" varchar,
  	"version_confirmation_introduction_description" varchar,
  	"version_confirmation_back_link_label" varchar,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "recipes_id" integer;
  ALTER TABLE "recipes_dietary_tags" ADD CONSTRAINT "recipes_dietary_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_instructions" ADD CONSTRAINT "recipes_instructions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_version_dietary_tags" ADD CONSTRAINT "_recipes_v_version_dietary_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_version_ingredients" ADD CONSTRAINT "_recipes_v_version_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_version_instructions" ADD CONSTRAINT "_recipes_v_version_instructions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v" ADD CONSTRAINT "_recipes_v_parent_id_recipes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recipes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_navigation_links" ADD CONSTRAINT "site_settings_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_navigation_links" ADD CONSTRAINT "_site_settings_v_version_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_sections" ADD CONSTRAINT "about_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_sections" ADD CONSTRAINT "_about_page_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "recipes_dietary_tags_order_idx" ON "recipes_dietary_tags" USING btree ("order");
  CREATE INDEX "recipes_dietary_tags_parent_idx" ON "recipes_dietary_tags" USING btree ("parent_id");
  CREATE INDEX "recipes_ingredients_order_idx" ON "recipes_ingredients" USING btree ("_order");
  CREATE INDEX "recipes_ingredients_parent_id_idx" ON "recipes_ingredients" USING btree ("_parent_id");
  CREATE INDEX "recipes_instructions_order_idx" ON "recipes_instructions" USING btree ("_order");
  CREATE INDEX "recipes_instructions_parent_id_idx" ON "recipes_instructions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "recipes_slug_idx" ON "recipes" USING btree ("slug");
  CREATE INDEX "recipes_meal_type_idx" ON "recipes" USING btree ("meal_type");
  CREATE INDEX "recipes_cooking_minutes_idx" ON "recipes" USING btree ("cooking_minutes");
  CREATE INDEX "recipes_published_at_idx" ON "recipes" USING btree ("published_at");
  CREATE INDEX "recipes_updated_at_idx" ON "recipes" USING btree ("updated_at");
  CREATE INDEX "recipes_created_at_idx" ON "recipes" USING btree ("created_at");
  CREATE INDEX "recipes__status_idx" ON "recipes" USING btree ("_status");
  CREATE INDEX "_recipes_v_version_dietary_tags_order_idx" ON "_recipes_v_version_dietary_tags" USING btree ("order");
  CREATE INDEX "_recipes_v_version_dietary_tags_parent_idx" ON "_recipes_v_version_dietary_tags" USING btree ("parent_id");
  CREATE INDEX "_recipes_v_version_ingredients_order_idx" ON "_recipes_v_version_ingredients" USING btree ("_order");
  CREATE INDEX "_recipes_v_version_ingredients_parent_id_idx" ON "_recipes_v_version_ingredients" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_version_instructions_order_idx" ON "_recipes_v_version_instructions" USING btree ("_order");
  CREATE INDEX "_recipes_v_version_instructions_parent_id_idx" ON "_recipes_v_version_instructions" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_parent_idx" ON "_recipes_v" USING btree ("parent_id");
  CREATE INDEX "_recipes_v_version_version_slug_idx" ON "_recipes_v" USING btree ("version_slug");
  CREATE INDEX "_recipes_v_version_version_meal_type_idx" ON "_recipes_v" USING btree ("version_meal_type");
  CREATE INDEX "_recipes_v_version_version_cooking_minutes_idx" ON "_recipes_v" USING btree ("version_cooking_minutes");
  CREATE INDEX "_recipes_v_version_version_published_at_idx" ON "_recipes_v" USING btree ("version_published_at");
  CREATE INDEX "_recipes_v_version_version_updated_at_idx" ON "_recipes_v" USING btree ("version_updated_at");
  CREATE INDEX "_recipes_v_version_version_created_at_idx" ON "_recipes_v" USING btree ("version_created_at");
  CREATE INDEX "_recipes_v_version_version__status_idx" ON "_recipes_v" USING btree ("version__status");
  CREATE INDEX "_recipes_v_created_at_idx" ON "_recipes_v" USING btree ("created_at");
  CREATE INDEX "_recipes_v_updated_at_idx" ON "_recipes_v" USING btree ("updated_at");
  CREATE INDEX "_recipes_v_latest_idx" ON "_recipes_v" USING btree ("latest");
  CREATE INDEX "site_settings_navigation_links_order_idx" ON "site_settings_navigation_links" USING btree ("_order");
  CREATE INDEX "site_settings_navigation_links_parent_id_idx" ON "site_settings_navigation_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE INDEX "_site_settings_v_version_navigation_links_order_idx" ON "_site_settings_v_version_navigation_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_navigation_links_parent_id_idx" ON "_site_settings_v_version_navigation_links" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "recipe_page__status_idx" ON "recipe_page" USING btree ("_status");
  CREATE INDEX "_recipe_page_v_version_version__status_idx" ON "_recipe_page_v" USING btree ("version__status");
  CREATE INDEX "_recipe_page_v_created_at_idx" ON "_recipe_page_v" USING btree ("created_at");
  CREATE INDEX "_recipe_page_v_updated_at_idx" ON "_recipe_page_v" USING btree ("updated_at");
  CREATE INDEX "_recipe_page_v_latest_idx" ON "_recipe_page_v" USING btree ("latest");
  CREATE INDEX "about_page_sections_order_idx" ON "about_page_sections" USING btree ("_order");
  CREATE INDEX "about_page_sections_parent_id_idx" ON "about_page_sections" USING btree ("_parent_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "_about_page_v_version_sections_order_idx" ON "_about_page_v_version_sections" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_sections_parent_id_idx" ON "_about_page_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "contact_page__status_idx" ON "contact_page" USING btree ("_status");
  CREATE INDEX "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recipes_fk" FOREIGN KEY ("recipes_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_recipes_id_idx" ON "payload_locked_documents_rels" USING btree ("recipes_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipes_fk";
  ALTER TABLE "recipes_dietary_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_ingredients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_instructions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_dietary_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_ingredients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_instructions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_navigation_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_version_navigation_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipe_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipe_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "recipes_dietary_tags" CASCADE;
  DROP TABLE "recipes_ingredients" CASCADE;
  DROP TABLE "recipes_instructions" CASCADE;
  DROP TABLE "recipes" CASCADE;
  DROP TABLE "_recipes_v_version_dietary_tags" CASCADE;
  DROP TABLE "_recipes_v_version_ingredients" CASCADE;
  DROP TABLE "_recipes_v_version_instructions" CASCADE;
  DROP TABLE "_recipes_v" CASCADE;
  DROP TABLE "site_settings_navigation_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "_site_settings_v_version_navigation_links" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "recipe_page" CASCADE;
  DROP TABLE "_recipe_page_v" CASCADE;
  DROP TABLE "about_page_sections" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "_about_page_v_version_sections" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  
  DROP INDEX "payload_locked_documents_rels_recipes_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "recipes_id";
  DROP TYPE "public"."enum_recipes_dietary_tags";
  DROP TYPE "public"."enum_recipes_meal_type";
  DROP TYPE "public"."enum_recipes_status";
  DROP TYPE "public"."enum__recipes_v_version_dietary_tags";
  DROP TYPE "public"."enum__recipes_v_version_meal_type";
  DROP TYPE "public"."enum__recipes_v_version_status";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum_recipe_page_status";
  DROP TYPE "public"."enum__recipe_page_v_version_status";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_status";`)
}
