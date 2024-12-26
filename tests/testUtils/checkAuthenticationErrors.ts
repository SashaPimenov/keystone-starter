export const checkAuthenticationErrors = (errors: any) => {
  expect(errors).toHaveLength(1)
  expect(errors![0].message).toContain('Необходимо пройти авторизацию')
}
