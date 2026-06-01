/** Shallow-merge a nested key on a form object. */
export function patchNested<T extends Record<string, unknown>>(
  form: T,
  key: keyof T,
  patch: Partial<NonNullable<T[keyof T]>>
): T {
  return {
    ...form,
    [key]: {
      ...(form[key] as Record<string, unknown>),
      ...patch,
    },
  }
}

export function emptyImage() {
  return { _type: 'imageWithUrl' as const, url: '', alt: '' }
}
