<template>
  <div class="hello">
    <button @click="protobufferTest">前端自設資料之按鈕(點選後，請看Console)</button>&nbsp;
    <button @click="AxiosGetData">Axios按鈕(還未取得成功)</button>&nbsp;
    <button @click="test">假設已用Axios取得後端的資料</button><br><br>
    顯示後端傳來的資料：<br>
    {{receive_data}}
  </div>
</template>

<script>
import axios from "axios";
import awesome from "../proto/test_pb.js";

export default {
  name: "HelloWorld",
  data(){
    return{
      receive_data:{}
    }
  },
  methods: {
    protobufferTest() {
      var message = new this.awesome.Person(); // 调用Person对象  实例化
      // 赋值
      message.setId(23);
      message.setName("asd123");
      // 序列化
      var bytes = message.serializeBinary();
      // 返回为对象
      var obj = message.toObject();

      console.log(bytes); // Uint8Array(7) [8, 23, 18, 3, 97, 115, 100]
      console.log(obj);
      // 反序列化
      var message2 = this.awesome.Person.deserializeBinary(bytes);

      console.log(message2);
      // 返回为对象
      console.log(message2.toObject());
    },
    test() {
      // 假設buf是後端傳來的資料
      /*
      buf = messages.Test.encode({
      num: 42,
      payload: '哈囉囉囉~~',
      payloads: ''
    })
    */
      let buf = {
        type: "Buffer",
        data: [
          13,
          0,
          0,
          40,
          66,
          18,
          14,
          229,
          147,
          136,
          229,
          155,
          137,
          229,
          155,
          137,
          229,
          155,
          137,
          126,
          126,
          26,
          0
        ]
      };
      let message3 = awesome.Test.deserializeBinary(buf.data);
      let nums = message3.getNum();
      console.log(nums); // nums=42。解析出来就是后端传过来的42

      let pm = awesome.Test.deserializeBinary(buf.data);
      let protoBuf = pm.toObject();
      this.receive_data=protoBuf
      console.log("protoBuf: ", protoBuf); // 打印出来是一个对象
    },
    AxiosGetData() {
      axios({
        method: "get",
        url: "/proto/get",
        headers: { contentType: "application/x-protobuf" }
      })
        .then(res => {
          console.log("結果為：", res);
          let message3 = awesome.Test.deserializeBinary(res.data.data);
          let nums = message3.getNum();
          console.log(nums); // nums=42。解析出来就是后端传过来的42
          let pm = awesome.Test.deserializeBinary(res.data.data);
          let protoBuf = pm.toObject();
          console.log("protoBuf: ", protoBuf); // 打印出来是一个对象
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {}
};
</script>

<style lang="scss">
</style>