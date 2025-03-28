"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import ImageResize from "tiptap-extension-resize-image";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import { useEditorStore } from "@/store/use-editor-store";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Typography from "@tiptap/extension-typography";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

//custom extension
import { FontSize } from "@/extensions/font-size";
import { LineHeight } from "@/extensions/line-height";

import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";

import { all, createLowlight } from "lowlight";
import { Id } from "../../../../convex/_generated/dataModel";
 import {
   useLiveblocksExtension,
   FloatingToolbar,
 } from "@liveblocks/react-tiptap";
import { Threads } from "@/app/Threads";
import { useStorage } from "@liveblocks/react";
import { LEFT_DEFAULT_MARGIN, RIGHT_DEFAULT_MARGIN } from "@/constants/margin";


const lowlight = createLowlight(all);


lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", javascript);
lowlight.register("javascript", javascript);
lowlight.register("ts", typescript);
lowlight.register("typescript", typescript);
lowlight.register("python", python);



export const Editor = ({initialContent  }:{documentId: Id<'documents'> , initialContent?: string|undefined}) => {
  const { setEditor } = useEditorStore();
  const leftMargin= useStorage((root)=>root.leftMargin)
    const rightMargin = useStorage((root) => root.rightMargin);



  //TODO: add initial content 
  const liveblocks = useLiveblocksExtension({initialContent,offlineSupport_experimental:true});

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onUpdate({ editor }) {
      // The content has changed.
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      // The selection has changed.
      setEditor(editor);
    },
    onTransaction({ editor }) {
      // The editor state has changed.
      setEditor(editor);
    },
    onFocus({ editor }) {
      // The editor is focused.
      setEditor(editor);
    },
    onBlur({ editor }) {
      // The editor isn’t focused anymore.
      setEditor(editor);
    },
    onDestroy() {
      // The editor is being destroyed.
      setEditor(editor);
    },

    onContentError({ editor }) {
      setEditor(editor);
    },

    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? LEFT_DEFAULT_MARGIN}px; padding-right:${rightMargin ?? RIGHT_DEFAULT_MARGIN}px;`,
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 pr-14 cursor-text",
      },
    },

    extensions: [
      StarterKit,
      FontSize,
      OrderedList,
      Underline,
      liveblocks,
      TaskList,
      LineHeight,
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image.configure({ allowBase64: true }),
      BulletList.configure({
        keepMarks: true,
        keepAttributes: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
        },
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Highlight.configure({ multicolor: true }),
      TableRow,
      TableHeader,
      TableCell,
      ImageResize,
      FontFamily,
      Color,
      Typography,
    ],
  
  });


  return (
    <div className="pt-10 size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible ">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
        <FloatingToolbar editor={editor} />
      </div>
    </div>
  );
};
