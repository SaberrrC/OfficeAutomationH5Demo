<template>
	<div class="user-center-password">
		<Card>
			<p slot="title">个人密码修改</p>
			<Button type="primary" slot="extra" class="card-title-extra" @click="handleSubmit('formCustom')">保存</Button>
			<i-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" style="width:400px;">
				<FormItem label="原始密码" prop="oldpassword">
					<Input type="password" v-model="formCustom.oldpassword"></Input>
				</FormItem>
				<FormItem label="新密码" prop="newpassword">
					<Input type="password" v-model="formCustom.newpassword"></Input>
				</FormItem>
				<FormItem label="确认密码" prop="checkpassword">
					<Input type="password" v-model="formCustom.checkpassword"></Input>
				</FormItem>
			</i-Form>
		</Card>
	</div>
</template>

<script>
	import qs from "qs";
	export default {
		name: 'UserCenterPassword',
		data() {
			const validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入新密码'));
				} else {
					if(this.formCustom.checkpassword !== '') {
						// 对第二个密码框单独验证
						this.$refs.formCustom.validateField('checkpassword');
					}
					callback();
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.formCustom.newpassword) {
					callback(new Error('两次密码不匹配，请重新输入!'));
				} else {
					callback();
				}
			};
			const validatePassOld = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入原始密码'));
				} else{
					callback();
				}
			};
			return {
				formCustom: {
					oldpassword: "",
					newpassword: "",
					checkpassword: ""
				},
				ruleCustom: {
					oldpassword: [{
						validator: validatePassOld,
						trigger: 'blur'
					}],
					newpassword: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkpassword: [{
						validator: validatePassCheck,
						trigger: 'blur'
					}]
				}
			}
		},

		methods: {
			//个人密码修改保存
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$ajax({
							method: 'post',
							url: '/user/changepwd',
							headers: {
								token: '73bd4ae0e7f54219aea15e6183d3ed1a',
								uid: '960'
							},
							data: qs.stringify({
								oldpassword: this.formCustom.oldpassword,
								newpassword: this.formCustom.newpassword
							})
						}).then((res) => {
							console.log("newsSubmit", res.data)
							if(res.data.code == "000000") {
								this.$Message.success('密码修改成功');
								this.$refs[name].resetFields();
							} else {
								this.$Message.error(res.data.message);
							}
						}, (res) => {});
					}
				})
			}
		},

		created() {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.user-center-password {
		padding: 16px;
		.card-title-extra {
			position: absolute;
			top: -4px;
			right: 0;
		}
	}
</style>
