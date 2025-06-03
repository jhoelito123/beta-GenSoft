import { FieldValues } from 'react-hook-form';
import { InputProps } from '../../interfaces';

export const TextArea = <T extends FieldValues>({
  label,
  name,
  placeholder = '',
  className = '',
  labelPadding = '',
  register,
  errors,
  validationRules = {},
  isRequired = true,
  onInput,
}: InputProps<T>) => {
  const fieldError = name
    .split('.')
    .reduce(
      (acc: Record<string, unknown>, key: string) =>
        acc && typeof acc === 'object'
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      errors,
    );

  return (
    <div className="flex flex-col w-full">
      <div className={`relative w-full ${className}`}>
        <textarea
          id={name as string}
          placeholder=" "
          className={`
            peer w-full h-[120px] subtitle-md text-slate-900 placeholder-transparent
            border-b-[1px] border-neutral-500 rounded pt-8 pb-1 px-2
            focus:outline-none focus:border-slate-900 resize-none
            ${fieldError ? 'border-red-400' : ''}
          `}
          {...(register ? register(name, validationRules) : {})}
          onInput={onInput}
        />
        <label
          htmlFor={name as string}
          className={`
          absolute left-2 text-slate-900 transition-all duration-200
            peer-placeholder-shown:top-5 peer-placeholder-shown:subtitle-sm
            peer-focus:top-0 peer-focus:text-xs peer-focus:text-slate-900
            ${labelPadding}
          `}
        >
          {label} {isRequired && <span className="text-red-400">*</span>}
        </label>
      </div>

      <div className="min-h-[25px] text-start pl-2">
        {fieldError && (
          <span className="text-red-400 subtitle-sm text-wrap text-center">
            {String((fieldError as Record<string, unknown>)?.message)}
          </span>
        )}
      </div>
    </div>
  );
};
