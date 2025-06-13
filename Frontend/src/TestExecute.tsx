import { useState } from 'react';
import CodeEditor from './components/ui/code-editor';

export default function Ejecutor({
  initialCode = '',
}: {
  initialCode?: string;
}) {
  const [code, setCode] = useState<string>(initialCode);
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCodeChange = (newCode: string | undefined) => {
    setCode(newCode || '');
  };

  const handleExecuteCode = async () => {
    setLoading(true);
    setOutput('');

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/education/execute-code/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, language: 'python' }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        setOutput(
          `Error del servidor: ${response.status} ${response.statusText}\n${JSON.stringify(
            errorData,
            null,
            2,
          )}`,
        );
        return;
      }

      const data = await response.json();
      if (data.status === 'success') {
        setOutput(data.output);
      } else {
        setOutput(`Estado: ${data.status.toUpperCase()}\n${data.output}`);
      }
    } catch (error) {
      setOutput(
        `Error al conectar con el servidor: ${
          error instanceof Error ? error.message : String(error)
        }.`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CodeEditor
        code={code}
        language="python"
        onCodeChange={handleCodeChange}
        output={output}
        loading={loading}
        onExecute={handleExecuteCode}
      />
    </div>
  );
}
