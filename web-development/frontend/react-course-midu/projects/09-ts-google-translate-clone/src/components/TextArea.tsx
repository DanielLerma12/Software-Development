import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";

type Props = {
  type: SectionType;
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
};

const commonStyles = { border: 0, height: "200px", resize: "none" as const };

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.From) return "Introducir texto";
  if (loading === true) return "Cargando...";
  return "Traducción";
};

export const TextArea: React.FC<Props> = ({
  type,
  loading,
  value,
  onChange,
}) => {
  const styles =
    type !== SectionType.From
      ? { ...commonStyles, backgroundColor: "#f5f5f5" }
      : commonStyles;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      as="textarea"
      disabled={type === SectionType.To}
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  );
};
