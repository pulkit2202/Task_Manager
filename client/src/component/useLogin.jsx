import { useHistory } from "react-router-dom";
import { useAuthencation } from "./authContext";
import useUrl from "./useUrl";
import { useState } from "react";

let useLogin = () => {
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { url } = useUrl();

  // Read existing token from localStorage (if any)
  const cookie = localStorage.getItem("__toketasjy42562627");

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const pass = e.target[1].value;

    // Validate inputs
    setError({
      email: email ? "" : "Please, give your email",
      pass: pass ? "" : "Please, give your password",
    });

    if (email && pass) {
      fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Important to allow cookies to be sent/received
        body: JSON.stringify({
          email,
          pass,
          haveCookie: cookie ? true : false,
          isAuthenticated: cookie,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setError({
            msg: data.msg,
            color: data.color,
          });

          if (data.success) {
            e.target.reset();

            // Save JWT to localStorage if not already logged in
            if (!data.alreadyLogged && data.tokenx) {
              localStorage.setItem("__toketasjy42562627", data.tokenx);
            }

            // Redirect to dashboard
            history.push("/dasboard");
          }
        })
        .catch((err) => {
          console.error("Login failed:", err);
          setError({ msg: "Login request failed", color: "danger" });
        });
    }
  };

  const showPassword = (e) => {
    const passx = document.getElementById("password");
    if (open) {
      passx.type = "password";
      setOpen(false);
    } else {
      passx.type = "text";
      setOpen(true);
    }
  };

  return { showPassword, handleLogin, open, error };
};

export default useLogin;
