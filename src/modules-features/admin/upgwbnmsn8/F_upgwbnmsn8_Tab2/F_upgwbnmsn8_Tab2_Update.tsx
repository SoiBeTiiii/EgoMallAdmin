'use client'

import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Group, MultiSelect, Popover, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import F_upgwbnmsn8_Tab2_Pi_Read, { Ipi } from "./F_upgwbnmsn8_Tab2_Pi_Read";
import { ICLO, ICoeclopi } from "./F_upgwbnmsn8_Tab2_Read";

export default function F_upgwbnmsn8_Tab2_Update({ data, totalCLO }: { data: ICLO, totalCLO: number }) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [selectedPIs, setSelectedPIs] = useState<ICoeclopi[]>([]);
  const [tempSelectedPIs, setTempSelectedPIs] = useState<ICoeclopi[]>([]);
  const [originalPIs, setOriginalPIs] = useState<ICoeclopi[]>([]);

  const form = useForm<ICLO>({
    initialValues: {
      ...data,
    },
    validate: {
      densityCLO: (value) => {
        if (!value) return 'Không được để trống';
        if (Number(value) > 100) return 'Không được lớn hơn 100%';

        const currentCLODensity = data.densityCLO || 0;
        const adjustedTotal = totalCLO - currentCLODensity;

        if (Number(value) + adjustedTotal > 100)
          return 'Tổng của tỷ trọng CLO không được lớn hơn 100%';

        return null;
      },
      coeclopi: (value) => {
        if (!value || value.length === 0) return 'Không được để trống';
        if (value.every(pi => pi.isEnabled === false)) return 'Không được để trống';
        return null;
      },
    }
  });

  const piQuery = useQuery<Ipi[]>({
    queryKey: [`F_upgwbnmsn8_Tab2_Update_COEPI_ByCOECGId=${data.coecgId}`],
    queryFn: async () => {
      const response = await baseAxios.get(`/COEPI/GetPIbyCG?COECGId=${data.coecgId}`);
      return response.data.data.result;
    },
  });

  useEffect(() => {
    if (data.coeclopi && piQuery.data) {
      const mappedPIs = data.coeclopi
        .filter(clopi => clopi.isEnabled !== false)
        .map(clopi => {
          const pi = piQuery.data.find(p => p.id === clopi.coepiId);
          return {
            id: clopi.id,
            coepiId: clopi.coepiId,
            code: pi?.code,
            name: pi?.name,
            isEnabled: true
          } as ICoeclopi;
        })
        .filter((pi): pi is ICoeclopi => !!pi.code);

      setSelectedPIs(mappedPIs);
      setOriginalPIs(JSON.parse(JSON.stringify(mappedPIs)));
    }
  }, [data.coeclopi, piQuery.data]);


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

      const finalCoeclopi = [...newPIs, ...unchangedPIs, ...removedPIs];

      form.setFieldValue("coeclopi", finalCoeclopi as ICoeclopi[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPIs, originalPIs]);

  useEffect(() => {
    if (popoverOpened) {
      setTempSelectedPIs([...selectedPIs]);
    }
  }, [popoverOpened, selectedPIs]);

  const mapPICodesToObjects = (piCodes: string[]): ICoeclopi[] => {
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
        } as ICoeclopi;
      }
    }).filter(item => item.coepiId !== undefined);
  };

  return (
    <Group>
      <MyActionIconUpdate
        form={form}
        onSubmit={async (values) => {
          if (selectedPIs.length === 0) {
            form.setFieldError('coeclopi', 'Không được để trống');
            return Promise.reject(new Error('Vui lòng chọn ít nhất một PI'));
          }

          return await baseAxios.post(`/COECLO/Update`, {
            ...values
          });
        }}
      >
        <MySelect
          label="Mã CG"
          data={[{
            value: data.coecg?.id?.toString() || "",
            label: data.coecg?.code || ""
          }]}
          defaultValue={data.coecgId?.toString()}
          disabled
        />
        <MyTextInput label="Mã CLO" {...form.getInputProps("code")} disabled />
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
                coecgId={data.coecgId}
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
        <MyNumberInput label="Tỷ trọng CLO (%)" {...form.getInputProps("densityCLO")} min={1} max={100} />
      </MyActionIconUpdate>
    </Group>
  );
}