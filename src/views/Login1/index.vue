<template>
	<!--用户登录-->
	<div>
		<div class="cover" @click="close()"></div>
	
	<div class="login" >
		<div class="login-right">
			<h4>用户登录</h4>
			<div class="login-input">
				<span>
					<img src="./image/user.png">
				</span>
				<input placeholder="请填写手机号" v-model="phone" />
			</div>
			<div class="login-input">
				<span>
					<img src="./image/pword.png">
				</span>
				<input placeholder="请填写验证码" type="password" v-model="codenum" @keyup.enter="login" />
				<button class="getcode" @click="getCode()" :disabled="disabled">{{code}}</button>
			</div>
			<button class="login-btn" @click="login()"><span>登录</span></button>
		</div>
	</div>
	
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				checked: true,
				phone: '',
				codenum: '',
				code: '验证码',
				conut: '',
				disabled: false
			};
		},
		methods: {
			close(){
			   //alert("关闭")
				this.$emit('childevent')
			},
			getCode() {
				alert("获取验证码码")
				let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/
				if (this.mobile == "" || !regPhone.test(this.mobile)) {
					alert("手机格式输入不正确，请重新输入")
				} else {
					// 验证码axios接入
					let data = {
						mobile: this.mobile,
						remark: "农商行领券注册"
					}
					add(data).then(res => {
						//当短信发送成功开始计时
						if (res.data.code == 0) {
							// 计数器
							let count = 60
							let timer = setInterval(() => {
								this.disable = true
								count--
								this.code = count + 's'
								if (count == 0) {
									clearInterval(timer)
									this.code = "重新获取"
									this.disable = false
								}
							}, 1000)
						} else {
							alert(res.data.codemsg)
						}
					}).catch(err => {
						console.log(err);
					})
				}

			},
			login() {
				if (this.phone == '') {
					this.$toast("请输入手机号")
					return;
				}
				if (this.codenum == '') {
					this.$toast("请输入验证码")
					return;
				}
				let data = {
					name: this.phone,
					password: this.codenum,
				}
				add(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.$router.push({
							path: '/'
						})
					} else {
						this.$message({
							message: msg,
							type: 'error'
						});
					}

				}).catch(err => {
					console.log(err);
				});
				//console.log(data)
			}
		}
	}
</script>

<style scoped>
	.cover {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		top:0;
		position: fixed;
		z-index: 888;
		overflow: hidden;
	}
	.login {
		
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 999;
		top:2rem;
		width: 95%;
		margin-left: 2.5%;
	}

	.login .login-right {

		background: #fff;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		width: 100%;
		
		


	}

	.login .login-right h4 {
		font-size: 16px;
		word-spacing: 1px;
		color: #38210f;
		font-family: PingFang-SC-Bold;
		margin-bottom: .3rem;
		height: 16px;
		line-height: 35px;
		letter-spacing: 1px;
		color: #38210f;
		width: 278px;
	}

	.login .login-right .login-input {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 270px;
		height: 36px;
		background-color: #ffffff;
		border: solid 1px #e5e5e5;
		margin-bottom: .2rem;
	}

	.login .login-right .login-input span {
		margin-left: .05rem;

	}

	.login .login-right .login-input span img {
		padding-top: 4px;
		width: .2rem;
		height: .24rem;
	}

	.login .login-right .login-input input {
		margin-left: 10px;
		display: flex;
		align-items: center;
		border: none;
		background: none;

	}

	.login .login-right .login-btn {
		width: 277px;
		height: 40px;
		background: linear-gradient(90deg, #f3d924, #f7b602);
		border: none;
		margin-bottom: 17px;

	}

	.login .login-right .login-btn span {
		width: 36px;
		height: 17px;
		font-family: PingFang-SC-Bold;
		font-size: 18px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 35px;
		letter-spacing: 1px;
		color: #ffffff;
	}

	.getcode {
		font-size: .13rem;
		width: 1.1rem;
		height: 70%;
		margin-right: .02rem;
		color: #ffb000;
		;
		background: #ffb00075;
	}

	.disable {
		pointer-events: none;
	}
</style>
