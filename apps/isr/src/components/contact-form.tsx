'use client'

import { useActionState, useId, useRef, useTransition } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import type { getContactContent } from '@small-bites/cms-data'
import { Button } from '@small-bites/ui/actions/button'
import { Form, FormRow } from '@small-bites/ui/forms/form'
import { FormField } from '@small-bites/ui/forms/form-field'
import { TextInput } from '@small-bites/ui/forms/text-input'
import { TextArea } from '@small-bites/ui/forms/text-area'
import { Stack } from '@small-bites/ui/layout/stack'
import { Text } from '@small-bites/ui/typography/text'
import {
  submitContact,
  type ContactActionState,
  type ContactData,
} from '../app/contact/_lib/contact.action'

interface ContactFormProps {
  copy: Awaited<ReturnType<typeof getContactContent>>['contact']['form']
  privacyCopy: string
}

const fieldOrder = ['name', 'email', 'message'] as const

export function ContactForm({ copy, privacyCopy }: ContactFormProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const [, submitAction, isActionPending] = useActionState(
    async (previousState: ContactActionState, data: ContactData) => {
      const state = await submitContact(previousState, data)
      if (state.success) {
        startTransition(() => router.push('/contact/confirmation'))
      }
      return state
    },
    { success: false, data: null },
  )
  const id = useId()
  const nameId = `${id}-name`
  const emailId = `${id}-email`
  const messageId = `${id}-message`
  const privacyId = `${id}-privacy`
  const schema = z.object({
    name: z.string().trim().min(1, copy.nameRequiredMessage),
    email: z.string().trim().min(1, copy.emailRequiredMessage).pipe(z.email(copy.invalidEmailMessage)),
    message: z.string().trim().min(1, copy.messageRequiredMessage),
  })
  const form = useForm({
    defaultValues: { name: '', email: '', message: '' },
    validators: { onSubmit: schema },
    onSubmit: ({ value }) => {
      startTransition(() => submitAction(value))
    },
    onSubmitInvalid: ({ formApi }) => {
      const firstInvalidField = fieldOrder.find((name) => formApi.getFieldMeta(name)?.errors.length)
      if (firstInvalidField) {
        // Wait for inline errors to render before moving focus to their control.
        requestAnimationFrame(() => {
          formRef.current
            ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${firstInvalidField}"]`)
            ?.focus()
        })
      }
    },
  })

  return (
    <Form
      ref={formRef}
      noValidate
      aria-label={copy.submitLabel}
      aria-describedby={privacyId}
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit()
      }}
    >
      <FormRow>
        <form.Field name="name">
          {(field) => (
            <FormField
              label={copy.nameLabel}
              htmlFor={nameId}
              error={field.state.meta.errors[0]?.message}
            >
              <TextInput
                id={nameId}
                name={field.name}
                autoComplete="name"
                placeholder={copy.namePlaceholder}
                required
                size="lg"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={!field.state.meta.isValid}
                aria-describedby={!field.state.meta.isValid ? `${nameId}-error` : undefined}
              />
            </FormField>
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            <FormField
              label={copy.emailLabel}
              htmlFor={emailId}
              error={field.state.meta.errors[0]?.message}
            >
              <TextInput
                id={emailId}
                name={field.name}
                type="email"
                autoComplete="email"
                placeholder={copy.emailPlaceholder}
                required
                size="lg"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={!field.state.meta.isValid}
                aria-describedby={!field.state.meta.isValid ? `${emailId}-error` : undefined}
              />
            </FormField>
          )}
        </form.Field>
      </FormRow>
      <form.Field name="message">
        {(field) => (
          <FormField
            label={copy.messageLabel}
            htmlFor={messageId}
            error={field.state.meta.errors[0]?.message}
          >
            <TextArea
              id={messageId}
              name={field.name}
              placeholder={copy.messagePlaceholder}
              required
              rows={5}
              size="lg"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              aria-invalid={!field.state.meta.isValid}
              aria-describedby={!field.state.meta.isValid ? `${messageId}-error` : undefined}
            />
          </FormField>
        )}
      </form.Field>
      <Stack gap="sm" align="start">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => {
            const loading = isSubmitting || isActionPending || isPending
            return (
              <Button type="submit" size="lg" loading={loading}>
                {copy.submitLabel}
              </Button>
            )
          }}
        </form.Subscribe>
        <Text id={privacyId} variant="caption" tone="muted">{privacyCopy}</Text>
      </Stack>
    </Form>
  )
}
