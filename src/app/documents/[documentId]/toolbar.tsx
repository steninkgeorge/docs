"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  ActivityIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  Icon,
  Image,
  ItalicIcon,
  Link,
  Link2Icon,
  List,
  ListOrdered,
  ListTodoIcon,
  LucideIcon,
  MessageSquareCodeIcon,
  MessageSquareDashed,
  MessageSquareIcon,
  MessageSquarePlus,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormatting,
  RemoveFormattingIcon,
  Search,
  SpellCheck,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  Upload,
  
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Level } from "@tiptap/extension-heading";
import React, { useCallback, useState } from "react";
import Highlight from "@tiptap/extension-highlight";
import { CirclePicker, SketchPicker, type ColorResult } from "react-color";
import { isActive, useEditor } from "@tiptap/react";
import { Dropdown } from "react-day-picker";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//TODO:
//bullet list 
//image button

interface ToolBarIconProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

type ToolbarItemType = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}[][];

const ToolBarButton = ({ onClick, isActive, icon: Icon }: ToolBarIconProps) => {
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
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const onChange = (value: ColorResult) => {
    editor?.chain().focus().setColor(value.hex).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col h-7 min-w-7 p-2 rounded-sm hover:bg-neutral-200/80 items-center justify-center">
          <button>A</button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SketchPicker onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

//image button
//popover-> insert from computer , google search (beta), url (dialog)

const Imagebutton=()=>{
  const {editor}= useEditorStore();

  const [isDialogOpen , setDialogOpen]=useState(false)
  const [link , setLink]= useState('')

  const handleInsertLink=()=>{
      if(link){
        editor?.chain().focus().setImage({ src: link }).run();
      }
      setDialogOpen(false)

  }

  return (
    <Popover>
      <PopoverTrigger>
        <Image className="w-5 h-5" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-start w-full gap-x-2 hover:bg-neutral-300/20 rounded-sm p-2">
            <Upload className="w-4 h-4" />
            <p>upload from computer</p>
          </div>
          <div className="flex items-center justify-start w-full gap-x-2 hover:bg-neutral-300/20 rounded-sm p-2">
            <Search className="w-4 h-4" />
            <p>search from google</p>
          </div>
          <div
            onClick={() => setDialogOpen(true)}
            className="flex items-center justify-start w-full gap-x-2 hover:bg-neutral-300/20 rounded-sm p-2"
          >
            <Link className="w-4 h-4" />
            <p>insert link</p>
          </div>
        </div>
      </PopoverContent>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image Link</DialogTitle>
            <DialogDescription>
              Enter the image URL below to insert it.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Paste image link here..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button onClick={()=>handleInsertLink()} className="mt-2">
            Insert
          </Button>
        </DialogContent>
      </Dialog>
    </Popover>
  );
}

const AlignmentButton= ()=>{
  const {editor}= useEditorStore()

  const [active , setAlignment]= useState('left')

  const handleAlignment= useCallback((label: string)=>{
    if(editor){
        editor.chain().focus().setTextAlign(label).run();
        setAlignment(label)
    }
  },[editor])

  const icons = [
    { label: "left", icon: AlignLeftIcon },
    { label: "right", icon: AlignRightIcon },
    { label: "center", icon: AlignCenterIcon },
    { label: "justify", icon: AlignJustifyIcon },
  ];  
  
  const activeIcon = icons.find(({ label }) => label === active)
  const IconComponent = activeIcon?.icon || AlignLeftIcon; 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col h-7 min-w-7 p-2 rounded-sm hover:bg-neutral-200/80 items-center justify-center">
          <button>
            <IconComponent className="w-4 h-4"/>
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {icons.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={cn(
              "hover:bg-neutral-200/80 p-2 rounded-sm",
              editor?.isActive({ textAlign: label }) && "bg-neutral-200/80"
            )}
            onClick={() => handleAlignment(label)}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



const HeadingButton = () => {
  const { editor } = useEditorStore();

  const heading = [
    { label: "Normal Text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];

  const getButtonLabel = () => {
    for (let i = 1; i <= 5; i++) {
      if (editor?.isActive("heading", { level: i })) {
        return `heading ${i}`;
      }
    }
    return "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 text-sm flex items-center p-2 rounded-sm hover:bg-neutral-200/80">
          <span className="truncate">{getButtonLabel()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent >
        {heading.map(({ label, value, fontSize }) => (
          <button
            key={label}
            className="flex items-center hover:bg-neutral-200/80 w-full justify-center"
            style={{ fontSize: fontSize }}
            onClick={() => {
              console.log(value);
              value === 0
                ? editor?.commands.setParagraph()
                : editor
                    ?.chain()
                    .focus()
                    .setHeading({ level: value as Level })
                    .run();
            }}
          >
            <span>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const [open, setOpen] = useState(false);
  const handleSelect = () => {
    setOpen(false);
  };

  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 text-sm w-[120px] hover:bg-neutral-200/80 rounded-sm shrink-0 justify-between flex items-center px-2 outline-none">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              "flex item-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 w-full",
              editor?.isActive("textStyle", { fontFamily: value }) &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: ToolbarItemType = [
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
      {
        label: "highlight",
        icon: HighlighterIcon,
        onClick: () => {
          editor?.chain().focus().toggleHighlight().run();
        },
        isActive: editor?.isActive("highlight"),
      },
      {
        label: "link",
        icon: Link2Icon,
        onClick: editor?.isActive("link")
          ? () => {
              editor.commands.unsetMark("link"); // Ensure next text isn't linked
            }
          : () => {
              if (!editor) {
                return;
              }
              const previousUrl = editor.getAttributes("link").href;
              const url = window.prompt("URL", previousUrl);

              if (url === null) {
                return;
              }

              // empty
              if (url === "") {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .unsetLink()
                  .run();

                return;
              }
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            },
        isActive: editor?.isActive("link"),
      },
      {
        label: "bulletList",
        icon: List,
        onClick: () => {
          editor?.chain().focus().toggleBulletList().run();
        },
        isActive: editor?.isActive("bulletList"),
      },
      {
        label: "OrderedList",
        icon: ListOrdered,
        onClick: () => {
          editor?.chain().focus().toggleOrderedList().run();
        },
        isActive: editor?.isActive("orderedList"),
      },
    ],
  ];
  return (
    <div className="px-2.5 py-0.5 bg-[#F1F4F9] rounded-[24px] min-h-[40px] overflow-x-auto flex items-center">
      {sections.map((row, rowIndex) => (
        <div key={rowIndex} className="flex mx-2 gap-x-0.5">
          {row.map((item) => (
            <ToolBarButton
              key={item.label}
              icon={item.icon}
              onClick={item.onClick}
              isActive={item.isActive}
            />
          ))}
          <Separator
            orientation="vertical"
            className="mx-2 h-6 bg-neutral-300"
          />
        </div>
      ))}
      <FontFamilyButton />
      <Separator orientation="vertical" className="mx-2 h-6 bg-neutral-300" />
      <HeadingButton />
      <TextColorButton />
      <AlignmentButton />
      <Imagebutton/>
    </div>
  );
};
