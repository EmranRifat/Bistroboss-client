import React, { useContext, useEffect, useRef, useState } from "react";
import signup from "../../assets/others/authentication2.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, setLoading, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [disable, setDisable] = useState(true);
  const captchaRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      setLoading(false);
      updateUserProfile(data.name, data.photoURL).then(() => {
        // console.log("user profile info");
        // send user info DB
        const userInfo = {
          name: data.name,
          email: data.email,
        };

        axiosPublic.post("/user", userInfo).then((res) => {
          console.log(res);
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created sduccessfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });

        navigate(from, { replace: true });
      });
    });
  };

  //google signUp
  const handleGoolgeSignIn = () =>
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/user", userInfo).then((res) => {
          console.log(res.data);
        });
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  return (
    <>
      <Helmet>
        <title>Restaurent | SignUp</title>
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
      </Helmet>
      <div className="hero lg:flex-row-reverse min-h-screen bg-base-200 ">
        <div className="md:flex  shadow-2xl  rounded-xl">
          <div className="card shrink-0 w-full max-w-sm ">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-2xl  font-bold text-center">SignUp..!</h1>
              <div className="form-control -mb-3 ">
                <label className="label">
                  <span className="label-text">Name </span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />

                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register(" photoURL", { required: true })}
                  placeholder="photo URL"
                  className="input input-bordered"
                />
                <div></div>

                {errors.photoURL && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control -my-3">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {errors.password && (
                  <span className="text-red-600">Password is required</span>
                )}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                {/* <label className="label">
                <LoadCanvasTemplate />
              </label> */}
                {/* <input
                type="text"
                name="captcha"
                ref={captchaRef}
                placeholder="Type captcha above"
                className="input input-bordered"
                required
              /> */}
                {/* <button
                onClick={handleValidateCaptcha}
                className="btn btn-outline btn-xs btn-accent mt-2"
              >
                Validate
              </button> */}
              </div>

              <div className="form-control mt-4">
                <input
                  className="btn btn-primary"
                  value="SignUp"
                  type="submit"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleGoolgeSignIn}
                  aria-label="Log in with Google"
                  className="p-3 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current "
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                  </svg>
                </button>
                <button
                  aria-label="Log in with Twitter"
                  className="p-3 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                  </svg>
                </button>
                <button
                  aria-label="Log in with GitHub"
                  className="p-3 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                  </svg>
                </button>
              </div>
              <p>
                <small className="text-blue-500 font-semibold hover:underline ">
                  Already have an account ?
                  <Link to="/login" className="hover:font-bold">
                    {" "}
                    Please login
                  </Link>{" "}
                </small>
              </p>
            </form>
          </div>
          <div className="md:mt-14 w-80 md:w-full mt-8 lg:text-left">
            <img src={signup} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
