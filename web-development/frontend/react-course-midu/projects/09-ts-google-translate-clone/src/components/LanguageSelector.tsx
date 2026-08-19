import { Form } from "react-bootstrap";
import { AUTO_LANGUAGUE, SUPPORTED_LANGUAGUES } from "../constants";
import { type FromLanguage, type Language } from "../types.d";
import { SectionType } from "../types.d";

type Props =
  | {
      type: SectionType.From;
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | {
      type: SectionType.To;
      value: Language;
      onChange: (language: Language) => void;
    };

export const LanguageSelector: React.FC<Props> = ({
  type,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };
  return (
    <Form.Select
      aria-label="Selecciona el idioma"
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGUE}>Detectar idiomas</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGUES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
