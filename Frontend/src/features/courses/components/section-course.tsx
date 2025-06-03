import React from 'react';

type Props = {
  syllabus: string[];
};

export const CourseSectionsList: React.FC<Props> = ({ syllabus }) => {
  if (!syllabus || syllabus.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Secciones</h2>
      <div className="grid grid-cols-1 gap-4">
        {syllabus.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-4 border border-neutral-200"
          >
            <h3 className="text-md font-semibold text-slate-800">
              Sección {i + 1}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
