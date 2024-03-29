import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import logo from "../../assets/Belajar_white 2.svg";

import { useDispatch } from "react-redux";
import { login } from "../../redux/Actions/AuthActions";

// import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [alert, setAlert] = useState("");
  // // const [alertStatus, setAlertStatus] = useState(false);

  //fungsi show/hidden password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // //animasi loading setelah button submit diklik

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(email, password, setIsLoading, navigate));
  };

  // useEffect(() => {
  //   // Fungsi untuk menyembunyikan alert setelah 3000 milidetik (3 detik)
  //   const hideAlert = () => {
  //     setAlert(""); // Menghapus pesan alert
  //   };

  //   // Memulai timeout ketika alertMessage berubah
  //   if (alert) {
  //     const timeoutId = setTimeout(hideAlert, 2500);

  //     // Membersihkan timeout jika komponen di-unmount atau alertMessage berubah
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [alert]);

  return (
    <>
      {/* <div className="lg:hidden flex justify-center items-center bg-DARKBLUE05 w-full h-20">
        <img src={logo} alt="logo" className="w-60 h-60" />
      </div> */}
      {/* <div className="hidden lg:flex justify-center items-center bg-DARKBLUE05 w-[30%] min-h-[100dvh]">
        <img src={logo} alt="logo" />
      </div> */}
      <div className="flex min-h-screen bg-DARKBLUE04 ">
        <div className="hidden lg:flex justify-center items-center bg-DARKBLUE05 w-[30%] min-h-[100dvh]">
          <img src={logo} alt="logo" />
        </div>
        <div className="w-[100%] lg:w-[70%] flex justify-start items-center mx-[23px] lg:px-[200px] 2xl:px-[300px] relative ">
          <form className="w-full" onSubmit={handleLogin}>
            <h1 className="text-[24px] font-bold text-DARKBLUE05 font-Montserrat mb-12 text-center">
              Masuk
            </h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="font-Poppins text-[15px] mb-[4px]">
                  ID Admin
                </label>
                <input
                  type="email"
                  className="border w-full py-3 px-4 rounded-2xl"
                  placeholder="ID Admin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <label className="font-Poppins text-[15px] mb-[4px]">
                    Password
                  </label>
                </div>
                <div className="relative ">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 "
                  >
                    {showPassword ? (
                      <FiEyeOff className="border-none" />
                    ) : (
                      <FiEye className="border-none" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full font-Poppins bg-DARKBLUE05 text-white py-[10px] rounded-2xl mt-5 hover:bg-DARKBLUE03"
            >
              {isLoading ? "Loading..." : "Masuk"}
            </button>
          </form>
        </div>

        {/* <div className="hidden lg:flex justify-center items-center bg-DARKBLUE05 w-[30%] min-h-[100dvh]">
          <img src={logo} alt="logo" />
        </div> */}
      </div>
    </>
  );
};

export default Login;
