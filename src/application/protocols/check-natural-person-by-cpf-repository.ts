export interface CheckNaturalPersonByCPFRepository {
  check: (cpf: string) => Promise<boolean>
}
