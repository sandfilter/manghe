let baseUrl = ""

if(process.env.NODE_ENV === 'development'){
	baseUrl ="https://hz.lvfws.com/" //"https://shop.tobetop.xyz/"//
}else{
	baseUrl ="https://hz.lvfws.com/" //"https://shop.tobetop.xyz/"//
}


export default {baseUrl}