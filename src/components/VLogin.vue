<script setup lang="ts">

import { useAuth, NotifyProps } from '../hooks';

const { login, register, loginWithGoogle, loginWithGithub, passwordReset } = useAuth()

const { state } = useStore();

const toggle = ref(false);

const lead = reactive({
  name: "",
  email: "",
  password: "",
});

const member = reactive({
  email: "",
  password: "",
});


const rightPanelActive = computed(() => {
  return toggle.value ? "right-panel-active" : "";
});

const currentUser = computed(() => {
	return toggle.value ? lead : member
})

const emailRegexp = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
);

const passwordRegexp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
);

const emailValid = computed(() => {
  return emailRegexp.test(currentUser.value.email);
});

const passwordValid = computed(() => {
  return passwordRegexp.test(currentUser.value.password);
});


const resetPassword = async (email:string) => {
  emailValid.value ? await passwordReset(email) :  state.notifications.push({mode: "error", text: "Please enter a valid email address", icon: "mdi-alert-circle", timeout: 5000})
}
const logIn = async () => {
  if (emailValid.value && passwordValid.value) {
	await login(currentUser.value.email, currentUser.value.password);
  } else {
	emailValid.value ? state.notifications.push({mode: "error", text: "Invalid password", icon: "mdi-alert-circle", timeout: 5000}) : state.notifications.push({mode: "error", text: "Invalid email", icon: "mdi-alert-circle", timeout: 5000})
  }
};

const signIn = async () => {
  if (emailValid.value && passwordValid.value) {
	await register(currentUser.value.email, currentUser.value.password);
  } else {
	emailValid.value ? state.notifications.push({mode: "error", text: "Invalid password", icon: "mdi-alert-circle", timeout: 5000}) : state.notifications.push({mode: "error", text: "Invalid email", icon: "mdi-alert-circle", timeout: 5000})
  }
};
</script>


<template>
<VMain class="col center">
	<div class="container fade-in" id="container" :class="rightPanelActive">
  <div class="form-container sign-up-container">
    <form>
      <h1>Create Account</h1>
      <div class="social-container">
		<a class="social"><Icon icon="logos:google-icon"
			cp scale @click="loginWithGoogle"
			/></a>
        <a class="social"><Icon icon="logos:github-icon"
			cp scale @click="loginWithGithub"
			/></a>
      </div>
      <span>or use your email for registration</span>
      <input type="text" placeholder="Name" v-model="lead.name" />
      <input type="email" placeholder="Email" v-model="lead.email" />
      <input type="password" placeholder="Password" v-model="lead.password" />
      <button
	  @click="signIn"
	  >
	  Sign Up</button>
    </form>
  </div>
  <div class="form-container sign-in-container"  >
    <form>
      <h1>Sign in</h1>
      <div class="social-container">
        <a class="social"><Icon icon="logos:google-icon"
			cp scale @click="loginWithGoogle"
			/></a>
        <a class="social"><Icon icon="logos:github-icon"
			cp scale @click="loginWithGithub"
			/></a>
      </div>
      <span>or use your account</span>
      <input type="email" placeholder="Email" v-model="member.email" />
      <input type="password" placeholder="Password" v-model="member.password" />
      <a class="forgot-password">Forgot your password? <strong class='hover:underline cursor-pointer' @click="resetPassword(member.email)">Reset</strong></a>
      <button
	  @click="logIn"	 
	  >Sign In</button>
    </form>
  </div>
  <div class="overlay-container">
    <div class="overlay">
      <div class="overlay-panel overlay-left">
        <h1>Already registered?</h1>
        <p>Login with your personal account</p>
        <button class="ghost" id="signIn"
		@click="toggle = !toggle"
		>Sign In</button>
      </div>
      <div class="overlay-panel overlay-right">
        <h1>Not registered yet?</h1>
        <p>Sign up with your preferred provider or with your email</p>	
        <button class="ghost" id="signUp"
		@click="toggle = !toggle"
		>Sign Up</button>
      </div>
    </div>
  </div>
</div>
</VMain>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

* {
	box-sizing: border-box;
}

body {
	background: #f6f5f7;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: 'Ubuntu', sans-serif;
	height: 100vh;
	margin: -20px 0 50px;
}

h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #4B2Bff;
	background-color: #4B2Bff;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	outline: none;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	outline: none;
	width: 100%;
}

.container {
	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
				0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.forgot-password {
	transition: letter-spacing .3s ease-in-out;
}

.forgot-password:hover {
	letter-spacing: 1px;
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #416Cff;
	background: -webkit-linear-gradient(to right, #4B2Bff, #416Cff);
	background: linear-gradient(to right, #4B2Bff, #416Cff);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

</style>