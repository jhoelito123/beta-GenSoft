import { useState } from 'react';
import CodeEditor from './components/ui/code-editor';

function Ejecutor() {
  const [code, setCode] = useState<string>('print("¡Hola desde el Frontend!")\nprint("Conectado al Backend de Django.")');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCodeChange = (newCode: string | undefined) => {
    setCode(newCode || '');
  };

  const handleExecuteCode = async () => {
    setLoading(true);
    setOutput(''); // Limpiar la salida anterior

    try {
      const response = await fetch('http://127.0.0.1:8000/api/education/execute-code/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          language: 'python',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        setOutput(`Error del servidor: ${response.status} <span class="math-inline">\{response\.statusText\}\\n</span>{JSON.stringify(errorData, null, 2)}`);
        return;
      }

      const data = await response.json();
      console.log('Respuesta del Backend:', data);

      if (data.status === 'success') {
        setOutput(data.output);
      } else if (data.status === 'error' || data.status === 'timeout') {
            setOutput(`Estado: ${data.status.toUpperCase()}\n${data.output}`);
            // setOutput(`Error de ejecución (${data.status.toUpperCase()}):\n${data.output}`);
          } else {
            setOutput(`Respuesta inesperada del backend: ${JSON.stringify(data)}`);
          }

    } catch (error) {
      console.error('Error de red o solicitud:', error);
      setOutput(`Error al conectar con el servidor: ${error instanceof Error ? error.message : String(error)}. Asegúrate de que el backend esté corriendo.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl h-[calc(100vh-48px)]">
        <CodeEditor
          code={code}
          language="python"
          onCodeChange={handleCodeChange}
          output={output}
          loading={loading}
          onExecute={handleExecuteCode}
        />
      </div>
    </div>
  );
}

export default Ejecutor;