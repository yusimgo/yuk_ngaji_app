import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

import isEmail from "validator/lib/isEmail";

import {
  auth,
  firestore,
  FieldValue,
  useFirebase
} from "../../components/FirebaseProvider";

import { Redirect } from "react-router-dom";

export default function Registrasi() {
  const classes = useStyles();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    notelp: "",
    password: "",
    ulangi_password: ""
  });

  const [error, setError] = useState({});

  const [isSubmitting, setSubmitting] = useState(false);

  const { user } = useFirebase();

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.nama) {
      newErrors.nama = "Nama wajib diisi";
    }

    if (!form.email) {
      newErrors.email = "Email wajib diisi";
    } else if (!isEmail(form.email)) {
      newErrors.email = "Email tidak valid";
    }

    if (!form.notelp) {
      newErrors.notelp = "No telp wajib diisi";
    }

    if (!form.password) {
      newErrors.password = "Password wajib diisi";
    }

    if (!form.ulangi_password) {
      newErrors.ulangi_password = "Ulangi Password wajib diisi";
    } else if (form.ulangi_password !== form.password) {
      newErrors.ulangi_password = "Ulangi Password tidak sama dengan Password";
    }

    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const findErrors = validate();

    console.log(Object.values(findErrors));
    if (Object.values(findErrors).some(message => message !== "")) {
      setError(findErrors);
    } else {
      setSubmitting(true);
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          form.email,
          form.password
        );

        await firestore.doc(`/profiles/${user.uid}`).set({
          nama: form.nama,
          email: form.email,
          notelp: form.notelp,
          password: form.password,
          createdAt: FieldValue.serverTimestamp()
        });
      } catch (e) {
        let newError = {};
        console.log(e.message);
        switch (e.code) {
          case "auth/email-already-in-use":
            newError.email = "Email sudah terdaftar";
            break;

          case "auth/invalid-email":
            newError.email = "Email tidak valid";
            break;

          case "auth/weak-password":
            newError.password = "Password lemah";
            break;

          case "auth/operation-not-allowed":
            newError.email = "Metode Email dan password tidak didukung";
            break;

          default:
            newError.email = "Terjadi kesalahan silahkan coba lagi";
            break;
        }

        setError(newError);
      }
      setSubmitting(false);
    }
  };

  if (user) {
    return <Redirect to="/chat" />;
  }

  return (
    <>
      <div className={classes.daftarBlock}>
        <div className={classes.daftarBox}>
          <div className={classes.logoBox}>{/* untuk logo */}</div>
          <Container maxWidth="xs">
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h1" className={classes.title}>
                Buat Akun Baru
              </Typography>
              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  id="nama"
                  name="nama"
                  label="Nama"
                  margin="normal"
                  fullWidth
                  required
                  variant="outlined"
                  value={form.nama}
                  onChange={handleChange}
                  error={error.nama ? true : false}
                  helperText={error.nama}
                  disable={isSubmitting}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  margin="normal"
                  fullWidth
                  required
                  variant="outlined"
                  value={form.email}
                  onChange={handleChange}
                  error={error.email ? true : false}
                  helperText={error.email}
                  disable={isSubmitting}
                />
                <TextField
                  id="notelp"
                  type="number"
                  name="notelp"
                  label="Notelp"
                  margin="normal"
                  fullWidth
                  required
                  variant="outlined"
                  value={form.notelp}
                  onChange={handleChange}
                  error={error.notelp ? true : false}
                  helperText={error.notelp}
                  disable={isSubmitting}
                />
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  autoComplete="new-password"
                  margin="normal"
                  fullWidth
                  required
                  variant="outlined"
                  value={form.password}
                  onChange={handleChange}
                  error={error.notelp ? true : false}
                  helperText={error.password}
                  disable={isSubmitting}
                />
                <TextField
                  id="ulangi_password"
                  type="password"
                  name="ulangi_password"
                  label="Ulangi Password"
                  autoComplete="new-password"
                  margin="normal"
                  fullWidth
                  required
                  variant="outlined"
                  value={form.ulangi_password}
                  onChange={handleChange}
                  error={error.ulangi_password ? true : false}
                  helperText={error.ulangi_password}
                  disable={isSubmitting}
                />
                <Grid container className={classes.button}>
                  <Grid item xs>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                      disable={isSubmitting}
                    >
                      Daftar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="large"
                      disable={isSubmitting}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </div>
      </div>
    </>
  );
}
