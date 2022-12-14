import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { LoginContext } from "../../providers/Login";
import Dashboard from "../Dashboard";
import { Box, Typography, TextField, Button } from "@mui/material";

interface FormValuesLogin {
  email: string;
  password: string;
}

const Login = () => {
  const { Login } = useContext(LoginContext);

  const schema = yup.object().shape({
    email: yup.string().required("Email obrigatório!"),
    password: yup.string().required("Senha obrigatória!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesLogin>({ resolver: yupResolver(schema) });

  const onSubmitFunction = (data: FormValuesLogin) => {
    Login(data);
  };

  if (localStorage.getItem("token")) {
    return <Dashboard />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "Center",
        width: "400px",
        bgcolor: "#e3f2fd",
        borderRadius: "1ch",
        margin: "0 auto",
        marginTop: "10%",
        height: "50%",

        minHeight: "480px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontWeight: "bold",
          marginTop: "40px",
          color: "#369293",
        }}
      >
        Olá, Seja bem-vindo! <p>Faça seu Login</p>
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: "14px",
          fontWeight: "regular",
          marginTop: "10px",
          color: "#a6a6a6",
        }}
      >
        Coloque suas credenciais
      </Typography>
      <form>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "40ch",
          }}
        >
          <TextField
            id="account-id"
            label="Conta"
            variant="standard"
            sx={{
              m: 1,
              width: "100%",
              marginBottom: "20px",
            }}
            {...register("email")}
          />
          {errors.email && errors.email.type === "required" && (
            <Box
              component="p"
              role="alert"
              sx={{
                display: "flex",
                color: "red",
                width: "100%",
                marginTop: "-12px",
                paddingBottom: 2,
              }}
            >
              Campo obrigatório
            </Box>
          )}
          <TextField
            id="senha-id"
            label="Senha"
            variant="standard"
            type="password"
            sx={{
              width: "100%",
              marginBottom: "20px",
            }}
            {...register("password")}
          />
          {errors.password && errors.password.type === "required" && (
            <Box
              component="p"
              role="alert"
              sx={{
                display: "flex",
                color: "red",
                width: "100%",
                marginTop: "-12px",
                paddingBottom: 2,
              }}
            >
              Campo obrigatório
            </Box>
          )}

          <Button
            variant="contained"
            sx={{
              bgcolor: "#369293",
              marginTop: "60px",
              marginBottom: "20px",
              "&:hover": {
                bgcolor: "#369293",
                opacity: 0.9,
              },
            }}
            type="submit"
            onClick={handleSubmit(onSubmitFunction)}
          >
            Fazer Login
          </Button>

          <Box
            component="a"
            role="alert"
            href="/register"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a6a6a6",
              width: "100%",
              paddingBottom: 2,
            }}
          >
            Registre-se! Clique aqui.
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
