import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, Underline, List, ListOrdered, Heading2, Heading3, Quote, Code, Eye, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { sanitizeHtml } from "@/lib/sanitize";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = useCallback((openTag: string, closeTag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const before = value.substring(0, start);
    const after = value.substring(end);

    const newValue = before + openTag + selectedText + closeTag + after;
    onChange(newValue);

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + openTag.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [value, onChange]);

  const insertBlock = useCallback((tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const selectedText = value.substring(textarea.selectionStart, textarea.selectionEnd);
    const before = value.substring(0, start);
    const after = value.substring(textarea.selectionEnd);

    let newValue = "";
    if (tag === "ul") {
      const items = selectedText ? selectedText.split('\n').map(line => `<li>${line}</li>`).join('\n') : "<li></li>";
      newValue = before + `<ul>\n${items}\n</ul>` + after;
    } else if (tag === "ol") {
      const items = selectedText ? selectedText.split('\n').map(line => `<li>${line}</li>`).join('\n') : "<li></li>";
      newValue = before + `<ol>\n${items}\n</ol>` + after;
    } else {
      newValue = before + `<${tag}>${selectedText}</${tag}>` + after;
    }

    onChange(newValue);
  }, [value, onChange]);

  const tools = [
    { icon: Bold, action: () => insertTag("<strong>", "</strong>"), title: "Bold" },
    { icon: Italic, action: () => insertTag("<em>", "</em>"), title: "Italic" },
    { icon: Underline, action: () => insertTag("<u>", "</u>"), title: "Underline" },
    { icon: Heading2, action: () => insertBlock("h2"), title: "Heading 2" },
    { icon: Heading3, action: () => insertBlock("h3"), title: "Heading 3" },
    { icon: List, action: () => insertBlock("ul"), title: "Bullet List" },
    { icon: ListOrdered, action: () => insertBlock("ol"), title: "Numbered List" },
    { icon: Quote, action: () => insertBlock("blockquote"), title: "Quote" },
    { icon: Code, action: () => insertTag("<code>", "</code>"), title: "Code" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Blog Content (HTML)</label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? <Edit className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
          {showPreview ? "Edit" : "Preview"}
        </Button>
      </div>

      {!showPreview && (
        <div className="flex flex-wrap gap-1 p-2 bg-muted rounded-t-md border border-b-0">
          {tools.map((tool, index) => (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={tool.action}
              title={tool.title}
            >
              <tool.icon className="w-4 h-4" />
            </Button>
          ))}
        </div>
      )}

      {showPreview ? (
        <div 
          className="min-h-[200px] p-4 border rounded-md bg-background prose prose-sm max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-xl prose-h2:mt-4 prose-h2:mb-2
            prose-h3:text-lg prose-h3:mt-3 prose-h3:mb-2
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground prose-strong:font-bold
            prose-em:italic
            prose-ul:my-2 prose-ul:pl-4
            prose-ol:my-2 prose-ol:pl-4
            prose-li:text-muted-foreground prose-li:my-1
            prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:pl-4 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(value || "<p class='text-muted-foreground italic'>No content yet...</p>") }}
        />
      ) : (
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Write your blog content here using HTML tags..."}
          rows={12}
          className={cn("font-mono text-sm", !showPreview && "rounded-t-none")}
        />
      )}

      {/* Quick Reference Guide */}
      <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
        <h4 className="text-sm font-semibold mb-3 text-foreground">📖 HTML Formatting Guide</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono">&lt;p&gt;...&lt;/p&gt;</code>
              <span className="text-muted-foreground">Normal paragraph text</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono">&lt;h2&gt;...&lt;/h2&gt;</code>
              <span className="text-muted-foreground">Main section heading (larger)</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono">&lt;h3&gt;...&lt;/h3&gt;</code>
              <span className="text-muted-foreground">Sub-section heading (smaller)</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono">&lt;strong&gt;...&lt;/strong&gt;</code>
              <span className="text-muted-foreground"><strong>Bold text</strong> for emphasis</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono">&lt;em&gt;...&lt;/em&gt;</code>
              <span className="text-muted-foreground"><em>Italic text</em> for subtle emphasis</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono">&lt;u&gt;...&lt;/u&gt;</code>
              <span className="text-muted-foreground"><u>Underlined text</u></span>
            </div>
            <div className="flex items-start gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono">&lt;ul&gt;&lt;li&gt;...&lt;/li&gt;&lt;/ul&gt;</code>
              <span className="text-muted-foreground">Bullet point list</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono">&lt;ol&gt;&lt;li&gt;...&lt;/li&gt;&lt;/ol&gt;</code>
              <span className="text-muted-foreground">Numbered list</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono">&lt;blockquote&gt;...&lt;/blockquote&gt;</code>
              <span className="text-muted-foreground">Quote or important callout</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono">&lt;code&gt;...&lt;/code&gt;</code>
              <span className="text-muted-foreground">Inline code or technical term</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 pt-2 border-t">
          💡 <strong>Tip:</strong> Select text and click a toolbar button to wrap it, or use Preview to see the final result.
        </p>
      </div>
    </div>
  );
};

export default RichTextEditor;
