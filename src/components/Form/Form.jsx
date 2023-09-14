import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      city,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [city, street, subject]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, []);
  useEffect(() => {
    if (!street || !city) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [street, city]);

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  return (
    <div className="form">
      <h3>Введите ваши данные</h3>

      <input
        className="input"
        type="text"
        placeholder="Город"
        value={city}
        onChange={onChangeCity}
      />

      <input
        className="input"
        type="text"
        placeholder="Улица"
        value={street}
        onChange={onChangeStreet}
      />

      <select value={subject} onChange={onChangeSubject} className="select">
        <option value={"physical"}>Физ. лицо</option>
        <option value={"legal"}>Юр. лицо</option>
      </select>
    </div>
  );
};

export default Form;
