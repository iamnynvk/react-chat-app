import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/common/CustomInput";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setIsCurrentUser, setLoginUser } from "../store/userSlice";

const formFields = [
  { label: "Email", id: "email", name: "email", type: "email" },
  { label: "Password", id: "password", name: "password", type: "password" },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.data);
  const [error, setIsError] = useState("");

  const handleLogin = (values, { setSubmitting }) => {
    setIsError("");
    const userExists = userList.some(
      (user) => user.email === values.email && user.password === values.password
    );

    setTimeout(() => {
      if (userExists) {
        dispatch(setIsCurrentUser(true));
        dispatch(setLoginUser({ email: values.email }));
        navigate("/dashboard");
      } else {
        setIsError("User not found!");
      }
      setSubmitting(false);
    }, 400);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {error && (
        <div className="border-2 p-2 bord rounded-md mb-2 border-rose-600">
          <p className="font-semibold">{error}</p>
        </div>
      )}
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required email fields!";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            } else if (!values.password) {
              errors.password = "Required password fields!";
            }
            return errors;
          }}
          onSubmit={handleLogin}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form method="POST" onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <CustomInput
                  key={field.id}
                  label={field.label}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors[field.name]}
                  touch={touched}
                />
              ))}
              <button
                type="submit"
                className={`w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-700 focus:outline-none ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="loader"></div>
                    <span className="ml-2">Logining...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              <div className="mt-5">
                <p className="text-black	">
                  Does't have an account?{" "}
                  <Link to="/registration" className="text-blue-500">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
