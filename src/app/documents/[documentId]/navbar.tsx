'use client'

import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
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
import { BoldIcon, CodeIcon, FileIcon, FileJson, FilePen, FilePenIcon, FilePlus2Icon, GlobeIcon, Italic, ItalicIcon, PrinterIcon, RedoIcon, Strikethrough, StrikethroughIcon, TableIcon, TextIcon, TrashIcon, UnderlineIcon, UndoIcon } from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/lib/utils";

export const Navbar = () => {

  const {editor}=useEditorStore()
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>

        <div className="flex flex-col">
          <DocumentInput />
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
                      <MenubarItem>
                        <FileJson className="mr-2 size-4" />
                        json
                      </MenubarItem>
                      <MenubarItem>
                        <BsFilePdf className="mr-2 size-4" />
                        pdf
                      </MenubarItem>
                      <MenubarItem>
                        <GlobeIcon className="mr-2 size-4" />
                        HTML
                      </MenubarItem>
                      <MenubarItem>
                        <FileIcon className="mr-2 size-4" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlus2Icon className="mr-2 size-4" />
                    New Document <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className="mr-2 size-4" />
                    Rename <MenubarShortcut>⌘R</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className="mr-2 size-4" />
                    Remove <MenubarShortcut>⌘D</MenubarShortcut>
                  </MenubarItem>
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
                  <MenubarItem>
                    <UndoIcon className="mr-2 size-4" />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <RedoIcon className="mr-2 size-4" />
                    Redo <MenubarShortcut>⌘X</MenubarShortcut>
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
                      <MenubarItem>1x1</MenubarItem>
                      <MenubarItem>2x2</MenubarItem>
                      <MenubarItem>3x3</MenubarItem>
                      <MenubarItem>4x4</MenubarItem>
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
                        StrikeThrough{" "}
                        <MenubarShortcut className="p-1">⌘S</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};
