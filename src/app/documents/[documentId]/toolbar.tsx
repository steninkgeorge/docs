'use client'

import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"
import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquareCodeIcon, MessageSquareDashed, MessageSquareIcon, MessageSquarePlus, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormatting, RemoveFormattingIcon, SpellCheck, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react"

interface ToolBarIconProps{
    onClick?:()=> void,
    isActive?:boolean,
    icon: LucideIcon
}


const ToolBarButton=({
    onClick, 
    isActive,
    icon: Icon
}: ToolBarIconProps)=>{
    return (
      <button
        onClick={onClick}
        className={cn(
          "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm bg-neutral-200/80 hover:bg-neutral-500/80",
          isActive && "bg-neutral-500/80"
        )}
      >
        <Icon className="size-4" />
      </button>
    );
}

export const Toolbar=()=>{
    const {editor}=useEditorStore()

    const sections: {
      label: string;
      icon: LucideIcon;
      onClick: () => void;
      isActive?: boolean;
    }[][] = [
      [
        {
          label: "undo",
          icon: Undo2Icon,
          onClick: () => {
            editor?.chain().focus().undo().run();
          },
          isActive: editor?.isActive("undo"),
        },
        {
          label: "redo",
          icon: Redo2Icon,
          onClick: () => {
            editor?.chain().focus().redo().run();
          },
        },
        {
          label: "print",
          icon: PrinterIcon,
          onClick: () => {
            window.print();
          },
        },
        {
          label: "spellcheck",
          icon: SpellCheckIcon,
          onClick: () => {
            const current = editor?.view.dom.getAttribute("spellcheck");
            editor?.view.dom.setAttribute(
              "spellcheck",
              current === "false" ? "true" : "false"
            );
          },
        },
      ],
      [
        {
          label: "bold",
          icon: BoldIcon,
          onClick: () => {
            const active = editor?.isActive("bold");
            active
              ? editor?.chain().focus().unsetBold().run()
              : editor?.chain().focus().setBold().run();
          },
          isActive: editor?.isActive("bold"),
        },
        {
          label: "italic",
          icon: ItalicIcon,
          onClick: () => {
            const active = editor?.isActive("italic");
            active
              ? editor?.chain().focus().unsetItalic().run()
              : editor?.chain().focus().setItalic().run();
          },
          isActive: editor?.isActive("italic"),
        },
        {
          label: "underline",
          icon: UnderlineIcon,
          onClick: () => {
            const active = editor?.isActive("underline");
            active
              ? editor?.chain().focus().unsetUnderline().run()
              : editor?.chain().focus().toggleUnderline().run();
          },
          isActive: editor?.isActive("underline"),
        },
      ],
      [
        {
          label: "comment",
          icon: MessageSquarePlusIcon,
          onClick: () => {
            console.log("TODO: comment");
          },
          isActive: editor?.isActive("comment"),
        },
        {
          label: "List Todo",
          icon: ListTodoIcon,
          onClick: () => {
            editor?.chain().focus().toggleTaskList().run();
          },
          isActive: editor?.isActive("tasklist"),
        },
        {
          label: "Remove Formatting",
          icon: RemoveFormattingIcon,
          onClick: () => {
            editor?.chain().focus().unsetAllMarks().run();
          },
        },
      ],
    ];
    return (
        <div className="px-2.5 py-0.5 bg-[#F1F4F9] rounded-[24px] min-h-[40px] overflow-x-auto flex items-center">
           {
            sections.map((row,rowIndex)=>(
                <div key={rowIndex} className="flex mx-2 gap-x-0.5">{
                   row.map((item)=>(
                    <ToolBarButton key={item.label} icon={item.icon} onClick={item.onClick} isActive={item.isActive} />
                   )) } </div>
            ))
           }
        </div>
    )
}