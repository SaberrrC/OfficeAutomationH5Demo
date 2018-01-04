
const state = {
  userInfo: {},
  sidebar: [],
  organization: [],
  writeStructIsShow: false, // 右侧栏写入框是否显示  默认为false    每次用户选择当前群组或聊天对象时才显示
  userinfo: {}, // 当前用户的所有资料
  imUser: { // 个人账号密码
    userName: '', // SL_011000066
    password: '123456'
  },
  list: [], // 当前聊天列表
  groupIdShow: '',
  openChatSid: '',
  other: '', // 对方的账号或群ID
  otherInfo: {},
  userInfoDb: {}, // 所有用户的信息集合
  personnelistIndex: 0,
  showSid: '', // personneList.vue 改变背景色
  grossNumber: 0, // 全部未读消息
  has: 0,
  singChatbox: {}, // 对话 结构列表
  singChatlist: [], // 当前对话消息列表
  currentChatObj: [],
  TXGroup: [], // 群组
  TXRoom: [], // 聊天室
  // menus: [],
  // rules: [],
  // userGroups: [],
  image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBcRXhpZgAATU0AKgAAAAgABAMCAAIAAAAWAAAAPlEQAAEAAAABAQAAAFERAAQAAAABAAAOxFESAAQAAAABAAAOxAAAAABQaG90b3Nob3AgSUNDIHByb2ZpbGUA/' +
  '+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0' +
  'IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'ARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAA' +
  'UZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAA' +
  'BDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1J' +
  'HQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAA' +
  'BjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSU' +
  'VDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvb' +
  'mRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAA' +
  'AAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsB' +
  'MgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQ' +
  'R+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCo' +
  'EKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQx' +
  'NjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+Huk' +
  'fEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLh' +
  'YuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOd' +
  'BKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4F' +
  'gvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQU' +
  'dHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSW' +
  'n5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS' +
  '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' +
  'kH0r96if5uYOTaP/Z'
}

export default state
