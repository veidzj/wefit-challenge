export interface CheckLegalPersonByCNPJRepository {
  check: (cnpj: string) => Promise<boolean>
}
