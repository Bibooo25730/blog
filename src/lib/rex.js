// url
function isUrl (url) {
    return /^(http|https):\/\/(\S+)$/.test(url)
}
// 邮箱
function isemail(email){
   	 return  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
}

export {isUrl,isemail}
