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
					<i-input type="text" v-model="email" v-if="!visible">
            <Select v-model="emailSuffix" slot="append" style="width: 160px">
              <Option value="@shanlinjinrong.com">@shanlinjinrong.com</Option>
              <Option value="@shanlinbao.com">@shanlinbao.com</Option>
              <Option value="@shanlincaifu.com">@shanlincaifu.com</Option>
            </Select>
					</i-input>
				</FormItem>
			</i-Form>
		</Card>
	</div>
</template>

<script>
	import qs from "qs";
	export default {
		name: 'UserCenterEmail',
		data() {
			return {
				oldEmail: "",
				email: "",
				visible: true,
				emailSuffix: "@shanlinjinrong.com"
			}
		},
		methods: {
			//获取个人邮箱地址
			getEmail() {
				this.$ajax({
					method: 'get',
					url: '/user/getUserInfoById',
					headers: {
						token: '73bd4ae0e7f54219aea15e6183d3ed1a',
						uid: '960'
					},
					params: {
						uid: "960"
					}
				}).then((res) => {
					console.log("getUserInfoById", res.data)
					if(res.data.code == "000000") {
						this.oldEmail = res.data.data.email;
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {});
			},

			//修改邮箱地址
			submitEmail() {
				this.$ajax({
					method: 'post',
					url: '/user/updateEmail',
					headers: {
						token: '73bd4ae0e7f54219aea15e6183d3ed1a',
						uid: '960'
					},
					data:qs.stringify({
						email: this.email + this.emailSuffix
					})
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
				token: '73bd4ae0e7f54219aea15e6183d3ed1a',
				uid: '960'
			};
			this.getEmail();
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
