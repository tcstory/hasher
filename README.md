
### Hasher
一个很方便的类,用来处理url的hash,它能轻松的解析出hash中的参数
```
var h = new Hasher(true); // 传入true表示自动监控url的变化
h.add('test','test1'); // 添加一个参数到hash中
h.remove('test'); // 把test参数删除掉
```

### Licence
MIT
