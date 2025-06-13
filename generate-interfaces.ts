// (() => {
//   const fs = require("fs-extra");
//   const path = require("path");

//   const inputFilePath = "./global-interfaces.ts"; // Tệp gốc chứa các interface
//   const outputDir = "./src/interfaces/global-interface"; // Thư mục chứa các tệp interface mới

//   // Đảm bảo thư mục đầu ra tồn tại
//   if (!fs.existsSync(outputDir)) {
//     fs.mkdirSync(outputDir);
//   }

//   // Đọc nội dung tệp đầu vào
//   const fileContent = fs.readFileSync(inputFilePath, "utf-8");

//   // Tìm tất cả các interface bằng regex
//   const interfaceRegex = /interface (\w+) \{([^}]+)\}/g;
//   const renamedInterfaces: Record<string, string> = {};

//   let match;
//   while ((match = interfaceRegex.exec(fileContent)) !== null) {
//     const interfaceName = match[1]; // Lấy tên interface gốc
//     const interfaceContent = match[2]; // Lấy nội dung bên trong {}

//     // Xóa "ViewModel" và thêm tiền tố "I"
//     const newInterfaceName = `I${interfaceName.replace("ViewModel", "")}`;
//     renamedInterfaces[interfaceName] = newInterfaceName; // Lưu mapping tên cũ -> tên mới

//     // Thay đổi nội dung interface và tìm các kiểu cần import
//     let updatedInterfaceContent = interfaceContent.replace(/\b(\w+ViewModel)\b/g, (typeName) => {
//       const renamed = `I${typeName.replace("ViewModel", "")}`;
//       renamedInterfaces[typeName] = renamed;
//       return renamed;
//     });

//     // Tìm các kiểu liên kết cần import
//     const usedInterfaces = [...new Set(updatedInterfaceContent.match(/\bI\w+\b/g) || [])];

//     // Tạo câu lệnh import
//     const importStatements = usedInterfaces
//       .map((interfaceName) => {
//         return `import { ${interfaceName} } from "./${interfaceName}";`;
//       })
//       .join("\n");

//     // Lưu interface mới vào tệp riêng, thêm import vào đầu tệp
//     const outputFilePath = path.join(outputDir, `${newInterfaceName}.ts`);
//     const updatedInterface = `${importStatements}\n\nexport interface ${newInterfaceName} {${updatedInterfaceContent}\n}`;
//     fs.writeFileSync(outputFilePath, `${updatedInterface}\n`, "utf-8");
//   }

//   console.log(`Các interface đã được xử lý và lưu trong thư mục "${outputDir}".`);
// })();
