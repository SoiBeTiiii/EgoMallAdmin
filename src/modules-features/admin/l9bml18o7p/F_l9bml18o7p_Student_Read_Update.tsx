'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_l9bml18o7p_Delete from "./F_l9bml18o7p_Delete";

export interface IStudent {
  id?: number; // STT
  subjectCode?: string; // Mã môn học
  subjectName?: string; // Tên môn học
  studentCode?: string; // Mã sinh viên
  name?: string; // Họ tên
  dateOfBirth?: Date | undefined; // Ngày sinh
  gender?: string; // Giới tính
  classCode?: string; // Mã lớp
  courseCode?: string; // Mã khóa
  q1?:number;
  q2?:number;
  q3?:number;
  q4?:number;
  q5?:number;
  nguoiCapNhat?: string;
  ngayCapNhat?: Date | undefined;
}

export default function F_l9bml18o7p_Student_Read_Update() {
  const [importData, setImportData] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
const [errorMessage, setErrorMessage] = useState<string>("");
  const dis = useDisclosure()
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const form = useForm<IStudent>({
    initialValues: {},
  });

  // Query to fetch mock student data
  const query = useQuery<IStudent[]>({
    queryKey: ["F_4ltk4f68a8_Student_Read"],
    queryFn: async () => studentData,
  });

  const columns = useMemo<MRT_ColumnDef<IStudent>[]>(() => [
    { header: "Mã môn học", accessorKey: "subjectCode" },
    { header: "Tên môn học", accessorKey: "subjectName" },
    { header: "Mã sinh viên", accessorKey: "studentCode" },
    { header: "Họ tên", accessorKey: "name" },
    { header: "Ngày sinh", accessorKey: "dateOfBirth",
    accessorFn: (originalRow) =>  
    {
    return U0DateToDDMMYYYString(new Date(originalRow.dateOfBirth!)); }
    },
    { header: "Giới tính", accessorKey: "gender" },
    { header: "Mã lớp", accessorKey: "classCode" },
    { header: "Mã khóa", accessorKey: "courseCode" },
    { header: "Câu hỏi 1 - CLO1", accessorKey: "q1" ,
    accessorFn: (row) =>
    <TextInput
        variant="unstyled"
        onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
        onBlur={(event) => event.currentTarget.style.border = 'none'}
        defaultValue={row.q1}
    /> },
    { header: "Câu hỏi 2 - CLO2", accessorKey: "q2",
    accessorFn: (row) =>
    <TextInput
        variant="unstyled"
        onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
        onBlur={(event) => event.currentTarget.style.border = 'none'}
        defaultValue={row.q2}
    /> 
    },
    { header: "Câu hỏi 3 - CLO2", accessorKey: "q3",
    accessorFn: (row) =>
    <TextInput
        variant="unstyled"
        onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
        onBlur={(event) => event.currentTarget.style.border = 'none'}
        defaultValue={row.q3}
    /> 
    },
    { header: "Câu hỏi 4", accessorKey: "q4",
    accessorFn: (row) =>
    <TextInput
        variant="unstyled"
        onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
        onBlur={(event) => event.currentTarget.style.border = 'none'}
        defaultValue={row.q4}
    /> 
    },
    { header: "Câu hỏi 5 - CLO3", accessorKey: "q5",
    accessorFn: (row) =>
    <TextInput
        variant="unstyled"
        onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
        onBlur={(event) => event.currentTarget.style.border = 'none'}
        defaultValue={row.q5}
    /> 
    },
    {
      header: "Người cập nhật",
      accessorKey: "nguoiCapNhat",
  },
  {
    header: "Ngày cập nhật",
    accessorKey: "ngayCapNhat",
    accessorFn: (originalRow) =>  {
    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
    }
  },
  ], []);

  const exportConfig = {
    fields: [
      { fieldName: "id", header: "STT" },
      { fieldName: "subjectCode", header: "Mã môn học" },
      { fieldName: "subjectName", header: "Tên môn học" },
      { fieldName: "studentCode", header: "Mã sinh viên" },
      { fieldName: "name", header: "Họ tên" },
      { fieldName: "dateOfBirth", header: "Ngày sinh" },
      { fieldName: "gender", header: "Giới tính" },
      { fieldName: "classCode", header: "Mã lớp" },
      { fieldName: "courseCode", header: "Mã khóa" },
      { fieldName: "q1", header: "Câu hỏi 1 - CLO1" },
      { fieldName: "q2", header: "Câu hỏi 2 - CLO2" },
      { fieldName: "q3", header: "Câu hỏi 3 - CLO2" },
      { fieldName: "q4", header: "Câu hỏi 4" },
      { fieldName: "q5", header: "Câu hỏi 5 - CLO3" },
      { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
      { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
    ],
  };

  // Hàm kiểm tra điểm
const checkScores = (data: IStudent[]) => {
  let error = false;
  let message = "";

  // Duyệt qua dữ liệu và kiểm tra điểm
  data.forEach(student => {
    if (student.q1 && student.q1 > 2) {
      error = true;
      message = `Điểm của sinh viên  ${student.studentCode} Điểm Câu hỏi 1-CLO1 vượt điểm tối đa. Vui lòng kiểm tra lại`;
    }
    // if (student.q2 && student.q2 > 2) {
    //   error = true;
    //   message = `Câu hỏi 2 - CLO2 của sinh viên ${student.studentCode} có điểm lớn hơn 2`;
    // }
    // if (student.q3 && student.q3 > 2) {
    //   error = true;
    //   message = `Câu hỏi 3 - CLO2 của sinh viên ${student.studentCode} có điểm lớn hơn 2`;
    // }
    // if (student.q4 && student.q4 > 2) {
    //   error = true;
    //   message = `Câu hỏi 4 của sinh viên ${student.subjectCode} có điểm lớn hơn 2`;
    // }
    // if (student.q5 && student.q5 > 2) {
    //   error = true;
    //   message = `Câu hỏi 5 - CLO3 của sinh viên ${student.name} có điểm lớn hơn 2`;
    // }
  });

  if (error) {
    setErrorMessage(message);
    setOpenErrorModal(true); // Hiển thị modal khi có lỗi
  }
  return !error; // Nếu có lỗi, trả về false
};

// Sử dụng hàm checkScores khi ấn nút "Lưu"
const handleSave = () => {
  const isValid = checkScores(query.data || []);
  if (isValid) {
    // Xử lý lưu dữ liệu tại đây nếu tất cả điểm hợp lệ
    console.log("Dữ liệu đã được lưu");
  }
};
  if (query.isLoading) return "Loading...";

  return (
    <MyButtonModal label="Xem/Cập nhập" title="Danh sách sinh viên đăng ký môn học" modalSize={'80%'} disclosure={dis}>
    <MyFlexColumn>
      <MyDataTable
        enableRowSelection={true}
        enableRowNumbers={true}
        renderTopToolbarCustomActions={({ table }) => (
          <Group>
            <MyButton crudType="save" onClick={handleSave}/>
            <AQButtonExportData
              isAllData={true}
              objectName="dsStudent"
              data={query.data!}
              exportConfig={exportConfig}
            />
            <F_l9bml18o7p_Delete/>
          </Group>
        )}
        columns={columns}
        data={query.data || []}
      />
    </MyFlexColumn>

    {/* Modal thông báo lỗi */}
    <Modal
  opened={openErrorModal}
  onClose={() => setOpenErrorModal(false)}
  title="Thông báo lỗi"
>
  <Text>{errorMessage}</Text>
  <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
    <Button onClick={() => setOpenErrorModal(false)} color="gray">
      Đồng ý
    </Button>
  </div>
</Modal>

  </MyButtonModal>
  );
}

const studentData: IStudent[] = [
  {
    id: 1,
    subjectCode: "KT005",
    subjectName: "Kế toán ngân hàng",
    studentCode: "SV00001",
    name: "Tô Ngọc Lan",
    dateOfBirth: new Date("2000-01-01"),
    gender: "Nam",
    classCode: "KT2401",
    courseCode: "KT24",
    q1:2.5,
    q2:1,
    q3:3,
    q4:1,
    q5:1.5,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
  },
  {
    id: 1,
    subjectCode: "KT005",
    subjectName: "Kế toán ngân hàng",
    studentCode: "SV00002",
    name: "Tô Ngọc La",
    dateOfBirth: new Date("2020-01-01"),
    gender: "Nam",
    classCode: "KT2401",
    courseCode: "KT24",
    q1:2.5,
    q2:1,
    q3:3,
    q4:1,
    q5:1.5,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
  },
  {
    id: 3,
    subjectCode: "KT005",
    subjectName: "Kế toán ngân hàng",
    studentCode: "SV00003",
    name: "Tô Ngọc Li",
    dateOfBirth: new Date("2020-01-01"),
    gender: "Nam",
    classCode: "KT2401",
    courseCode: "KT24",
    q1:2.5,
    q2:1,
    q3:3,
    q4:1,
    q5:1.5,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
  },
  {
    id: 4,
    subjectCode: "KT005",
    subjectName: "Kế toán ngân hàng",
    studentCode: "SV00004",
    name: "Tô Ngọc Linh",
    dateOfBirth: new Date("2020-01-01"),
    gender: "Nam",
    classCode: "KT2401",
    courseCode: "KT24",
    q1:2.5,
    q2:1,
    q3:3,
    q4:1,
    q5:1.5,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
  },
  {
    id: 5,
    subjectCode: "KT005",
    subjectName: "Kế toán ngân hàng",
    studentCode: "SV00005",
    name: "Tô Ngọc Ly",
    dateOfBirth: new Date("2020-01-01"),
    gender: "Nam",
    classCode: "KT2401",
    courseCode: "KT24",
    q1:2.5,
    q2:1,
    q3:3,
    q4:1,
    q5:1.5,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
  },
  {
    id: 6,
    subjectCode: "KT005",
    subjectName: "Kế toán ngân hàng",
    studentCode: "SV00006",
    name: "Tô Ngọc Lyn",
    dateOfBirth: new Date("2020-01-01"),
    gender: "Nam",
    classCode: "KT2401",
    courseCode: "KT24",
    q1:2.5,
    q2:1,
    q3:3,
    q4:1,
    q5:1.5,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
  },
  {
    id: 7,
    subjectCode: "KT005",
    subjectName: "Kế toán ngân hàng",
    studentCode: "SV00007",
    name: "Tô Ngọc Lynh",
    dateOfBirth: new Date("2020-01-01"),
    gender: "Nam",
    classCode: "KT2401",
    courseCode: "KT24",
    q1:2.5,
    q2:1,
    q3:3,
    q4:1,
    q5:1.5,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
  },
  {
    id: 8,
    subjectCode: "KT005",
    subjectName: "Kế toán ngân hàng",
    studentCode: "SV00008",
    name: "Tô Ngọc Y",
    dateOfBirth: new Date("2020-01-01"),
    gender: "Nam",
    classCode: "KT2401",
    courseCode: "KT24",
    q1:2.5,
    q2:1,
    q3:3,
    q4:1,
    q5:1.5,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
  },
  {
    id: 9,
    subjectCode: "KT005",
    subjectName: "Kế toán ngân hàng",
    studentCode: "SV00009",
    name: "Tô Ngọc A",
    dateOfBirth: new Date("2020-01-01"),
    gender: "Nam",
    classCode: "KT2401",
    courseCode: "KT24",
    q1:2.5,
    q2:1,
    q3:3,
    q4:1,
    q5:1.5,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
  },
  {
    id: 10,
    subjectCode: "KT005",
    subjectName: "Kế toán ngân hàng",
    studentCode: "SV000010",
    name: "Tô Ngọc U",
    dateOfBirth: new Date("2020-01-01"),
    gender: "Nam",
    classCode: "KT2401",
    courseCode: "KT24",
    q1:2.5,
    q2:1,
    q3:1,
    q4:1,
    q5:1.5,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
  },
];
