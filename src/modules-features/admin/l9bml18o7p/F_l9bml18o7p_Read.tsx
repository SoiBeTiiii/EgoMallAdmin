"use client";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import useQ_COECourseSection_GetCOECourseSectionForCreatePoint from "@/hooks/query-hooks/COECourseSection/useQ_COECourseSection_GetCOECourseSectionForCreatePoint";
import F_Shared_FilterGrade from "@/modules-features/shared/F_Shared_FilterGrade/F_Shared_FilterGrade";
import useS_Shared_FilterGrade from "@/modules-features/shared/F_Shared_FilterGrade/useS_Shared_FilterGrade";
import { Button, Checkbox, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_l9bml18o7p_Student_Read_Update from "./F_l9bml18o7p_Student_Read_Update";


enum formulaType {
  "Chuyên cần" = 1,
  "Quá trình" = 2,
  "Cuối kỳ" = 3
}
export default function F_l9bml18o7p_Read() {
  const COEGradeIDParam = "COEGradeId=";
  const formulaTypeParam = "formulaType=";
  const formulaDefaultId = 1
  const [importData, setImportData] = useState(false);
  const store = useS_Shared_FilterGrade();
  // const formulaQuery = useQ_COESubjectFormula_GetAll();
  const [formulaValue, setFormulaValue] = useState<string | number | undefined>(formulaDefaultId);

  const subjectByGradeQuery =
    useQ_COECourseSection_GetCOECourseSectionForCreatePoint({
      params: `?${COEGradeIDParam + store.state.grade?.id}&${formulaTypeParam + formulaValue}`,
      // params: `?${COEGradeIDParam + 15}&${1}`,
    });
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });
  // const form = useForm<ICoeSubject>({
  //   initialValues,
  // });
  const [khoa, setKhoa] = useState("KT241");
  const courseSectionQuery = useQuery<ICOECourseSection[]>({
    queryKey: ["F_Subject_Read"],
    queryFn: async () => data,
  });

  const columns = useMemo<MRT_ColumnDef<ICOECourseSection>[]>(
    () => [
      {
        header: "Năm học - Học kỳ",
        accessorKey: "semesterName",
        accessorFn(row) {
          if (!row.semesterName) return "No data";
          return row.semesterName;
          // return utils_date_dateToDDMMYYYString(row.coeSemester.name);
        },
      },
      { header: "Thứ tự", accessorKey: "order" },
      { header: "Mã môn học", accessorKey: "subjectCode" },
      { header: "Tên môn học", accessorKey: "subjectName" },
      { header: "Nhóm học", accessorKey: "courseSectionName" },
      { header: "Số tín chỉ", accessorKey: "numberCredit" },
      { header: "Số tiết", accessorKey: "numberPeriod" },
      { header: "Nội dung đánh giá", accessorKey: "subjectAssessmentName" },
      { header: "Phương pháp", accessorKey: "subjectAssessmentQuestiontype" },
      { header: "Số lượng sinh viên", accessorKey: "totalStudent" },
      { header: "Số sinh viên đăng ký", accessorKey: "numberOfStudent" },
      { header: "Số lượng điểm", accessorKey: "pointQuantity" },
      { header: "Số điểm đã nhập", accessorKey: "pointQuantityActual" },
      {
        header: "Đã tổng kết",
        accessorKey: "tongKet",
        accessorFn(row) {
          return <Checkbox checked={false} readOnly />;
        },
      },
      {
        header: "Nhập điểm",
        accessorKey: "enterScore",
        accessorFn(row) {
          return <F_l9bml18o7p_Student_Read_Update />;
        },
      },
      // {
      //   header: "Người cập nhật",
      //   accessorKey: "nguoiCapNhat",
      // },
      // {
      //   header: "Ngày cập nhật",
      //   accessorKey: "ngayCapNhat",
      //   accessorFn(originalRow) {
      //     return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
      //   },
      // },
    ],
    [formulaValue, store.state.grade?.id],
  );

  const exportConfig = {
    fields: [
      { fieldName: "id", header: "STT" },
      { fieldName: "year", header: "Năm học Học kỳ" },
      { fieldName: "order", header: "Thứ tự" },
      { fieldName: "subjectCode", header: "Mã môn học" },
      { fieldName: "subjectName", header: "Tên môn học" },
      { fieldName: "credit", header: "Số tín chỉ" },
      { fieldName: "numberOfSections", header: "Số tiết" },
      { fieldName: "content", header: "Nội dung đánh giá" },
      { fieldName: "method", header: "Phương pháp" },
      { fieldName: "quantity", header: "Số lượng sinh viên" },
      { fieldName: "numberOfStudent", header: "Số sinh viên đăng ký" },
      { fieldName: "quantityOfPoint", header: "Số lượng điểm" },
      { fieldName: "pointsEntered", header: "Số điểm đã nhập" },
      { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
      { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
    ],
  };

  if (courseSectionQuery.isLoading) return "Đang tải dữ liệu...";
  if (courseSectionQuery.isError) return "Không có dữ liệu...";

  return (
    <MyFlexColumn>
      <MyFlexRow>
        <F_Shared_FilterGrade />
        <MySelect
          data={
            [
              { value: "1", label: "Chuyên cần" },
              { value: "2", label: "Quá trình" },
              { value: "3", label: "Cuối kỳ" },
            ]}
          label="Hình thức đánh giá"
          defaultValue={formulaValue?.toString()}
          onChange={(value: any) => {
            setFormulaValue(value);
          }}
        />

      </MyFlexRow>
      <Fieldset
        legend={`Danh sách Môn học thuộc chương trình đào tạo - Khóa học ${store.state.grade?.code}`}
      >
        <MyDataTable
          enableRowSelection={true}
          enableRowNumbers={true}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <>
                <Group>
                  <AQButtonCreateByImportFile
                    setImportedData={setImportData}
                    form={form_multiple}
                    onSubmit={() => {
                      console.log(form_multiple.values);
                    }}
                  />
                  <AQButtonExportData
                    isAllData={true}
                    objectName="dsMonHoc"
                    data={courseSectionQuery.data!}
                    exportConfig={exportConfig}
                  />
                  {/* <Button leftSection={<IconTrash />} color="red">
                                    Xóa
                                    </Button> */}
                  <Button color="green">Tổng kết điểm</Button>
                </Group>
              </>
            );
          }}
          columns={columns}
          data={subjectByGradeQuery.data || []}
        />
      </Fieldset>
    </MyFlexColumn>
  );
}

const data: ICoeSubject[] = [
  {
    id: 1,
    year: new Date(),
    order: 6,
    code: "KTTC001",
    name: "Kế toán vi mô",
    numberCredit: 2,
    coeCourseSection: undefined,
    numberPeriod: 30,
    content: "Bài thi cuối kỳ",
    method: "Trắc nghiệm",
    quantity: 25,
    numberOfStudent: 15,
    quantityOfPoint: 30,
    pointsEntered: 30,
    // nguoiCapNhat: "Admin",
    // ngayCapNhat: new Date("2024-12-20"),
  },
  {
    id: 2,
    year: new Date(),
    order: 6,
    code: "KTTC001",
    name: "Kế toán vi mô",
    numberCredit: 2,
    coeCourseSection: undefined,
    numberPeriod: 30,
    content: "Bài thi cuối kỳ",
    method: "Trắc nghiệm",
    quantity: 25,
    numberOfStudent: 15,
    quantityOfPoint: 30,
    pointsEntered: 30,
    // nguoiCapNhat: "Admin",
    // ngayCapNhat: new Date("2024-12-20"),
  },
  {
    id: 3,
    year: new Date(),
    order: 6,
    code: "KTTC001",
    name: "Kế toán vi mô",
    numberCredit: 2,
    coeCourseSection: undefined,
    numberPeriod: 30,
    content: "Bài thi cuối kỳ",
    method: "Trắc nghiệm",
    quantity: 25,
    numberOfStudent: 15,
    quantityOfPoint: 30,
    pointsEntered: 30,
    // nguoiCapNhat: "Admin",
    // ngayCapNhat: new Date("2024-12-20"),
  },
  {
    id: 4,
    year: new Date(),
    order: 6,
    code: "KTTC001",
    name: "Kế toán vi mô",
    numberCredit: 2,
    coeCourseSection: undefined,
    numberPeriod: 30,
    content: "Bài thi cuối kỳ",
    method: "Trắc nghiệm",
    quantity: 25,
    numberOfStudent: 15,
    quantityOfPoint: 30,
    pointsEntered: 30,
    // nguoiCapNhat: "Admin",
    // ngayCapNhat: new Date("2024-12-20"),
  },
  {
    id: 5,
    year: undefined,
    order: 6,
    code: "KTTC001",
    name: "Kế toán vi mô",
    numberCredit: 2,
    coeCourseSection: undefined,
    numberPeriod: 30,
    content: "Bài thi cuối kỳ",
    method: "Trắc nghiệm",
    quantity: 25,
    numberOfStudent: 15,
    quantityOfPoint: 30,
    pointsEntered: 30,
    // nguoiCapNhat: "Admin",
    // ngayCapNhat: new Date("2024-12-20"),
  },
];
const programData: ICoeProgram[] = [
  {
    id: 1,
    name: "Kế toán",
    code: "KT",
  },
  {
    id: 2,
    name: "Kiểm toán",
    code: "KT",
  },
  {
    id: 3,
    name: "Xây dựng",
    code: "XD",
  },
];
const courseSectionData: ICOECourseSection[] = [
  {
    id: 1,
    name: "Kế toán",
    code: "KT241",
  },
  {
    id: 2,
    name: "Kiểm toán",
    code: "KT253",
  },
  {
    id: 3,
    name: "Xây dựng",
    code: "XD0256",
  },
];
const methodData: ICoeSubjectMethod[] = [
  {
    id: 1,
    name: "Cuối kì",
    code: "CK",
  },
  {
    id: 2,
    name: "Giữa kì",
    code: "GK",
  },
  {
    id: 3,
    name: "Chuyên cần",
    code: "CC",
  },
];
