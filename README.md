# 前端使用protobuf

### protobuf使用流程
1. 將後端提供的所有的proto檔案copy進 `src/proto` 資料夾
2. 執行 `npm run proto` 生成js檔

### 此專案所用套件
1) axios
2) google-protobuf
```bash
$ npm install axios google-protobuf --save-dev
```

### 將`*.proto`檔案打包成js檔
1) 
```bash
$ cd src/proto/
$ protoc --js_out=import_style=commonjs,binary:. awesome.proto

- 已寫好`*.proto`轉js檔的指令：
```bash
$ npm run proto
# 更新proto檔案後，執行此指令即可重新生成最新的js
```