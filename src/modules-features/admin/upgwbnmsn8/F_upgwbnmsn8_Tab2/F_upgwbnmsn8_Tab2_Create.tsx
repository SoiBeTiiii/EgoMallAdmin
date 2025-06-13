'use client'

import baseAxios from "@/api/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Group, MultiSelect, Popover, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import F_upgwbnmsn8_Tab2_Pi_Read, { Ipi } from "./F_upgwbnmsn8_Tab2_Pi_Read";

export interface ICG {
  order?: number;
  description?: string;
  coecgpi?: ICoecgpi[];
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export interface ICoecgpi {
  coepiId?: number;
  coecgId?: number;
  rating?: null;
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export interface ICreateCLO {
  id?: number;
  code: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  order?: number;
  coecgId?: number;
  description?: string;
  densityCLO?: number;
  coeclopi: ICoeclopi[];
}

export interface ICoeclopi {
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  coecloId?: number;
  coepiId: number;
  rating?: number;
}

export default function F_upgwbnmsn8_Tab2_Create({ coegradeSubjectId, totalCLO }: { coegradeSubjectId: number | null, totalCLO: number }) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [selectedPIs, setSelectedPIs] = useState<ICoeclopi[]>([]); // Store selected PI objects
  const [tempSelectedPIs, setTempSelectedPIs] = useState<ICoeclopi[]>([]);

  const form = useForm<ICreateCLO>({
    initialValues: {
      id: 0,
      code: '',
      name: '',
      concurrencyStamp: '',
      isEnabled: true,
      order: 0,
      coecgId: 0,
      description: '',
      densityCLO: 0,
      coeclopi: [],
    },
    validate: {
      code: (value) => value ? null : 'Không được để trống',
      coecgId: (value) => value ? null : 'Không được để trống',
      densityCLO: (value) => {
        if (!value) return 'Không được để trống';
        if (Number(value) > 100) return 'Không được lớn hơn 100%';
        if (Number(value) + totalCLO > 100) return 'Tổng của tỷ trọng CLO không được lớn hơn 100%';
        return null;
      },
      coeclopi: (value) => {
        if (!value || value.length === 0) return 'Không được để trống';
        if (value.every(pi => pi.isEnabled === false)) return 'Không được để trống';
        return null;
      },
    }
  });

  const cgQuery = useQuery<ICG[]>({
    queryKey: ["F_upgwbnmsn8_Tab2_CG"],
    queryFn: async () => {
      const response = await baseAxios.get(`/COECG/GetSource?coegradeSubjectId=${coegradeSubjectId}`)
      return response.data.data;
    }
  });

  const piQuery = useQuery<Ipi[]>({
    queryKey: [`COEPI`],
    queryFn: async () => {
      const response = await baseAxios.get("/COEPI/GetAll");
      return response.data.data;
    },
  });

  useEffect(() => {
    if (selectedPIs.length > 0) {
      const mappedPIs = selectedPIs.map(pi => ({
        id: 0,
        coepiId: pi.coepiId,
        isEnabled: true,
      }));

      form.setFieldValue("coeclopi", mappedPIs);
    } else {
      form.setFieldValue("coeclopi", []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPIs]);

  useEffect(() => {
    if (popoverOpened) {
      setTempSelectedPIs([...selectedPIs]);
    }
  }, [popoverOpened, selectedPIs]);

  // Hàm map từ mã PI sang đối tượng ICoeclopi
  const mapPICodesToObjects = (piCodes: string[]): ICoeclopi[] => {
    if (!piQuery.data) return [];

    return piCodes.map(piCode => {
      const pi = piQuery.data.find(item => item.code === piCode);
      return {
        id: 0,
        coepiId: pi?.id,
        code: pi?.code,
        name: pi?.name
      } as ICoeclopi;
    }).filter(item => item.coepiId !== 0);
  };

  return (
    <Group>
      <MyButtonCreate
        objectName="Chi tiết CLO"
        form={form}
        onSubmit={async (values) => {
          if (selectedPIs.length === 0) {
            form.setFieldError('coeclopi', 'Không được để trống');
            return Promise.reject(new Error('Vui lòng chọn ít nhất một PI'));
          }

          const updatedValues = {
            ...values,
            coeclopi: selectedPIs.map(pi => ({
              id: 0,
              coepiId: pi.coepiId,
              isEnabled: true,
            })),
            coecgId: values.coecgId,
          };

          return await baseAxios.post("/COECLO/Create", updatedValues).then(() => {
            form.reset();
            setSelectedPIs([]);
            setTempSelectedPIs([]);
          });
        }}
      >
        <MySelect
          label="Mã CG"
          data={cgQuery.data?.map((cg) => ({ value: cg.id?.toString() ?? "", label: cg.code ?? "" })) ?? []}
          {...form.getInputProps("coecgId")}
          error={form.errors.coecgId}
        />
        <MyTextInput label="Mã CLO" {...form.getInputProps("code")} />
        <MyTextInput label="Tên CLO" {...form.getInputProps("name")} />

        <div style={{ position: 'relative' }}>
          <Popover
            opened={popoverOpened}
            onChange={setPopoverOpened}
            zIndex={200}
            styles={{
              dropdown: {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxHeight: '80vh',
                overflow: 'auto'
              }
            }}
          >
            <Popover.Target>
              <MultiSelect
                label="PI"
                value={selectedPIs.map(pi => pi.code || '')}
                data={selectedPIs.map((pi) => ({ value: pi.code || '', label: pi.code || '' }))}
                onClick={() => setPopoverOpened(true)}
                readOnly
                onFocus={() => setPopoverOpened(true)}
                error={form.errors.coeclopi}
              />
            </Popover.Target>

            <Popover.Dropdown>
              <F_upgwbnmsn8_Tab2_Pi_Read
                coecgId={form.values.coecgId}
                selectedPIs={tempSelectedPIs.map(pi => pi.code as string)}
                setSelectedPIs={(piCodes) => {
                  setTempSelectedPIs(mapPICodesToObjects(piCodes));
                }}
                onConfirm={() => {
                  setSelectedPIs([...tempSelectedPIs]);
                  setPopoverOpened(false);
                }}
                onCancel={() => {
                  setPopoverOpened(false);
                }}
              />
            </Popover.Dropdown>
          </Popover>
        </div>

        <Textarea label="Mô tả" placeholder="Nhập mô tả" {...form.getInputProps("description")} />
        <MyNumberInput label="Tỷ trọng CLO (%)" {...form.getInputProps("densityCLO")} min={1} max={100} />
      </MyButtonCreate>
    </Group>
  );
}
