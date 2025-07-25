import { type Control, type SubmitHandler } from "react-hook-form";
import { ControlledInput, NavigateButton } from "@/components";
import { loginFormSchema, type LoginFormValues } from "@/models";
import styles from "./AdminLogin.module.css";
import { ActionButton } from "@/components";
import { useControlledForm } from "@/hooks";
import { useLogin } from "@refinedev/core";
import { Paths } from "@/routing";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { AuthErrorsNames } from "@/auth";
import { useIsAuthenticated } from "@refinedev/core";

export const AdminLogin = () => {
  const {
    wasBlurredRef,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useControlledForm<LoginFormValues>({
    schema: loginFormSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: login, isPending } = useLogin({
    v3LegacyAuthProviderCompatible: false,
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { data: authData } = useIsAuthenticated();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from;

  const handleLoginSuccess = useCallback(() => {
    navigate(from ?? Paths.AdminDashboard, { replace: true });
  }, [navigate, from]);

  useEffect(() => {
    if (authData?.authenticated) {
      handleLoginSuccess();
    }
  }, [authData?.authenticated, navigate, handleLoginSuccess]);

  const handler: SubmitHandler<LoginFormValues> = (data) => {
    if (!navigator.onLine) {
      setError(
        "No pudimos iniciar sesión. Revisa tu conexión a internet y vuelve a intentarlo."
      );
      return;
    }
    login(data, {
      onSuccess: (data) => {
        if (data.success) {
          setError(null);
          handleLoginSuccess();
        }
        if (!data.success) {
          console.error(`Error name: ${data.error?.name}`, data.error);
          if (data.error?.name === AuthErrorsNames.InvalidCredentials) {
            setError(
              "No pudimos iniciar sesión. Tu correo o contraseña parecen ser incorrectos — Revísalos y vuelve a intentarlo."
            );
            return;
          }
          if (data.error?.name === AuthErrorsNames.NetworkError) {
            setError(
              "No pudimos iniciar sesión. Revisa tu conexión a internet y vuelve a intentarlo."
            );
            return;
          }
          setError(
            "Error inesperado al intentar iniciar sesión. Revisa tu conexión a internet y vuelve a intentarlo."
          );
          return;
        }
      },
      onError: (error) => {
        console.error(error);
        setError(
          "Error al iniciar sesión. Revisa tu conexión a internet y vuelve a intentarlo."
        );
      },
    });
  };

  return (
    <div className={styles.container}>
      <NavigateButton
        to={Paths.Home}
        arrow
        arrowSide="left"
        className={styles.backButton}
      >
        Volver al inicio
      </NavigateButton>
      <div className={styles.errorContainer}>
        {error && (
          <>
            <TriangleAlert className={styles.icon} />
            <p>{error}</p>
          </>
        )}
      </div>
      <h1 className={styles.title}>Iniciar sesión como administrador</h1>
      <p className={styles.indications}>
        Ingrese sus credenciales de administrador para iniciar sesión.
      </p>
      <div className={styles.formWrapper}>
        <form onSubmit={() => handleSubmit(handler)} className={styles.form}>
          <div>
            <ControlledInput
              inputClassName={`${styles.input} ${errors.email ? styles.error : ""}`}
              name="email"
              control={control as Control<LoginFormValues>}
              label="Ingresa tu correo electrónico"
              type="email"
              error={errors.email}
              onChange={() => {
                if (wasBlurredRef.current) {
                  trigger("email");
                }
              }}
              onBlur={() => {
                if (!wasBlurredRef.current) {
                  wasBlurredRef.current = true;
                  trigger("email");
                }
              }}
            />
          </div>
          <div>
            <ControlledInput
              inputClassName={`${styles.input} ${errors.password ? styles.error : ""}`}
              name="password"
              control={control}
              label="Ingresa tu contraseña"
              type="password"
              error={errors.password}
              onChange={() => {
                if (wasBlurredRef.current) {
                  trigger("password");
                }
              }}
              onBlur={() => {
                if (!wasBlurredRef.current) {
                  wasBlurredRef.current = true;
                  trigger("password");
                }
              }}
            />
          </div>
          <ActionButton
            content={isPending ? "Iniciando sesión..." : "Iniciar sesión"}
            type="submit"
            disabled={isPending}
            onClick={handleSubmit(handler)}
          />
        </form>
      </div>
    </div>
  );
};
