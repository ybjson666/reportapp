export const reg_phone = /^1\d{10}$/;
//密码正则
export const reg_pwd = /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/;
//邮箱正则
export const reg_email=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
//银行卡正则
export const reg_card=/^([1-9]{1})(\d{15}|\d{16}|\d{18})$/;