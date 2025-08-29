'use client'
import { Input, MantineSize, ScrollArea } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import FileHandler from '@tiptap-pro/extension-file-handler';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorOptions, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import ImageUploaderControl from './ImageUploaderControl';
export interface IMyTextEditor extends Partial<EditorOptions> {
    label?: string,
    error?: string,
    value?: string,
    onChange?: any,
    contentHeight?: MantineSize|string,
    autoHiddenToolBar?: boolean
}


export default function MyTextEditor({ autoHiddenToolBar=false,contentHeight="400px",onChange, value, error, label, ...rest }: IMyTextEditor) {
    const [hiddenToolBar,setHiddenToolBar] = useState(autoHiddenToolBar)
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            Image.extend({
                addAttributes() {
                    return {
                        src: {
                            default: null,
                        },
                        alt: {
                            default: null,
                        },
                    };
                },
                parseHTML() {
                    return [
                        {
                            tag: 'img[src]',
                        },
                    ];
                },
                renderHTML({ HTMLAttributes }) {
                    return ['img', HTMLAttributes];
                },
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            FileHandler.configure({
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
                onDrop: (currentEditor, files, pos) => {
                    files.forEach(file => {
                        const fileReader = new FileReader()

                        fileReader.readAsDataURL(file)
                        fileReader.onload = () => {
                            currentEditor.chain().insertContentAt(pos, {
                                type: 'image',
                                attrs: {
                                    src: fileReader.result,
                                },
                            }).focus().run()
                        }
                    })
                },
                onPaste: (currentEditor, files, htmlContent) => {
                    files.forEach(file => {
                        if (htmlContent) {
                            console.log(htmlContent)
                            return false
                        }
                        const fileReader = new FileReader()
                        fileReader.readAsDataURL(file)
                        fileReader.onload = () => {
                            currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                                type: 'image',
                                attrs: {
                                    src: fileReader.result,
                                },
                            }).focus().run()
                        }
                    })
                },
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            if (content === '<p></p>') {
                onChange('');
            } else {
                onChange(content);
            }
        },
        ...rest,

    });
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value!);
        }
    }, [value, editor]);
    return (

        <Input.Wrapper label={label} flex={1} error={error} >
            <RichTextEditor  editor={editor} style={{ border: error && '1px solid #e03131' ,}}>
                <RichTextEditor.Toolbar hidden={hiddenToolBar} sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                        {editor && (
                            <ImageUploaderControl
                            editor={editor}
                            uploadToken={process.env.NEXT_PUBLIC_UPLOAD_TOKEN!}
                            />
                        )}
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    {/* <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup> */}
                </RichTextEditor.Toolbar>

                <ScrollArea.Autosize
                    onMouseDown={() => {
                        editor?.commands.focus();
                    }}
                    onBlur={() => {
                        if(autoHiddenToolBar==false) return
                        setHiddenToolBar(true);
                    }}
                    onFocus={() => {
                        if(autoHiddenToolBar==false) return
                        setHiddenToolBar(false);
                    }}
                    style={{ cursor: "text", maxHeight: "400px" }}
                >
                    <RichTextEditor.Content mih={contentHeight} />
                </ScrollArea.Autosize>

            </RichTextEditor>
        </Input.Wrapper>
    );
}