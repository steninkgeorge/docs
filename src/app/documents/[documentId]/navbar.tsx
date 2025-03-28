"use client";

import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import DownloadUtils from "@/lib/download-utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarSub,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  CodeIcon,
  FileIcon,
  FileJson,
  FilePenIcon,
  FilePlus2Icon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  RedoIcon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TableIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";
import { BsFilePdf, BsMarkdown } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";
import { RenameInputDialog } from "@/components/rename-alert-component";
import { Id } from "../../../../convex/_generated/dataModel";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "./avatar";
import { Inbox } from "./inbox";
import {  useDocument } from "@/constants/new-document-handler";
import { useRouter } from "next/navigation";
import { RemoveDocumentDialog } from "@/components/remove-alert-component";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";

export type NavbarProps={
  id: Id<'documents'>,
  title: string
}

export const Navbar = ({id , title }:NavbarProps ) => {
  const { theme } = useTheme();
  const { editor } = useEditorStore();
  const documentHandler= useDocument()

  const insertToTable=({row, col}: {row: number, col: number})=>{
    editor?.chain().focus().insertTable({rows: row,cols:col}).run()
  }

  const router =useRouter()


  

  const handleDownload = async (type: string) => {
    if (!editor) return; // Ensure the editor is initialized
    const title = 'mydocument'

    switch (type) {
      case "pdf":
        await DownloadUtils.downloadAsPDF(editor, title);
        break;
      case "docx":
        await DownloadUtils.downloadAsDocx(editor, title);
        break;
      case "md":
        await DownloadUtils.downloadAsMarkdown(editor, title);
        break;
      case "json":
        DownloadUtils.downloadAsJson(editor, title);
        break;
      case "html":
        DownloadUtils.downloadHTML(editor, title);
        break;
      default:
    }
  };


  

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image 
            src={theme === "dark" ? "/logo-dark.svg" : "/logo.svg"} 
            alt="logo" 
            width={36} 
            height={36} 
          />
        </Link>

        <div className="flex flex-col">
          <DocumentInput id={id} title={title} />
          <div className="flex">
            <Menubar className="p-0 h-auto bg-transparent shadow-none border-none">
              <MenubarMenu>
                <MenubarTrigger className="font-normal text-sm py-0.5 px-[7px] hover:bg-muted rounded-sm dark:text-gray-200 dark:hover:bg-gunmetal-500">
                  File
                </MenubarTrigger>

                <MenubarContent className="print:hidden dark:bg-gunmetal-400 dark:border-gunmetal-600">
                  <MenubarSub>
                    <MenubarSubTrigger className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                      <FileIcon className="size-4 mr-2 dark:text-gray-300" />
                      save
                    </MenubarSubTrigger>
                    <MenubarSubContent className="dark:bg-gunmetal-400 dark:border-gunmetal-600">
                      <MenubarItem onClick={() => handleDownload("json")} className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                        <FileJson className="mr-2 size-4 dark:text-gray-300" />
                        json
                      </MenubarItem>
                      <MenubarItem onClick={() => handleDownload("pdf")} className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                        <BsFilePdf className="mr-2 size-4 dark:text-gray-300" />
                        pdf
                      </MenubarItem>
                      <MenubarItem onClick={() => handleDownload("html")} className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                        <GlobeIcon className="mr-2 size-4 dark:text-gray-300" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => handleDownload("docx")} className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                        <FileIcon className="mr-2 size-4 dark:text-gray-300" />
                        docx
                      </MenubarItem>
                      <MenubarItem onClick={() => handleDownload("md")} className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                        <BsMarkdown className="mr-2 size-4 dark:text-gray-300" />
                        md
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() => {
                      documentHandler
                        .createDocument({ initialContent: "" })
                        .then((id: Id<"documents">) =>
                          router.replace(`/documents/${id}`)
                        );
                    }}
                    className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                  >
                    <FilePlus2Icon className="mr-2 size-4 dark:text-gray-300" />
                    New Document <MenubarShortcut className="dark:text-gray-400">⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator className="dark:bg-gunmetal-600" />

                  <RenameInputDialog id={id} title={title}>
                    <MenubarItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                      className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                    >
                      <FilePenIcon className="mr-2 size-4 dark:text-gray-300" />
                      Rename
                    </MenubarItem>
                  </RenameInputDialog>

                  <RemoveDocumentDialog Id={id}>
                    <MenubarItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                      className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                    >
                      <TrashIcon className="mr-2 size-4 dark:text-gray-300" />
                      Remove <MenubarShortcut className="dark:text-gray-400">⌘D</MenubarShortcut>
                    </MenubarItem>
                  </RemoveDocumentDialog>
                  <MenubarSeparator className="dark:bg-gunmetal-600" />

                  <MenubarItem onClick={() => window.print()} className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                    <PrinterIcon className="mr-2 size-4 dark:text-gray-300" />
                    Print <MenubarShortcut className="dark:text-gray-400">⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="font-normal text-sm p-0.5 hover:bg-muted rounded-sm dark:text-gray-200 dark:hover:bg-gunmetal-500">
                  Edit
                </MenubarTrigger>
                <MenubarContent className="dark:bg-gunmetal-400 dark:border-gunmetal-600">
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                    className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                  >
                    <UndoIcon className="mr-2 size-4 dark:text-gray-300" />
                    Undo <MenubarShortcut className="dark:text-gray-400">⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                    className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                  >
                    <RedoIcon className="mr-2 size-4 dark:text-gray-300" />
                    Redo <MenubarShortcut className="dark:text-gray-400">⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="font-normal text-sm p-0.5 hover:bg-muted rounded-sm dark:text-gray-200 dark:hover:bg-gunmetal-500">
                  Insert
                </MenubarTrigger>
                <MenubarContent className="dark:bg-gunmetal-400 dark:border-gunmetal-600">
                  <MenubarSub>
                    <MenubarSubTrigger className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                      <TableIcon className="size-4 mr-2 dark:text-gray-300" />
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent className="dark:bg-gunmetal-400 dark:border-gunmetal-600">
                      <MenubarItem
                        onClick={() => insertToTable({ row: 1, col: 1 })}
                        className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                      >
                        1x1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertToTable({ row: 2, col: 2 })}
                        className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                      >
                        2x2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertToTable({ row: 3, col: 3 })}
                        className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                      >
                        3x3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertToTable({ row: 4, col: 4 })}
                        className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                      >
                        4x4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().toggleCodeBlock().run()
                    }
                    className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                  >
                    <CodeIcon className="mr-2 size-4 dark:text-gray-300" />
                    CodeBlock
                    <MenubarShortcut className="p-1 dark:text-gray-400">⌘+opt+C</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="font-normal text-sm p-0.5 hover:bg-muted rounded-sm dark:text-gray-200 dark:hover:bg-gunmetal-500">
                  Format
                </MenubarTrigger>
                <MenubarContent className="dark:bg-gunmetal-400 dark:border-gunmetal-600">
                  <MenubarSub>
                    <MenubarSubTrigger className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                      <TextIcon className="size-4 mr-2 dark:text-gray-300" />
                      Text Formatting
                    </MenubarSubTrigger>
                    <MenubarSubContent className="dark:bg-gunmetal-400 dark:border-gunmetal-600">
                      <MenubarItem className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                        <BoldIcon className="mr-2 size-4 dark:text-gray-300" />
                        Bold <MenubarShortcut className="dark:text-gray-400">⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                        <UnderlineIcon className="mr-2 size-4 dark:text-gray-300" />
                        Underline <MenubarShortcut className="dark:text-gray-400">⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                        <ItalicIcon className="mr-2 size-4 dark:text-gray-300" />
                        Italic <MenubarShortcut className="dark:text-gray-400">⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className="dark:text-gray-200 dark:hover:bg-gunmetal-500">
                        <StrikethroughIcon className="mr-2 size-4 dark:text-gray-300" />
                        StrikeThrough &nbsp;
                        <MenubarShortcut className="dark:text-gray-400">⌘S</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator className="dark:bg-gunmetal-600" />
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                    className="dark:text-gray-200 dark:hover:bg-gunmetal-500"
                  >
                    <RemoveFormattingIcon className="mr-2 size-4 dark:text-gray-300" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Inbox />
        <Avatars />
        <ThemeToggle />
        <OrganizationSwitcher
          afterSelectPersonalUrl='/'
          afterCreateOrganizationUrl='/'
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl='/'
        />
        <UserButton />
      </div>
    </nav>
  );
};
