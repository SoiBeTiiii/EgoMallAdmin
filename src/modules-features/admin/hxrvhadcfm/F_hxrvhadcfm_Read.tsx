'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import useQ_COEGrade_GetDetail from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetDetail"
import useQ_COEPLO_GetCOEPLOByGrade from "@/hooks/query-hooks/COEPLO/useQ_COEPLO_GetCOEPLOByGrade"
import useS_Shared_FilterGrade from "@/modules-features/shared/F_Shared_FilterGrade/useS_Shared_FilterGrade"
import { Fieldset, Group, NumberInput, ScrollArea, Space, Table, Text } from "@mantine/core"
import React, { useEffect } from "react"
import F_hxrvhadcfm_UpdateRating from "./F_hxrvhadcfm_UpdateRating"
import useS_hxrvhadcfm from "./useS_hxrvhadcfm"

export default function F_hxrvhadcfm_Read() {
    const filterGradeStore = useS_Shared_FilterGrade()
    const store = useS_hxrvhadcfm()
    const ploByGrade = useQ_COEPLO_GetCOEPLOByGrade({
        params: `?coeGradeId=${filterGradeStore.state.grade?.id}&cols=COEPIs`
    })
    const subjectByGrade = useQ_COEGrade_GetDetail({
        params: `?gradeId=${filterGradeStore.state.grade?.id}`
    })
    useEffect(() => {
        store.setProperty("edited", {})
    }, [])
    if (subjectByGrade.isLoading) return "Đang tải dữ liệu..."
    if (subjectByGrade.isError) return "Có lỗi xảy ra"
    if (ploByGrade.isLoading) return "Đang tải dữ liệu..."
    if (ploByGrade.isError) return "Có lỗi xảy ra"
    if (filterGradeStore.state.noData) return (
        "Không có dữ liệu khóa"
    )

    return (
        <Fieldset legend={`Ma trận tỷ trọng CLO và PI thuộc chương trình đào tạo - Khóa học ${filterGradeStore.state.grade?.code}`}>
            <Group>
                <F_hxrvhadcfm_UpdateRating />
                <MyButton crudType="export" />
            </Group>
            <Space />
            <ScrollArea.Autosize>
                <Table highlightOnHover={false} striped>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th colSpan={7} rowSpan={2}></Table.Th>
                            {ploByGrade.data!.map((item, idx) => (
                                <Table.Th ta={'center'} bg={'cyan'} key={idx} colSpan={item.coepIs?.length}>{item.code}</Table.Th>
                            ))}
                        </Table.Tr>
                        <Table.Tr >
                            {ploByGrade.data?.flatMap(item => item.coepIs).map((item, idx) => (
                                <Table.Th bg={'blue'} key={idx}>{item?.densityPI}</Table.Th>
                            ))}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>STT</Table.Th>
                            <Table.Th miw={200}>Năm học kỳ</Table.Th>
                            <Table.Th>Thứ tự</Table.Th>
                            <Table.Th>Mã môn học</Table.Th>
                            <Table.Th>Tên môn học</Table.Th>
                            <Table.Th>Mã CLO</Table.Th>
                            <Table.Th>Tỷ trọng</Table.Th>


                            {ploByGrade.data?.flatMap(item => item.coepIs).map((item, idx) => (
                                <Table.Th bg={'green'} key={idx}>{item?.code}</Table.Th>
                            ))}
                        </Table.Tr>

                    </Table.Thead>


                    <Table.Tbody>
                        {subjectByGrade.data?.map((item, idx) => (
                            <React.Fragment key={idx}>
                                <Table.Tr>
                                    <Table.Td >
                                        {idx + 1}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.coeSemester?.name}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.order}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.coeSubject?.code}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.coeSubject?.name}
                                    </Table.Td>
                                    <Table.Td>
                                        {/* Mã CLO */}
                                        <MyFlexColumn w={70} gap={20} justify={'space-around'}>
                                            {item.coecGs!.length > 0 &&
                                                item?.coecGs!.flatMap(item => item.coeclOs).map((item, idx) => (
                                                    <Text key={idx}>{item?.code}</Text>
                                                ))
                                            }
                                        </MyFlexColumn>
                                    </Table.Td>
                                    <Table.Td>
                                        {/* Tỷ trọng */}
                                        <MyFlexColumn gap={20} justify={'space-around'}>
                                            {item.coecGs!.length > 0 &&
                                                item?.coecGs!.flatMap(item => item.coeclOs).map((item, idx) => (
                                                    <Text key={idx}>{item?.densityCLO}</Text>
                                                ))
                                            }
                                        </MyFlexColumn>
                                    </Table.Td>


                                    {/* Sửa lại code phần này để map đúng ma trận */}
                                    {ploByGrade.data?.flatMap(plo => plo.coepIs).map((pi, piIdx) => (
                                        <Table.Td key={piIdx} miw={75} w={100}>
                                            <MyFlexColumn gap={10} justify={'space-around'}>
                                                {item.coecGs!.length > 0 &&
                                                    item.coecGs!.flatMap(cg => cg.coeclOs).map((clo, cloIdx) => {
                                                        // Find the relationship between this CLO and this PI
                                                        const relation = clo?.coeclopi?.find(cp => cp.coepiId === pi?.id);
                                                        if (relation?.rating == null) return (
                                                            <NumberInput disabled hideControls key={cloIdx} />
                                                        )
                                                        return (
                                                            <NumberInput max={100} hideControls key={cloIdx} defaultValue={relation?.rating} onChange={e => {
                                                                store.setProperty("edited", ({ ...store.state.edited, [relation.id!]: { ...relation, rating: e } }))
                                                            }} />
                                                        );
                                                    })
                                                }
                                            </MyFlexColumn>
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            </React.Fragment>
                        ))}

                    </Table.Tbody>
                </Table>
            </ScrollArea.Autosize>
        </Fieldset>
    )
}



// "use client";
// import AQButtonExportData from '@/components/Buttons/ButtonCRUD/AQButtonExportData';
// import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
// import { Button, Checkbox, Fieldset, Group, Modal, NumberInput, Paper, ScrollArea, Select, Table } from '@mantine/core';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import React, { useEffect, useState } from 'react';
// //hxrvhadcfm

// interface ImainData {
//     id: number;
//     namHocHocKy?: string;
//     thuTu?: number;
//     subjectId?: number;
//     maMonHoc?: string;
//     tenMonHoc?: string;
//     value: Iitems[];
// }

// interface Iitems {
//     cloCode: string;
//     tytrong: number;
//     Pi11: number;
//     Pi12: number;
//     Pi13: number;
//     Pi21: number;
//     Pi22: number;
//     Pi31: number;
//     Pi32: number;
//     Pi33: number;
//     Pi41: number;
// }

// export default function F_hxrvhadcfm_Read() {
//     const [errorColumns, setErrorColumns] = useState<Record<string, boolean>>({});
//     const [modalOpen, setModalOpen] = useState<boolean>(false);
//     const [errorMessage, setErrorMessage] = useState<string>("")
//     const [checkedAll, setCheckedAll] = useState(false);
//     const [successOpen, setSuccessOpen] = useState<boolean>(false);
//     const [dataValid, setDataValid] = useState<boolean>(false);
//     let [isValid, setIsValid] = useState<boolean>(false);
//     const [isChecking, setIsChecking] = useState(false);

//     // Helper function to determine if we should render a cell
//     const { data: queryData, refetch, isLoading, isError } = useQuery<ImainData[]>({
//         queryKey: [`F_hxrvhadcfm_Read`],
//         queryFn: async () => {

//             return sampleData
//         },
//     })
//     const queryClient = useQueryClient();
//     const [khoa, setKhoa] = useState("KT241");
//     const handleSave = () => {
//         console.log("🔵 Handle Save Clicked!");
//         setIsChecking(true);


//     }

//     useEffect(() => {
//         if (isValid) {
//             if (!Object.values(errorColumns).includes(true)) {
//                 queryClient.setQueryData([`F_hxrvhadcfm_Read`], modifiedData);

//                 setSuccessOpen(true);

//                 setModalOpen(false);
//                 setDataValid(false);
//             } else if (!modalOpen) {
//                 setDataValid(true);
//                 setSuccessOpen(false);
//                 setModalOpen(false);
//             } else {
//                 setDataValid(false);
//                 setSuccessOpen(false);
//             }
//         }
//     }, [isValid])
//     useEffect(() => {
//         console.log("Error Messages: ", errorMessage)
//     }, [errorMessage])
//     useEffect(() => {
//         console.log("Error Columns: ", errorColumns)
//     }, [errorColumns])

//     // state lưu trữ thay đổi của bảng
//     const [modifiedData, setModifiedData] = useState(queryData || sampleData);


//     useEffect(() => {
//         if (isChecking) {
//             console.log("🟢 Checking Data with modifiedData:", modifiedData);
//             checkColumns();
//             setIsChecking(false); // Tắt kiểm tra sau khi kiểm tra xong
//         }
//     }, [modifiedData, isChecking]);

//     const handleChange = (rowIndex: number, subRowIndex: number, field: string, value: number) => {
//         setModifiedData((prevData) => {
//             return prevData.map((row, i) => {

//                 if (i === rowIndex) {
//                     return {
//                         ...row,
//                         value: row.value.map((subRow, j) => {
//                             if (j === subRowIndex) {
//                                 return { ...subRow, [field]: value };
//                             }
//                             return subRow;
//                         }

//                         ),
//                     }
//                 }
//                 return row;
//             }
//             );
//         });
//     };

//     const columnsToCheck: (keyof Iitems)[] = ["Pi11", "Pi12", "Pi13", "Pi21", "Pi22", "Pi31", "Pi32", "Pi33", "Pi41"];


//     const checkColumns = () => {

//         if (!modifiedData) return; // Kiểm tra nếu chưa có dữ liệu
//         const newErrors: Record<string, boolean> = {};
//         let errorMsg = "";
//         columnsToCheck.forEach((col) => {
//             const sum = modifiedData.reduce(
//                 (total, data) => total + data.value.reduce((acc, row) => {
//                     const value = row[col];
//                     return acc + (typeof value === "number" ? value : 0)
//                 }, 0), 0);
//             if (sum > 100) {
//                 newErrors[col] = true;
//                 // Tạo biểu thức chính quy để thay thế ví dụ "Pi11" -> "Pi1.1"
//                 const formattedCol = col.replace(/(\d)(?=\d)/, '$1.');
//                 errorMsg += `⚠️ Tỷ lệ % của "${formattedCol}" vượt quá 100% (Tổng: ${sum}). Bạn vui lòng kiểm tra lại! \n`;

//             }
//         });
//         setIsValid(true);

//         if (errorMsg) {
//             setErrorMessage(errorMsg);
//             setErrorColumns(newErrors);
//             setIsValid(false);

//             setModalOpen(true);
//             if (successOpen !== false) {

//                 setSuccessOpen(false);
//             }
//             if (dataValid !== false) {

//                 setDataValid(false);
//             }

//         } else {
//             if (successOpen !== true) {
//                 setSuccessOpen(true);
//             }
//         }
//     }
//     // Xử lý khi click vào ô checkbox tổng
//     const handleCheckAll = (checked: boolean) => {
//         setCheckedAll(checked);
//         // setCheckedItems(new Array(students.length).fill(checked));
//     };
//     if (isLoading) return "Đang tải dữ liệu..."
//     if (isError) return "Không có dữ liệu..."

//     const exportConfig = {
//         fields: [
//             {
//                 header: "ID",
//                 fieldName: "id", // ID của row
//             },
//             {
//                 header: "Năm học - Học kỳ",
//                 fieldName: "namHocHocKy", // 2024-1
//             },
//             {
//                 header: "Thứ tự",
//                 fieldName: "thuTu", // Giá trị từ `thuTu`
//             },
//             {
//                 header: "Mã môn học",
//                 fieldName: "maMonHoc", // Giá trị từ `maMonHoc`
//             },
//             {
//                 header: "Tên môn học",
//                 fieldName: "tenMonHoc", // Giá trị từ `tenMonHoc`
//             },
//             {
//                 header: "CLO Code",
//                 fieldName: "cloCode", // Giá trị từ từng `subRowData`
//             },
//             {
//                 header: "Tỷ trọng",
//                 fieldName: "tytrong", // Giá trị từ `subRowData.tytrong`
//             },
//             {
//                 header: "Pi11",
//                 fieldName: "Pi11", // Lấy từ từng `subRowData`
//             },
//             {
//                 header: "Pi12",
//                 fieldName: "Pi12",
//             },
//             {
//                 header: "Pi13",
//                 fieldName: "Pi13",
//             },
//             {
//                 header: "Pi21",
//                 fieldName: "Pi21",
//             },
//             {
//                 header: "Pi22",
//                 fieldName: "Pi22",
//             },
//             {
//                 header: "Pi31",
//                 fieldName: "Pi31",
//             },
//             {
//                 header: "Pi32",
//                 fieldName: "Pi32",
//             },
//             {
//                 header: "Pi33",
//                 fieldName: "Pi33",
//             },
//             {
//                 header: "Pi41",
//                 fieldName: "Pi41",
//             },
//         ],
//     };
//     return (

//             <>
//             <MyFlexRow>

//                         <Select m={10}
//                             label="Chương trình"
//                             data={[
//                                 { value: "1", label: "KT - Kế toán" },

//                             ]}
//                             defaultValue={1?.toString()}
//                             // onChange={(value) => form.setFieldValue("tinhChatPhong", parseInt(value?.toString()!))}
//                             />
//                         <Select m={10}
//                             label="Khóa"
//                             data={[{ value: "KT241", label: 'KT241' }]} defaultValue={khoa} onChange={(value) => setKhoa(value || "")}
//                             // onChange={(value) => form.setFieldValue("tinhChatPhong", parseInt(value?.toString()!))}
//                             />
//                             </MyFlexRow>
//              <Fieldset legend={`Ma trận tỷ trọng CLO và PI thuộc chương trình đào tạo - Khóa học ${khoa}`}>

//             <Group>

//                 <Button m={10} color="green" onClick={handleSave}>
//                     Save
//                 </Button>
//                 {/* Modal thông báo lỗi */}
//                 <Modal opened={modalOpen} onClose={() => {
//                     setModalOpen(false);
//                     // Delay xóa lỗi sau một thời gian để giữ hiệu ứng đóng
//                     setTimeout(() => {
//                         if (Object.keys(errorColumns).length !== 0) {
//                             setErrorColumns({});
//                         }
//                         if (errorMessage !== "") {
//                             setErrorMessage("");
//                         }
//                     }, 200);  // Delay 200ms trước khi xóa lỗi
//                 }
//             }

//             title="Lỗi tổng điểm">
//                     <p style={{ whiteSpace: "pre-line", color: "red" }}>{errorMessage}</p>
//                     <Button onClick={() => {


//                         setModalOpen(false);
//                         // Delay xóa lỗi sau một thời gian để giữ hiệu ứng đóng
//                         setTimeout(() => {
//                             if (Object.keys(errorColumns).length !== 0) {
//                                 setErrorColumns({});
//                             }
//                             if (errorMessage !== "") {
//                                 setErrorMessage("");
//                             }
//                         }, 200);  // Delay 200ms trước khi xóa lỗi

//                     }
//                 } color="blue">
//                         Đóng
//                     </Button>
//                 </Modal>
//                 <Modal opened={successOpen} onClose={() => setSuccessOpen(false)} title="Lưu thành công" >

//                     <Button onClick={() => setSuccessOpen(false)} color="blue">
//                         Đóng
//                     </Button>
//                 </Modal>
//                 <Modal opened={dataValid} onClose={() => setDataValid(false)} title="Lỗi dữ liệu" >
//                     <p style={{ whiteSpace: "pre-line", color: "red" }}>Dữ liệu không hợp lệ, vui lòng kiểm tra lại.</p>
//                     <Button onClick={() => setDataValid(false)} color="blue">
//                         Đóng
//                     </Button>
//                 </Modal>
//                 <AQButtonExportData
//                     isAllData={true}
//                     objectName="Ma trận tỷ trọng CLO và PI thuộc chương trình đào tạo"
//                     data={queryData!}
//                     exportConfig={exportConfig}
//                     />
//             </Group>


//             <ScrollArea w={"100%"} >
//                 <Table w={"105%"} withColumnBorders>
//                     <Table.Thead>
//                         <Table.Tr>
//                             <Table.Th colSpan={8} rowSpan={2} ta={'center'}>

//                             </Table.Th>
//                             <Table.Th colSpan={3} rowSpan={1} ta={'center'}>
//                                 PLO 1
//                             </Table.Th>
//                             <Table.Th colSpan={2} rowSpan={1} ta={'center'}>
//                                 PLO 2
//                             </Table.Th>
//                             <Table.Th colSpan={3} rowSpan={1} ta={'center'}>
//                                 PLO 3
//                             </Table.Th>
//                             <Table.Th colSpan={1} rowSpan={1} ta={'center'}>
//                                 PLO 4
//                             </Table.Th>
//                         </Table.Tr>

//                         <Table.Tr>




//                             <Table.Th colSpan={1} rowSpan={1} ta={'center'}>
//                                 30
//                             </Table.Th>
//                             <Table.Th colSpan={1} rowSpan={1} ta={'center'}>
//                                 30
//                             </Table.Th>
//                             <Table.Th colSpan={1} rowSpan={1} ta={'center'}>
//                                 40
//                             </Table.Th>
//                             <Table.Th colSpan={1} rowSpan={1} ta={'center'}>
//                                 20
//                             </Table.Th>
//                             <Table.Th colSpan={1} rowSpan={1} ta={'center'}>
//                                 20
//                             </Table.Th>
//                             <Table.Th colSpan={1} rowSpan={1} ta={'center'}>
//                                 60
//                             </Table.Th>
//                             <Table.Th colSpan={1} rowSpan={1} ta={'center'}>
//                                 50
//                             </Table.Th>
//                             <Table.Th colSpan={1} rowSpan={1} ta={'center'}>
//                                 50
//                             </Table.Th>
//                             <Table.Th colSpan={1} rowSpan={1} ta={'center'}>
//                                 100
//                             </Table.Th>
//                         </Table.Tr>
//                         <Table.Tr>
//                             <Table.Th rowSpan={1}><Checkbox checked={checkedAll}
//                                 onChange={() => { }} /></Table.Th>

//                             <Table.Th colSpan={1} ta={'center'} >STT</Table.Th>
//                             <Table.Th ta={'center'} >Năm học học kỳ</Table.Th>
//                             <Table.Th ta={'center'} >Thứ tự</Table.Th>
//                             <Table.Th ta={'center'} >Mã môn học</Table.Th>
//                             <Table.Th ta={'center'} >Tên môn học</Table.Th>
//                             <Table.Th ta={'center'} >Mã CLO</Table.Th>
//                             <Table.Th ta={'center'} >Tỷ trọng</Table.Th>
//                             <Table.Th ta={'center'} >PI1.1</Table.Th>
//                             <Table.Th ta={'center'} >PI1.2</Table.Th>
//                             <Table.Th ta={'center'} >PI1.3</Table.Th>
//                             <Table.Th ta={'center'} >PI2.1</Table.Th>
//                             <Table.Th ta={'center'} >PI2.2</Table.Th>
//                             <Table.Th ta={'center'} >PI3.1</Table.Th>
//                             <Table.Th ta={'center'} >PI3.2</Table.Th>
//                             <Table.Th ta={'center'} >PI3.3</Table.Th>
//                             <Table.Th ta={'center'} >PI4.1</Table.Th>

//                         </Table.Tr>

//                     </Table.Thead>
//                     <Table.Tbody>
//                         {modifiedData && modifiedData.map((row, rowIndex) => {

//                             return (
//                                 <React.Fragment key={row.id}>
//                                     <Table.Tr>

//                                         <Table.Td rowSpan={4} ta={'center'}></Table.Td>
//                                         <Table.Td rowSpan={4} ta={'center'}>{row.id}</Table.Td>
//                                         <Table.Td rowSpan={4} ta={'center'}>{row.namHocHocKy}</Table.Td>
//                                         <Table.Td rowSpan={4} ta={'center'}>{row.thuTu}</Table.Td>
//                                         {/* <Table.Td ta={'center'}>{row.subjectId}</Table.Td> */}
//                                         <Table.Td rowSpan={4} ta={'center'}>{row.maMonHoc}</Table.Td>
//                                         <Table.Td rowSpan={4} ta={'center'}>{row.tenMonHoc}</Table.Td>

//                                     </Table.Tr>
//                                     {row.value && Array.isArray(row.value) && row.value.map((subRowData, subRowIndex) => {

//                                         return (

//                                             <Table.Tr key={`${row.id}-${subRowIndex}`}>


//                                                 <Table.Td ta={'center'}>{subRowData.cloCode}</Table.Td>

//                                                 <Table.Td ta={'center'} >
//                                                     {/* {subRowData.tyTrong} */}
//                                                     <NumberInput defaultValue={subRowData.tytrong} />
//                                                 </Table.Td>
//                                                 {columnsToCheck.map((col) => (
//                                                     <Table.Td ta={"center"} key={col}>
//                                                         <NumberInput defaultValue={Number(subRowData[col as keyof Iitems]) || 0}
//                                                             onChange={(value) => handleChange(rowIndex, subRowIndex, col, Number(value))}
//                                                             />
//                                                     </Table.Td>
//                                                 ))}

//                                             </Table.Tr>
//                                         )
//                                     })}

//                                 </React.Fragment>
//                             );
//                         })}


//                     </Table.Tbody>
//                 </Table>

//             </ScrollArea>
//             </Fieldset>
//                         </>

//     );
// }
// const sampleData: ImainData[] = [
//     {


//         id: 1,
//         namHocHocKy: "2024-1",
//         thuTu: 1,
//         subjectId: 1,
//         maMonHoc: "KTTC001",
//         tenMonHoc: "Kế toán tài chính",
//         value: [
//             { cloCode: "CLO1.1", tytrong: 20, Pi11: 30, Pi12: 30, Pi13: 0, Pi21: 0, Pi22: 0, Pi31: 0, Pi32: 0, Pi33: 0, Pi41: 0 },
//             { cloCode: "CLO1.2", tytrong: 20, Pi11: 40, Pi12: 40, Pi13: 0, Pi21: 0, Pi22: 0, Pi31: 0, Pi32: 0, Pi33: 0, Pi41: 0 },
//             { cloCode: "CLO1.3", tytrong: 60, Pi11: 50, Pi12: 0, Pi13: 60, Pi21: 0, Pi22: 0, Pi31: 0, Pi32: 0, Pi33: 0, Pi41: 0 }
//         ]
//     }
// ];
