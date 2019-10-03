var form = layui.form;
var table = layui.table;
let server = 'http://localhost:81';
// 添加书本信息
form.on('submit(addcar)', function (data) {
  layer.msg(JSON.stringify(data.field));
  // 使用ajax把数据提交给服务器
  let url = `http://localhost:81/car/add?`;
  // {"bookname":"1","cover":"2","author":"3","translate":"4","status":"4","abstruct":"5","feature":"6"}
  let isFirst = true;
  for (const key in data.field) {
    if (data.field.hasOwnProperty(key)) {
      url += (isFirst ? '' : '&') + `${key}=${encodeURIComponent(data.field[key])}`;
      isFirst = false;
    }
  }
  console.log(url);
  let xhr = new XMLHttpRequest();
  xhr.open('get', url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;
    // 服务器状态判断
    if (xhr.status != 200) {
      console.log('服务器出错');
      return;
    }
    let r = JSON.parse(xhr.responseText);
    console.log(r);
  }
  return false;
});
form.on('submit(inquire)', function (data) {
  layer.msg(JSON.stringify(data.field));
  // 使用ajax把数据提交给服务器
  let url = `http://localhost:81/query/look?`;
  // {"bookname":"1","cover":"2","author":"3","translate":"4","status":"4","abstruct":"5","feature":"6"}
  let isFirst = true;
  for (const key in data.field) {
    if (data.field.hasOwnProperty(key)) {
      url += (isFirst ? '' : '&') + `${key}=${encodeURIComponent(data.field[key])}`;
      isFirst = false;
    }
  }
  console.log(url);
  let xhr = new XMLHttpRequest();
  xhr.open('get', url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;
    // 服务器状态判断
    if (xhr.status != 200) {
      console.log('服务器出错');
      return;
    }
    let r = JSON.parse(xhr.responseText);
    console.log(r);
  }
  return false;
});

//第一个实例
table.render({
  elem: '#bookslist',
  height: 500,
  url: 'http://localhost:81/car/list',
  page: true,
  col: [
    [{
      field: 'uid',
      title: 'ID',
      width: 80,
      sort: true,
      fixed: 'left'
    }, {
      field: 'carname',
      title: '车辆名称',
      width: 80,
      sort: true
    }, {
      field: 'tp',
      title: '出产商',
      width: 80,
      sort: true
    }, {
      field: 'pd',
      title: '生产商',
      width: 80,
      sort: true
    }, {
      field: 'ad',
      title: '价格信息',
      width: 80,
      sort: true
    }, {
      field: 'ae',
      title: '车辆测评',
      width: 80,
      sort: true
    },{
      fixed:'right',
      width:150,
      align:'center',
      toolbar:'#barDemo'
    }]
  ]
});
// table.render({
// 	elem: '#catelist'
// 	, height: 312
// 	, url: 'http://lulaoshi:81/cate/list' //数据接口
// 	, page: true //开启分页
// 	, cols: [[ //表头
// 		{ field: 'cid', title: 'ID', width: 80, sort: true, fixed: 'left' }
// 		, { field: 'catename', title: '分类名', width: 80 }
// 	]]
// });

//文件上传
var upload = layui.upload;
var uploadInst = upload.render({
  elem: '#cover',
  url: `${server}/upload/`,
  field: 'cover',
  done: function (res) {
    console.log(res);
    document.querySelector('input[name="imgs"]').value = res.src;
    document.querySelector('#showimg').src = res.src;
    document.querySelector('#showimg').getElementsByClassName.display = 'block';
  },
  error: function () {
    console.log(1);

  }
});
table.on('tool(bookslist)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
	var data = obj.data; //获得当前行数据
	var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
	var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
	if (layEvent === 'del') { //删除
		layer.confirm('真的删除行么', function (index) {
			console.log(data);
			//向服务端发送删除指令
			axios
				.get(`${server}/books/del`, {
					params: {
						bid: data.bid
					}
				})
				.then(res => {
					console.log(res);
					obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
					layer.close(index);
				})
				.catch(err => {
					console.error(err);
				})
		});
	} else if (layEvent === 'edit') { //编辑
		//do something
		window.location.href = './editbook.html?bid=' + data.bid;
	}
});