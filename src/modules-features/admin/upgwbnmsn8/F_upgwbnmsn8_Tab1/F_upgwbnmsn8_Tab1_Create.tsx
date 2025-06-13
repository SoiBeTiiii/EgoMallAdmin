import baseAxios from "@/api/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Group, MultiSelect, Popover, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import F_upgwbnmsn8_Tab1_Pi_Read, { Ipi } from "./F_upgwbnmsn8_Tab1_Pi_Read";

export interface ICreateCG {
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  order?: number;
  description?: string;
  coeGradeSubjectId?: number | null;
  coecgpi?: Coecgpi[];
  // nguoiCapNhat?: string;
  // ngayCapNhat?: Date | undefined;
}

export interface Coecgpi {
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  coepiId?: number;
  coecgId?: number;
  rating?: number;
}

export default function F_upgwbnmsn8_Tab1_Create({ coeGradeSubjectId }: { coeGradeSubjectId: number | null }) {
  const [selectedPIs, setSelectedPIs] = useState<Coecgpi[]>([]);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [tempSelectedPIs, setTempSelectedPIs] = useState<Coecgpi[]>([]);

  const form = useForm<ICreateCG>({
    initialValues: {
      code: '',
      description: '',
      coecgpi: [],
    },
    validate: {
      code: (value) => value ? null : 'Không được để trống',
      coecgpi: (value) => {
        if (!value || value.length === 0) return 'Không được để trống';
        if (value.every(pi => pi.isEnabled === false)) return 'Không được để trống';
        return null;
      },
    }
  });

  useEffect(() => {
    if (selectedPIs.length > 0) {
      const mappedPIs = selectedPIs.map(pi => ({
        id: 0,
        coepiId: pi.coepiId,
        isEnabled: true,
      }));

      form.setFieldValue("coecgpi", mappedPIs);
    } else {
      form.setFieldValue("coecgpi", []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPIs]);

  const piQuery = useQuery<Ipi[]>({
    queryKey: [`F_upgwbnmsn8_Tab1_Create_COEPI_GetAll`],
    queryFn: async () => {
      const response = await baseAxios.get("/COEPI/GetAll");
      return response.data.data;
    },
  });

  useEffect(() => {
    if (popoverOpened) {
      setTempSelectedPIs([...selectedPIs]);
    }
  }, [popoverOpened, selectedPIs]);

  const mapPICodesToObjects = (piCodes: string[]): Coecgpi[] => {
    if (!piQuery.data) return [];

    return piCodes.map(piCode => {
      const pi = piQuery.data.find(item => item.code === piCode);
      return {
        id: 0,
        coepiId: pi?.id,
        code: pi?.code,
        name: pi?.name
      } as Coecgpi;
    }).filter(item => item.coepiId !== undefined);
  };

  return (
    <Group>
      <MyButtonCreate
        objectName="Chi tiết CG"
        form={form}
        onSubmit={async (values) => {
          if (selectedPIs.length === 0) {
            form.setFieldError('coecgpi', 'Không được để trống');
            return Promise.reject(new Error('Vui lòng chọn ít nhất một PI'));
          }

          const updatedValues = {
            ...values,
            coecgpi: selectedPIs.map(pi => ({
              id: 0,
              coepiId: pi.coepiId,
              isEnabled: true,
            })),
            coeGradeSubjectId: coeGradeSubjectId,
          };

          return await baseAxios.post("/COECG/Create", updatedValues).then(() => {
            form.reset();
            setSelectedPIs([]);
            setTempSelectedPIs([]);
          });

        }}
      >
        <MyTextInput label="Mã CG" {...form.getInputProps("code")} />

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
                error={form.errors.coecgpi}
              />
            </Popover.Target>
            <Popover.Dropdown>
              <F_upgwbnmsn8_Tab1_Pi_Read
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

        < Textarea label="Mô tả" placeholder="Nhập mô tả" {...form.getInputProps("description")} />
      </MyButtonCreate>
    </Group >
  );
}
