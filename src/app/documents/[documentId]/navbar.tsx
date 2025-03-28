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

export type NavbarProps={
  id: Id<'documents'>,
  title: string
}

export const Navbar = ({id , title }:NavbarProps ) => {


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
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>

        <div className="flex flex-col">
          <DocumentInput id={id} title={title} />
          <div className="flex ">
            <Menubar className="p-0 h-auto bg-transparent shadow-none border-none">
              <MenubarMenu>
                <MenubarTrigger className="font-normal text-sm py-0.5 px-[7px] hover:bg-muted rounded-sm">
                  File
                </MenubarTrigger>

                <MenubarContent className="print:hidden  ">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => handleDownload("json")}>
                        <FileJson className="mr-2 size-4" />
                        json
                      </MenubarItem>
                      <MenubarItem onClick={() => handleDownload("pdf")}>
                        <BsFilePdf className="mr-2 size-4" />
                        pdf
                      </MenubarItem>
                      <MenubarItem onClick={() => handleDownload("html")}>
                        <GlobeIcon className="mr-2 size-4" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => handleDownload("docx")}>
                        <FileIcon className="mr-2 size-4" />
                        docx
                      </MenubarItem>
                      <MenubarItem onClick={() => handleDownload("md")}>
                        <BsMarkdown className="mr-2 size-4" />
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
                  >
                    <FilePlus2Icon className="mr-2 size-4" />
                    New Document <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />

                  <RenameInputDialog id={id} title={title}>
                    <MenubarItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FilePenIcon className="mr-2 size-4" />
                      Rename
                    </MenubarItem>
                  </RenameInputDialog>

                  <RemoveDocumentDialog Id={id}>
                    <MenubarItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <TrashIcon className="mr-2 size-4" />
                      Remove <MenubarShortcut>⌘D</MenubarShortcut>
                    </MenubarItem>
                  </RemoveDocumentDialog>
                  <MenubarSeparator />

                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="mr-2 size-4" />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="font-normal text-sm p-0.5 hover:bg-muted rounded-sm">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <UndoIcon className="mr-2 size-4" />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <RedoIcon className="mr-2 size-4" />
                    Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="font-normal text-sm p-0.5 hover:bg-muted rounded-sm">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TableIcon className="size-4 mr-2" />
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => insertToTable({ row: 1, col: 1 })}
                      >
                        1x1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertToTable({ row: 2, col: 2 })}
                      >
                        2x2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertToTable({ row: 3, col: 3 })}
                      >
                        3x3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertToTable({ row: 4, col: 4 })}
                      >
                        4x4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().toggleCodeBlock().run()
                    }
                  >
                    <CodeIcon className="mr-2 size-4" />
                    CodeBlock
                    <MenubarShortcut className="p-1">⌘+opt+C</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="font-normal text-sm p-0.5 hover:bg-muted rounded-sm">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2" />
                      Text Formatting
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <BoldIcon className="mr-2 size-4" />
                        Bold <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <UnderlineIcon className="mr-2 size-4" />
                        Underline <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <ItalicIcon className="mr-2 size-4" />
                        Italic <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <StrikethroughIcon className="mr-2 size-4" />
                        StrikeThrough &nbsp;
                        <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="mr-2 size-4" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 pl-4 items-center">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />
        <UserButton />
      </div>
    </nav>
  );
};
