import { Clock, FileText, BookOpen } from "lucide-react";

interface TaskCardProps {
  title: string;
  taskType: string;
  stageNote: string;
  description: string;
}

export function TaskCard({ title, taskType, stageNote, description }: TaskCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-[0.7px] text-blue-600 bg-blue-50 px-2 py-1 rounded-[4px]">
            Open
          </span>
          <span className="text-xs text-slate-500">{stageNote}</span>
        </div>
        <span className="flex-shrink-0 text-[10px] font-semibold text-slate-400 border border-slate-100 bg-slate-50 rounded-full px-2.5 py-1 uppercase tracking-wide">
          {taskType}
        </span>
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl font-bold text-slate-800 leading-[28px] tracking-[-0.3px]">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-[20px]">{description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        {/* Hours */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span>
            <span className="font-bold text-indigo-600">0</span> hr this week
            {" · "}
            <span className="font-bold text-indigo-600">0</span> hr total
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 h-[32px] px-3 text-xs font-medium text-slate-600 border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors">
            <FileText className="h-3.5 w-3.5" />
            Documents
          </button>
          <button className="flex items-center gap-1.5 h-[32px] px-3 text-xs font-medium text-slate-600 border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors">
            <BookOpen className="h-3.5 w-3.5" />
            Instructions
          </button>
          <div className="relative group">
            <button
              disabled
              className="flex items-center h-[32px] px-3 bg-slate-200 text-slate-400 text-xs font-medium rounded-[8px] cursor-not-allowed opacity-50"
            >
              Start Labeling
            </button>
            <div className="absolute right-0 top-full mt-1.5 whitespace-nowrap bg-slate-800 text-white text-xs rounded-[6px] px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              View instructions first
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
