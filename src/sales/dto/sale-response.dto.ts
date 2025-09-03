export class SaleDetailResponseDto {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export class SaleResponseDto {
  id: number;
  userId: number;
  userName: string;
  total: number;
  date: Date;
  saleDetails: SaleDetailResponseDto[];
}
