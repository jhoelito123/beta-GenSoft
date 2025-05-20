import { useRef, useState, useCallback } from 'react';
import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form';

interface UploadCoverProps<T extends FieldValues> {
  name: keyof T;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export const UploadCover = <T extends FieldValues>({
  name,
  register,
  error,
}: UploadCoverProps<T>) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Solo se permiten archivos de imagen (JPG, PNG, etc.)');
      setPreview(null);
      return;
    }

    setFileError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
    handleFile(file);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-3/12 flex flex-col gap-2">
      <label htmlFor={name as string}>
        Portada <span className="text-red-400">*</span>
      </label>
      <div
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`w-full h-64 border-[1px] rounded-md cursor-pointer 
        flex items-center justify-center relative overflow-hidden bg-neutral-50
        hover:bg-neutral-100 transition ${
          fileError || error ? 'border-red-400' : 'border-slate-900'
        }`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Vista previa"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="text-center text-neutral-500 px-4">
            <p>Haz clic o arrastra una imagen aquí</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          {...register(name, {
            validate: (fileList) =>
              fileList?.[0]?.type.startsWith('image/') ||
              'Solo se permiten archivos de imagen (JPG, PNG, etc.)',
          })}
          ref={(e) => {
            register(name).ref(e);
            fileInputRef.current = e;
          }}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {fileError && (
        <span className="text-red-400 subtitle-sm text-wrap text-center">
          {fileError}
        </span>
      )}

      {error && (
        <span className="text-red-400 subtitle-sm text-wrap text-center">
          {String(error.message)}
        </span>
      )}
    </div>
  );
};
