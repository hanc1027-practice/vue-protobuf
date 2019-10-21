<template>
  <div class="hello">
    <button @click="protobufferTest">測試按鈕</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
   protobufferTest () {
      var message = new this.awesome.Person() // 调用Person对象  实例化
      // 赋值
      message.setId(23)
      message.setName('asd123')
      // 序列化
      var bytes = message.serializeBinary()
      // 返回为对象
      var obj = message.toObject()

      console.log(bytes) // Uint8Array(7) [8, 23, 18, 3, 97, 115, 100]
      console.log(obj)
      // 反序列化
      var message2 = this.awesome.Person.deserializeBinary(bytes)

      console.log(message2)
      // 返回为对象
      console.log(message2.toObject())
    }
  },
  created() {}
};
</script>

<style lang="scss">
</style>