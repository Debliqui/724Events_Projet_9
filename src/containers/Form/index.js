import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
const clearValue = () => {
  const formData = document.getElementById("form");
  formData.reset();
  const selectData = document.querySelector(
    "#form .SelectTitle--show, #form .SelectTitle--hide"
  );
  if (selectData) {
    selectData.textContent = "";
  }
};

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        clearValue();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form id="form" onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" name="nom" />
          <Field placeholder="" label="Prénom" name="prenom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" name="email" />
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            name="message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
      <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
        {sending ? "En cours" : "Envoyer"}
      </Button>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
