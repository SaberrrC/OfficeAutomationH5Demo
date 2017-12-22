<template>
	<div class="user-center-email">
		<Card>
			<p slot="title">个人邮箱修改</p>
			<div slot="extra" class="card-title-extra">
				<Button type="primary" @click="visible = false">修改</Button>
				<Button type="primary" @click="submitEmail">保存</Button>
			</div>
			<i-form :label-width="80" style="width:400px;">
				<FormItem label="个人邮箱">
					<span v-if="visible">{{oldEmail}}</span>
					<Input type="text" v-model="email" v-if="!visible">
					<Select v-model="emailSuffix" slot="append" style="width: 160px">
						<Option value="@shanlinjinrong.com">@shanlinjinrong.com</Option>
						<Option value="@shanlinbao.com">@shanlinbao.com</Option>
						<Option value="@shanlincaifu.com">@shanlincaifu.com</Option>
					</Select>
					</Input>
				</FormItem>
			</i-Form>
		</Card>
	</div>
</template>

<script>
	export default {
		name: 'UserCenterEmail',
		data() {
			return {
				oldEmail: "748115626@qq.com",
				email: "",
				visible: true,
				emailSuffix:""
			}
		},
		methods: {
			//获取个人邮箱地址
			getEmail() {
				this.$ajax({
					method: 'get',
					url: '/oa-web/user/getUserInfoById',
					headers: {
						token: '0030223a82984787b370a720d024b50c',
						uid: '960'
					},
					params: {
						uid: "960"
					}
				}).then((res) => {
					console.log("getUserInfoById", res.data)
					if(res.data.code == "000000") {
						this.formBasic = res.data.data;
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {});
			},
			
			//修改邮箱地址
			submitEmail(){
				this.$ajax({
					method: 'post',
					url: '/oa-web/user/updateEmail',
					headers: {
						token: '0030223a82984787b370a720d024b50c',
						uid: '960'
					},
					data: {
						email: this.email + this.emailSuffix
					}
				}).then((res) => {
					console.log("邮箱地址修改", res.data)
					if(res.data.code == "000000") {
						this.$Message.success('邮箱地址修改成功');
						this.visible = true;
						this.getEmail();
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {});
			}
		},

		mounted() {
			this.header = {
				token: '0030223a82984787b370a720d024b50c',
				uid: '960'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.user-center-email {
		padding: 16px;
		.card-title-extra {
			width: 117px;
			position: absolute;
			top: -4px;
			right: 0;
		}
	}
</style>