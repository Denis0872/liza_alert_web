type TextInputProps = {
  label: string
  placeholder: string
  type?: 'text' | 'tel' | 'number'
}

export function TextInput({ label, placeholder, type = 'text' }: TextInputProps) {
  return (
    <label>
      <span>{label}</span>
      <input placeholder={placeholder} type={type} />
    </label>
  )
}
