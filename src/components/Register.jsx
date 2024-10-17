import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  sifre: "",
};

const errorMessages = {
  ad: "En az 3 harfli olmalıdır.",
  soyad: "En az 3 harfli olmalıdır.",
  email: "Geçerli bir mail olmalıdır.",
  sifre: "En az 8 karakterli ve en az 1 büyük harf, rakam ve sembol içermeli.",
};

export default function Register() {
  const [formData, setFormData] = useState(initialValues);

  const [error, setError] = useState({
    ad: false,
    soyad: false,
    email: false,
    sifre: false,
  });

  const [isValid, setIsValid] = useState(false);
  const [id, setID] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  useEffect(() => {
    if (
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 3 &&
      validateEmail(formData.email) &&
      regex.test(formData.sifre)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name == "ad") {
      if (value.trim().length >= 3) {
        setError({ ...error, [name]: false });
      } else {
        setError({ ...error, [name]: true });
      }
    }

    if (name == "soyad") {
      if (value.trim().length >= 3) {
        setError({ ...error, [name]: false });
      } else {
        setError({ ...error, [name]: true });
      }
    }
    if (name == "email") {
      if (validateEmail(value)) {
        setError({ ...error, [name]: false });
      } else {
        setError({ ...error, [name]: true });
      }
    }
    if (name == "sifre") {
      if (regex.test(value)) {
        setError({ ...error, [name]: false });
      } else {
        setError({ ...error, [name]: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => {
        console.log(response);
        setID(response.data.id);
        setFormData(initialValues);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <>
      <Card>
        <CardHeader>Kayıt Formu</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="ad">Ad</Label>
              <Input
                id="ad"
                name="ad"
                placeholder="Adınız"
                type="text"
                onChange={handleChange}
                value={formData.ad}
                invalid={error.ad}
              />
              {error.ad && <FormFeedback>{errorMessages.ad}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="soyad">Soyad</Label>
              <Input
                id="soyad"
                name="soyad"
                placeholder="Soyadınız"
                type="text"
                onChange={handleChange}
                value={formData.soyad}
                invalid={error.soyad}
              />
              {error.soyad && (
                <FormFeedback>{errorMessages.soyad}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Mailiniz"
                type="email"
                onChange={handleChange}
                value={formData.email}
                invalid={error.email}
              />
              {error.email && (
                <FormFeedback>{errorMessages.email}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="sifre">Şifre</Label>
              <Input
                id="sifre"
                name="sifre"
                placeholder="Şifreniz"
                type="password"
                onChange={handleChange}
                value={formData.sifre}
                invalid={error.sifre}
              />
              {error.sifre && (
                <FormFeedback>{errorMessages.sifre}</FormFeedback>
              )}
            </FormGroup>
            <Button disabled={!isValid}>Kayıt Ol</Button>
          </Form>
        </CardBody>
        <CardFooter>ID:{id}</CardFooter>
      </Card>
    </>
  );
}
