'use client'

import { ContentContainer } from '../layout/content-container'
import { SearchInput } from '../forms/search-input'

type RecipeSearchProps = {
  label: string
  placeholder: string
  value: string
  onValueChange: (value: string) => void
}

export function RecipeSearch({ label, placeholder, value, onValueChange }: RecipeSearchProps) {
  return (
    <ContentContainer width="wide">
      <section aria-labelledby="search-recipes-label" className="space-y-3">
        <label id="search-recipes-label" className="block text-base font-medium">
          {label}
        </label>
        <SearchInput
          aria-labelledby="search-recipes-label"
          placeholder={placeholder}
          value={value}
          onValueChange={onValueChange}
        />
      </section>
    </ContentContainer>
  )
}
