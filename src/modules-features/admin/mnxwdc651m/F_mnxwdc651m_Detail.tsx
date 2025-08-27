'use client';
import { Button, Grid, Group, Stack, TextInput, Tooltip } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useForm } from "@mantine/form";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";

export interface DiscountDetails {
  totalFlashSale: number;
  totalDiscountVoucher: number;
}

export interface I_mnxwdc651m_Detail {
  id: number;
  unique_id: string;
  user: string;
  total_price: number;
  total_discount: string;
  discount_details: DiscountDetails;
  status: string;
  note: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_email: string;
  shipping_address: string;
  voucher: string | null;
  payment_method: string;
  payment_status: string;
  payment_date: string | null;
  transaction_id: string | null;
  created_at: string;
}

export default function F_mnxwdc651m_Detail({ data }: { data: I_mnxwdc651m_Detail }) {

  const disc = useDisclosure(false);

  const form = useForm<I_mnxwdc651m_Detail>({
    initialValues: data,
    validate: {
    }
  });
  useEffect(() => {
    if (data) {
      const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value === null) {
          acc[key] = ""; // hoặc undefined nếu bạn muốn uncontrolled
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as any);

      form.setValues(cleanData);
    }
  }, [data]);



  return (
    <MyButtonModal label="Xem Chi tiết" crudType="check" title="Đơn hàng chi tiết" disclosure={disc} modalSize={"80%"} >
      <Grid columns={2} >
        <Grid.Col span={1}>
          <MyTextInput disabled label="Mã đơn hàng" {...form.getInputProps("unique_id")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <MyTextInput disabled label="Tên khách hàng" {...form.getInputProps("user")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }} />
        </Grid.Col>
      </Grid>
      <MyTextInput disabled label="Tổng tiền" {...form.getInputProps("total_price")} styles={{
        input: {
          backgroundColor: "#f8f9fa", // màu nền nếu muốn
          color: "#000", // màu chữ
        }
      }} />
      <Grid columns={3}>
        <Grid.Col span={1}>
          <MyTextInput
            disabled
            label="Tổng giảm"
            {...form.getInputProps("total_discount")}
            styles={{
              input: {
                backgroundColor: "#f8f9fa", // màu nền nếu muốn
                color: "#000", // màu chữ
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <MyTextInput disabled label="Tổng số tiền giảm từ Flash Sale" {...form.getInputProps("discount_details.totalFlashSale")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }} /></Grid.Col>
        <Grid.Col span={1}>
          <MyTextInput disabled label="Tổng số tiền giảm từ Voucher" {...form.getInputProps("discount_details.totalDiscountVoucher")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }} />
        </Grid.Col>
      </Grid>
      <Grid columns={2}>
        <Grid.Col span={1}>
          <MyTextInput disabled label="Trạng thái" {...form.getInputProps("status")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }} />
        </Grid.Col>
        <Grid.Col span={1}>
          <MyTextInput disabled label="Ghi chú" {...form.getInputProps("note")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }} />
        </Grid.Col>
      </Grid>
      <Grid columns={4}>
        <Grid.Col span={1}>
          <MyTextInput disabled label="Tên người nhận" {...form.getInputProps("shipping_name")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
        </Grid.Col>
        <Grid.Col span={1}>
          <MyTextInput disabled label="Số điện thoại" {...form.getInputProps("shipping_phone")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
        </Grid.Col>
        <Grid.Col span={1}>
          <MyTextInput disabled label="Email" {...form.getInputProps("shipping_email")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
        </Grid.Col>
        <Grid.Col span={1}>
          <MyTextInput disabled label="Địa chỉ" {...form.getInputProps("shipping_address")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
        </Grid.Col>
      </Grid>
      <Grid columns={3}>
        <Grid.Col span={1}>
      <MyTextInput disabled label="Phương thức vận chuyển" {...form.getInputProps("shipping_method_snapshot")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
      </Grid.Col>
      <Grid.Col span={1}>
      <MyTextInput disabled label="Phí vận chuyển" {...form.getInputProps("shipping_fee")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
      </Grid.Col>
      <Grid.Col span={1}>
      <MyTextInput disabled label="Lý do huỷ đơn" {...form.getInputProps("cancel_reason")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
      </Grid.Col>
      </Grid>
      <Grid columns={3}>
        <Grid.Col span={1}>
      <MyTextInput disabled label="Mã khuyến mại" {...form.getInputProps("voucher")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
      </Grid.Col>
      <Grid.Col span={1}>
      <MyTextInput disabled label="Phương thức thanh toán" {...form.getInputProps("payment_method")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
      </Grid.Col>
      <Grid.Col span={1}>
      <MyTextInput disabled label="Trạng thái thanh toán" {...form.getInputProps("payment_status")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
      </Grid.Col>
      </Grid>
      <Grid columns={3}>
        <Grid.Col span={1}>
      <MyTextInput disabled label="Ngày thanh toán" {...form.getInputProps("payment_date")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
      </Grid.Col>
      <Grid.Col span={1}>
      <MyTextInput disabled label="Mã giao dịch" {...form.getInputProps("transaction_id")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
      </Grid.Col>
      <Grid.Col span={1}>
      <MyTextInput disabled label="Thời gian nhận hàng" {...form.getInputProps("delivered_at")} styles={{
            input: {
              backgroundColor: "#f8f9fa", // màu nền nếu muốn
              color: "#000", // màu chữ
            }
          }}/>
      </Grid.Col>
      </Grid>
      {/* <MyTextInput disabled label="Ngày tạo" {...form.getInputProps("created_at")} /> */}
    </MyButtonModal>
  );
}
