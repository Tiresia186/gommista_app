import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Alert,
  Radio,
  Button,
  Form,
  Space,
  DatePicker,
} from "antd";
import db from "../bd";
import moment from "moment";
import { getDatabase, ref, set } from "firebase/database";

const Nuovo = () => {
  const [lavorazione, setLavorazione] = useState({
    numero: 0,
    date: "",
    nome: "",
   battistrada:'',
    cognome: "",
    nomeAzienda: "",
    modello: "",
    targa: "",
    telefono: "",
    mail: "",
    quantità: 0,
    misura: "",
    marca: "",
    cerchi: "",
  });
  const [success, setSuccess] = useState(false);
  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    console.log("Lavorazione", lavorazione);
  }, [lavorazione]);

  const onChangeDate = (data, dateString) => {
   
    setLavorazione({ ...lavorazione, date: dateString });
  };

  const addLavorazione = (lavorazione) => {
    const db = getDatabase();
    set(ref(db, "lavorazione/" + lavorazione.numero), lavorazione);
    setSuccess(true);
    clear();
    console.log("[LAVORAZIONE]", lavorazione.date); //il valore date è undefined anche se dovrebbe essere una stringa 'DD/MM/YYYY'
    console.log("[PRE-TIMEOUT", success);
    setTimeout(() => {
      setSuccess(false);
      console.log("[TIMEOUT]", success);
    }, 5000);
  };

  //2WAY BINDING FORM
  function onChange(e) {
    const value = e.target.value ;
    setLavorazione({
      ...lavorazione,
      [e.target.name]: value
    });

    console.log("[CHANGE-VALUE]", value);
    console.log("[event]", e);
  }
  const [form] = Form.useForm();
  const clear = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={addLavorazione}
      autoComplete="off"
    >
      <Row>
        <Col lg={12} xs={24} sm={24} className="form-container">
          <h2>CODICE LAVORAZIONE</h2>
          <Form.Item name="numero" label="Numero" rules={[{ required: true }]}>
            <Input
              placeholder="Numero"
              value={lavorazione.numero}
              name="numero"
              onChange={onChange}
            />
          </Form.Item>

          <Space direction="vertical">
            <DatePicker
              onChange={onChangeDate}
              format={dateFormat}
              placeholder="Scegli la Data"
              name="date"
            />
          </Space>

          <h2>ANAGRAFICA CLIENTE</h2>
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true }, { type: "string", min: 3 }]}
          >
            <Input
              placeholder="Nome"
              value={lavorazione.nome}
              name="nome"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="cognome"
            label="Cognome"
            rules={[{ required: true }, { type: "string", min: 3 }]}
          >
            <Input
              placeholder="Cognome"
              value={lavorazione.cognome}
              name="cognome"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="nomeAzienda"
            label="Nome Azienda"
            rules={[{ required: false }, { type: "string", min: 3 }]}
            initialValue={''}
          >
            <Input
              placeholder="Nome Azienda"
              
              value={lavorazione.nomeAzienda } 
              name="nomeAzienda"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="modello"
            label="Modello"
            rules={[{ required: true }, { type: "string", min: 3 }]}
          >
            <Input
              placeholder="Modello di auto"
              value={lavorazione.modello}
              name="modello"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="targa"
            label="Targa"
            rules={[{ required: true }, { type: "string", min: 3 }]}
          >
            <Input
              placeholder="Numero di targa"
              value={lavorazione.targa}
              name="targa"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="telefono"
            label="Numero di Telefono"
            rules={[{ required: true }, {  min: 10 }]}
          >
            <Input
              placeholder="Numero di telefono"
              type='number'
              value={lavorazione.telefono}
              name="telefono"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            initialValue={''}

            rules={[
              { required: false },
              { type: "email", warningOnly: true },
              { type: "string",  },
            ]}
          >
            <Input
              placeholder="Email"
            
              value={lavorazione.mail }
              name="mail"
              onChange={onChange}
            />
          </Form.Item>

          <h2>SERVIZIO</h2>
          <Form.Item
            name="quantità"
            label="Quantità"
            rules={[{ required: true }, { type: 'string', min: 1 }]}
          >
            <Input
              type="number"
              placeholder="Numero di gomme "
              value={lavorazione.quantità}
              name="quantità"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="misura"
            label="Misura"
            rules={[{ required: true }, { type: "string", min: 2 }]}
          >
            <Input
              value={lavorazione.misura}
              name="misura"
              onChange={onChange}
            />
          </Form.Item>
          
          <Form.Item
            name="marca"
            label="Marca"
            rules={[{ required: true }, { type: "string", min: 3 }]}
          >
            <Input
              placeholder="Marca gomme"
              value={lavorazione.marca}
              name="marca"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="battistrada"
            label="Battistrada residuo (mm)"
            initialValue={''}
          >
            <Input
              placeholder="Battistrada residuo (mm)"
            
              value={lavorazione.battistrada }
              name="battistrada"
              onChange={onChange}
            />
          </Form.Item>
          
          <Form.Item name="cerchi" label="Cerchi" rules={[{ required: true }]}>
            <Radio.Group
              value={lavorazione.cerchi}
              name="cerchi"
              onChange={onChange}
            >
              <Radio value={"si"}>Si</Radio>
              <Radio value={"no"}>No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Aggiungi
              </Button>
              {success && (
                <Alert
                  message="la lavorazione è stata aggiunta con successo"
                  type="success"
                  style={{ marginTop: "16px" }}
                />
              )}
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Nuovo;
