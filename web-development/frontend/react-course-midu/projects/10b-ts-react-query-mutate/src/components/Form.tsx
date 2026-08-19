export const FormInput = () => (
  <div className="form-group">
    <label htmlFor="title">Introduce título</label>

    <input
      name="title"
      type="text"
      id="title"
      placeholder="Introduce un título"
    />
  </div>
);

export const FormTextArea = () => (
  <div className="form-group">
    <label htmlFor="message">Comentario</label>

    <textarea
      name="message"
      id="message"
      rows={5}
      placeholder="Quería comentar que..."
    />
  </div>
);
