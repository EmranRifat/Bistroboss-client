import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
// import OTPInput from "react-otp-input";
import { BsTelephoneFill, BsShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OTPInput, { ResendOTP } from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier } from "firebase/auth";
import { AuthContext } from "../../Context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const FormikForm = () => {
  const { auth } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(5, "Password is too short")
        .required("Required")
        .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter"),
    }),
    onSubmit: (values) => {
      console.log(formik);
    },
  });

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
            onSignup();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;

    const phoneNumber = "+" + phone;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        setLoading(false);
        setShowOTP(true);
        toast.success(" OTP sended Successfully !");
        // ...
      })

      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Failed to send OTP. Please try again.");

        // Error; SMS not sent
        // ...
      });

  }
  function onOTPVerify(){
    setLoading(true);
    window.confirmationResult
    .confirm(otp)
    .then(async (res)=>{
      console.log(res);
      setUser(res.user)
      setLoading(false);

    })
    .then((err)=>{
      console.log(err);
      setLoading(false)
    })

  }

  return (
    <div className="py-10 flex  justify-evenly">
      {/* <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input input-bordered w-full"
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <br />

        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input input-bordered w-full"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <br />

        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input input-bordered w-full"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <br />

        <button className="btn w-full btn-accent" type="submit">
          Submit
        </button>
      </form> */}

      {/**************************************/}
      {/*  otp form start here  */}

      {/******************************************/}

      <div className="bg-emerald-500 p-12 rounded-lg ">
        <Toaster toastOptions={{ duration: 4000 }}></Toaster>
        <div id="recaptcha-container"></div>
        {!user ? (
          <div>
            <h1 className="text-xl font-bold  text-white flex justify-center items-center">
              {" "}
              Welcome to OTP Verification
            </h1>

            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-3 rounded-full my-4">
                  <BsShieldLockFill size={30} />
                </div>
                <div className=" text-center">
                  <label
                    htmlFor="otp"
                    className="font-bold text-xl text-white "
                  >
                    Enter your OTP
                  </label>
                </div>
                <OTPInput
                  className="py-4 flex justify-between gap-2  "
                  value={otp}
                  onChange={setOtp}
                  autoFocus
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                  secure
                />

                <ResendOTP
                  onResendClick={() => console.log("Resend clicked")}
                />

                <button onClick={onOTPVerify} className="btn btn-sm text-white  bg-emerald-700 w-full flex gap-1 items-center justify-center my-4  border-none">
                  {loading && <CgSpinner className="animate-spin " size={20} />}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-3 rounded-full my-4">
                  <BsTelephoneFill size={30} />
                </div>
                <div className=" py-1">
                  <label htmlFor="otp" className="font-semibold  text-white ">
                    Verify phone number
                  </label>
                </div>

                <PhoneInput country={"us"} value={phone} onChange={setPhone} />

                <button onClick={onSignup} className="btn btn-sm text-white  bg-emerald-700 w-full flex gap-1 items-center justify-center my-4  border-none">
                  {loading && <CgSpinner className="animate-spin " size={20} />}
                  <span>Send code by SMS</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <h2 className="text-xl font-bold text-center mt-20 text-white ">
            👍 Login success..
          </h2>
        )}
      </div>
    </div>
  );
};

export default FormikForm;
