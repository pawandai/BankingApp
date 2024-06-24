import { useMutation } from "@apollo/client";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  // type any for now
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // type any for now
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password)
      return toast.error("Please fill in all fields");
    try {
      await login({ variables: { input: loginData } });
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Something went wrong!");
    }
  };

  return <div>SignUpPage</div>;
};

export default SignUpPage;
