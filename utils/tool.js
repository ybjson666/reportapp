export const reCalHeight=()=>{
    setTimeout(function (){
       var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
       window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
}

export const formatTime=(dateArr)=>{
    let year=dateArr[0];
    let month=dateArr[1]
    let day=dateArr[2];
    let hour=dateArr[3];
    let min=dateArr[4];
    let sec=dateArr[5];
    return `${year}-${month}-${day}  ${hour}:${min}:${sec}`;
}

export const tranStamp=(dateStr)=>{//将日期字符串转为时间戳
    let dateTmp = dateStr.replace(/-/g,'/')   //为了兼容IOS，需先将字符串转换为'2018/9/11 9:11:23'
    return Date.parse(dateTmp)                 //返回'2018-9-12 9:11:23'的时间戳
}
export const showModal=(title,icon="none")=>{
	uni.showToast({
	    title: title,
		icon,
	    duration: 2000
	});
}

//获取手机通讯录
export const getContact=()=>{
	return new Promise((resolve,reject)=>{
		plus.contacts.getAddressBook( plus.contacts.ADDRESSBOOK_PHONE, ( addressbook )=> {
				// 可通过addressbook进行通讯录操作
			addressbook.find(["displayName","phoneNumbers"],(contacts)=>{
				resolve(contacts)
			})
		}, function ( e ) {
			reject(e)
		} );
	})
	
}

export const maskStyle={
	position: 'fixed',
	bottom: 0,
	top: 0,
	left: 0,
	right: 0,
	zIndex:60,
	display:'flex',
	backgroundColor:'rgba(0, 0, 0, 0.5)',
	alignItems:'center',
	justifyContent:'center'
}