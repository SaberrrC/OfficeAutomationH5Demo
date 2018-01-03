import Vue from 'vue'

import '../../static/js/webim.config.js'
import '../../static/js/strophe-1.2.8.min.js'
import '../../static/js/websdk-1.4.12.js'
import '../../static/js/adapter.js'
import '../../static/js/webrtc-1.4.13.js'

/* eslint-disable */

const conn = new WebIM.connection(window.WebIM.config)
Vue.prototype.$WebIM = window.WebIM
Vue.prototype.$conn = conn
