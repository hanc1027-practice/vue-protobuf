# 前端如何使用protobuf

### 此專案所以套件
1) axios
2) protobufjs
```bash
$ npm install axios protobufjs --save-dev
```

### 將*.proto檔案打包成xx.json或xx.js
- protobufjs 提供 pbjs 的工具，例如將其打包成json檔
```bash
$ npx pbjs -t json src/proto/*.proto > src/proto/proto.json
```

- 不過，輸出成js模組才是最不用的：
```bash
$ npx pbjs -t json-module -w commonjs -o src/proto/proto.js src/proto/*.proto
```
```-w``` 引數可以指定打包js的包裝器，這裡用的是commonjs