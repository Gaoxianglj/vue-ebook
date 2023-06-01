<template>
  <div class="upload-container">
    <form>
      <input type="file" id="uFile" name="uFile" @change="update($event)"/>
    </form>
  </div>
</template>

<script>
import { upload } from '@/api/store'

export default {
  name: 'upload',
  methods: {
    update (e) {
      const file = e.target.files[0]
      upload(file)
    }
  }
}
</script>

<style scoped>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-container input[type="file"] {
  background: linear-gradient(to bottom, #0099CC, #006699);
  color: white;
  border-radius: 5px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
}
.container {
  height: 200px;
  position: relative;
  border: 3px solid green;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
