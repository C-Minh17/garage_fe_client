declare module MPart {
  interface IRecord {
    id: string,
    partCode: string,
    name: string,
    price: number,
    stock: number,
    description: string,
    supplierId: string,
    supplier: MSupplier.IRecord,
    createdAt: string,
    updatedAt: string
  }
}