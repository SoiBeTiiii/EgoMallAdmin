"use client"
import { MyActionIconModal } from '@/components/ActionIcons/ActionIconModal/MyActionIconModal';
import { MyButton } from '@/components/Buttons/Button/MyButton';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import useM_COEClassStudent_Update from '@/hooks/mutation-hooks/COEClassStudent/useM_COEClassStudent_Update';
import { utils_notification_show } from '@/utils/notification';
import { Group, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';



export default function F_4ltk4f68a8_Student_Update({ data }: { data: ICOEClassStudent }) {
  const [fileData, setFileData] = useState<any[]>([]);
  const studentMutation = useM_COEClassStudent_Update()
  const disc = useDisclosure()

  const form = useForm<any>({ //chua
    initialValues: {
      coeCourseSection: {
        code: data.coeCourseSection?.code
      },
      code: data.code,
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : new Date(),
      gender: data.gender
    },
    validate: {
      code: (value) => value ? null : 'Không được để trống',
      fullName: (value) => value ? null : 'Không được để trống',
    }
  });

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  useEffect(() => {
    form_multiple.setValues({ importedData: fileData });
  }, [fileData]);

  return (
    <Group>
      <MyActionIconModal
        crudType='update'
        title='Chi tiết sinh viên' disclosure={disc}>

        <form onSubmit={form.onSubmit(value => {
          const body = {
            id: data.id,
            code: value.code,
            name: value.fullName,
            email: '',
            PhoneNumber: '',
            isEnabled: true,
            gender: value.gender,
            fullName: value.fullName,
            dateOfBirth: value.dateOfBirth,
            coeClassId: data.coeCourseSection?.id,
            concurrencyStamp: data.concurrencyStamp
          }
          studentMutation.mutate(body, {
            onSuccess: () => {
              utils_notification_show({ crudType: 'update', })
              disc[1].close()
            }
          })
        })}>
          <MyTextInput disabled label="Mã lớp" {...form.getInputProps("coeCourseSection.code")} />
          <MyTextInput label="Mã sinh viên" {...form.getInputProps("code")} />
          <MyTextInput label="Họ tên" {...form.getInputProps("fullName")} />
          <DateInput label="Ngày sinh" {...form.getInputProps("dateOfBirth")} />
          <Select
            label="Giới tính"
            data={[
              { value: "1", label: "Nam" },
              { value: "2", label: "Nữ" },
            ]}
            defaultValue={1?.toString()}
            onChange={(value) => form.setFieldValue("gender", parseInt(value?.toString()!))}
          />
          <Group grow mt={5}>

            <MyButton crudType="update" type="submit" />
          </Group>
        </form>
      </MyActionIconModal>
    </Group>
  );
}
