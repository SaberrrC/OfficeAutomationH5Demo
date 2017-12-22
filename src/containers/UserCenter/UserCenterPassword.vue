<template>
	<div class="user-center-password">
		<Card>
			<p slot="title">个人密码修改</p>
			<Button type="primary" slot="extra" class="card-title-extra" @click="submitPassword">保存</Button>
			<i-form :label-width="80" style="width:400px;">
				<FormItem label="原始密码">
					<Input type="password" v-model="oldpassword"></Input>
				</FormItem>
				<FormItem label="新密码">
					<Input type="password" v-model="newpassword"></Input>
				</FormItem>
				<FormItem label="确认密码">
					<Input type="password" v-model="checkpassword"></Input>
				</FormItem>
			</i-Form>
		</Card>
	</div>
</template>

<script>
	export default {
		name: 'UserCenterPassword',
		data() {
			return {
				oldpassword: "",
				newpassword: "",
				checkpassword: ""
			}
		},

		methods: {
			//个人密码修改保存
			submitPassword() {
				this.$ajax({
					method: 'post',
					url: '/oa-web/user/changepwd',
					headers: {
						token: '0030223a82984787b370a720d024b50c',
						uid: '960'
					},
					data: {
						oldpassword: this.oldpassword,
						newpassword: this.newpassword
					}
				}).then((res) => {
					console.log("newsSubmit", res.data)
					if(res.data.code == "000000") {
						this.$Message.success('发布成功');
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {});
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