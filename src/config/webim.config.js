/* eslint-disable */

const webIMConfig = {
  url: 'im-api.easemob.com',
  xmppURL: 'im-api.easemob.com',
  apiUrl: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
  appkey: '1149161031178682#ezhitongoasl',
  https: false,
  isMultiLoginSessions: true,
  isAutoLogin: true,
  isWindowSDK: false,
  isSandBox: false,
  isDebug: false,
  autoReconnectNumMax: 2,
  autoReconnectInterval: 2,
  isWebRTC: (/Firefox/.test(navigator.userAgent) || /WebKit/.test(navigator.userAgent)) && /^https\:$/.test(window.location.protocol),
  heartBeatWait: 4500,
  isHttpDNS: false,
  msgStatus: true,
  delivery: true,
  read: true,
  saveLocal: false,
  encrypt: {
    type: 'none'
  }
}

window.Strophe = {
  Request: function () {},
  Websocket: function () {}
}
window.WebIM = {}
window.WebIM.config = webIMConfig

export default webIMConfig
