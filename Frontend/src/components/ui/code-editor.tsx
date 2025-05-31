import React, { useRef } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import { CodeEditorProps } from '../../interfaces';

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onCodeChange,
  output,
  loading,
  onExecute,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#D4D4D4',
        'editorLineNumber.foreground': '#858585',
        'editorCursor.foreground': '#AEAFAD',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
      },
    });
    monaco.editor.setTheme('myCustomTheme');
  };

  const handleEditorChange: OnChange = (value, event) => {
    onCodeChange(value);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white p-6 rounded-lg shadow-xl border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="subtitle-lg">Código ({language})</h2>
        <button 
          onClick={onExecute}
          disabled={loading}
          className={`
            button-lg
            px-8 py-3 rounded-lg
            font-semibold transition-all duration-200
            ${
              loading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
        >
          {loading ? 'Ejecutando...' : 'Ejecutar Código'}
        </button>
      </div>

      {/* Editor Config*/}
      <div className="flex-grow min-h-[300px] mb-6 border border-gray-600 rounded-md overflow-hidden">
        <Editor
          height="100%"
          language={language}
          defaultValue={code}
          theme="myCustomTheme"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 17,
            fontFamily: 'var(--font-lato), "Roboto Mono", monospace',
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            padding: {
                top: 15,
                bottom: 15
            },
            lineHeight: 22,
          }}
        />
      </div>

      {/* Output */}
      <div className="flex flex-col mt-auto bg-gray-900 p-4 rounded-md border border-gray-600">
        <h3 className="subtitle-md mb-2">Salida:</h3>
        <pre className="body-md bg-gray-950 p-4 rounded-sm overflow-auto max-h-[180px] text-green-400">
          {output || (loading ? 'Ejecutando...' : 'La salida aparecerá aquí.')} {/*Pendiente respuesta del backend*/} 
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;