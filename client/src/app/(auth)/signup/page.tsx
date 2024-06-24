"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  // signup mutation will be added later
  const [signup, { loading }] = useMutation(SIGN_UP, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  // type any for now
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signup({
        variables: {
          input: signUpData,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");
    }
  };

  // type any for now
  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">SignUp Page</div>
  );
};

export default SignUpPage;
