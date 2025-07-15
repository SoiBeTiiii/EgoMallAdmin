export interface Gift {
  type: 'variant';
  parent_id: number;
  variant_id: number;
}
export interface Variant {
  id: number;
  sku: string;
  sale_price: number;
  images: { id: number; url: string }[];
  options: { id: number; name: string; value: string }[];
  parent_id: number;
  parent_name: string; // thêm vào để hiển thị tên sản phẩm
}

export default function GetGiftDetail() {
    
}