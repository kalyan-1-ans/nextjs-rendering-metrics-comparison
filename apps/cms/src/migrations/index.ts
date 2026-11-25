import * as migration_20261125_004154_initial from './20261125_004154_initial';
import * as migration_20261125_013723_small_bites_content from './20261125_013723_small_bites_content';
import * as migration_20261125_014646_expand_recipe_filters from './20261125_014646_expand_recipe_filters';
import * as migration_20261125_021203_grouped_recommendation_preferences from './20261125_021203_grouped_recommendation_preferences';

export const migrations = [
  {
    up: migration_20261125_004154_initial.up,
    down: migration_20261125_004154_initial.down,
    name: '20261125_004154_initial',
  },
  {
    up: migration_20261125_013723_small_bites_content.up,
    down: migration_20261125_013723_small_bites_content.down,
    name: '20261125_013723_small_bites_content',
  },
  {
    up: migration_20261125_014646_expand_recipe_filters.up,
    down: migration_20261125_014646_expand_recipe_filters.down,
    name: '20261125_014646_expand_recipe_filters',
  },
  {
    up: migration_20261125_021203_grouped_recommendation_preferences.up,
    down: migration_20261125_021203_grouped_recommendation_preferences.down,
    name: '20261125_021203_grouped_recommendation_preferences'
  },
];
