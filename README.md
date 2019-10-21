# 前端如何使用protobuf
[參考文章](https://www.itread01.com/lcpql.html)

### protobuf使用流程
1. 將後端提供的所有的proto檔案copy進 `src/proto` 資料夾
2. 執行 `npm run proto` 生成proto.js
3. 根據接口列舉在 `src/api` 下寫接口
4. `.vue` 檔案中使用接口

### 此專案所用套件
1) axios
2) protobufjs
```bash
$ npm install axios protobufjs --save-dev
```

### 將`*.proto`檔案打包成xx.json或xx.js
1) protobufjs 提供 pbjs 的工具，例如將其打包成json檔
```bash
$ npx pbjs -t json src/proto/*.proto > src/proto/proto.json
```

2) 不過，輸出成js模組才是最有用的：
```bash
$ npx pbjs -t json-module -w commonjs -o src/proto/proto.js src/proto/*.proto
```
```-w``` 引數可以指定打包js的包裝器，這裡用的是commonjs

- 已寫好`*.proto`轉js檔的指令：
```bash
$ npm run proto
# 更新proto檔案後，執行此指令即可重新生成最新的proto.js
```