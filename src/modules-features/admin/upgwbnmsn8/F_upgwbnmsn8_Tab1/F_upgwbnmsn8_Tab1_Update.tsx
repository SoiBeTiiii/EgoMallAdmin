'use client'

import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Group, MultiSelect, Popover, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import F_upgwbnmsn8_Tab1_Pi_Read, { Ipi } from "./F_upgwbnmsn8_Tab1_Pi_Read";
import { ICG, ICoecgpi } from "./F_upgwbnmsn8_Tab1_Read";

export default function F_upgwbnmsn8_Tab1_Update({ data }: { data: ICG }) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [selectedPIs, setSelectedPIs] = useState<ICoecgpi[]>([]);
  const [tempSelectedPIs, setTempSelectedPIs] = useState<ICoecgpi[]>([]);
  const [originalPIs, setOriginalPIs] = useState<ICoecgpi[]>([]);

  const form = useForm<ICG>({
    initialValues: {
      ...data,
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

  const piQuery = useQuery<Ipi[]>({
    queryKey: [`COEPI_Update_${data.id}`],
    queryFn: async () => {
      const response = await baseAxios.get("/COEPI/GetAll");
      return response.data.data;
    },
  });

  useEffect(() => {
    if (data.coecgpi && piQuery.data) {
      const mappedPIs = data.coecgpi
        .filter(cgpi => cgpi.isEnabled !== false)
        .map(cgpi => {
          const pi = piQuery.data.find(p => p.id === cgpi.coepiId);
          return {
            id: cgpi.id,
            coepiId: cgpi.coepiId,
            code: pi?.code,
            name: pi?.name,
            isEnabled: true
          } as ICoecgpi;
        })
        .filter((pi): pi is ICoecgpi => !!pi.code);

      setSelectedPIs(mappedPIs);
      setOriginalPIs(JSON.parse(JSON.stringify(mappedPIs)));
    }
  }, [data.coecgpi, piQuery.data]);

  useEffect(() => {
    if (originalPIs.length > 0) {
      const removedPIs = originalPIs.filter(origPI =>
        !selectedPIs.some(selPI => selPI.coepiId === origPI.coepiId)
      ).map(pi => ({
        id: pi.id,
        coepiId: pi.coepiId,
        isEnabled: false
      }));

      const newPIs = selectedPIs.filter(selPI =>
        !originalPIs.some(origPI => origPI.coepiId === selPI.coepiId)
      ).map(pi => ({
        id: 0,
        coepiId: pi.coepiId,
        isEnabled: true
      }));

      const unchangedPIs = originalPIs.filter(origPI =>
        selectedPIs.some(selPI => selPI.coepiId === origPI.coepiId)
      ).map(pi => ({
        id: pi.id,
        coepiId: pi.coepiId,
        isEnabled: true
      }));

      const finalCoecgpi = [...newPIs, ...unchangedPIs, ...removedPIs];

      form.setFieldValue("coecgpi", finalCoecgpi as ICoecgpi[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPIs, originalPIs]);

  useEffect(() => {
    if (popoverOpened) {
      setTempSelectedPIs([...selectedPIs]);
    }
  }, [popoverOpened, selectedPIs]);

  const mapPICodesToObjects = (piCodes: string[]): ICoecgpi[] => {
    if (!piQuery.data) return [];

    return piCodes.map(piCode => {
      const pi = piQuery.data.find(item => item.code === piCode);
      const existingPI = originalPIs.find(origPI => origPI.coepiId === pi?.id);

      if (existingPI) {
        return existingPI;
      } else {
        return {
          id: 0,
          coepiId: pi?.id,
          code: pi?.code,
          name: pi?.name,
          isEnabled: true
        } as ICoecgpi;
      }
    }).filter(item => item.coepiId !== undefined);
  };

  return (
    <Group>
      <MyActionIconUpdate
        form={form}
        onSubmit={async (values) => {
          if (selectedPIs.length === 0) {
            form.setFieldError('coecgpi', 'Không được để trống');
            return Promise.reject(new Error('Vui lòng chọn ít nhất một PI'));
          }

          return await baseAxios.post(`/COECG/Update`, {
            ...values
          });
        }}
      >
        <MyTextInput label="Mã CG" disabled {...form.getInputProps("code")} />

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

        <Textarea label="Mô tả" {...form.getInputProps("description")} />
      </MyActionIconUpdate>
    </Group>
  );
}
