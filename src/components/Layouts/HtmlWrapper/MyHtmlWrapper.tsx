import { ScrollArea, TypographyStylesProvider, TypographyStylesProviderProps } from "@mantine/core";
import pako from "pako";

interface HtmlWrapper extends TypographyStylesProviderProps {
    html: string;
    mah?: number | string;
    zip?: boolean
}

export default function MyHtmlWrapper({ html, mah, zip = false, ...rest }: HtmlWrapper) {
    const extractHtmlFromZip = () => {
        const binaryString = Buffer.from(html, "base64");
        // Giải nén Gzip
        const decompressedData = pako.inflate(binaryString, { to: "string" });
        const cleanedHtml = decompressedData?.replaceAll(" font-family:'Times New Roman'; font-size:1em;", "");
        return cleanedHtml.replaceAll(" font-family:'Times New Roman'; font-size:1em;", "")
    }
    return (
        <ScrollArea.Autosize mah={mah}>
            <TypographyStylesProvider {...rest}>
                <div
                    dangerouslySetInnerHTML={{
                        __html: zip ? extractHtmlFromZip() : html
                    }}
                />
            </TypographyStylesProvider>
        </ScrollArea.Autosize>
    );
}
