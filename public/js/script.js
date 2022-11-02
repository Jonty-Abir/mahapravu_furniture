const signUpFrom = document.querySelector("#signUp");

signUpFrom.onsubmit = async function (event) {
  const successToast = Toastify({
    text: "Sign Up successfull",
    duration: 300,
    position: "left",
    offset: {
      x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: 100, // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      width: "28rem",
      height: "3rem",
      paddingLeft: "8rem",
      paddingTop: "6px",
      margin: "auto",
      position: "relative",
      top: "10rem",
      let: "12rem",
      fontSize: "1.5rem",
      fontWeight: "bold",
      "z-index": "1",
    },
  });

  // clear error  visible
  const errorPlaceholders = document.querySelectorAll("p.error");
  for (let i = 0; i < errorPlaceholders.length; i++) {
    errorPlaceholders[i].style.visibility = "hidden";
  }
  event.preventDefault();
  let fromData = new FormData(signUpFrom);
  const res = await axios({ url: "/reg/", method: "POST", data: fromData });
  // console.log(res);
  if (res.data.error) {
    Object.entries(res.data.error.errors).forEach((filedName) => {
      const getClass = document.querySelector(`p.${filedName[0]}`);
      getClass.style.visibility = "visible";
      getClass.textContent = filedName[1].message;
    });
    // console.log(res.data.isEqual)
    if (!res.data.isEqual) {
      const confirmPwClass = document.querySelector(".pw2");
      confirmPwClass.style.visibility = "visible";
      confirmPwClass.textContent = "password not same!";
    }
    if (res.data.hasEmail) {
      const confirmPwClass = document.querySelector(".email");
      confirmPwClass.style.visibility = "visible";
      confirmPwClass.textContent = "email alreay used!";
    }
    if (res.data.hasNo) {
      const confirmPwClass = document.querySelector(".mobile");
      confirmPwClass.style.visibility = "visible";
      confirmPwClass.textContent = "number already used!";
    }
  }

  if (!res.data.error) {
    successToast.showToast();
    const timer = setInterval(() => {
      // location.reload();
      location.replace("/home");
    }, 500);
    if (timer) {
      clearImmediate(timer);
      alert("done");
    }
  }
};




