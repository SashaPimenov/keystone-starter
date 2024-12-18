import React from 'react'
import { FieldContainer, FieldDescription, FieldLabel } from '@keystone-ui/fields'
import { CellLink, CellContainer } from '@keystone-6/core/admin-ui/components'

import {
  type CardValueComponent,
  type CellComponent,
  type FieldController,
  type FieldControllerConfig,
  type FieldProps
} from '@keystone-6/core/types'
import { StarsInput } from './stars-input'

export const Field = ({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) => (
  <FieldContainer as='fieldset'>
    <FieldLabel as='legend'>{field.label}</FieldLabel>
    <FieldDescription id={`${field.path}-description`}>{field.description}</FieldDescription>
    <StarsInput maxStars={field.maxStars} onChange={onChange} value={value} autoFocus={autoFocus} />
  </FieldContainer>
)

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path] + ''
  return linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{value}</CellContainer>
}

Cell.supportsLinkTo = true

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {item[field.path]}
    </FieldContainer>
  )
}

export const controller = (config: FieldControllerConfig<{ maxStars: number }>): FieldController<number | null, string> & { maxStars: number } => {
  return {
    maxStars: config.fieldMeta.maxStars,
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: null,
    deserialize: (data) => {
      const value = data[config.path]
      return typeof value === 'number' ? value : null
    },
    serialize: (value) => ({ [config.path]: value })
  }
}